import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingpageComponent } from './pages/landingpage/landingpage.component';
import { BiddingComponent } from './components/bidding/bidding.component';
import { AllpostsComponent } from './components/allposts/allposts.component';



const routes: Routes = [
  { path: '', component: LandingpageComponent },
  { path: 'bid', component: BiddingComponent },
  { path: 'posts', component: AllpostsComponent },
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

 }
