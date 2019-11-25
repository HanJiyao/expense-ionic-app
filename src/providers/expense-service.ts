import { Injectable } from '@angular/core';
import { Expense } from '../models/expense';
import { EXPENSES } from '../mock/mock-expenses';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ExpenseService {

    private expensesUrl = '../assets/mock-expenses.json';
    constructor(private http: HttpClient) { }
        getExpenses(): Observable<Expense[]> {
        return this.http.get<Expense[]>(this.expensesUrl);
    } 

}