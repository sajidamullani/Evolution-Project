import { Component, OnInit } from '@angular/core';
import { BurgerCategory } from '../../common/burger-category';
import { BurgerService } from '../../services/burger.service';

@Component({
  selector: 'app-burger-category',
  templateUrl: './burger-category.component.html',
  styleUrls: ['./burger-category.component.css']
})
export class BurgerCategoryComponent implements OnInit {

  burgerCategories: BurgerCategory[];

  constructor(private _burgerService: BurgerService) { }

  ngOnInit() {
    this.listBurgerCategories();
  }

  listBurgerCategories(){
    this._burgerService.getBurgerCategories().subscribe(
      data => this.burgerCategories = data
    );
  }

}
