import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AutenticacaoInterceptor} from "./autenticacao.interceptor";



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: AutenticacaoInterceptor,
      multi: true
    }
  ]
})
export class AutenticacaoModule { }
