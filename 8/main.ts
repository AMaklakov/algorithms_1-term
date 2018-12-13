import {lps} from './3-LPS/main';
import {longestNonIncreasingSequence} from './4-non-decreasing-sequence/main';
import {backpackTask} from './1-backpack/main';
import {knight} from './2-knight/main';

// --------- 1 --- Backpack ----------------
backpackTask();

// --------- 2 --- Knight ----------------
// Chess board
const N = 10;
const M = 10;

const totalRoutes = knight(M, N, 0, 0);
console.log(`For the desk ${M}x${N} number of routes is ${totalRoutes}`);

// --------- 3 ----- LPS ------
const sequence: string = 'seredinkitimofeyprivet';
const LPS = lps(sequence);
console.log(`LPS: ${LPS} in ${sequence}`);

// --------- 4 ----- non-decreasing sequence ------
const inputData: number[] = [10, 2, 3, 3, 7];
const res: number = longestNonIncreasingSequence(inputData);
console.log(`LIS length for ${inputData} is ${res}`);

