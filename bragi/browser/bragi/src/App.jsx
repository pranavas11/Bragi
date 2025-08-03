import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/header';
import Intro from './components/Intro/intro';
import Bragi from './components/Bragi/bragi';
import Footer from './components/Footer/footer';
import Contact from './components/Contact/contact';
import './App.css';

function App() {
  return (
    <div className='App'>
      <div className='container'>
        <Header />
        <Routes>
          <Route path="/" element={<><Intro /><Bragi /></>} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        {/* <Intro />
        <Bragi /> */}
        <Footer />
      </div>
    </div>
  )
}

export default App;
