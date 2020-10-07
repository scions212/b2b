import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http'
import { FormsModule } from '@angular/forms';


import { CategoryComponent } from './components/category/category.component';
import { HomeComponent } from './components/home/home.component';
import { SinginComponent } from './components/singin/singin.component';
import { SingupComponent } from './components/singup/singup.component';
import { ContactComponent } from './components/contact/contact.component';
import { PagenofoundComponent } from './components/pagenofound/pagenofound.component';
import { ChatDialogComponent } from './components/chat-dialog/chat-dialog.component'


const appRoutes : Routes=[
  {path:'', component: HomeComponent},
  {path:'chat-dialog', component: ChatDialogComponent},
  {path:'category', component: CategoryComponent},
  {path:'singin', component: SinginComponent},
  {path:'singup', component: SingupComponent},
  {path:'contact', component: ContactComponent},
  {path:'**', component: PagenofoundComponent},
];

@NgModule({
  imports: [BrowserModule,HttpClientModule,FormsModule,RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
