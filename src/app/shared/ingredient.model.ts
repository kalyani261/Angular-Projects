export class Ingredient
{
    public name: string;
    public amount: number;

    constructor(name: string, amount: number)

    {
            this.name=name;
            this.amount=amount;
    }
}



/* we can also write it as

export class ingrre,..
{
    constructor(public name: string,public amount:number)
    {

    }
}

*/