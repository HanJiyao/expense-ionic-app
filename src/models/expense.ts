export class Expense {

    constructor(
    public date: string,
    public amount: number,
    public category: string,
    public merchant: string,
    public notes?: string
    ) { }
   
}