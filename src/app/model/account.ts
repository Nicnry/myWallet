import {Transaction} from '../model/transaction';

export class Account {
  public id: number;
  public name: string;
  public favorite: boolean;
  public value: number;
  public transactions: Array<Transaction> = [];

  constructor(id, name, favorite, value, transactions) {
    this.id = id;
    this.name = name;
    this.favorite = favorite;
    this.value = value;
    this.transactions = transactions;

  }
}
