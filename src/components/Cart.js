import React from 'react'
import {Link} from 'react-router-dom'
import "./Cart.css"

function Cart() {
    const handleChange = () =>{

    }
  return (
    <div>
    <header>
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <div className="logo"><Link to="#" className="d-flex align-items-center text-white text-decoration-none"><svg  width="20" height="20" role="img"><img src={require("./images/logo2.png")} alt=''/></svg></Link></div>
        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0"></ul>

        <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
          <input type="search" className="form-control" placeholder="Search..." aria-label="Search"/>
        </form>

        <div className="text-end">
          {/* <!-- icons --> */}
            <ul className="icons nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              {/* <!--<li><a href="#" className="nav-link px-2 link-secondary"><img src={require("./images/heart.png" alt="" /></a></li>-->
              <!--<li><a href="#" className="nav-link px-2 link-body-emphasis"><img src={require("./images/bell.png" alt=""></a></li>--> */}
              <li><Link to="#" className="nav-link px-2 link-body-emphasis"><img src={require("./images/bag.png")} alt=''/></Link></li>
             <li>      

                <div className="dropdown">
                <Link to="#" className="nav-link px-2 link-body-emphasis"><img alt='' src={require("./images/person-circle.png")} /></Link>
                </div>
             </li>

            </ul>
            {/* <!-- icons end --> */}
        </div>
      </div>
    </header>
{/* <!--main--> */}



  <main className="page">
    <section className="shopping-cart dark">
      <div className="container">
            <div className="block-heading">
              <h2>Shopping Cart</h2>
            </div>
            <div className="content">
          <div className="row">
            <div className="col-md-12 col-lg-8">
              <div className="items">
                <div className="product">
                  <div className="row">
                    <div className="col-md-3">
                      <img className="img-fluid mx-auto d-block image" src="https://i.imgur.com/4qXhMAM.jpg" alt=''/>
                    </div>
                    <div className="col-md-8">
                      <div className="info">
                        <div className="row">
                          <div className="col-md-5 product-name">
                            <div className="product-name">
                              <Link to="#">Lorem Ipsum dolor</Link>
                              <div className="product-info">
                                <div>Details: <span className="value">Lorem ipsum</span></div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-4 quantity">
                            <label htmlFor="quantity">Quantity:</label>
                            <input id="quantity" type="number" value ="1" onChange={handleChange} className="form-control quantity-input"/>
                          </div>
                          <div className="col-md-3 price">
                            <span>$120</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="product">
                  <div className="row">
                    <div className="col-md-3">
                      <img className="img-fluid mx-auto d-block image" src="https://i.imgur.com/4qXhMAM.jpg" alt=''/>
                    </div>
                    <div className="col-md-8">
                      <div className="info">
                        <div className="row">
                          <div className="col-md-5 product-name">
                            <div className="product-name">
                              <Link to="#">Lorem Ipsum dolor</Link>
                              <div className="product-info">
                                  <div>Details: <span className="value">Lorem ipsum</span></div>

                              </div>
                            </div>
                          </div>
                          <div className="col-md-4 quantity">
                            <label htmlFor="quantity">Quantity:</label>
                            <input id="quantity" type="number" value ="1" onChange={handleChange} className="form-control quantity-input"/>
                          </div>
                          <div className="col-md-3 price">
                            <span>$120</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-4">
              <div className="summary">
                <h3>Summary</h3>
                <div className="summary-item"><span className="text">Subtotal</span><span className="price">$360</span></div>
                <div className="summary-item"><span className="text">Discount</span><span className="price">$0</span></div>
                <div className="summary-item"><span className="text">Shipping</span><span className="price">$0</span></div>
                <div className="summary-item"><span className="text">Total</span><span className="price">$360</span></div>
                <button type="button" className="btn btn-primary btn-lg btn-block" style={{backgroundColor:"rgb(251,153,2)",border: "none", maxWidth: "98%"}}>Place Order</button>
              </div>
            </div>
          </div> 
        </div>
      </div>
    </section>
  </main>

  {/* <!--footer--> */}

    <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 border-top">
      <div className="col-md-4 d-flex align-items-center">
       <Link to="#" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"><svg className="logo" width="20" height="20" role="img"><img src={require("./images/logo.png")} alt=''/></svg></Link>


        <span className="footer-copyright mb-3 mb-md-0 text-body-secondary">© 2023 BharatBespoke, Inc</span>
      </div>

      <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
        <li className="ms-3"><Link className="text-body" to="#"><svg className="bi" width="24" height="24"><img src={require("./images/twitter-x.png")} alt=''/></svg></Link></li>
        <li className="ms-3"><Link className="text-body" to="#"><svg className="bi" width="24" height="24"><img src={require("./images/instagram.png")} alt=''/></svg></Link></li>
        <li className="ms-3"><Link className="text-body" to="#"><svg className="bi" width="24" height="24"><img src={require("./images/facebook.png")} alt=''/></svg></Link></li>
      </ul>
    </footer>
  </div>
  )
}

export default Cart