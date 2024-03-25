import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MainComponent } from './components/main/main.component';
import { FooterComponent } from './components/footer/footer.component';
import { LandingpageComponent } from './pages/landingpage/landingpage.component';
import { AllpostsComponent } from './components/allposts/allposts.component';
import { AddpostComponent } from './components/addpost/addpost.component';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BiddingComponent } from './components/bidding/bidding.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MainComponent,
    FooterComponent,
    LandingpageComponent,
    AllpostsComponent,
    AddpostComponent,
    SignupComponent,
    LoginComponent,
    BiddingComponent,
   
  
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
   
  ],
  providers: [
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule {


  
 }
