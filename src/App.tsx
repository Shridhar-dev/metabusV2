import { useEffect, useState } from 'react'
import { Routes, Route, Link } from "react-router-dom";
import './App.css'
//@ts-ignore
import Home from './pages';
//@ts-ignore
import Auth from './pages/auth';
//@ts-ignore
import Tracking from './pages/tracking';
//@ts-ignore
import BusRoute from './pages/busRoute';

function App() {
 
  
  return (
   
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth/>} />
        <Route path="/tracking" element={<Tracking/>} />
        <Route path="/bus/:id" element={<BusRoute />} />
      </Routes>
    
  )
}

export default App
