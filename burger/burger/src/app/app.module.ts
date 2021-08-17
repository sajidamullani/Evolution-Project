import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { BurgerListComponent } from './components/burger-list/burger-list.component';
import { BurgerService } from './services/burger.service';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { BurgerCategoryComponent } from './components/burger-category/burger-category.component';
import { SearchComponent } from './components/search/search.component';
import { BurgerDetailsComponent } from './components/burger-details/burger-details.component';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
//client side paging
//import { JwPaginationComponent } from 'jw-angular-pagination';


const routes: Routes = [
  {path: 'checkout', component: CheckoutComponent},
  {path: 'cart-details', component: CartDetailsComponent},
  {path: 'burgers/:id', component: BurgerDetailsComponent},
  {path: 'burgers', component: BurgerListComponent},
  {path: 'search/:keyword', component: BurgerListComponent},
  {path: 'category/:id', component: BurgerListComponent},
  {path: '', redirectTo: '/burgers', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    BurgerListComponent,
    PageNotFoundComponent,
    BurgerCategoryComponent,
    SearchComponent,
    BurgerDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent
    //client side paging
    //JwPaginationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    BurgerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
