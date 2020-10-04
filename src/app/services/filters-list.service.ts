import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FiltersListService {

  filtersEvent= new Subject<any>();
  cocktailIdEvent= new Subject<any>();
  cocktailId:Number;
  cocktailList:any;
  filterList:any;

  constructor(private http: HttpClient) { }

  getFiltersCategories(){
    return this.http.get("https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list");
  }

  getFiltersGlasses(){
    return this.http.get("https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list");
  }

  getFiltersIngredients(){
    return this.http.get("https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list");
  }

  getFiltersAlcoholic(){
    return this.http.get("https://www.thecocktaildb.com/api/json/v1/1/list.php?a=list");
  }

  getListForFilters(category,filterValue){
      const categoryValue=category[0].toLowerCase()
      filterValue=filterValue.replace(/ /g,"_");

    return  this.http.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?${categoryValue}=${filterValue}`);
  }

  getCocktailsList(cocktailList:any){
    this.filtersEvent.next(cocktailList)

  }

  getCocktailId(id){
    this.cocktailId=id;

  }

  getCocktailDetails(id){
    return this.http.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
  }

  setFiltersList(filterList){

  this.filterList= filterList;

  }
  getFiltersList(){

    return this.filterList;

    }


}
