import { Component } from "react";
import BarraNavegacao from "./barraNavegacao";
import FormularioCadastroCliente from "../pages/cliente/formularioCadastroCliente";
import ListaCliente from "../pages/cliente/listaClientes";
import FormularioCadastroProduto from "../pages/produto/formularioCadastroProduto";
import ListaProduto from "../pages/produto/listaProdutos";
import FormularioCadastroServico from "../pages/servico/formularioCadastroServico";
import ListaServico from "../pages/servico/listaServicos";
import FormularioCadastroPet from "../pages/pet/formularioCadastroPet";
import ListaPet from "../pages/pet/listaPets";
import Cliente from "../model/cliente";
import CPF from "../model/cpf";
import Produto from "../model/produto";
import Servico from "../model/servico";
import Pet from "../model/pet";
import Estatisticas from "../pages/estatisticas";

type state = {
    tela: string,
    clientes: Cliente[],
    produtos: Produto[],
    servicos: Servico[],
    pets: Pet[],
    clienteEmEdicao: Cliente | null,
    produtoEmEdicao: Produto | null,
    servicoEmEdicao: Servico | null,
    petEmEdicao: Pet | null,
}

export default class Roteador extends Component<{}, state>{
    constructor(props: {} | Readonly<{}>) {
        super(props)
        this.state = {
            tela: 'Clientes',
            clientes: [
                new Cliente(1, 'Francisco', 'Chico', new CPF('12345678901', new Date())),
                new Cliente(2, 'Rafael', 'Rafa', new CPF('12345678902', new Date())),
            ],
            produtos: [
                new Produto(1, 'Ração', 50),
                new Produto(2, 'Brinquedo', 20),
            ],
            servicos: [
                new Servico(1, 'Banho', 30),
                new Servico(2, 'Tosa', 40),
            ],
            pets: [
                new Pet(1, 'Rex', 'Labrador', 'Macho', 'Cachorro'),
                new Pet(2, 'Miau', 'Siamês', 'Fêmea', 'Gato'),
            ],
            clienteEmEdicao: null,
            produtoEmEdicao: null,
            servicoEmEdicao: null,
            petEmEdicao: null,
        }
        this.selecionarView = this.selecionarView.bind(this)
        this.cadastrarCliente = this.cadastrarCliente.bind(this)
        this.cadastrarProduto = this.cadastrarProduto.bind(this)
        this.cadastrarServico = this.cadastrarServico.bind(this)
        this.cadastrarPet = this.cadastrarPet.bind(this)
        this.selecionarClienteParaEdicao = this.selecionarClienteParaEdicao.bind(this)
        this.atualizarCliente = this.atualizarCliente.bind(this)
        this.excluirCliente = this.excluirCliente.bind(this)
        this.selecionarProdutoParaEdicao = this.selecionarProdutoParaEdicao.bind(this)
        this.atualizarProduto = this.atualizarProduto.bind(this)
        this.excluirProduto = this.excluirProduto.bind(this)
        this.selecionarServicoParaEdicao = this.selecionarServicoParaEdicao.bind(this)
        this.atualizarServico = this.atualizarServico.bind(this)
        this.excluirServico = this.excluirServico.bind(this)
        this.selecionarPetParaEdicao = this.selecionarPetParaEdicao.bind(this)
        this.atualizarPet = this.atualizarPet.bind(this)
        this.excluirPet = this.excluirPet.bind(this)
        this.navegarParaCadastroCliente = this.navegarParaCadastroCliente.bind(this)
        this.navegarParaCadastroProduto = this.navegarParaCadastroProduto.bind(this)
        this.navegarParaCadastroServico = this.navegarParaCadastroServico.bind(this)
        this.navegarParaCadastroPet = this.navegarParaCadastroPet.bind(this)
    }

    navegarParaCadastroCliente() {
        this.setState({ tela: 'Cadastrar Cliente', clienteEmEdicao: null })
    }

    navegarParaCadastroProduto() {
        this.setState({ tela: 'Cadastrar Produto', produtoEmEdicao: null })
    }

    navegarParaCadastroServico() {
        this.setState({ tela: 'Cadastrar Serviço', servicoEmEdicao: null })
    }

    navegarParaCadastroPet() {
        this.setState({ tela: 'Cadastrar Pet', petEmEdicao: null })
    }

    cadastrarCliente(cliente: Cliente) {
        this.setState({ clientes: [...this.state.clientes, cliente], tela: 'Clientes' })
    }

    cadastrarProduto(produto: Produto) {
        this.setState({ produtos: [...this.state.produtos, produto], tela: 'Produtos' })
    }

    cadastrarServico(servico: Servico) {
        this.setState({ servicos: [...this.state.servicos, servico], tela: 'Serviços' })
    }

    cadastrarPet(pet: Pet) {
        this.setState({ pets: [...this.state.pets, pet], tela: 'Pets' })
    }

    selecionarClienteParaEdicao(cliente: Cliente) {
        this.setState({ clienteEmEdicao: cliente, tela: 'Cadastrar Cliente' })
    }

    atualizarCliente(clienteAtualizado: Cliente) {
        this.setState(prevState => ({
            clientes: prevState.clientes.map(cliente =>
                cliente.id === clienteAtualizado.id ? clienteAtualizado : cliente
            ),
            clienteEmEdicao: null,
            tela: 'Clientes',
        }))
    }

    excluirCliente(id: number) {
        this.setState(prevState => ({
            clientes: prevState.clientes.filter(cliente => cliente.id !== id)
        }))
    }

