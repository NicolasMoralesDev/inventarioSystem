import { errorPop } from "../../components/messages/alerts";
import useAxiosConf from "../util/fetch.hook";

const urlBase = "http://localhost:9002/api/v1/product"

/**
 * Obtiene todos los productos.
 * @returns Devuelve un listado de productos.
 */
export const obtenerProductos = async () => {
     try {
          const request = await useAxiosConf.get(`${urlBase}/getAll`)
          return request;
     } catch (error) {
          errorPop("error al intentar conectarse con el servidor.");
     }
}

/**
 * Realiza Borrado multiple de productos.
 * @returns Devuelve un listado de productos.
 */
export const borradoMultipleProductos = async (productosIds) => {
     try {
       const request = await useAxiosConf.post(`${urlBase}/delete/bulk`, productosIds)
       return request;   
     } catch (error) {
          errorPop("error al intentar conectarse con el servidor.");
     } 
}