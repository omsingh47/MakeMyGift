import React, { useEffect , useState } from "react"; //useContext is used to call global props we defined in context API in notes folder...
// import { FontAwesomeIcon } from 'react-fontawesome'
import Productitem from "./Productitem";
import { Link, useNavigate } from "react-router-dom";
import './product.css'
const ProductHome = (props) => {
  const notesInitial = [];
  const [product, setProduct] = useState(notesInitial);

  const host = "http://localhost:5000";
  let navigate = useNavigate();

  const getProduct = async () => {
    //API CALL
    const response = await fetch(`${host}/api/product`, {
      method: "GET",
    });
    const json = await response.json();
    setProduct(json);
  };

  const handlelogout = () => {
    localStorage.removeItem("token");
    navigate("/login")
  }

  console.log(product);


  useEffect(() => {
    if (localStorage.getItem('token')) {
      getProduct();
    }
    else {
      navigate('/login')
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <header>
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <a
            href="/"
            className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
          >
            <svg
              className="bi me-2"
              width="150"
              height="30"
              role="img"
              aria-label="Bootstrap"
            >

            </svg>
            <img className="bi me-2" width={150} height={30} role="img" aria-label="Bootstrap" src={require("./images/logo2.png")} alt="" />
          </a>

          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0"></ul>

          <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
            <input
              type="search"
              className="form-control"
              placeholder="Search..."
              aria-label="Search"
            />
          </form>

          <div className="text-end">
            {/* <!-- icons --> */}
            <ul className="icons nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li>
                <Link to="#" className="nav-link px-2 link-secondary">
                  <img src={require("./images/heart.png")} alt="" />
                </Link>
              </li>
              <li>
                <Link to="#" className="nav-link px-2 link-body-emphasis">
                  <img src={require("./images/bell.png")} alt="" />
                </Link>
              </li>
              <li>
                <Link to="#" className="nav-link px-2 link-body-emphasis">
                  <img src={require("./images/bag.png")} alt="" />
                </Link>
              </li>
              <li>
                <Link to="#" className="nav-link px-2 link-body-emphasis">
                  <img src={require("./images/person-circle.png")} alt="" />
                </Link>
              </li>
              <li>
                <Link to="#" className="nav-link px-2 link-body-emphasis">
                  <i className="fas fa-sign-out-alt" style={{ color: "black", fontSize: "24px" }} onClick={handlelogout}></i>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </header>

      <div>
        {product.length === 0 && (
          <div className="text-center">
            <h1 className="display-6">No product to display...</h1>
            <img
              src="https://i.ibb.co/vcJNznz/No-results-found-illustration-generated.jpg"
              alt="No Results Found
                    "
              className="shp"
              width={500}
              height={250}
            ></img>
          </div>
        )}
        <div className="container">
          <div className="row">
            {product.map((product) => {
              return (
                <div className="col-md-3" id="product_item" key={product._id}>
                  <Productitem products={product}/>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <footer className="d-flex flex-wrap justify-content-between align-items-center border-top" style={{ position: "fixed",width: "100vw", bottom: "0px", height: "10vh"}}>
        <div className="col-md-4 d-flex align-items-center">
          <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"><svg className="bi me-2"
            width="80" height="30" role="img" aria-label="Bootstrap"><img src={require("./images/logo.png")} alt="" /></svg></a>

          <span className="footer-copyright mb-3 mb-md-0 text-body-secondary">© 2023 MakeMyGift, Inc</span>
        </div>

        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li className="ms-3"><Link className="text-body" to="#"><i className="fa-brands fa-square-x-twitter" style={{ fontSize: "30px" }}></i></Link></li>
          <li className="ms-3"><Link className="text-body" to="#"><i className="fa-brands fa-square-instagram" style={{ fontSize: "30px" }}></i></Link></li>
          <li className="ms-3"><Link className="text-body" to="#"><i className="fa-brands fa-facebook" style={{ fontSize: "30px" }}></i></Link></li>
        </ul>
      </footer>
    </>
  );
};
export default ProductHome;
