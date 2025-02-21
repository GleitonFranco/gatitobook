import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of, throwError} from "rxjs";
import {Animais, Animal} from "./animais";
import {TokenService} from "../autenticacao/token.service";
import {catchError, mapTo} from "rxjs/operators";

const API = 'http://localhost:3000';
const NOT_MODIFIED = '304';//alguém dar like 2x

@Injectable({
  providedIn: 'root'
})
export class AnimaisService {

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  listaDoUsuario(nomeUsuario: string): Observable<Animais> {
    // NÃO PRECISA MAIS; AGORA TEM INTERCEPTOR
    // const token = this.tokenService.retornaToken();
    // const headers = new HttpHeaders().append('x-access-token', token);
    // return this.http.get<Animais>(`${API}/${nomeUsuario}/photos`, {headers});
    return this.http.get<Animais>(`${API}/${nomeUsuario}/photos`);
  }

  buscarPorID(id: number): Observable<Animal> {
    // NÃO PRECISA MAIS; AGORA TEM INTERCEPTOR
    // const token = this.tokenService.retornaToken();
    // const headers = new HttpHeaders().append('x-acess-token', token);
    // return this.http.get<Animal>(`${API}/photos/${id}`, {headers});
    return this.http.get<Animal>(`${API}/photos/${id}`);
  }

  excluiAnimal(id: number): Observable<Animal> {
    return this.http.delete<Animal>(`${API}/photos/${id}`);
  }

  curtir(id: number): Observable<boolean> {
    return this.http.post(`${API}/photos/${id}/like`, {observe: 'response'})
      .pipe(
        mapTo(true),
        catchError((erro) => {
        return erro.status === NOT_MODIFIED ? of(false) : throwError(erro);
      }));
  }
}
