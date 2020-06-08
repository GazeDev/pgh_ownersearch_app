import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// NOTE: we can't programmatically build the Routes array this way because the
// AOT compiler isn't recognizing it. We can update/run this in a console to
// generate the Routes array and then paste it in below.
/*
let pageModules = [
  'home',
];

let pageRoutes = [];
for (let mod of pageModules) {
  let modClass = mod.split('-')
    .map(part => part[0].toUpperCase() + part.slice(1)).join('');
  pageRoutes.push({
    path: '',
    loadChildren: `_pages/${mod}/${mod}.module#${modClass}PageModule`
  });
}
*/


let routes: Routes = [
  {
    "path": "",
    "loadChildren": "_pages/home/home.module#HomePageModule"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {
      enableTracing: false, // <-- debugging purposes only
    }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
