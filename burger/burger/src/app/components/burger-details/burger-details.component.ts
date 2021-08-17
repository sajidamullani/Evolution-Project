import { Component, OnInit } from '@angular/core';
import { Burger } from 'src/app/common/burger';
import { ActivatedRoute } from '@angular/router';
import { BurgerService } from 'src/app/services/burger.service';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-burger-details',
  templateUrl: './burger-details.component.html',
  styleUrls: ['./burger-details.component.css']
})
export class BurgerDetailsComponent implements OnInit {

  burger: Burger = new Burger();

  constructor(private _activatedRoute: ActivatedRoute,
              private _burgerService: BurgerService,
              private _cartService: CartService) { }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe(
      () => {
        this.getBurgerInfo();
      }
    )
  }

  getBurgerInfo(){
    const id: number = +this._activatedRoute.snapshot.paramMap.get('id');

    this._burgerService.get(id).subscribe(
      data => {
        this.burger = data;
      }
    );
  }

  addToCart(){
    console.log(`burger name: ${this.burger.name}, and price: ${this.burger.unitPrice}`);
    const cartItem = new CartItem(this.burger);
    this._cartService.addToCart(cartItem);
  }

}
