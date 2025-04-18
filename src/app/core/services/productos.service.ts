import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Productos } from '../models/productos.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private apiUrl = 'https://api.totalum.app/api/v1/crud/productos';
  private headers = new HttpHeaders({
    'api-key': 'sk-eyJrZXkiOiI5MjZlY2MxNmU2M2U4MWJhNzcwMTJmYWMiLCJuYW1lIjoiRGVmYXVsdCBBUEkgS2V5IGF1dG9nZW5lcmF0ZWQga3JzcyIsIm9yZ2FuaXphdGlvbklkIjoiYWx2YXJvLXBydWViYS10ZWNuaWNhIn0_',
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) {}

  getItems() {
    return this.http.get<{ data: Productos[] }>(
      `${this.apiUrl}?sort[createdAt]=1&pagination[page]=0&pagination[limit]=50`,
      { headers: this.headers }
    );
  }

  crearProducto(producto: any) {
  
    return this.http.post(this.apiUrl, producto, 
      { headers: this.headers }
  );
  }


}
