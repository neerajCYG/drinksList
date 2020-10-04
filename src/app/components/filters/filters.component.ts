import { Component, OnInit } from '@angular/core';
import { FiltersListService } from 'src/app/services/filters-list.service';
import { SpinnerService } from 'src/app/services/spinner.service';
@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  expanded:boolean=false;
  selected:boolean=false;
  cocktailList=[];
  filterValues=[]
  categories=[];
  totalDrink:Number=0;
  filterOptionCheckedIndex:any;
  parentIndex:any;
  expandInd:any=0;
  filters={
    allFilters:[
      {
        filterName:"Glasses",
        expanded:false,
        filterOptions:[],
        filterChecked:[]
      },
      {
        filterName:"Categories",
        expanded:false,
        filterOptions:[],
        filterChecked:[]
      },
      {
        filterName:"Ingredients",
        expanded:false,
        filterOptions:[],
        filterChecked:[]
      },
      {
        filterName:"Alcoholic",
        expanded:false,
        filterOptions:[],
        filterChecked:[]
      }

    ]}
  constructor(private spinner:SpinnerService,private filtersListService:FiltersListService) { }

  ngOnInit(): void {





























    this.filtersListService.getFiltersCategories().subscribe(filterCategories=>{
      let categories= filterCategories['drinks']
      categories.forEach(category=>{
        this.filters.allFilters.forEach(cat=>{
          if(cat.filterName=="Categories"){

            cat.filterOptions.push(category['strCategory'])
            cat.filterChecked.push(false);
          }
        })
      })

     })

     this.filtersListService.getFiltersGlasses().subscribe(filterCategories=>{
      let categories= filterCategories['drinks']
      categories.forEach(category=>{
        this.filters.allFilters.forEach(cat=>{
          if(cat.filterName=="Glasses"){
            cat.filterOptions.push(category['strGlass'])
            cat.filterChecked.push(false);
          }
        })
      })

     })

     this.filtersListService.getFiltersIngredients().subscribe(filterCategories=>{
      let categories= filterCategories['drinks']
      categories.forEach(category=>{
        this.filters.allFilters.forEach(cat=>{
          if(cat.filterName=="Ingredients"){
            cat.filterOptions.push(category['strIngredient1'])
            cat.filterChecked.push(false);
          }
        })
      })

     })

     this.filtersListService.getFiltersAlcoholic().subscribe(filterCategories=>{
      let categories= filterCategories['drinks']
      categories.forEach(category=>{
        this.filters.allFilters.forEach(cat=>{
          if(cat.filterName=="Alcoholic"){
            cat.filterOptions.push(category['strAlcoholic'])
            cat.filterChecked.push(false);

          }
        })
      })

     })


  }

  expandOptions(index){
    this.expandInd=index;
   this.filters.allFilters[index]['expanded']=! this.filters.allFilters[index]['expanded'];

   this.filtersListService.setFiltersList(this.filters);


  }

  filterOptionSelected(index,filterOptionIndex,event){


    this.filterOptionCheckedIndex= filterOptionIndex;
    this.parentIndex= index;
    const category= this.filters.allFilters[index]['filterName']
    const filterValue= event.target.value
    const filterChecked=event.target.checked


    this.filters.allFilters[index].filterChecked[filterOptionIndex]=filterChecked



    this.filtersListService.setFiltersList(this.filters);



    this.filterValues.push(filterValue)
    this.spinner.showSpinner();
    if(filterChecked==true){
      const obj= {}
      obj[filterValue]=[]



      this.cocktailList.push(obj)

      this.filtersListService.getListForFilters(category,filterValue).subscribe(res=>{
        this.spinner.hideSpinner();
        for(let i=0;i<this.cocktailList.length;i++){
          if(filterValue==Object.keys(this.cocktailList[i])[0]){
            this.cocktailList[i][filterValue].push(res['drinks'])
          }
        }

      })
    }
    else if(filterChecked==false){

      for(let i=0;i<this.cocktailList.length;i++){
        if(filterValue==Object.keys(this.cocktailList[i])[0]){
          this.cocktailList.splice(i,1);
          this.spinner.hideSpinner();

        }
      }
    }



    this.filtersListService.getCocktailsList(this.cocktailList);




  }


}
