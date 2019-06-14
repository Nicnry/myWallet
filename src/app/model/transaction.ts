export class Transaction {
    public id: number;
    public value: number;
    public account_id: number;

    constructor(id, value, account_id) {
        this.id = id;
        this.value = value;
        this.account_id = account_id;
    }
}
