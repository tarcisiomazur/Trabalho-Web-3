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
        this.excludeLeituraSel = this.excludeLeituraSel.bind(this);
        this.searchNome = this.searchNome.bind(this);

        this.state = {
            gados: [],
            gadoSel: null,
            indice: -1,
            nome: "",
            leituras: null,
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

    setGadoSel(gado, index) {
        DataService.getAllLeituras(gado.id)
            .then(response => {

                this.setState({
                    gadoSel: gado,
                    indice: index,
                    leituras: response.data,
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    searchNome() {
        this.setState({
            gadoSel: null,
            indice: -1
        });
        if(!this.state.nome){
            this.refreshList();
        }else {
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
    }

    excludeLeituraSel(id){
        DataService.deleteLeitura(id).then(response => {
            this.refreshList();
            console.log(response.data);
        }).catch(e => {
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
                                    {this.state.leituras == null || this.state.leituras.length===0?(
                                        <div>
                                            <span>O animal não possui leituras registradas.</span>
                                        </div>
                                    ):(
                                        <div>
                                            <table class="table">
                                                <thead className="thead-light">
                                                    <tr>
                                                        <th scope="col">Hora</th>
                                                        <th scope="col">Quantidade</th>
                                                        <th scope="col">Opções</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.leituras.map((leitura, i) => (
                                                        <tr>
                                                            <td>
                                                                {leitura.hora}
                                                            </td>
                                                            <td>
                                                                {leitura.quantidade}
                                                            </td>
                                                            <td>
                                                                <a
                                                                    title="Editar Leitura"
                                                                    className="btn btn-sm btn-outline-primary" href={'/leitura/editar/'+leitura.id}>
                                                                    <i className="fa-regular fa-pen-to-square"></i>
                                                                </a>
                                                                <button
                                                                    title="Excluir Leitura"
                                                                    onClick={()=>this.excludeLeituraSel(leitura.id)}
                                                                    className="btn btn-sm btn-outline-danger">
                                                                    <i className="fa-regular fa-rectangle-xmark"></i>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>

                                        </div>
                                    )}
                                </div>
                            </div>

                            <Link
                                to={"/gado/editar/" + gadoSel.id}
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