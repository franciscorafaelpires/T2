import { Component } from "react";
import Cliente from "../../model/cliente";
import CPF from "../../model/cpf";

type props = {
    cadastrarCliente: (cliente: Cliente) => void,
    clienteEmEdicao: Cliente | null,
    atualizarCliente: (cliente: Cliente) => void,
}

export default class FormularioCadastroCliente extends Component<props> {
    state = {
        nome: this.props.clienteEmEdicao?.nome || '',
        nomeSocial: this.props.clienteEmEdicao?.nomeSocial || '',
        cpf: this.props.clienteEmEdicao?.getCpf.getValor || '',
        dataEmissaoCpf: this.props.clienteEmEdicao?.getCpf.getDataEmissao.toISOString().split('T')[0] || '',
    }

    componentDidUpdate(prevProps: props) {
        if (this.props.clienteEmEdicao !== prevProps.clienteEmEdicao) {
            this.setState({
                nome: this.props.clienteEmEdicao?.nome || '',
                nomeSocial: this.props.clienteEmEdicao?.nomeSocial || '',
                cpf: this.props.clienteEmEdicao?.getCpf.getValor || '',
                dataEmissaoCpf: this.props.clienteEmEdicao?.getCpf.getDataEmissao.toISOString().split('T')[0] || '',
            })
        }
    }

    render() {
        const isEditing = this.props.clienteEmEdicao !== null
        return (
            <div className="container-fluid">
                <div className="card p-4">
                    <form>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Nome" aria-label="Nome" aria-describedby="basic-addon1" value={this.state.nome} onChange={(e) => this.setState({ nome: e.target.value })} />
                        </div>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Nome social" aria-label="Nome social" aria-describedby="basic-addon1" value={this.state.nomeSocial} onChange={(e) => this.setState({ nomeSocial: e.target.value })} />
                        </div>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="CPF" aria-label="CPF" aria-describedby="basic-addon1" value={this.state.cpf} onChange={(e) => this.setState({ cpf: e.target.value })} />
                        </div>
                        <div className="input-group mb-3">
                            <input type="date" className="form-control" placeholder="Data de emissão do CPF" aria-label="Data de emissão do CPF" aria-describedby="basic-addon1" value={this.state.dataEmissaoCpf} onChange={(e) => this.setState({ dataEmissaoCpf: e.target.value })} />
                        </div>
                        <div className="input-group mb-3">
                            <button className="btn btn-primary" type="button" onClick={() => {
                                if (isEditing) {
                                    const clienteAtualizado = new Cliente(this.props.clienteEmEdicao!.id, this.state.nome, this.state.nomeSocial, new CPF(this.state.cpf, new Date(this.state.dataEmissaoCpf)))
                                    this.props.atualizarCliente(clienteAtualizado)
                                } else {
                                    this.props.cadastrarCliente(new Cliente(Math.random(), this.state.nome, this.state.nomeSocial, new CPF(this.state.cpf, new Date(this.state.dataEmissaoCpf))))
                                }
                            }}>{isEditing ? 'Atualizar' : 'Cadastrar'}</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
    }