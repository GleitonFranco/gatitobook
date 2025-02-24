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
    const token = this.tokenService.retornaToken();
    const headers = new HttpHeaders().append('x-access-token', token);
    // return this.http.post<boolean>(`${API}/photos/${id}/like`, {headers});

    return this.http.post(
      `${API}/photos/${id}/like`,
      {headers},
      {observe: 'response'}
    ).pipe(
        mapTo(true),
        catchError((erro) => {
        return erro.status === NOT_MODIFIED ? of(false) : throwError(erro);
      }));
  }

  upload(descricao: string, permiteComentario: boolean, arquivo: File): Observable<any> {
    const formData = new FormData();
    formData.append('description', descricao);
    formData.append('allowComments', permiteComentario ? 'true' : 'false');
    formData.append('imageFile', arquivo);

    return this.http.post<any>(`${API}/photos/upload`, formData, {
      observe: 'events',
      reportProgress: true
    });

  }

}
