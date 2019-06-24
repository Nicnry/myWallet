export class Change {
    public id: number;
    public name: string;
    public value: number;
    public transaction_id: number;

    constructor(id, name, value, transaction_id) {
        this.id = id;
        this.name = name;
        this.value = value;
        this.transaction_id = transaction_id;
    }
}
