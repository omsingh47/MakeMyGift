import ProductContext from "./ProductContext";
import { useState } from 'react'
const ProductState = (props) => {
  const host = "http://localhost:5000"
  const productInitial = []

  const [product, setProduct] = useState(productInitial);

  //Get all Note
  const getProduct = async () => {
    //API CALL
    const response = await fetch(`${host}/api/product`, {
      method: 'GET'
    });
    const json = await response.json();
    console.log("om")
    setProduct(json)
  }


  return (
    <ProductContext.Provider value={{product, getProduct}}>
      {props.children}
    </ProductContext.Provider>
  )
}

export default ProductState;