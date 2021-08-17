import { Burger } from './burger';


export class CartItem {
    id: string;
    name: string;
    imageUrl: string;
    unitPrice: number;
    quantity: number;

    constructor(burger: Burger){
        this.id = burger.id;
        this.name = burger.name;
        this.imageUrl = burger.imageUrl;
        this.unitPrice = burger.unitPrice;
        this.quantity = 1
    }
}
