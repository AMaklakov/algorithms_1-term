import {Thing} from './thing';
import * as cTable from 'console.table';

export class Backpack {
    maxWeight: number;          // max weight this backpack can hold
    things: Thing[] = [];       // things that current backpack owns
    currentWeight: number = 0;  // sum of things weights
    currentCost: number = 0;    // sum of things costs

    constructor(maxWeight: number) {
        this.maxWeight = maxWeight;
    }

    addThing(thing: Thing): void {
        if (this.currentWeight + thing.weight > this.maxWeight) {
            throw new Error(`Too much weight for me! I can take only ${this.maxWeight - this.currentWeight} kilos more`);
        }

        this.things.push(thing);
        this.currentCost += thing.price;
        this.currentWeight += thing.weight;
    }

    printThings(): void {
        console.log(`Things -- ${this.currentWeight} kilos -- $${this.currentCost}:`);
        console.log(cTable.getTable(this.things));

    }
}
