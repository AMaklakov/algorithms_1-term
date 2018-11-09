const N = 5;

let workers: Array<{
	index: number,
	priority: Array<number>,
	jobsVisited: Array<boolean>,
	currentJob: boolean | number
}> = [];

let jobs: Array<{
	index: number,
	priority: Array<number>,
	workersVisited: Array<boolean>,
	currentWorker: boolean | number
}> = [];

/**
 * Generates n random integers from 0 to n
 *
 * @param n - numbers of elements
 */
function generateUniqueRandomIntegers(n: number) {
	const array: Array<number> = [];

	while (array.length < n) {
		let randomNumber = Math.floor(Math.random() * n);

		if (array.indexOf(randomNumber) === -1) {
			array.push(randomNumber)
		}
	}

	return array;
}

/**
 * Generates array of n 'values'
 *
 * if n == 3 and value == 2{
 *     return [2,2,2]
 * }
 * @param n - number of values
 * @param value - current value
 */
function getArrayOfNValues(n: number, value: any) {
	const array = [];

	for (let i = 0; i < n; i++) {
		array.push(value);
	}

	return array;
}

for (let i = 0; i < N; i++) {
	workers.push({
		index: i,
		priority: generateUniqueRandomIntegers(N),
		jobsVisited: getArrayOfNValues(N, false),
		currentJob: false
	});

	jobs.push({
		index: i,
		priority: generateUniqueRandomIntegers(N),
		workersVisited: getArrayOfNValues(N, false),
		currentWorker: false
	});
}

console.log('Workers', workers);
console.log('Jobs', jobs);

function applyForJob(worker: { index: number, priority: Array<number>; jobsVisited: Array<boolean>; currentJob: boolean | number },
                     job: { index: number, priority: Array<number>; workersVisited: Array<boolean>; currentWorker: boolean | number }): boolean {
	if (job.currentWorker === false) {
		job.currentWorker = worker.index;
		job.workersVisited[worker.index] = true;

		worker.currentJob = job.index;
		worker.jobsVisited[job.index] = true;

		return true;
	}

	if(typeof job.currentWorker === 'number' && job.priority.indexOf(job.currentWorker) > job.priority.indexOf(worker.index)) {
		let recentWorkerId = job.currentWorker;

		job.currentWorker = worker.index;
		job.workersVisited[worker.index] = true;

		worker.currentJob = job.index;
		worker.jobsVisited[job.index] = true;

		// unset recent
		let recentWorker = workers[recentWorkerId];
		recentWorker.currentJob = false;

		console.log('Here', );
		return true;
	}

	worker.jobsVisited[job.index] = true;
	job.workersVisited[worker.index] = true;

	return false;
}

function getJob(worker: { index: number; priority: Array<number>; jobsVisited: Array<boolean>; currentJob: boolean | number }) {
	// Most rated job of worker's list
	let firstIndex = worker.jobsVisited.indexOf(false);

	applyForJob(worker, jobs[worker.priority[firstIndex]])
}


// while any of worker has no job
while (workers.some(item => item.currentJob === false)) {
	workers.filter(item => item.currentJob === false).forEach(worker => {
		console.log('WORKER ID -> ', worker.index);
		getJob(worker);
	})
}


console.log('Workers', workers);
console.log('Jobs', jobs);
