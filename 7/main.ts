import * as readline from 'readline';
import {Graph} from './Graph';
import {makePreloadedGraph} from './util';

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

// function askQuestion(query) {
// 	const rl = readline.createInterface({
// 		input: process.stdin,
// 		output: process.stdout,
// 	});
//
// 	return new Promise(resolve => rl.question(query, ans => {
// 		rl.close();
// 		resolve(ans);
// 	}))
// }

function printMenu() {
	console.log('Menu: \n' +
		'1. Add vertex\n' +
		'2. Add edge\n' +
		'3. Add one-way edge\n' +
		'4. Remove vertex\n' +
		'5. Remove edge\n' +
		'6. Remove one-way edge\n' +
		'7. Make graph biconnected\n' +
		'8. Preload graph \n' +
		'9. Floyd\n' +
		'10. Exit');
}

function processAnswer(answer: string) {
	switch (answer) {
		case '1':
			g.addVertex();
			break;
		case '2':
			let vertex1=0, vertex2=0, weight=0;

			rl.question('Input first vertex: ', answer => vertex1 = +answer - 1);
			rl.question('Input second vertex: ', answer => vertex2 = +answer - 1);
			rl.question('Input weight: ', answer => weight = +answer);

			g.addEdge(vertex1, vertex2, weight);
			break;
		case '3':
			vertex1=0, vertex2=0, weight=0;

			rl.question('Input first vertex: ', answer => vertex1 = +answer - 1);
			rl.question('Input second vertex: ', answer => vertex2 = +answer - 1);
			rl.question('Input weight: ', answer => weight = +answer);

			g.addEdge(vertex1, vertex2, weight);
			break;
		case '4':
			vertex1=0;

			rl.question('Input vertex: ', answer => vertex1 = +answer - 1);

			g.removeVertex(vertex1);
			break;
		case '5':
			vertex1=0, vertex2=0;

			rl.question('Input first vertex: ', answer => vertex1 = +answer - 1);
			rl.question('Input second vertex: ', answer => vertex2 = +answer - 1);

			g.removeEdge(vertex1, vertex2);
			break;
		case '6':
			vertex1=0, vertex2=0;

			rl.question('Input first vertex: ', answer => vertex1 = +answer - 1);
			rl.question('Input second vertex: ', answer => vertex2 = +answer - 1);

			g.removeOneWayEdge(vertex1, vertex2);
			break;
		case '7':
			g.makeGraphBiconnected();
			break;
		case '8':
			g = makePreloadedGraph();
			break;
		case '9':
			g.floydWarshall();
			break;
		case '10':
			isEnd = true;
			break;
		default:
			console.log('Unknown command')
	}

	whileFunction();
}


let isEnd: boolean = false;
let g = new Graph(1);

function whileFunction() {
	if(!isEnd) {
		console.log('---------------------------------------------------------');

		g.print();
		printMenu();

		rl.question('Choose operation: ', answer => processAnswer(answer));
	} else {
		process.exit();
	}
}

whileFunction();



