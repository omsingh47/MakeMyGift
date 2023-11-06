import './App.css';

import React from 'react'
import ProductHome  from './components/ProductHome';
import Productpage  from './components/Productpage';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './components/Login';
import Cart from './components/Cart';

const App = () =>{
    return (
      <BrowserRouter>
         <Routes>
         <Route exact path="/" element={<ProductHome/>} />
         <Route exact path="/productpage" element={<Productpage/>} />
         <Route exact path="/cart" element={<Cart/>} />
         <Route exact path="/login" element={<Login/>} />
         </Routes>
         
      </BrowserRouter>
      
    )
  }

export default App;