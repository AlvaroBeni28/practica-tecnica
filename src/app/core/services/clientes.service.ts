import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '../models/clientes.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private apiUrl = 'https://api.totalum.app/api/v1/crud/cliente';
  private headers = new HttpHeaders({
    'api-key': 'sk-eyJrZXkiOiI5MjZlY2MxNmU2M2U4MWJhNzcwMTJmYWMiLCJuYW1lIjoiRGVmYXVsdCBBUEkgS2V5IGF1dG9nZW5lcmF0ZWQga3JzcyIsIm9yZ2FuaXphdGlvbklkIjoiYWx2YXJvLXBydWViYS10ZWNuaWNhIn0_',
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) {}

  getItems() {
    return this.http.get<{ data: Cliente[] }>(
      `${this.apiUrl}?sort[createdAt]=1&pagination[page]=0&pagination[limit]=50`,
      { headers: this.headers }
    );
  }

  crearCliente(cliente: any) {
  
    return this.http.post(this.apiUrl, cliente, 
      { headers: this.headers }
  );
  }
}
