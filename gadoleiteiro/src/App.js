import React, {Component} from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import { Routes, BrowserRouter, Route, Link } from "react-router-dom";

import ListarGado from "./components/listarGado";

class App extends Component {
  render() {
    return (
        <div className="App">
            <BrowserRouter>
                <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
                    <div className="container">
                        <Link to={"/"} className="navbar-brand">
                            <b><i>Controle Leiteiro</i></b>
                        </Link>
                        <div className="navbar-nav mr-auto">
                            <li className="nav_item">
                                <Link to={"/leituras/add"} className="nav-link">
                                    Adicionar Leitura
                                </Link>
                            </li>
                            <li className="nav_item">
                                <Link to={"/gados/add"} className="nav-link">
                                    Adicionar Gado
                                </Link>
                            </li>
                        </div>
                    </div>
                </nav>
                <div className="container mt-3">
                    <Routes>
                        <Route element={<ListarGado />} path="/" />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
  }
}

export default App;
