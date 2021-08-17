import { Component, OnInit } from '@angular/core';
import { Burger } from '../../common/burger';
import { BurgerService } from '../../services/burger.service';
import { ActivatedRoute } from '@angular/router';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/common/cart-item';

@Component({
  selector: 'app-burger-list',
  templateUrl: './burger-grid.component.html',
  styleUrls: ['./burger-list.component.css'],
  providers: [NgbPaginationConfig]
})
export class BurgerListComponent implements OnInit {

  burgers: Burger[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;

  //properties for client side paging

  //pageOfItems: Array<Book>;
  //pageSize: number = 5;

  //new properties for server-side paging
  currentPage: number = 1;
  pageSize: number = 5;
  totalRecords: number = 0;

  constructor(private _burgerService: BurgerService,
              private _activatedRoute: ActivatedRoute,
              private _cartService: CartService,
              config: NgbPaginationConfig) {
                config.boundaryLinks = true;
                config.maxSize = 3;
              }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe(()=>{
      this.listBurgers();
    })
  }

  /*client side paging
  pageClick(pageOfItems: Array<Burger>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  } */

  listBurgers(){
    this.searchMode = this._activatedRoute.snapshot.paramMap.has('keyword');

    if(this.searchMode){
      //do search work
      this.handleSearchBurgers();
    }else {
      //display books based on category
      this.handleListBurgers();
    }
  }

  handleListBurgers(){
    const hasCategoryId: boolean = this._activatedRoute.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      this.currentCategoryId = +this._activatedRoute.snapshot.paramMap.get('id');
    }else {
      this.currentCategoryId = 1;
    }

    //setting up the page number to 1
    //if user navigates to other category
    if (this.previousCategoryId != this.currentCategoryId) {
      this.currentPage = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    console.log('current page size', this.currentPage-1);

    this._burgerService.getBurgersPaginate(this.currentCategoryId,
                                        this.currentPage - 1,
                                        this.pageSize)
                                        .subscribe(this.processResult());
  }

  handleSearchBurgers(){
    const keyword: string = this._activatedRoute.snapshot.paramMap.get('keyword');

    this._burgerService.searchBurgers(keyword,
                                  this.currentPage - 1,
                                  this.pageSize)
                                  .subscribe(this.processResult());
  }

  //client side paging and server side paging
  updatePageSize(pageSize: number) {
    this.pageSize = pageSize;
    this.currentPage = 1;
    this.listBurgers();
  }

  processResult(){
    return data => {
      this.burgers = data._embedded.burgers;
      this.currentPage = data.page.number + 1;
      this.totalRecords = data.page.totalElements;
      this.pageSize = data.page.size;
    }
  }

  addToCart(burger: Burger){
    console.log(`burger name: ${burger.name}, and price: ${burger.unitPrice}`);
    const cartItem = new CartItem(burger);
    this._cartService.addToCart(cartItem);
  }

}
