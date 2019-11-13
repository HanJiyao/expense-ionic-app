import { Injectable } from '@angular/core';
import { Expense } from '../models/expense';
import { EXPENSES } from '../mock/mock-expenses';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class ExpenseService {

    constructor() { }

    getExpenses():  Observable<Expense[]> {
        return of (EXPENSES);
    }

}