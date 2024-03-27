import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NotFoundComponent} from './not-found/not-found.component';
import {RouterModule} from '@angular/router';
import {FooterComponent} from './footer/footer.component';
import {HeaderComponent} from './header/header.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [NotFoundComponent, FooterComponent, HeaderComponent, ContactUsComponent, TermsOfServiceComponent, UserAgreementComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatSlideToggleModule,
    SharedModule,
    FormsModule
  ],
  exports: [NotFoundComponent, FooterComponent, HeaderComponent, ContactUsComponent, TermsOfServiceComponent]
})
export class CoreModule {
}
