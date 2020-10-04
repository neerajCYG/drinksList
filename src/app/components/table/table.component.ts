import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FiltersListService } from 'src/app/services/filters-list.service';
import { SpinnerService } from 'src/app/services/spinner.service';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  sortCategories= ['Name','Id']
alldrinks:any=[]
default:string="Relevance";
details:any;
searched:string="";
items:any=[];

filteredResult:Number=0;
  constructor(private spinner: SpinnerService, private filtersListService:FiltersListService,private router:Router) { }

  ngOnInit(): void {
    this.filtersListService.filtersEvent.subscribe(res=>{
    const allDrinks=[]
     for(let i=0;i<res.length;i++){
     allDrinks.push(res[i][Object.keys(res[i])[0]])
     }
     this.alldrinks=allDrinks
     let filteredItems=0



     setTimeout(() => {
      localStorage.setItem('allDrinks', JSON.stringify(this.alldrinks))

      if(this.alldrinks.length>0){
      this.alldrinks.forEach(item=>{

        item.forEach(items=>{
          filteredItems=filteredItems+items.length;
          this.filteredResult=filteredItems
        })
      })
    }
    else{
      this.filteredResult=0
    }
     }, 900);
    })



  }

  dropdownSelect(dropdDownValue){

    if(dropdDownValue=="Id"){
      this.spinner.showSpinner();
      this.default="Id"
      let newitem=[]
      if(this.alldrinks.length>0){
        this.alldrinks.forEach(item=>{


          newitem.push(item)

          newitem.forEach(item=>{
            item['0'].sort((a, b) => {
              this.spinner.hideSpinner();
              return a.idDrink - b.idDrink
          })

      });
    })
        }
      else{
        this.spinner.hideSpinner();
        alert("Select a filter to get the list first")
      }
      }


    else if(dropdDownValue=="Name"){
      this.spinner.showSpinner();
      this.default="Name"
      let newitem=[]
      if(this.alldrinks.length>0){
      this.alldrinks.forEach(item=>{


        newitem.push(item)
        newitem.forEach(item=>{
          item['0'].sort((a, b) => {

            let fa = a.strDrink.toLowerCase(),
            fb = b.strDrink.toLowerCase();

            if (fa < fb) {
              this.spinner.hideSpinner();
            return -1;
            }
            if (fa > fb) {
              this.spinner.hideSpinner();
            return 1;
            }
            this.spinner.hideSpinner();
            return 0;
        })

    });
  })

      }
      else{
        this.spinner.hideSpinner();
        alert("Select a filter to get the list first")
      }

    }


  }
  getCocktailDetail(id){
    this.router.navigate([`cocktail/${id}`]);
    localStorage.setItem('id',id);
  }

//   assignCopy(){
//     this.alldrinks =  this.items;
//  }
  input(event){
    this.alldrinks= JSON.parse(localStorage.getItem('allDrinks'))

    const items = [...this.alldrinks];


    let searchedVal= event.target.value;

if(searchedVal){

  let newitem=[]
items.forEach(item=>{

    newitem.push(item)

 newitem.forEach(item=>{
  this.items=  item['0'].filter(i=>{

        return  i.strDrink.indexOf(searchedVal) >= 0

      })
});
})

items[0][0]= this.items
for(let i=1;i<items.length;i++){
  items.splice(i,1)
}

this.alldrinks=[...items]
let filteredItems=0
    this.alldrinks.forEach(item=>{

        item.forEach(items=>{
          filteredItems=filteredItems+items.length;
          this.filteredResult=filteredItems
        })
      })

}

else{
  this.alldrinks= JSON.parse(localStorage.getItem('allDrinks'))
  let filteredItems=0
    this.alldrinks.forEach(item=>{

        item.forEach(items=>{
          filteredItems=filteredItems+items.length;
          this.filteredResult=filteredItems
        })
      })
}

  }



}
