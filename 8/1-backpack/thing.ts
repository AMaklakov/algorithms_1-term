export class Thing {
    price: number;                    // price of one instance
    costWeightCoefficient: string;    // = price/weight
    name: string;                     // just random word =)
    amount: number;                   // number of instances
    weight: number;                   // weight of one instance

    constructor(total: number, weight: number, cost: number, name: string) {
        this.name = name;
        this.amount = total;
        this.weight = weight;
        this.price = cost;

        this.makeCoefficient();
    }

    private makeCoefficient() {
        this.costWeightCoefficient = (this.price / this.weight).toFixed(3);
    }
}