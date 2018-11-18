import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { ResComponent } from './component/res.component';

import { AppComponent } from './app.component';
import { TestWeb } from './services/test-web.service';
import {APP_BASE_HREF} from '@angular/common';

const appRoutes: Routes = [
  { path: 'TestWeb', component: TestWeb },
  { path: 'AppComponent', component: AppComponent },
  { path: 'tryLogin', component: AppComponent }
];

@NgModule({
  declarations: [
    AppComponent, ResComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpModule, RouterModule.forRoot(appRoutes,{ enableTracing: true })
  ],
  providers: [TestWeb, {provide: APP_BASE_HREF, useValue : '/' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
