import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CocktailDetailComponent } from './components/cocktail-detail/cocktail-detail.component';
import { LandingComponent } from './components/landing/landing.component';


const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'cocktail/:id',
    component: CocktailDetailComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
