import { Component, OnInit } from '@angular/core';
import {UsuarioService} from "../../autenticacao/usuario/usuario.service";
import {AnimaisService} from "../animais.service";
import {Animais} from "../animais";
import {switchMap} from "rxjs/operators";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-lista-animais',
  templateUrl: './lista-animais.component.html',
  styleUrls: ['./lista-animais.component.css']
})
export class ListaAnimaisComponent implements OnInit {
  // animais!: Animais;
  animais$!: Observable<Animais>;
  // animais!: Animais;

  constructor(private usuarioService: UsuarioService,
              private  animaisService: AnimaisService,
              private activatedRout: ActivatedRoute) { }

  ngOnInit(): void {
    // this.usuarioService.retornaUsuario().subscribe((usuario) => {
    //   const nomeUsuario = usuario.name ?? '';
    //   this.animaisService.listaDoUsuario(nomeUsuario).subscribe((aa) => {
    //     this.animais = aa;
    //   });
    // });

    // usando RXJS
    this.animais$ = this.usuarioService.retornaUsuario().pipe(
      switchMap((usuario) => {
        const userName = usuario.name ?? '';
        return this.animaisService.listaDoUsuario(userName);
      })
    );

    // voltando para animais obtido pelo resolver
    // this.activatedRout.params.subscribe(params => {
    //   this.animais = this.activatedRout.snapshot.data['animais'];
    // });


  }

}
