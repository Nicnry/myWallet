import {Transaction} from '../model/transaction';

export class Account {
  public id: number;
  public name: string;
  public favorite: boolean;
  public value: number;

  constructor(id, name, favorite, value) {
    this.id = id;
    this.name = name;
    this.favorite = favorite;
    this.value = value;

  }
}
