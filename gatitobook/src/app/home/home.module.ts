import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home.component';
import {LoginComponent} from './login/login.component';
import {FormsModule} from '@angular/forms';
import {NovoUsuarioComponent} from './novo-usuario/novo-usuario.component';
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [HomeComponent, LoginComponent, NovoUsuarioComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    SharedModule
  ],
  exports: [HomeComponent],
})
export class HomeModule {}
