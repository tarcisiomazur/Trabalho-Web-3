import React, {Component} from "react";
import DataService from "../services/dataService";
import {useParams} from 'react-router-dom';
import { Combobox } from 'react-awesome-combobox';

// Para obter parâmetros passados via Router v6
// Ex.: (em) this.props.match.params.id
export function withRouter(Children){
    return(props)=>{

        const match  = {params: useParams()};
        return <Children {...props}  match = {match}/>
    }
}


class EditarLeitura extends Component {
    constructor(props) {
        super(props);
        this.getLeitura = this.getLeitura.bind(this);
        this.saveLeitura = this.saveLeitura.bind(this);
        this.onChangeGadoSel = this.onChangeGadoSel.bind(this);
        this.getGados = this.getGados.bind(this);
        this.onChangeQuantidade = this.onChangeQuantidade.bind(this);
        this.onChangeData = this.onChangeData.bind(this);
        this.getDateNow = this.getDateNow.bind(this);

        this.state = {
            isNew: true,
            quantidade: "",
            hora: "",
            horaSel: "",
            gado: null,
            gados: null,
        };
    }

    componentDidMount() {
        this.getGados();
        if(this.props.match.params.id === undefined){
            this.state.isNew = true;
            document.title = 'Cadastrar Leitura';
        }else{
            this.state.isNew = false;
            document.title = 'Editar Leitura';
            this.getLeitura(this.props.match.params.id);
        }
    }

    onChangeQuantidade(e) {
        this.setState({
            quantidade: e.target.value
        });
    }
    onChangeData(e) {
        console.log(e.target.value)
        this.setState({
            hora: e.target.value
        });
    }

    onChangeGadoSel(e) {
        console.log(e);
        this.setState({
            gado: e==null?null:e.value
        });
    }

    getGados() {
        DataService.getAllGados().then(response => {
            this.setState({
                gados: response.data.map(function (gado, i) {
                    return {label: (gado.nome + ' - ' + gado.brinco), value: gado};
                })
            });
            console.log(this.state.gados)
        }).catch(e => {
            console.log("Erro: "+e);
        });
    }

    getLeitura(id) {
        DataService.getLeitura(id)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    quantidade: response.data.quantidade,
                    gado: response.data.gado,
                    hora: response.data.hora
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log("Erro: "+e);
            });
    }

    saveLeitura() {
        let h = new Date(this.state.hora);
        h.setHours(h.getHours()+3);
        var data = {
            quantidade: this.state.quantidade,
            gado: this.state.gado,
            hora: h
        };
        if(this.state.isNew) {
            console.log(data);
            DataService.createLeitura(data).then(response => {
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
            DataService.updateLeitura(this.state.id, data).then(response => {
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
    getDateNow() {
        let today = new Date();
        if(this.state.hora === null || this.state.hora === "" || this.state.hora===undefined){
            let date = today.getFullYear() + '-' +
                (today.getMonth() + 1).toString().padStart(2, '0') + '-' +
                today.getDate().toString().padStart(2, '0');
            let time = today.getHours().toString().padStart(2, '0') + ':' + today.getMinutes().toString().padStart(2, '0');
            console.log(date + 'T' + time)
            return date + 'T' + time;
        }
        console.log(this.state.hora);
        let split1 = this.state.hora.split(' ');
        let split2 = split1[0].split('-');

        let date = split2[2]+'-'+split2[1]+'-'+split2[0]+'T'+split1[1];
        console.log(date)
        return date;
    }
    render() {

        return (
            <div>


                <div align="left" className="form-group col-md-4">
                    <label htmlFor="gado"><strong>Gado</strong></label>
                    <Combobox
                        placeholder='Selecione um Gado'
                        bgColor='cadetBlue'
                        data={this.state.gados}
                        filterProperty='label'
                        display={{
                            fields: ['label']
                        }}
                        value={'1'}
                        itemHeight={40}
                        visibleItems={4}
                        onSelectItem={this.onChangeGadoSel}
                    />
                </div>
                <div align="left" className="form-group col-md-4">
                    <label htmlFor="quantidade"><strong>Quantidade</strong></label>
                    <input
                        type="number"
                        className="form-control"
                        id="quantidade"
                        required
                        value={this.state.quantidade}
                        onChange={this.onChangeQuantidade}
                        name="quantidade"
                    />
                </div>
                <div align="left" className="form-group col-md-4">
                    <label htmlFor="data"><strong>Data</strong></label>
                    <input
                        type="datetime-local"
                        className="form-control"
                        id="nascimento"
                        required
                        name="hora"
                        value={this.horaSel}
                        onChange={this.onChangeData}
                    />
                </div>
                <div align="left" className="mt-3">
                    <div >
                        <button
                            onClick={this.saveLeitura} className="btn btn-success">
                            Salvar
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}


export default withRouter(EditarLeitura);