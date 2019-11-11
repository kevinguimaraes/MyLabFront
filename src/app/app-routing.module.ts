import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateAmostraComponent } from "./amostra/create-amostra/create-amostra.component";


const routes: Routes = [
  {path: "amostra/create", component: CreateAmostraComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
