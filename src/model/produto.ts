export default class Produto {
    public id: number
    public nome: string
    public preco: number
    public valor: number;
    constructor(id: number, nome: string, preco: number) {
        this.id = id
        this.nome = nome
        this.preco = preco
        this.valor = 0
    }
}