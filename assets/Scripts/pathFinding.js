// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import enemy from './enemy'

cc.Class({
    extends: cc.Component,

    properties: {
        player: {
            //     // ATTRIBUTES:
            default: null,        // The default value will be used only when the component attaching
            //                           // to a node for the first time
            type: cc.Node, // optional, default is typeof default
            //     serializable: true,   // optional, default is true
        },
        tiledMap: {
            default: null,
            type: cc.TiledMap,
        },
        mapNode: {
            default: null,
            type: cc.Node,
        }
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    initialNodeArray: null,
    tiledSize: 0,
    layer: null,
    layerSize: null,
    nodeArray: null,
    nextCalculateTime: 0,
    findCoolDown: 0,
    path: null,
    wall: null,
    pathLen: 0,



    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.path = new Array(cc.v2);
        this.tiledSize = this.tiledMap.getTileSize();
        this.layer = this.tiledMap.getLayer('wall');
        this.layerSize = this.layer.getLayerSize();
        this.initialNodeArray = new Array(this.layerSize.width);
        for (let i = 0; i < this.layerSize.width; i++)
            this.initialNodeArray[i] = new Array(this.layerSize.height)
        this.findCoolDown = 3;
        this.initMap();

    },



    start() {
        this.nextCalculateTime = cc.director.getTotalTime() / 1000.0;
    },

    initMap() {
        let walls = [];
        for (var x = 0; x < this.layerSize.width; x++) {
            for (var y = 0; y < this.layerSize.height; y++) {
                let tiled = this.layer.getTiledTileAt(x, y, true);
                if (tiled.gid != 0) {
                    walls.push({ x: x, y: y })
                }
                var node = {
                    x: x,
                    y: y,
                    f: Number.MAX_SAFE_INTEGER,
                    g: Number.MAX_SAFE_INTEGER,
                    h: Number.MAX_SAFE_INTEGER,
                    cost: 1,
                    visited: false,
                    closed: false,
                    parent: null,
                    wall: false,
                };
                this.initialNodeArray[x][y] = node;
            }
        }
        for (let i = 0; i < walls.length; i++) {
            this.createWallAround(walls[i].x, walls[i].y)
        }
    },

    createWallAround(x, y) {
        this.initialNodeArray[x][y].wall = true;
        if (x > 0) {
            this.initialNodeArray[x - 1][y].wall = true;
        }

        if (x < this.layerSize.width - 1) {
            this.initialNodeArray[x + 1][y].wall = true;
        }

        if (y > 0) {
            this.initialNodeArray[x][y - 1].wall = true;
        }

        if (y < this.layerSize.height - 1) {
            this.initialNodeArray[x][y + 1].wall = true;
        }

        if (x > 0 && y > 0) {
            this.initialNodeArray[x - 1][y - 1].wall = true;
        }

        if (x < this.layerSize.width - 1 && y > 0) {
            this.initialNodeArray[x + 1][y - 1].wall = true;
        }

        if (x > 0 && y < this.layerSize.height - 1) {
            this.initialNodeArray[x - 1][y + 1].wall = true;
        }

        if (x < this.layerSize.width - 1 && y < this.layerSize.height - 1) {
            this.initialNodeArray[x + 1][y + 1].wall = true;
        }
    },

    reloadMap() {
        this.nodeArray = new Array(this.layerSize.width);
        for (let i = 0; i < this.layerSize.width; i++) {
            this.nodeArray[i] = new Array(this.layerSize.height)
            this.nodeArray[i] = Object.assign({}, this.initialNodeArray[i]);
            for (let j = 0; j < this.layerSize.height; j++) {
                this.nodeArray[i][j] = Object.assign({}, this.initialNodeArray[i][j]);
            }

        }

    },

    buildHeap() {
        return new BinaryHeap(function (node) {
            return node.f;
        });
    },

    nodeNeighbors(node) {
        var ret = [];
        var x = node.x;
        var y = node.y;

        // West

        if (x > 0) {
            this.nodeArray[x-1][y].cost = 1;
            ret.push(this.nodeArray[x - 1][y]);
        }

        // East
        if (x < this.layerSize.width - 1) {
            this.nodeArray[x+1][y].cost = 1;
            ret.push(this.nodeArray[x + 1][y]);
        }

        // South
        if (y > 0) {
            this.nodeArray[x][y-1].cost = 1;
            ret.push(this.nodeArray[x][y - 1]);
        }

        // North
        if (y < this.layerSize.height - 1) {
            this.nodeArray[x][y+1].cost = 1;
            ret.push(this.nodeArray[x][y + 1]);
        }

        // Southwest
        if (x > 0 && y > 0) {
            this.nodeArray[x - 1][y - 1].cost = 1;
            ret.push(this.nodeArray[x - 1][y - 1]);
        }

        // Southeast
        if (x < this.layerSize.width - 1 && y > 0) {
            this.nodeArray[x + 1][y - 1].cost = 1;
            ret.push(this.nodeArray[x + 1][y - 1]);
        }

        // Northwest
        if (x > 0 && y < this.layerSize.height - 1) {
            this.nodeArray[x - 1][y + 1].cost = 1;
            ret.push(this.nodeArray[x - 1][y + 1]);
        }

        // Northeast
        if (x < this.layerSize.width - 1 && y < this.layerSize.height - 1) {
            this.nodeArray[x + 1][y + 1].cost = 1;
            ret.push(this.nodeArray[x + 1][y + 1]);
        }
        return ret;
    },

    heuristic(cur, end) {
        var d1 = Math.abs(cur.x - end.x);
        var d2 = Math.abs(cur.y - cur.y);
        return d1 + d2;
    },

    pathFindingAlgo(targetPos) {
        this.reloadMap();
        let worldPos = this.node.convertToWorldSpaceAR(cc.v2(0, 0));
        let currentPos = this.mapNode.convertToNodeSpaceAR(worldPos)
        targetPos = this.mapNode.convertToNodeSpaceAR(targetPos)
        let startX = Math.round(currentPos.x / this.tiledSize.width);
        let startY = this.layerSize.height - Math.round(currentPos.y / this.tiledSize.height);
        let endX = Math.round(targetPos.x / this.tiledSize.width)
        let endY = this.layerSize.height - Math.round(targetPos.y / this.tiledSize.height)
        let start = this.nodeArray[startX][startY];
        let end = this.nodeArray[endX][endY];
        
        

        var openHeap = this.buildHeap();
        openHeap.push(start);
        while (openHeap.size() > 0) {
            // Grab the lowest f(x) to process next.  Heap keeps this sorted for us.
            var currentNode = openHeap.pop();

            // End case -- result has been found, return the traced path.
            if (currentNode === end) {
                var curr = currentNode;
                var ret = [];
                while (curr.parent) {
                    ret.push([curr.x - curr.parent.x, curr.y - curr.parent.y]);
                    curr = curr.parent;
                }
                return ret.reverse();
            }

            // Normal case -- move currentNode from open to closed, process each of its neighbors.'
            currentNode.closed = true;
            // Find all neighbors for the current node. Optionally find diagonal neighbors as well (false by default).
            //var neighbors = this.nodeNeighbors(currentNode);
            var dx = [0, 0, 1, -1, 1, 1, -1, -1];
            var dy = [1, -1, 0, 0, 1, -1, -1, 1];
            for (let i = 0; i < 8; i++) {
                let cur_x = currentNode.x + dx[i];
                let cur_y = currentNode.y + dy[i];
                if(cur_x < 0 || cur_y < 0 || cur_x >= this.layerSize.width || cur_y >= this.layerSize.height)
                    continue
                let next_node = this.nodeArray[cur_x][cur_y];
                if((next_node.closed || next_node.wall) && next_node != end)
                    continue
                var next_g = currentNode.cost;
                if(i >= 4){
                    next_g += 0.3
                }
                var next_visited = next_node.visited;
                if(!next_visited || next_g < next_node.g) {
                    next_node.visited = true;
                    next_node.parent = currentNode;
                    next_node.h = this.heuristic(next_node, end);
                    next_node.g = next_g;
                    next_node.f = next_node.g + next_node.h;

                    if (!next_visited) {
                        // Pushing to heap will put it in proper place based on the 'f' value.
                        openHeap.push(next_node);
                    }
                    else {
                        // Already seen the node, but since it has been rescored we need to reorder it in the heap
                        openHeap.rescoreElement(next_node);
                    }
                }
            }
            /*
            for (var i = 0, il = neighbors.length; i < il; i++) {

                var neighbor = neighbors[i];
                if (neighbor.closed || neighbor.wall) {

                    // Not a valid node to process, skip to next neighbor.
                    continue;
                }

                // The g score is the shortest distance from start to current node.
                // We need to check if the path we have arrived at this neighbor is the shortest one we have seen yet.
                var gScore = currentNode.g + neighbor.cost;
                var beenVisited = neighbor.visited;

                if (!beenVisited || gScore < neighbor.g) {

                    // Found an optimal (so far) path to this node.  Take score for node to see how good it is.
                    neighbor.visited = true;
                    neighbor.parent = currentNode;
                    neighbor.h = this.heuristic(neighbor, end);
                    neighbor.g = gScore;
                    neighbor.f = neighbor.g + neighbor.h;

                    if (!beenVisited) {
                        // Pushing to heap will put it in proper place based on the 'f' value.
                        openHeap.push(neighbor);
                    }
                    else {
                        // Already seen the node, but since it has been rescored we need to reorder it in the heap
                        openHeap.rescoreElement(neighbor);
                    }
                }
            }
            */
        }

        // No result was found - empty array signifies failure to find path.
        return [];
    },


    update(dt) {
        /*
        //this.target = this.node.getComponent(enemy).tracingPlayer;
        //if(!target)

        let currentTime = cc.director.getTotalTime() / 1000.0;
        if (currentTime >= this.nextCalculateTime) {
            this.path = [];
            this.nextCalculateTime = currentTime + this.findCoolDown;
            let nodePath = this.pathFindingAlgo();
            this.pathLen = nodePath.length;
            let layer = this.tiledMap.getLayer('bg');
            for (let i = 0; i < nodePath.length; i++) {
                let tiled = layer.getTiledTileAt(nodePath[i].x, nodePath[i].y, true);
                this.path.push(cc.v2(nodePath[i].x, 45 - nodePath[i].y));
                tiled.gid = 0;
                this.scheduleOnce((e) => {
                    //layer.getTiledTileAt(12, 12, true).gid = 0
                    tiled.gid = 98;
                }, 1)
            }

        }
        */
    },

});


