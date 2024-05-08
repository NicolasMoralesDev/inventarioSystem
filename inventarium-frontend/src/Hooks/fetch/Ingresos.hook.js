import { errorPop } from "../../components/messages/alerts";
import useAxiosConf from "../util/fetch.hook";

const urlBase = "http://localhost:9003/api/v1/income"

/**
 * Obtiene todos los registros de ingresos
 * @returns Devuelve un listado de registros de ingresos.
 */
export const obtenerIngresos = async ()  => {

     try {
           const request = await useAxiosConf.get(`${urlBase}/getAll`)
           return request;   
     } catch (error) {
          errorPop("error al intentar conectarse con el servidor.");
     }
}