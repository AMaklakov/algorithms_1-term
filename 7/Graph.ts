import {copyArray, EMPTY_FIELD} from './util';
import * as cTable from 'console.table';

export class Graph {
    adjacencyMatrix: number[][];

    adjacencyList: number[][];

    verticesTotal: number;

    dijkstraDistance: number[];

    center: number;

    constructor(verticesTotal?: number) {
        this.verticesTotal = verticesTotal || 1;
        this.initAdjacencyMatrix();
        this.initAdjacencyList();
    }

    // region EDGES and VERTICES
    addVertex() {
        this.verticesTotal++;
        this.adjacencyMatrix.push(this.adjacencyMatrix[0].map(() => EMPTY_FIELD));
        this.adjacencyMatrix.forEach(item => item.push(EMPTY_FIELD));
    }

    removeVertex(vertex: number = 0) {
        if (!this.checkVertex(vertex)) {
            console.log('remove vertex -> Not valid vertex', vertex);
        }

        this.verticesTotal--;
        this.adjacencyMatrix = this.adjacencyMatrix
            .map(item => item.splice(vertex, 1))
            .splice(vertex, 1);
    }

    addEdge(vertex1: number, vertex2: number, weight?: number) {
        this.addOneWayEdge(vertex1, vertex2, weight);
        this.addOneWayEdge(vertex2, vertex1, weight);
    }

    addOneWayEdge(vertex1: number, vertex2: number, weight: number) {
        if (!this.checkVertices([vertex1, vertex2])) {
            return console.log('addEdge -> vertex1 or vertex2 is out of range');
        }

        if (vertex1 === vertex2) {
            return console.log('Vertices are the same. Can\'t do that');
        }

        // greater than zero
        weight = this.checkWeight(weight) ? weight : 1;

        if (this.adjacencyMatrix[vertex1][vertex2] === EMPTY_FIELD) {
            this.adjacencyMatrix[vertex1][vertex2] = weight;
        } else {
            console.log('addEdge -> edge is already exists');
        }
    }

    removeEdge(vertex1: number, vertex2: number) {
        this.removeOneWayEdge(vertex1, vertex2);
        this.removeOneWayEdge(vertex2, vertex1);
    }

    removeOneWayEdge(vertex1: number, vertex2: number) {
        if (!this.checkVertices([vertex1, vertex2])) {
            return console.log('addEdge -> vertex1 or vertex2 is out of range');
        }

        if (vertex1 === vertex2) {
            return console.log('Vertices are the same. Can\'t do that');
        }

        if (this.adjacencyMatrix[vertex1][vertex2] !== EMPTY_FIELD) {
            this.adjacencyMatrix[vertex1][vertex2] = EMPTY_FIELD;
        } else {
            console.log('removeEdge -> no such side');
        }
    }

    // endregion EDGES and VERTICES

    dijkstra(start: number = 0) {
        if (!this.checkVertex(start)) {
            return console.log('dijkstra -> start is not valid');
        }

        // save matrix
        const copiedMatrix: number[][] = copyArray(this.adjacencyMatrix);

        // Array of ∞
        const dist: number[] = this.adjacencyMatrix.map((item, index: number) => index !== start ? Infinity : 0);
        const sptSet: boolean[] = this.adjacencyMatrix.map(() => false);

        for (let i = 0; i < this.verticesTotal; i++) {
            const u: number = this.findMinDistance(dist, sptSet);

            sptSet[u] = true;

            //for v in range(self.V):
            //                 if self.graph[u][v] > 0 and sptSet[v] == False and
            //                    dist[v] > dist[u] + self.graph[u][v]:
            //                         dist[v] = dist[u] + self.graph[u][v]

            for (let v = 0; v < this.verticesTotal; v++) {
                if (this.adjacencyMatrix[u][v] !== EMPTY_FIELD && !sptSet[v] && dist[v] > dist[u] + this.adjacencyMatrix[u][v]) {
                    dist[v] = dist[u] + this.adjacencyMatrix[u][v];
                }
            }
        }

        // recover matrix
        this.adjacencyMatrix = copiedMatrix;

        // setting and printing result
        this.dijkstraDistance = dist;

        console.log(`distances from: ${start + 1} vertex`);
        for (let i = 0; i < this.verticesTotal; i++) {
            console.log(`${i} ->`, this.dijkstraDistance[i]);
        }

    }

