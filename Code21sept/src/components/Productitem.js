import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Productitem = (props) => {
    const { notes } = props;
    const navigate = useNavigate();
    const [stop, setStop] = useState(false);

    const handleCardClick = async () => {
        if (!stop) {
            localStorage.setItem("productId", notes._id);
            navigate("/productpage")
        }
    };

    const addCart = async () => {
        setStop(true); // Set the flag to stop propagation
        try {
            const qty = document.getElementById('quantitySelect').value;
            console.log(qty);
            const host = "http://localhost:5000";
            //API CALL
            const bodyObj = {
                "title": notes.title,
                "shop": notes.shop_tag,
                "price": notes.price,
                "user": 560,
                "quantity": qty || 1, // Use selected quantity or default to 1
            }


            const response = await fetch(`${host}/api/cart`, {
                method: 'POST',
                body: JSON.stringify(bodyObj),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const json = await response.json();
            console.log(json);
        }
        catch (error) {
            console.error("Error fetching product details:", error);
        }
    }

    return (
        <div className='my-4 mx-5' style={{ cursor: 'pointer' }}>
            <div className="card" onClick={handleCardClick}>
                <img src="https://i.ibb.co/7tYPjkZ/pexels-veeterzy-303383.jpg" className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{notes.title}</h5>
                    <p className="card-text">{notes.description}</p>
                    <p className="card-text"><small className="text-muted">By {notes.shop_tag}</small></p>
                </div>
            </div>
            <div style={{ marginTop: "10px" }}>
                <label htmlFor="quantitySelect">Quantity:</label>
                <select id="quantitySelect" style={{ display: "inline", marginLeft: "3px", width: "10%" }} className="form-control">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <div style={{ textAlign: "center", display: "initial", marginTop: "5px", marginLeft: "100px"}}>
                <button type="button" style={{ textAlign: "center" }} className="btn btn-warning" onClick={addCart}>Add to Cart</button>
            </div>
        </div>
        </div >
    );
}

export default Productitem;
