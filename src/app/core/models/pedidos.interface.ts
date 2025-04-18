export interface Pedidos{
    id: string,
    numero_pedido: string,
    importe: number,
    importe_impuestos: number,
    cantidad_productos: number,
    fecha: Date,
    nombre_cliente: string,
}