    floydWarshall() {
        // adjacencyMatrix with 0 throughout main diagonal
        const dist: number[][] = copyArray<number>(this.adjacencyMatrix)
            .map((item, i) => item.map((num, j) => i !== j ? num : 0));

        for (let k = 0; k < this.verticesTotal; k++) {
            for (let i = 0; i < this.verticesTotal; i++) {
                for (let j = 0; j < this.verticesTotal; j++) {
                    // If vertex k is on the shortest path from
                    // i to j, then update the value of dist[i][j]
                    if (dist[i][k] + dist[k][j] < dist[i][j]) {
                        dist[i][j] = dist[i][k] + dist[k][j];
                    }
                }
            }
        }

        const exc: number[] = dist.map((item: number[]) => Math.max(...item));
        this.center = Math.min(...exc);

        // print matrix
        console.table(dist);

        console.log(' Eccentricity ->', exc);
        console.log('Center ->', this.center);
    }

    print() {
        const arrayToPrint = this.adjacencyMatrix
            .map((value: number[]) => value.map(item => item === EMPTY_FIELD ? '∞' : item));

        console.log(`vertices: ${this.verticesTotal}, adjacencyMatrix:`);
        console.log(cTable.getTable(arrayToPrint));
        // console.table(this.adjacencyMatrix)
    }

    /**
     * DFS
     */
    hasPath(from: number, to: number) {
        const stack: number[] = [from];
        const visited: boolean[] = this.adjacencyMatrix.map(() => false);
        let vertex;

        visited[from] = true;

        while (stack.length) {
            vertex = stack.pop();

            if (vertex === to) {
                return true;
            }

            for (let i = 0; i < this.verticesTotal; i++) {
                if (this.adjacencyMatrix[vertex][i] !== EMPTY_FIELD && !visited[i]) {
                    stack.push(i);
                    visited[i] = true;
                }
            }
        }

        return false;
    }

    printIncidenceList() {
        console.log(`vertices: ${this.verticesTotal}, incidenceList: \n`, this.adjacencyList);
    }

    makeGraphBiconnected() {
        let edgesToAddCounter: number = 0;
        const copiedAdjMatrix = copyArray(this.adjacencyMatrix);

        for (let parent = 0; parent < this.verticesTotal; parent++) {
            this.initAdjacencyList();

            for (let childIndex = 0; childIndex < this.adjacencyList[parent].length; childIndex++) {
                const child = this.adjacencyList[parent][childIndex];

                this.removeEdge(parent, child);
                this.initAdjacencyList();

                if (!this.hasPath(parent, child)) {
                    // if child has no more children, then connect it with sibling
                    const [target1, target2] = this.adjacencyList[child].length ?
                        [this.adjacencyList[child][0], parent] : [this.adjacencyList[parent][0], child];

                    // add edge and restore deleted edge
                    this.addEdge(target1, target2);
                    this.addEdge(parent, child);

                    // count
                    edgesToAddCounter++;

                    // step back
                    parent--;
                    break;
                } else {
                    this.addEdge(parent, child);
                }
            }
        }

        console.log('Min edges to add is: ', edgesToAddCounter);

        // restore
        this.adjacencyMatrix = copiedAdjMatrix;
    }

    private initAdjacencyList() {
        this.adjacencyList = [];

        this.adjacencyList = this.adjacencyMatrix.map((item: number[]) => {
            const arr = [];

            item.forEach((num, index) => {
                if (num !== EMPTY_FIELD) {
                    arr.push(index);
                }
            });

            return arr;
        });
    }

    private initAdjacencyMatrix() {
        this.adjacencyMatrix = [];
        for (let i = 0; i < this.verticesTotal; i++) {
            this.adjacencyMatrix[i] = [];

            for (let j = 0; j < this.verticesTotal; j++) {
                this.adjacencyMatrix[i][j] = EMPTY_FIELD;
            }
        }

        // this.adjacencyMatrix = new Array(this.verticesTotal).fill(0)
    }

    private checkVertices(vertices: number[]): boolean {
        if (vertices) {
            for (let vertex of vertices) {
                if (!this.checkVertex(vertex)) {
                    return false;
                }
            }

            return true;
        }

        return false;
    }

    private checkVertex(vertex: number): boolean {
        return vertex >= 0 && vertex < this.verticesTotal;
    }

    private checkWeight(weight: number): boolean {
        return weight > 0;
    }

    private findMinDistance(dist: number[], sptSet: boolean[]): number {
        let min: number = Infinity;
        let v: number = null;

        for (let i = 0; i < this.verticesTotal; i++) {
            if (dist[i] < min && !sptSet[i]) {
                min = dist[i];
                v = i;
            }
        }

        return v;
    }
}