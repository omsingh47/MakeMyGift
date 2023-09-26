import React, { useEffect, useState } from 'react'

function Productpage() {
    const [productDetails, setProductDetails] = useState([]);

    const getProduct = async () => {
        try {
            const id = localStorage.getItem("productId")
            console.log(id)
            const host = "http://localhost:5000";
            //API CALL
            const response = await fetch(`${host}/api/product/${id}`, {
                method: 'GET'
            });
            const json = await response.json();
            // console.log(json)
            setProductDetails(json);
        }
        catch (error) {
            console.error("Error fetching product details:", error);
        }
    }
    console.log(productDetails);

    useEffect(() => {
        getProduct();
        // eslint-disable-next-line 
    }, [])

    return (
        <>
            <div className='my-4 mx-5' style={{ cursor: 'pointer' }}>
            <div className="card">
                <img src="https://i.ibb.co/7tYPjkZ/pexels-veeterzy-303383.jpg" className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{productDetails.title}</h5>
                    <p className="card-text">{productDetails.description}</p>
                    <p className="card-text"><small className="text-muted">By {productDetails.shop_tag}</small></p>
                </div>
            </div>
        </div>
        </>
    )

};





export default Productpage