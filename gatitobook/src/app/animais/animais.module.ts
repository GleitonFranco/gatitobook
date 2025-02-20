import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnimaisRoutingModule } from './animais-routing.module';
import { ListaAnimaisComponent } from './lista-animais/lista-animais.component';
import {MensagemModule} from "../componentes/mensagem/mensagem.module";
import { AnimalComponent } from './animal/animal.component';
import {CartaoModule} from "../componentes/cartao/cartao.module";


@NgModule({
  declarations: [ListaAnimaisComponent, AnimalComponent],
  imports: [
    CommonModule,
    AnimaisRoutingModule,
    MensagemModule,
    CartaoModule
  ]
})
export class AnimaisModule { }