function BinaryHeap(scoreFunction) {
    this.content = [];
    this.scoreFunction = scoreFunction;
}

BinaryHeap.prototype = {
    push: function (element) {
        // Add the new element to the end of the array.
        this.content.push(element);
        // Allow it to bubble up.
        this.bubbleUp(this.content.length - 1);

    },

    pop: function () {
        // Store the first element so we can return it later.
        var result = this.content[0];
        // Get the element at the end of the array.
        var end = this.content.pop();
        // If there are any elements left, put the end element at the
        // start, and let it sink down.
        if (this.content.length > 0) {
            this.content[0] = end;
            this.sinkDown(0);
        }
        return result;
    },
    rescoreElement: function(node) {
        this.sinkDown(this.content.indexOf(node));
    },

    remove: function (node) {
        var length = this.content.length;
        // To remove a value, we must search through the array to find
        // it.
        for (var i = 0; i < length; i++) {
            if (this.content[i] != node) continue;
            // When it is found, the process seen in 'pop' is repeated
            // to fill up the hole.
            var end = this.content.pop();
            // If the element we popped was the one we needed to remove,
            // we're done.
            if (i == length - 1) break;
            // Otherwise, we replace the removed element with the popped
            // one, and allow it to float up or sink down as appropriate.
            this.content[i] = end;
            this.bubbleUp(i);
            this.sinkDown(i);
            break;
        }
    },

    size: function () {
        return this.content.length;
    },

    bubbleUp: function (n) {
        // Fetch the element that has to be moved.
        var element = this.content[n], score = this.scoreFunction(element);
        // When at 0, an element can not go up any further.
        while (n > 0) {
            // Compute the parent element's index, and fetch it.
            var parentN = Math.floor((n + 1) / 2) - 1,
                parent = this.content[parentN];
            // If the parent has a lesser score, things are in order and we
            // are done.
            if (score >= this.scoreFunction(parent))
                break;

            // Otherwise, swap the parent with the current element and
            // continue.
            this.content[parentN] = element;
            this.content[n] = parent;
            n = parentN;
        }
    },

    sinkDown: function (n) {
        // Look up the target element and its score.
        var length = this.content.length,
            element = this.content[n],
            elemScore = this.scoreFunction(element);

        while (true) {
            // Compute the indices of the child elements.
            var child2N = (n + 1) * 2, child1N = child2N - 1;
            // This is used to store the new position of the element,
            // if any.
            var swap = null;
            // If the first child exists (is inside the array)...
            if (child1N < length) {
                // Look it up and compute its score.
                var child1 = this.content[child1N],
                    child1Score = this.scoreFunction(child1);
                // If the score is less than our element's, we need to swap.
                if (child1Score < elemScore)
                    swap = child1N;
            }
            // Do the same checks for the other child.
            if (child2N < length) {
                var child2 = this.content[child2N],
                    child2Score = this.scoreFunction(child2);
                if (child2Score < (swap == null ? elemScore : child1Score))
                    swap = child2N;
            }

            // No need to swap further, we are done.
            if (swap == null) break;

            // Otherwise, swap and continue.
            this.content[n] = this.content[swap];
            this.content[swap] = element;
            n = swap;
        }
    }
};
