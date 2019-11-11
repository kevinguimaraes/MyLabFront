import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { CreateAmostraComponent } from './amostra/create-amostra/create-amostra.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    CreateAmostraComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

// @Component({
//   selector: 'some-component',
//   template: '<div></div>',
//   styleUrls: [
//       'http://example.com/external.css',
//       'app/local.css'
//   ], 
//   encapsulation: ViewEncapsulation.None, 
// })
// export class SomeComponent {}
// https://angular.io/guide/component-styles
