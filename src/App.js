import "./App.css";
import NavBar from "./components/Navbar/Navbar";
import PagesData from "./PagesData";
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import React from "react";
function App() {

  function createRouteByRol(pageId) {
    const page = PagesData.find(page => page.id === pageId)
    return <Route path={page.path} element={page.component} />
  }

  return (
    <div >
      <BrowserRouter>
        <div className="page-container">
          <NavBar/>
          <Routes >
            {createRouteByRol('ejercicio1')}
            {createRouteByRol('ejercicio2')}
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
