import { Component, OnInit } from '@angular/core';
import { FiltersListService } from 'src/app/service/filters-list.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-cocktail-detail',
  templateUrl: './cocktail-detail.component.html',
  styleUrls: ['./cocktail-detail.component.css']
})
export class CocktailDetailComponent implements OnInit {

  cocktailDetails:Object;
  current=false;
  constructor(private filtersListService:FiltersListService, private spinner:SpinnerService) { }

  ngOnInit() {

   let cocktailid= localStorage.getItem('id')

    this.spinner.showSpinner()
   this.filtersListService.getCocktailDetails(cocktailid).subscribe(res=>{
    this.spinner.hideSpinner()
    this.current=true;
     res= res['drinks']['0']
     this.cocktailDetails=res;
   })



  }

}
