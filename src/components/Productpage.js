import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import "./product2.css"
// import { v2 as cloudinary } from 'cloudinary'

function Productpage() {
    const [productDetails, setProductDetails] = useState([]);
    const [text, setText] = useState("");
    const [imageurl, setImageUrl] = useState("");
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

    const addCart = async () => {
        try {
            const host = "http://localhost:5000";
            const user = localStorage.getItem("email")
            //API CALL
            console.log(imageurl);
            const bodyObj = {
                "title": productDetails.title,
                "product_id": productDetails.product_id,
                "shop_tag": productDetails.shop_tag,
                "price": productDetails.price,
                "images": productDetails.images,
                "cust_text": text,
                "cust_images": imageurl,
                "user": user,
            }
            console.log(bodyObj);
            const response = await fetch(`${host}/api/cart`, {
                method: 'POST',
                body: JSON.stringify(bodyObj),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setText("")
            setImageUrl("")
            const json = await response.json();
            console.log(json);
        }
        catch (error) {
            console.error("Error fetching product details:", error);
        }
    }
    useEffect(() => {
        getProduct();
        const fileInput = document.getElementById('file');
        let uploadAttempts = 0;

        if (fileInput) {
            fileInput.addEventListener('change', async (e) => {
                const selectedFile = e.target.files[0];

                if (selectedFile) {
                    const { name: fileName, size } = selectedFile;
                    const fileSizeKB = (size / 1024).toFixed(2);
                    const fileNameAndSize = `${fileName} - ${fileSizeKB}KB`;
                    document.querySelector('.file-name').textContent = fileNameAndSize;
                    const data = new FormData();
                    data.append("file", selectedFile);
                    data.append("upload_preset", "myCloud");
                    data.append("cloud_name", "dwatpmsmy");

                    const uploadFile = async () => {
                        try {
                            const res = await fetch('https://api.cloudinary.com/v1_1/dwatpmsmy/image/upload', {
                                method: 'POST',
                                body: data
                            });
                            const cloudData = await res.json();
                            setImageUrl(cloudData.url);
                            // console.log("Cloudinary URL:", cloudData.url);
                            window.alert("Successfully Upload");
                        } catch (e) {
                            window.alert("Failed Upload Attempt... Trying Again...", uploadAttempts + 1);
                            uploadAttempts++;

                            if (uploadAttempts >= 2) {
                                window.alert("Upload Failed Twice");
                            } else {
                                // Retry the upload (you can add a delay if needed)
                                uploadFile();
                            }
                        }
                    };
                    uploadFile(); // Initial upload attempt
                }
            });
        }
    }, [imageurl]);

    return (
        <>
            <header>
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <Link to="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                        <img className="bi me-2" width={150} height={30} role="img" aria-label="Bootstrap" src={require('./images/logo2.png')} alt="" />
                    </Link>
                    <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                    </ul>
                    <div className="text-end">
                        {/* <!-- icons --> */}
                        <ul className="icons nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                            <li><Link to="#" className="nav-link px-2 link-secondary"><img src={require("./images/heart.png")} alt="" /></Link></li>
                            <li><Link to="#" className="nav-link px-2 link-body-emphasis"><img src={require("./images/bell.png")} alt="" /></Link></li>
                            <li><Link to="#" className="nav-link px-2 link-body-emphasis"><img alt='' src={require("./images/bag.png")} /></Link></li>
                            <li><Link to="#" className="nav-link px-2 link-body-emphasis"><img alt='' src={require("./images/person-circle.png")} /></Link></li>
                        </ul>
                        {/* <!-- icons end --> */}
                    </div>
                </div>
            </header>
            <div className="container mt-5 mb-5">
                <div className="">
                    <div className="row g-0">
                        {/* <!--left side--> */}
                        <div className="col-lg-6" id="left">
                            <div className="d-flex flex-column justify-content-center">
                                <div className="container-image-wishlist">
                                    <div className="main_image">
                                        <img alt='' src="https://i.imgur.com/4qXhMAM.jpg" id="main_product_image" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!--right side--> */}
                        <div className="col-lg-6" id="right">
                            <div className="p-3 right-side">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h3>{productDetails.title}</h3>
                                </div>
                                <div className="mt-2 pr-3 content">
                                    <p>{productDetails.description}</p>
                                </div>
                                <h3>{productDetails.price}</h3>
                                <div className="mt-2 pr-3 content">
                                    <p>Let the artist know your specific customizations</p>
                                </div>
                            </div>
                            {/* <!--comment box--> */}
                            <div>
                                <textarea rows="4" cols="65" value={text} onChange={(e) => setText(e.target.value)} style={{ backgroundColor: "white", color: "black" }}></textarea>
                            </div>
                            {/* <!--file input --> */}
                            <div className="file-input">
                                <input type="file" id="file" className="file" />
                                <label htmlFor="file">
                                    <i className="fa-solid fa-upload fa-bounce"></i>
                                    Upload reference image
                                    <p className="file-name" style={{ position: "absolute", bottom: "-45px", left: "20px", fontSize: "16px" }}></p>
                                </label>
                            </div>
                            <div className="buttons d-flex flex-row mt-5 gap-3">
                                <button className="btn btn-buy">Buy Now</button>
                                <button className="btn btn-add" onClick={addCart}>Add to cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 border-top">
                <div className="col-md-4 d-flex align-items-center">
                    <Link to="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"><svg className="bi me-2" width="80" height="30" role="img" aria-label="Bootstrap"><img alt='' src={require("./images/logo2.png")} /></svg></Link>
                    <span className="footer-copyright mb-3 mb-md-0 text-body-secondary">© 2023 MakeMyGift, Inc</span>
                </div>
                <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
                    <li className="ms-3"><Link className="text-body" to="#"><i className="fa-brands fa-square-x-twitter" style={{ fontSize: "30px" }}></i></Link></li>
                    <li className="ms-3"><Link className="text-body" to="#"><i className="fa-brands fa-square-instagram" style={{ fontSize: "30px" }}></i></Link></li>
                    <li className="ms-3"><Link className="text-body" to="#"><i className="fa-brands fa-facebook" style={{ fontSize: "30px" }}></i></Link></li>
                </ul>
            </footer>
        </>
    )
};
export default Productpage