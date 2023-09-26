import React, { useEffect, useState } from 'react' //useContext is used to call global props we defined in context API in notes folder... 
import Productitem from './Productitem'


const Notes = (props) => {
    const notesInitial = []
    const [product, setProduct] = useState(notesInitial)
    const host = "http://localhost:5000"
    const getProduct = async () => {
        //API CALL
        const response = await fetch(`${host}/api/product`, {
            method: 'GET'
        });
        const json = await response.json();
        setProduct(json);
    }

    console.log(product)

    


    useEffect(() => {
        getProduct();
        // eslint-disable-next-line 
    }, [])

    return (
        <div>
            <h2>Your Products</h2>
            {product.length === 0 && <div className="text-center">
                <h1 className="display-6">No product to display...</h1>
                <img src="https://i.ibb.co/vcJNznz/No-results-found-illustration-generated.jpg" alt='No Results Found
                    ' className="shp" width={500} height={250}></img>
            </div>}
            <div className="container">
                <div className="row">
                    {
                        product.map((note) => {
                            return (
                                <div className="col-md-4" id='product_item' key={note._id}>
                                    <Productitem notes={note} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
export default Notes