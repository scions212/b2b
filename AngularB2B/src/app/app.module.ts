import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ChatModule } from './chat/chat.module';
import { ReactiveFormsModule} from '@angular/forms';


import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CategoryComponent } from './components/category/category.component';
import { PagenofoundComponent } from './components/pagenofound/pagenofound.component';
import { SinginComponent } from './components/singin/singin.component';
import { SingupComponent } from './components/singup/singup.component';
import { ContactComponent } from './components/contact/contact.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CategoryComponent,
    PagenofoundComponent,
    SinginComponent,
    SingupComponent,
    ContactComponent,
  
  ],
  imports: [ 
            FormsModule,
            BrowserModule, 
            AppRoutingModule ,
            HttpClientModule,
            ChatModule,
            ReactiveFormsModule          
          ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
