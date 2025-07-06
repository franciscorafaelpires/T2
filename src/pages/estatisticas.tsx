import { Component } from 'react';
import Cliente from '../model/cliente';
import Produto from '../model/produto';
import Servico from '../model/servico';
import Pet from '../model/pet';

type Props = {
    clientes: Cliente[];
    produtos: Produto[];
    servicos: Servico[];
    pets: Pet[];
};

export default class Estatisticas extends Component<Props> {
    getTop5ClientesMaisGastaram = () => {
        const ranking = this.props.clientes.map(cliente => {
            const totalProdutos = cliente.getProdutosConsumidos.reduce((acc: number, prod: { preco: number; }) => acc + (prod.preco || 0), 0);
            const totalServicos = cliente.getServicosConsumidos.reduce((acc: number, serv: { preco: number; }) => acc + (serv.preco || 0), 0);
            const total = totalProdutos + totalServicos;

            return {
                cliente,
                total
            };
        });

        const top5 = ranking
            .sort((a, b) => b.total - a.total)
            .slice(0, 5);

        return top5;
    };

    getTop10ClientesMaisConsumiram = () => {
        const ranking = this.props.clientes.map(cliente => {
            const totalProdutos = cliente.getProdutosConsumidos.length;
            const totalServicos = cliente.getServicosConsumidos.length;
            return {
                cliente,
                total: totalProdutos + totalServicos
            };
        });

        const top10 = ranking
            .sort((a, b) => b.total - a.total)
            .slice(0, 10);

        return top10;
    };

    getMaisConsumidos = () => {
        const consumoMap: { [nome: string]: number } = {};

        for (let cliente of this.props.clientes) {
            for (let produto of cliente.getProdutosConsumidos) {
                consumoMap[produto.nome] = (consumoMap[produto.nome] || 0) + 1;
            }

            for (let servico of cliente.getServicosConsumidos) {
                consumoMap[servico.nome] = (consumoMap[servico.nome] || 0) + 1;
            }
        }

        const ordenado = Object.entries(consumoMap)
            .sort((a, b) => b[1] - a[1]);

        return ordenado;
    };

    getConsumoPorTipoRacaPet = () => {
        const consumoPorPet: { [chaveTipoRaca: string]: { [nomeItem: string]: number } } = {};

        for (let cliente of this.props.clientes) {
            const pets = cliente.getPets;

            for (let pet of pets) {
                const chave = `${pet.getTipo} | ${pet.getRaca}`;
                if (!consumoPorPet[chave]) {
                    consumoPorPet[chave] = {};
                }

                for (let produto of cliente.getProdutosConsumidos) {
                    const nome = produto.nome;
                    consumoPorPet[chave][nome] = (consumoPorPet[chave][nome] || 0) + 1;
                }

                for (let servico of cliente.getServicosConsumidos) {
                    const nome = servico.nome;
                    consumoPorPet[chave][nome] = (consumoPorPet[chave][nome] || 0) + 1;
                }
            }
        }

        return consumoPorPet;
    };

    render() {
        const top5Clientes = this.getTop5ClientesMaisGastaram();
        const top10Clientes = this.getTop10ClientesMaisConsumiram();
        const maisConsumidos = this.getMaisConsumidos();
        const consumoPorPet = this.getConsumoPorTipoRacaPet();

        return (
            <div>
                <h2>Estatísticas</h2>
                <div>
                    <h3>Top 5 Clientes que Mais Gastaram</h3>
                    <ol>
                        {top5Clientes.map((entry, index) => (
                            <li key={index}>{entry.cliente.nome} - R$ {entry.total.toFixed(2)}</li>
                        ))}
                    </ol>
                </div>
                <div>
                    <h3>Top 10 Clientes que Mais Consumiram</h3>
                    <ol>
                        {top10Clientes.map((entry, index) => (
                            <li key={index}>{entry.cliente.nome} - Total consumido: {entry.total}</li>
                        ))}
                    </ol>
                </div>
                <div>
                    <h3>Produtos e Serviços Mais Consumidos</h3>
                    <ol>
                        {maisConsumidos.map(([nome, quantidade], index) => (
                            <li key={index}>{nome} - consumido {quantidade}x</li>
                        ))}
                    </ol>
                </div>
                <div>
                    <h3>Consumo por Tipo e Raça de Pet</h3>
                    {Object.entries(consumoPorPet).map(([chave, itens], index) => (
                        <div key={index}>
                            <h4>{chave}</h4>
                            <ul>
                                {Object.entries(itens).map(([nome, qtd], i) => (
                                    <li key={i}>{nome}: {qtd}x</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}