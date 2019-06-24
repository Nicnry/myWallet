export class Transaction {
    public id: number;
    public value: number;
    public change_id: number;
    public account_id: number;

    constructor(id, value, change_id, account_id) {
        this.id = id;
        this.value = value;
        this.change_id = change_id;
        this.account_id = account_id;
    }
}
