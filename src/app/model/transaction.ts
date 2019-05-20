export class Transaction {
    public id: number;
    public type: boolean;
    public value: number;

    constructor(id, type, value) {
        this.id = id;
        this.type = type;
        this.value = value;
    }
}
