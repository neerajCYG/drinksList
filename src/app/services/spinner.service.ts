import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  spinCount=0
  constructor(private spinner:NgxSpinnerService) {  }
  showSpinner() {
    this.spinCount=this.spinCount+1
    this.spinner.show();
  }
  hideSpinner(){
    this.spinCount= this.spinCount-1
    if(this.spinCount<=0){
      this.spinner.hide();
      this.spinCount=0
    }
  }
}


