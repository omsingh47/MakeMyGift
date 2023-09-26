import './App.css';

import React from 'react'
import Product  from './components/Product';
import Productpage  from './components/Productpage';
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () =>{
    return (
      <BrowserRouter>
         <Routes>
         <Route exact path="/" element={<Product/>} />
         <Route exact path="/productpage" element={<Productpage/>} />
         </Routes>
         
      </BrowserRouter>
      
    )
  }

export default App;