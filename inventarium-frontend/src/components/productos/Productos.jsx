
import { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import { borradoMultipleProductos, editarProducto, obtenerProductos } from "../../Hooks/fetch/Productos.hook"
import TablaProductos from "./TablaProductos"
import { errorPop, loadingPop, successPop } from "../../Hooks/util/messages/alerts"
import { obtenerCategorias } from "../../Hooks/fetch/Categorias.hook"
import useForm  from "antd/lib/form/hooks/useForm"
import ModalEdit from "./ModalEdit"
import { obtenerSubCategorias } from "../../Hooks/fetch/SubCategorias.hook"

const Productos = () => {

  const [form] = useForm()
  const [productos, setProductos] = useState([])
  const [productoEdit, setProductoEdit] = useState([])
  const [visibleEdit, setVisibleEdit] = useState(false)
  const [categorias, setCategorias] = useState([])
  const [subCategorias, setSubCategorias] = useState([])
  const [statusBorrado, setStatusBorrado] = useState("")
  const [statusEdit, setStatusEdit] = useState("")

  const onFetch = async () => {
    const resProdu = await obtenerProductos()
    const resCate = await obtenerCategorias()
    const resSubCate = await obtenerSubCategorias()
    setSubCategorias(resSubCate.data)
    setCategorias(resCate.data)
    setProductos(resProdu.data)
  }

  const onBorrado = async (productosIds) => {
   const request = await borradoMultipleProductos(productosIds)
   setStatusBorrado({error: request.error, msg: request.data.msg, status: request.status})
  }

  const onEdit = async (productoEdit) => {
    const request = await editarProducto(productoEdit)
    setStatusEdit(request.data.msg)
  }

  useEffect(() => {
    if (statusBorrado.error) {
      errorPop(statusBorrado.status)
    } else if (statusBorrado.status == 200) {
      successPop(statusBorrado.msg)
      onFetch()
    } 
  }, [ statusBorrado ])

  useEffect(() => { onFetch() }, [])
/*   useEffect(() => { editarProducto ? loadingPop("Editando Producto...") : ""}, [editarProducto]) */
  useEffect(() => { if (statusEdit) { successPop(statusEdit),  onFetch(), setVisibleEdit(false) } }, [statusEdit])
  useEffect(() => { statusBorrado ? loadingPop("Borrando Productos...")  : "" }, [ statusBorrado ])
  useEffect(() => { productos.length < 1 || statusBorrado || statusEdit ? loadingPop("Obteniendo Productos...") : "" }, [ productos ])

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Listado Productos</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      {
        visibleEdit &&
        <ModalEdit 
         form={ form }
         categorias={ categorias }
         subCategorias={ subCategorias }
         productoEdit={ productoEdit }
         visible={ visibleEdit }
         setVisible={ setVisibleEdit }
         onEdit={ onEdit }
        />
      }
      <TablaProductos
        setVisibleEdit={ setVisibleEdit }
        setProductoEdit={ setProductoEdit }
        categorias={ categorias }
        dataSourse={ productos }
        onBorrado={ onBorrado }
      />
    </>
  )
}

export default Productos