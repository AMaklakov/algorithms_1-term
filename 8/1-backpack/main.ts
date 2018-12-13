import {Thing} from './thing';
import * as randomWords from 'random-words';
import * as cTable from 'console.table';
import {getRandomInt} from '../util';
import {Backpack} from './backpack';

export function backpackTask() {
    const MAX_BACKPACK_WEIGHT: number = 45;
    const THING_MIN_WEIGHT: number = 1;
    const NUMBER_OF_THINGS = 30;
    const MAX_INSTANCES_OF_ONE_THING = 3;

    const backpack = new Backpack(MAX_BACKPACK_WEIGHT);
    let thingsArray: Thing[] = [];

    for (let i = 0; i < NUMBER_OF_THINGS; i++) {
        const total: number = getRandomInt(1, MAX_INSTANCES_OF_ONE_THING);
        const weigth: number = getRandomInt(THING_MIN_WEIGHT, 2 * MAX_BACKPACK_WEIGHT);
        const cost: number = getRandomInt(1, 2 * NUMBER_OF_THINGS);
        const name: string = randomWords();

        thingsArray.push(new Thing(total, weigth, cost, name));
    }

    console.log('Initial things: --------------- ');
    console.log(cTable.getTable(thingsArray));

    // ------- get only things which weight is less than my backpack can hold
    const itemsTotalBeforeFiltering = thingsArray.length;
    thingsArray = thingsArray.filter(thing => thing.weight <= backpack.maxWeight);

    console.log(`Thrown ${itemsTotalBeforeFiltering - thingsArray.length} things by weight : -----------------------------`);
    console.log(cTable.getTable(thingsArray));

    // ------------- expand my things
    const expandedThingsArray: Thing[] = [];
    thingsArray.forEach(thing => {
        for (let i = 0; i < thing.amount; i++) {
            expandedThingsArray.push(new Thing(1, thing.weight, thing.price, thing.name));
        }
    });

    console.log(`Expanded things: ${expandedThingsArray.length} --------------- `);
    console.log(cTable.getTable(expandedThingsArray));

    //----------- dynamic programming starts...
    const A: number[][] = [];

    // Set first row with 0
    for (let i = 0; i <= expandedThingsArray.length; i++) {
        A[i] = [0];
    }

    // Set first column with 0
    for (let i = 0; i <= backpack.maxWeight; i++) {
        A[0][i] = 0;
    }

    for (let k = 1; k <= expandedThingsArray.length; k++) {
        const thing: Thing = expandedThingsArray[k - 1];

        for (let s = 0; s <= backpack.maxWeight; s++) {
            if (s >= expandedThingsArray[k - 1].weight) {
                const first = A[k - 1][s];
                const second = A[k - 1][s - thing.weight] + thing.price;

                A[k][s] = Math.max(first, second);
            } else {
                A[k][s] = A[k - 1][s];
            }
        }
    }

    console.log('A: --------------- ');
    console.log(cTable.getTable(A));

    function findAns(k: number, s: number) {
        if (A[k][s] == 0) return;

        if (A[k - 1][s] === A[k][s]) {
            findAns(k - 1, s);
        } else {
            findAns(k - 1, s - expandedThingsArray[k - 1].weight);
            backpack.addThing(expandedThingsArray[k - 1]);
        }
    }

    findAns(expandedThingsArray.length, backpack.maxWeight);
    backpack.printThings();
}