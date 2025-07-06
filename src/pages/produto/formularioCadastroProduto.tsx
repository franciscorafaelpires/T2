import { Component } from "react";
import Produto from "../../model/produto";

type props = {
    cadastrarProduto: (produto: Produto) => void,
    produtoEmEdicao: Produto | null,
    atualizarProduto: (produto: Produto) => void,
}

export default class FormularioCadastroProduto extends Component<props> {
    state = {
        nome: this.props.produtoEmEdicao?.nome || '',
        preco: this.props.produtoEmEdicao?.preco || 0,
    }

    componentDidUpdate(prevProps: props) {
        if (this.props.produtoEmEdicao !== prevProps.produtoEmEdicao) {
            this.setState({
                nome: this.props.produtoEmEdicao?.nome || '',
                preco: this.props.produtoEmEdicao?.preco || 0,
            })
        }
    }

    render() {
        const isEditing = this.props.produtoEmEdicao !== null
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
                                    const produtoAtualizado = new Produto(this.props.produtoEmEdicao!.id, this.state.nome, this.state.preco)
                                    this.props.atualizarProduto(produtoAtualizado)
                                } else {
                                    this.props.cadastrarProduto(new Produto(Math.random(), this.state.nome, this.state.preco))
                                }
                            }}>{isEditing ? 'Atualizar' : 'Cadastrar'}</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}