import React, {Component} from "react";
import DataService from "../services/dataService";

import {useParams} from 'react-router-dom';

// Para obter parâmetros passados via Router v6
// Ex.: (em) this.props.match.params.id
export function withRouter(Children){
    return(props)=>{

        const match  = {params: useParams()};
        return <Children {...props}  match = {match}/>
    }
}


class EditarGado extends Component {
    constructor(props) {
        super(props);
        this.getGado = this.getGado.bind(this);
        this.saveGado = this.saveGado.bind(this);
        this.onChangeBrinco = this.onChangeBrinco.bind(this);
        this.onChangeNome = this.onChangeNome.bind(this);
        this.onChangeNascimento = this.onChangeNascimento.bind(this);

        this.state = {
            isNew: true,
            brinco: "",
            nome: "",
            nascimento: "",
        };
    }

    componentDidMount() {
        if(this.props.match.params.id === undefined){
            this.state.isNew = true;
            document.title = 'Cadastrar Gado';
        }else{
            this.state.isNew = false;
            document.title = 'Editar Gado';
            this.getGado(this.props.match.params.id);
        }
    }

    onChangeBrinco(e) {
        this.setState({
            brinco: e.target.value
        });
    }
    onChangeNome(e) {
        this.setState({
            nome: e.target.value
        });
    }

    onChangeNascimento(e) {
        this.setState({
            nascimento: e.target.value.substring(0,10)
        });
    }

    getGado(id) {
        DataService.getGado(id)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    nome: response.data.nome,
                    brinco: response.data.brinco,
                    nascimento: response.data.nascimento
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log("Erro: "+e);
            });
    }

    saveGado() {
        let d = new Date(this.state.nascimento);
        d.setHours(d.getHours()+3);
        var data = {
            brinco: this.state.brinco,
            nome: this.state.nome,
            nascimento: d
        };
        if(this.state.isNew) {
            DataService.createGado(data).then(response => {
                this.setState({
                    brinco: response.data.brinco,
                    nome: response.data.nome,
                    nascimento: response.data.nascimento
                });
                console.log(response.data);
                window.location.href = '/';
            }).catch(e => {
                console.log(e);
            });
        }else {
            DataService.updateGado(this.state.id, data).then(response => {
                this.setState({
                    brinco: response.data.brinco,
                    nome: response.data.nome,
                    nascimento: response.data.nascimento
                });
                console.log(response.data);
                window.location.href = '/';
            }).catch(e => {
                console.log(e);
            });
        }

    }

    render() {

        return (
            <div>
                <div align="left" className="form-group col-md-4">
                    <label htmlFor="nome"><strong>Nome</strong></label>
                    <input
                        type="text"
                        className="form-control"
                        id="nome"
                        required
                        value={this.state.nome}
                        onChange={this.onChangeNome}
                        name="nome"
                    />
                </div>

                <div align="left" className="form-group col-md-4">
                    <label htmlFor="brinco"><strong>Brinco</strong></label>
                    <input
                        type="text"
                        className="form-control"
                        id="brinco"
                        required
                        value={this.state.brinco}
                        onChange={this.onChangeBrinco}
                        name="brinco"
                    />
                </div>

                <div align="left" className="form-group col-md-4">
                    <label htmlFor="nascimento"><strong>Nascimento</strong></label>
                    <input
                        type="date"
                        className="form-control"
                        id="nascimento"
                        required
                        placeholder="dd-mm-yyyy"
                        value={this.state.nascimento.substring(0,10)}
                        onChange={this.onChangeNascimento}
                        name="nascimento"
                    />
                </div>
                <div align="left" className="mt-3">
                    <div >
                        <button
                            onClick={this.saveGado} className="btn btn-success">
                            Salvar
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}


export default withRouter(EditarGado);