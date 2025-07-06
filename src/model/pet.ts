export default class Pet {
    public id: number
    public nome: string
    private tipo: string
    private raca: string
    private genero: string
    constructor(id: number, nome: string, raca: string, genero: string, tipo: string) {
        this.id = id
        this.nome = nome
        this.raca = raca
        this.genero = genero
        this.tipo = tipo
    }
    public get getNome(){
        return this.nome
    }
    public get getRaca(){
        return this.raca
    }
    public get getGenero(){
        return this.genero
    }
    public get getTipo(){
        return this.tipo
    }
}