import { Component } from "react";
import Servico from "../../model/servico";

type props = {
    cadastrarServico: (servico: Servico) => void,
    servicoEmEdicao: Servico | null,
    atualizarServico: (servico: Servico) => void,
}

export default class FormularioCadastroServico extends Component<props> {
    state = {
        nome: this.props.servicoEmEdicao?.nome || '',
        preco: this.props.servicoEmEdicao?.preco || 0,
    }

    componentDidUpdate(prevProps: props) {
        if (this.props.servicoEmEdicao !== prevProps.servicoEmEdicao) {
            this.setState({
                nome: this.props.servicoEmEdicao?.nome || '',
                preco: this.props.servicoEmEdicao?.preco || 0,
            })
        }
    }

    render() {
        const isEditing = this.props.servicoEmEdicao !== null
        return (
            <div className="container-fluid">
                <div className="card p-4">
                    <form>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Nome" aria-label="Nome" aria-describedby="basic-addon1" value={this.state.nome} onChange={(e) => this.setState({ nome: e.target.value })} />
                        </div>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Preco" aria-label="Preco" aria-describedby="basic-addon1" value={this.state.preco} onChange={(e) => this.setState({ preco: Number(e.target.value) })} />
                        </div>
                        <div className="input-group mb-3">
                            <button className="btn btn-primary" type="button" onClick={() => {
                                if (isEditing) {
                                    const servicoAtualizado = new Servico(this.props.servicoEmEdicao!.id, this.state.nome, this.state.preco)
                                    this.props.atualizarServico(servicoAtualizado)
                                } else {
                                    this.props.cadastrarServico(new Servico(Math.random(), this.state.nome, this.state.preco))
                                }
                            }}>{isEditing ? 'Atualizar' : 'Cadastrar'}</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}