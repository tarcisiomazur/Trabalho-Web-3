import React, {Component} from "react";
import DataService from "../services/dataService";
import { Link } from "react-router-dom";


export default class ListarGado extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchNome = this.onChangeSearchNome.bind(this);
        this.retrieveGados = this.retrieveGados.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setGadoSel = this.setGadoSel.bind(this);
        this.searchNome = this.searchNome.bind(this);

        this.state = {
            gados: [],
            gadoSel: null,
            indice: -1,
            nome: ""
        };
    }

    componentDidMount() {
        this.retrieveGados();
    }

    onChangeSearchNome(e) {
        const searchNome = e.target.value;

        this.setState({
            nome: searchNome
        });
    }

    retrieveGados() {
        DataService.getAllGados()
            .then(response => {
                this.setState({
                    gados: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveGados();
        this.setState({
            gadoSel: null,
            indice: -1
        });
    }

    setGadoSel(artigo, index) {
        this.setState({
            gadoSel: artigo,
            indice: index
        });
    }

    searchNome() {
        this.setState({
            gadoSel: null,
            indice: -1
        });

        DataService.findGadoByNome(this.state.nome)
            .then(response => {
                this.setState({
                    gados: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const {gados, gadoSel, indice, nome} = this.state;

        return (
            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Buscar por nome"
                            value={nome}
                            onChange={this.onChangeSearchNome}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.searchNome}
                            >
                                Buscar
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <h4>Gados</h4>

                    <ul className="list-group">
                        {gados &&
                            gados.map((gado, i) => (
                                <li
                                    className={
                                        "list-group-item " +
                                        (i === indice ? "active" : "")
                                    }
                                    onClick={() => this.setGadoSel(gado, i)}
                                    key={i}
                                >
                                    {gado.nome} - {gado.brinco}
                                </li>
                            ))}
                    </ul>

                </div>
                <div className="col-md-6">
                    {gadoSel ? (
                        <div>
                            <h4>&nbsp;</h4>
                            <div>
                                <label>
                                    <strong>Brinco:</strong>
                                </label>{" "}
                                {gadoSel.brinco}
                            </div>
                            <div>
                                <label>
                                    <strong>Nome:</strong>
                                </label>{" "}
                                {gadoSel.nome}
                            </div>
                            <div>
                                <label>
                                    <strong>Data Nascimento:</strong>
                                </label>{" "}
                                {new Date(gadoSel.nascimento).toLocaleDateString()}
                            </div>
                            <div>
                                <label>
                                    <strong>Leituras:</strong>
                                </label>
                                <br/>
                                <div>
                                    {gadoSel.leituras || gadoSel.leituras.length===0?(
                                        <div>
                                            <span>O animal não possui leituras registradas.</span>
                                        </div>
                                    ):(
                                        <div>
                                            <table>
                                                <tr></tr>
                                            </table>

                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <Link
                                to={"/gados/" + gadoSel.id}
                                className="btn btn-sm btn-warning"
                                role="button"
                            >
                                Editar
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <h4>&nbsp;</h4>

                            <p><i>Selecione um animal para visualizar suas informações.</i></p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}