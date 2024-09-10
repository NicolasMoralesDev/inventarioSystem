
import React, { useEffect, useState } from 'react'
import { Helmet } from "react-helmet"
import { obtenerCategorias } from "../../Hooks/fetch/Categorias.hook"
import { borradoMultipleProductos, crearProducto, editarProducto, genearReportePDFproductos, obtenerProductoByCodigo, obtenerProductos, useObtenerProductos } from "../../Hooks/fetch/Productos.hook"
import TablaProductos from "./TablaProductos"
import { errorPop, loadingPop, successPop } from "../../Hooks/util/messages/alerts"
import useForm  from "antd/lib/form/hooks/useForm"
import FormBusqueda from "./formBusqueda/FormBusqueda"
import ProductosModal from "./ProductosModal"

const Productos = () => {

  const [form] = useForm()
  const [categorias, setCategorias] = useState([])
  const [productoCode, setProductoCode] = useState([])
  const [productoEdit, setProductoEdit] = useState([])
  const [visibleAdd, setVisibleAdd] = useState(false)
  const [visibleEdit, setVisibleEdit] = useState(false)

  const [productos, error, loading, trigger] = useObtenerProductos()
  console.log(loading);
  
  const [statusBorrado, setStatusBorrado] = useState("")
  const [statusAdd, setStatusAdd] = useState("")
  const [statusEdit, setStatusEdit] = useState("")

  const [borrando, setBorrando] = useState(false)
  const [add, setAdd] = useState(false)
  const [editando, setEditando] = useState(false)

  const onFetch = async () => {

     const resCate = await obtenerCategorias()
     setCategorias(resCate?.data)
  }

  const onGetByCode = async (code) => {
     const request = await obtenerProductoByCodigo(code)
     setProductoCode( request?.data ? [request?.data] : [])
  }

  const onBorrado = async (productosIds) => {
     const request = await borradoMultipleProductos(productosIds)
     setStatusBorrado({error: request.error, msg: request.data.msg, status: request.status})
  }

  const onGeneratePdf = async (productosIds) => {
     await genearReportePDFproductos(productosIds)
  }

  const onEdit = async (productoEdit) => {
     setEditando(true)
     const request = await editarProducto(productoEdit)
     setStatusEdit(request?.data.msg)
  }

  const onAdd = async (productoAdd) => {
     const request = await crearProducto(productoAdd)
     setStatusAdd(request?.data.msg)
  }

  useEffect(() => {
    if (statusBorrado.error) {
      errorPop(statusBorrado.status)
    } else if (statusBorrado.status == 200) {
      successPop(statusBorrado.msg)
      onFetch()
    } 
  }, [ statusBorrado ])

  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  useEffect(() => { onFetch(),   trigger(), loadingPop("Obteniendo Productos...", "productosLoad") }, [loading])
  useEffect(() => { 
    if (statusEdit) { 
      successPop(statusEdit, "statusEdit")
      onFetch()
      setVisibleEdit(false)
      setEditando(false)
    } }, [statusEdit])

  useEffect(() => { if (statusAdd) { successPop(statusAdd, "statusAdd"),  onFetch(), setVisibleAdd(false) } }, [statusAdd])
  useEffect(() => { if (statusBorrado) { loadingPop("Borrando Productos...", "borrando") } }, [ statusBorrado ])
  
    useEffect(() => { 
    if (statusBorrado || statusEdit || statusAdd) { 
      loadingPop("Obteniendo Productos...", "productosLoad") 
      setStatusAdd("")
      setBorrando(false)
      setStatusEdit("")
  } }, [ productos ])


  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Listado de productos</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <FormBusqueda
         onGetByCode={ onGetByCode }
      />
      {
        visibleEdit &&
        <ProductosModal 
         form={ form }
         categorias={ categorias }
         productoEdit={ productoEdit }
         visible={ visibleEdit }
         setVisible={ setVisibleEdit }
         onSend={ onEdit }
         edit={ true }
        />
      }
      {
        visibleAdd &&
        <ProductosModal 
         form={ form }
         categorias={ categorias }
         productoEdit={ productoEdit }
         visible={ visibleAdd }
         setVisible={ setVisibleAdd }
         onSend={ onAdd }
         edit={ false }
        />
      }
      <TablaProductos
        setVisibleAdd={ setVisibleAdd }
        setVisibleEdit={ setVisibleEdit }
        setProductoEdit={ setProductoEdit }
        categorias={ categorias }
        dataSourse={ Object.keys(productoCode).length != 0 ? productoCode :  productos }
        onBorrado={ onBorrado }
        onGeneratePdf={ onGeneratePdf }
        loading={ loading }
        isList={ true }
      />
    </>
  )
}

export default Productos