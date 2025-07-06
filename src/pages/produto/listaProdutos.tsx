import { Component } from "react";
import Produto from "../../model/produto";

type props = {
    produtos: Produto[],
    selecionarProdutoParaEdicao: (produto: Produto) => void,
    excluirProduto: (id: number) => void,
    navegarParaCadastroProduto: () => void,
}

export default class ListaProduto extends Component<props>{
    render() {
        return (
            <div className="container-fluid">
                <button className="btn btn-primary mb-2" onClick={this.props.navegarParaCadastroProduto}>Cadastrar Novo Produto</button>
                <div className="list-group">
                    {this.props.produtos.map((produto, index) => (
                        <div key={index} className="card">
                            <div className="card-body">
                                <h5 className="card-title">{produto.nome}</h5>
                                <p className="card-text">Preço: R$ {produto.preco.toFixed(2)}</p>
                                <div className="d-flex justify-content-end">
                                    <button className="btn btn-primary me-2" onClick={() => this.props.selecionarProdutoParaEdicao(produto)}>Editar</button>
                                    <button className="btn btn-danger" onClick={() => this.props.excluirProduto(produto.id)}>Excluir</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}