import {Graph} from './Graph';

// export const EMPTY_FIELD: number = Number.MAX_VALUE;
export const EMPTY_FIELD: number = Infinity;

export function makePreloadedGraph(): Graph {
	const g = new Graph(7);
	g.addEdge(0, 1, 3);
	g.addEdge(0, 3, 1);
	g.addEdge(1, 2, 4);
	g.addEdge(1, 3, 9);
	g.addEdge(1, 4, 1);
	g.addEdge(2, 4, 4);
	g.addEdge(3, 4, 1);
	g.addEdge(3, 5, 2);
	g.addEdge(4, 6, 6);

	return g;
}


// export function makePreloadedGraph(): Graph {
// 	const g = new Graph(5);
// 	g.addEdge(0, 1, 1);
// 	g.addEdge(0, 3, 1);
// 	g.addEdge(1, 2, 1);
// 	g.addEdge(2, 3, 1);
// 	g.addEdge(3, 4, 1);
//
// 	return g;
// }

export function copyArray<T>(input: T[][]): T[][] {
	const result: T[][] = [];

	for (let i = 0; i < input.length; i++) {
		result[i] = [];
		for (let j = 0; j < input[i].length; j++) {
			result[i].push(input[i][j]);
		}
	}

	return result;
}