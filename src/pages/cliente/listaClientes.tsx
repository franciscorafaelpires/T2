import { Component } from "react";
import Cliente from "../../model/cliente";

type props = {
    clientes: Cliente[],
    selecionarClienteParaEdicao: (cliente: Cliente) => void,
    excluirCliente: (id: number) => void,
    navegarParaCadastroCliente: () => void,
}

export default class ListaCliente extends Component<props>{
    render() {
        return (
            <div className="container-fluid">
                <button className="btn btn-primary mb-2" onClick={this.props.navegarParaCadastroCliente}>Cadastrar Novo Cliente</button>
                <div className="list-group">
                    {this.props.clientes.map((cliente, index) => (
                        <div key={index} className="card">
                            <div className="card-body">
                                <h5 className="card-title">{cliente.nome} ({cliente.nomeSocial})</h5>
                                <p className="card-text">CPF: {cliente.getCpf.getValor}</p>
                                <div className="d-flex justify-content-end">
                                    <button className="btn btn-primary me-2" onClick={() => this.props.selecionarClienteParaEdicao(cliente)}>Editar</button>
                                    <button className="btn btn-danger" onClick={() => this.props.excluirCliente(cliente.id)}>Excluir</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}