    selecionarProdutoParaEdicao(produto: Produto) {
        this.setState({ produtoEmEdicao: produto, tela: 'Cadastrar Produto' })
    }

    atualizarProduto(produtoAtualizado: Produto) {
        this.setState(prevState => ({
            produtos: prevState.produtos.map(produto =>
                produto.id === produtoAtualizado.id ? produtoAtualizado : produto
            ),
            produtoEmEdicao: null,
            tela: 'Produtos',
        }))
    }

    excluirProduto(id: number) {
        this.setState(prevState => ({
            produtos: prevState.produtos.filter(produto => produto.id !== id)
        }))
    }

    selecionarServicoParaEdicao(servico: Servico) {
        this.setState({ servicoEmEdicao: servico, tela: 'Cadastrar Serviço' })
    }

    atualizarServico(servicoAtualizado: Servico) {
        this.setState(prevState => ({
            servicos: prevState.servicos.map(servico =>
                servico.id === servicoAtualizado.id ? servicoAtualizado : servico
            ),
            servicoEmEdicao: null,
            tela: 'Serviços',
        }))
    }

    excluirServico(id: number) {
        this.setState(prevState => ({
            servicos: prevState.servicos.filter(servico => servico.id !== id)
        }))
    }

    selecionarPetParaEdicao(pet: Pet) {
        this.setState({ petEmEdicao: pet, tela: 'Cadastrar Pet' })
    }

    atualizarPet(petAtualizado: Pet) {
        this.setState(prevState => ({
            pets: prevState.pets.map(pet =>
                pet.id === petAtualizado.id ? petAtualizado : pet
            ),
            petEmEdicao: null,
            tela: 'Pets',
        }))
    }

    excluirPet(id: number) {
        this.setState(prevState => ({
            pets: prevState.pets.filter(pet => pet.id !== id)
        }))
    }

    selecionarView(novaTela: string, evento: Event) {
        evento.preventDefault()
        console.log(novaTela);
        this.setState({
            tela: novaTela,
            clienteEmEdicao: null, // Limpa o cliente em edição ao mudar de tela
            produtoEmEdicao: null, // Limpa o produto em edição ao mudar de tela
            servicoEmEdicao: null, // Limpa o serviço em edição ao mudar de tela
            petEmEdicao: null, // Limpa o pet em edição ao mudar de tela
        })
    }

    render() {
        let barraNavegacao = <BarraNavegacao seletorView={this.selecionarView} botoes={['Clientes', 'Produtos', 'Serviços', 'Pets', 'Estatísticas']} />
        if (this.state.tela === 'Clientes') {
            return (
                <>
                    {barraNavegacao}
                    <ListaCliente clientes={this.state.clientes} selecionarClienteParaEdicao={this.selecionarClienteParaEdicao} excluirCliente={this.excluirCliente} navegarParaCadastroCliente={this.navegarParaCadastroCliente} />
                </>
            )
        } else if (this.state.tela === 'Produtos') {
            return (
                <>
                    {barraNavegacao}
                    <ListaProduto produtos={this.state.produtos} selecionarProdutoParaEdicao={this.selecionarProdutoParaEdicao} excluirProduto={this.excluirProduto} navegarParaCadastroProduto={this.navegarParaCadastroProduto} />
                </>
            )
        } else if (this.state.tela === 'Serviços') {
            return (
                <>
                    {barraNavegacao}
                    <ListaServico servicos={this.state.servicos} selecionarServicoParaEdicao={this.selecionarServicoParaEdicao} excluirServico={this.excluirServico} navegarParaCadastroServico={this.navegarParaCadastroServico} />
                </>
            )
        } else if (this.state.tela === 'Pets') {
            return (
                <>
                    {barraNavegacao}
                    <ListaPet pets={this.state.pets} selecionarPetParaEdicao={this.selecionarPetParaEdicao} excluirPet={this.excluirPet} navegarParaCadastroPet={this.navegarParaCadastroPet} />
                </>
            )
        } else if (this.state.tela === 'Cadastrar Cliente') {
            return (
                <>
                    {barraNavegacao}
                    <FormularioCadastroCliente cadastrarCliente={this.cadastrarCliente} clienteEmEdicao={this.state.clienteEmEdicao} atualizarCliente={this.atualizarCliente} />
                </>
            )
        } else if (this.state.tela === 'Cadastrar Produto') {
            return (
                <>
                    {barraNavegacao}
                    <FormularioCadastroProduto cadastrarProduto={this.cadastrarProduto} produtoEmEdicao={this.state.produtoEmEdicao} atualizarProduto={this.atualizarProduto} />
                </>
            )
        } else if (this.state.tela === 'Cadastrar Serviço') {
            return (
                <>
                    {barraNavegacao}
                    <FormularioCadastroServico cadastrarServico={this.cadastrarServico} servicoEmEdicao={this.state.servicoEmEdicao} atualizarServico={this.atualizarServico} />
                </>
            )
        } else if (this.state.tela === 'Cadastrar Pet') {
            return (
                <>
                    {barraNavegacao}
                    <FormularioCadastroPet cadastrarPet={this.cadastrarPet} petEmEdicao={this.state.petEmEdicao} atualizarPet={this.atualizarPet} />
                </>
            )
        } else if (this.state.tela === 'Estatísticas') {
            return (
                <>
                    {barraNavegacao}
                    <Estatisticas clientes={this.state.clientes} produtos={this.state.produtos} servicos={this.state.servicos} pets={this.state.pets} />
                </>
            )
        }
    }
}