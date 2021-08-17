import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Burger} from '../common/burger';
import { BurgerCategory } from '../common/burger-category';

@Injectable({
  providedIn: 'root'
})
export class BurgerService {

  private baseUrl = "http://localhost:8080/api/v1/burgers";
  private categoryUrl = "http://localhost:8080/api/v1/burger-category";

  constructor(private httpClient: HttpClient) { }

  getBurgers(theCategoryId: number): Observable<Burger[]>{
    const searchUrl = `${this.baseUrl}/search/categoryid?id=${theCategoryId}`;
    return this.getBurgersList(searchUrl);
  }

  getBurgersPaginate(theCategoryId: number, currentPage: number, pageSize: number): Observable<GetResponseBurgers>{
    const searchUrl = `${this.baseUrl}/search/categoryid?id=${theCategoryId}&page=${currentPage}&size=${pageSize}`;
    return this.httpClient.get<GetResponseBurgers>(searchUrl);
  }

  getBurgerCategories(): Observable<BurgerCategory[]>{
    return this.httpClient.get<GetResponseBurgerCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.burgerCateogry)
    );
  }

  searchBurgers(keyword: string, currentPage: number, pageSize: number): Observable<GetResponseBurgers>{
    const searchUrl = `${this.baseUrl}/search/searchbykeyword?name=${keyword}&page=${currentPage}&size=${pageSize}`;
    //return this.getBooksList(searchUrl);
    return this.httpClient.get<GetResponseBurgers>(searchUrl);
  }

  private getBurgersList(searchUrl: string): Observable<Burger[]> {
    return this.httpClient.get<GetResponseBurgers>(searchUrl).pipe(
      map(response => response._embedded.burgers)
    );
  }

  get(burgerId: number): Observable<Burger> {
    const burgerDetailsUrl = `${this.baseUrl}/${burgerId}`;
    return this.httpClient.get<Burger>(burgerDetailsUrl);
  }
}

interface GetResponseBurgers{
  _embedded: {
    burgers: Burger[];
  },
  page: {
    //cureent page
    size: number,
    //total number of records in database
    totalElements: number,
    //total number of pages, starts from 0 index
    totalPages: number,
    //current page
    number: number
  }
}

interface GetResponseBurgerCategory{
  _embedded: {
    burgerCateogry: BurgerCategory[];
  }
}
