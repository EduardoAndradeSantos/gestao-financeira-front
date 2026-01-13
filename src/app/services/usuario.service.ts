import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Usuario {
  id: number;
  nome: string;
  cpf: string;
  endereco: string;
  email: string;
  numeroConta: string;
}

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {

  private readonly API_URL = 'http://localhost:8080/usuarios';

  constructor(private http: HttpClient) {}

  listar(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.API_URL);
  }
}
