// import { response } from 'express'
import React, { useState, useEffect, useRef } from 'react'

function Modal(props) {
    const ref = useRef(null) //useRef Snippet.. Useref is used to make a click at one button when someother btn is actually clicked.. 
    const refClose = useRef(null)
    const [customText, setcustomText] = useState("")
    const [image, setImage] = useState([])
    const handleModalClose = () => {
        props.setisModalOpen(false);
    }

    const addCart = async () => {
        props.setStop(true); // Set the flag to stop propagation
        try {
            const host = "http://localhost:5000";
            const user = localStorage.getItem("email")
            const tempProduct = JSON.parse(localStorage.getItem("product_obj"))

            //API CALL
            const bodyObj = {
                "title": tempProduct.title,
                "product_id": tempProduct.product_id,
                "shop_tag": tempProduct.shop_tag,
                "price": tempProduct.price,
                "images": tempProduct.images,
                "cust_text": customText,
                "cust_image": image,
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
            setcustomText("")
            setImage([])
            localStorage.removeItem("product_obj")
            const json = await response.json();
            console.log(json);
        }
        catch (error) {
            console.error("Error fetching product details:", error);
        }
        props.setStop(false)
        ref.current.click()
    }

    useEffect(() => {
        if (props.isModalOpen === true) {
            props.setisModalOpen(false)
            console.log("hoo");
            ref.current.click();
            console.log(props.products);
        }

        const fileInput = document.getElementById('file');
        if (fileInput) {
            fileInput.addEventListener('change', (e) => {
                // Get the selected file
                const selectedFile = e.target.files[0];
                setImage(selectedFile)
                // Check if a file is selected
                if (selectedFile) {
                    // Get the file name and size
                    const { name: fileName, size } = selectedFile;
                    // Convert size in bytes to kilobytes
                    const fileSizeKB = (size / 1024).toFixed(2);
                    // Set the text content
                    const fileNameAndSize = `${fileName} - ${fileSizeKB}KB`;
                    document.querySelector('.file-name').textContent = fileNameAndSize;
                    // Update a state variable or do something with the data
                    console.log(fileNameAndSize);
                }
            });
        }
        // eslint-disable-next-line
    }, [props.isModalOpen])


    return (
        <>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade super-cool-modal" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header" style={{ flexDirection: "column", justifyContent: "center" }}>
                            <h3 className="modal-title text-center" id="exampleModalLabel">Let the artist know your specific customizations</h3>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="custom-text" className="form-label"></label>
                                    <textarea rows="4" cols="55" value={customText} onChange={(e) => setcustomText(e.target.value)} style={{ backgroundColor: "white", color: "black" }}></textarea>
                                </div>
                                <div className="mb-3" style={{ textAlign: "center", border: "2px solid black", borderRadius: "20px", padding: "10px" }}>
                                    <input type="file" id="file" className="file" />
                                    <label htmlFor="file">
                                        <i className="fa-solid fa-upload fa-bounce"></i>
                                        Upload reference image
                                        <p className="file-name" style={{ position: "absolute", bottom: "-20px", left: "20px", fontSize: "16px" }}></p>
                                    </label>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} onClick={handleModalClose} style={{ color: "white" }} type="button" className="super-advanced-button btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={addCart} type="button" className="super-advanced-button btn" style={{ backgroundColor: "#088aa4", color: "white" }}>Add to cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal