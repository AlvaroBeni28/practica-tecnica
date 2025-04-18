import { Component, OnInit } from '@angular/core';
import { TableComponent } from "../../shared/table/table.component";
import { ClientesService } from '../../core/services/clientes.service';
import { Cliente } from '../../core/models/clientes.interface';
import { FormsModule } from '@angular/forms';
import { ProductosService } from '../../core/services/productos.service';
import { PedidosService } from '../../core/services/pedidos.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TableComponent, FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
seleccionarTabla(arg0: string) {
throw new Error('Method not implemented.');
}

  rows: any[] = [];
  rowsFiltrados: any[] = [];
  headers: string[] = [];
  headersTexto: { [key: string]: string } = {};
  tituloTabla = '';
  busquedaNombre = '';
  tipoDeMoneda = '€';

  //variables para paginacion
  paginaActual = 1;
  itemsPorPagina = 5;
  totalPaginas = 1;
  rowsPaginados: any[] = [];


  constructor(private clientesService: ClientesService, private productosService: ProductosService, private pedidosService: PedidosService){}

  async ngOnInit() {
    this.getAllClientes();
  
  }

  getAllClientes(){

    this.clientesService.getItems().subscribe({
      next:(response)=>{
        const data = response.data;
        this.rows=data.map(item =>({
          id:item.id,
          nombre:item.nombre,
          fecha_nacimiento: item.fecha_nacimiento,
          email: item.email,
          telefono: item.telefono,
        }))
        this.rowsFiltrados = this.rows; 
        this.tituloTabla = 'Clientes';
        this.headers = ['nombre', 'fecha_nacimiento', 'email', 'telefono'];

        this.headersTexto = {
          nombre:"Nombre",
          fecha_nacimiento: "Fecha de nacimiento",
          email: "Email",
          telefono: "Teléfono",
        };

        //actualizar paginado
        this.paginaActual = 1;
        this.actualizarPaginado();

      },
      error: (err)=>{
        console.error('Error al cargar los datos', err);
      }
    })
  }

  getAllProductos(){

    this.productosService.getItems().subscribe({
      next:(response)=>{
        const data = response.data;
        this.rows=data.map(item =>({
          id:item.id,
          nombre:item.nombre,
          precio: item.precio + this.tipoDeMoneda,
          categoria: item.categoria,
          cantidad: item.cantidad,
        }))
        this.rowsFiltrados = this.rows; 
        this.tituloTabla = 'Productos';
        this.headers = ['nombre', 'precio', 'categoria', 'cantidad'];

        
        this.headersTexto = {
          nombre:"Nombre",
          precio: "Precio",
          categoria: "Categoria",
          cantidad: "Cantidad",
        };

        //actualizar paginado
        this.paginaActual = 1;
        this.actualizarPaginado();

      },
      error: (err)=>{
        console.error('Error al cargar los datos', err);
      }
    })
  }

  getAllPedidos(){

    this.pedidosService.getItems().subscribe({
      next:(response)=>{
        const data = response.data;
        console.log(data)
        this.rows=data.map(item =>({
          id: item.id,
          num_pedido: item.numero_pedido,
          importe: item.importe + this.tipoDeMoneda,
          importe_impuestos: item.importe_impuestos + this.tipoDeMoneda,
          cantidad_productos: item.cantidad_productos,
          fecha: item.fecha,
          nombre_cliente: item.nombre_cliente,

        }))
        this.rowsFiltrados = this.rows; 
        this.tituloTabla = 'Pedidos';
        this.headers = ['num_pedido', 'importe', 'importe_impuestos', 'cantidad_productos','fecha','nombre_cliente'];

        this.headersTexto = {
          num_pedido: 'Número de pedido',
          importe: 'Importe',
          importe_impuestos: 'Importe impuestos',
          cantidad_productos: 'Cantidad de productos',
          fecha: 'Fecha',
          nombre_cliente: 'Nombre del cliente'
        };

        //actualizar paginado
        this.paginaActual = 1;
        this.actualizarPaginado();

      },
      error: (err)=>{
        console.error('Error al cargar los datos', err);
      }
    })
  }

  filtrarPorNombre() {
    const busqueda = this.normalizarTexto(this.busquedaNombre);
  
    this.rowsFiltrados = this.rows.filter(cliente =>
      this.normalizarTexto(cliente.nombre).includes(busqueda)
    );

    this.paginaActual = 1; // 👈 Reset a la primera página al filtrar
    this.actualizarPaginado();
  }
  
  normalizarTexto(texto: string): string {
    return texto
      .toLowerCase()
      .normalize('NFD') // descompone letras con tildes
      .replace(/[\u0300-\u036f]/g, ''); // elimina los signos diacríticos
  }

  //Metodos para paginacion

  actualizarPaginado() {
    const inicio = (this.paginaActual - 1) * this.itemsPorPagina;
    const fin = inicio + this.itemsPorPagina;
    this.rowsPaginados = this.rowsFiltrados.slice(inicio, fin);
    this.totalPaginas = Math.ceil(this.rowsFiltrados.length / this.itemsPorPagina);
  }
  
  paginaAnterior() {
    if (this.paginaActual > 1) {
      this.paginaActual--;
      this.actualizarPaginado();
    }
  }
  
  paginaSiguiente() {
    if (this.paginaActual < this.totalPaginas) {
      this.paginaActual++;
      this.actualizarPaginado();
    }
  }
}
