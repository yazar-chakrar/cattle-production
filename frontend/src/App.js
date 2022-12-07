import React from 'react';
import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import{ ToastContainer } from 'react-toastify';
import Cows from './components/cows';
import NavBar from './components/navbar';
import Births from './components/births';
import Consults from './components/consultations';
import MilkProds from './components/milkProds';
import NotFound from './components/notFound';
import CowForm from './components/cowForm';
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <React.Fragment>
      <main className="container">
        <ToastContainer />
        <NavBar />
        <Routes>
          <Route path='/new' element={<CowForm/>}/>
          <Route exact path='/cows' element={<Cows/>}/>
          <Route path="/births" element={<Births />}></Route>
          <Route path="/consultations" element={<Consults />}></Route>
          <Route path="/milk-production" element={<MilkProds />}></Route>
          <Route path="/not-found" element={<NotFound />}></Route>
          <Route path="/" element={<Navigate replace to="/cows" />} />
          <Route path="*" element={<Navigate replace to="/not-found" />} />
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
