import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Modal from './Modal';

const Productitem = (props) => {
    const { products } = props;
    const navigate = useNavigate();
    const [stop, setStop] = useState(false);
    const [customText, setCustomText] = useState("");
    const [image, setImage] = useState([])
    const [isModalOpen, setisModalOpen] = useState(false)
    // const [quantity, setQuantity] = useState(1); // State for quantity

    const openModal = () => {
        localStorage.setItem("product_obj", JSON.stringify(products))
        setisModalOpen(true)
    }

    const handleCardClick = async () => {
        if (!stop) {
            localStorage.setItem("productId", products.product_id);
            navigate("/productpage")
        }
    };

    // const incrementQuantity = () => {
    //     setQuantity(quantity + 1);
    // };

    // const decrementQuantity = () => {
    //     if (quantity > 1) {
    //         setQuantity(quantity - 1);
    //     }
    // }  

    return (
        <>
            {/* Modal */}
            <Modal stop={stop} setStop={setStop} products={products} isModalOpen={isModalOpen} setisModalOpen={setisModalOpen} image={image} setImage={setImage} customText={customText} setCustomText={setCustomText} />

            <div className="card" >
                <div className="inner-card" onClick={handleCardClick} > <img src="https://i.imgur.com/4qXhMAM.jpg" alt='' className="img-fluid rounded" />
                    <div className="d-flex justify-content-between align-items-center mt-3">
                        <h4>{products.title} </h4>
                    </div>
                    By<small>{products.shop}</small>
                    <p><b>Price: &#x20B9;{products.price}</b></p>
                </div>
                {/* <div className="px-2">
                    <div>
                        Qty:
                        <button className='mx-2' style={{
                            backgroundColor: 'rgb(251, 153, 2)',
                            border: '1px solid black',
                            color: "white",
                            padding: '4px 13px',
                            borderRadius: '20px',
                            cursor: 'pointer',
                        }} onClick={decrementQuantity}>-</button>
                        <input style={{
                            width: '40px',
                            textAlign: 'center',
                            padding: "3px 0", border: "1px solid rgb(251, 153, 2)"
                        }}
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            min="1"
                            max="10"
                        />
                        <button className='mx-2' style={{
                            backgroundColor: 'rgb(251, 153, 2)',
                            border: '1px solid black',
                            color: "white",
                            padding: '4px 12px',
                            borderRadius: '20px',
                            cursor: 'pointer',
                        }} onClick={incrementQuantity}>+</button>
                    </div>

                </div> */}
                
                <button onClick={openModal} className="btn btn-dark btn-add my-2" style={{ "width": "253px" }}>Add to cart</button>
                {/* </div> */}
            </div>
        </>
    );
}

export default Productitem;
