import { Injectable } from '@angular/core';
import { Expense } from '../models/expense';
import { EXPENSES } from '../mock/mock-expenses';

@Injectable()
export class ExpenseService {

    constructor() { }

    getExpenses(): Expense[] {
        return EXPENSES;
    }

}