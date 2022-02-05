import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import GridProduct from "./components/body/products/GridProduct";
import CheckoutPage from "./components/body/checkout/CheckoutPage";
import React from "react";
import { StateProvider } from "./components/context/StateProvider";
import reducer, { initialState } from "./components/context/reducer";
import { Search } from "./components/body/search/Search";

function App() {
  return (
    <div className="App">
      <React.StrictMode>
        <StateProvider initialState={initialState} reducer={reducer}>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<GridProduct />} />
              <Route path="/CheckoutPage" element={<CheckoutPage />} />
              <Route path="/Buscador" element={<Search />} />
            </Routes>
          </Router>
        </StateProvider>
      </React.StrictMode>
    </div>
  );
}

export default App;
