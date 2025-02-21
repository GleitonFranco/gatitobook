import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CabecalhoModule } from './componentes/cabecalho/cabecalho.module';
import { RodapeModule } from './componentes/rodape/rodape.module';
import { AnimalComponent } from './animnais/animal/animal.component';
import {AutenticacaoModule} from "./autenticacao/autenticacao.module";

@NgModule({
    declarations: [AppComponent, AnimalComponent],
    imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      CabecalhoModule,
      RodapeModule,
      AutenticacaoModule
    ],
    providers: [],
    bootstrap: [AppComponent],
    exports: [
      AnimalComponent
    ]
})
export class AppModule {}
