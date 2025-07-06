import { Component } from "react";
import Pet from "../../model/pet";

type props = {
    cadastrarPet: (pet: Pet) => void,
    petEmEdicao: Pet | null,
    atualizarPet: (pet: Pet) => void,
}

export default class FormularioCadastroPet extends Component<props> {
    state = {
        nome: this.props.petEmEdicao?.getNome || '',
        raca: this.props.petEmEdicao?.getRaca || '',
        genero: this.props.petEmEdicao?.getGenero || '',
        tipo: this.props.petEmEdicao?.getTipo || '',
    }

    componentDidUpdate(prevProps: props) {
        if (this.props.petEmEdicao !== prevProps.petEmEdicao) {
            this.setState({
                nome: this.props.petEmEdicao?.getNome || '',
                raca: this.props.petEmEdicao?.getRaca || '',
                genero: this.props.petEmEdicao?.getGenero || '',
                tipo: this.props.petEmEdicao?.getTipo || '',
            })
        }
    }

    render() {
        const isEditing = this.props.petEmEdicao !== null
        return (
            <div className="container-fluid">
                <div className="card p-4">
                    <form>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Nome" aria-label="Nome" aria-describedby="basic-addon1" value={this.state.nome} onChange={(e) => this.setState({ nome: e.target.value })} />
                        </div>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Raça" aria-label="Raça" aria-describedby="basic-addon1" value={this.state.raca} onChange={(e) => this.setState({ raca: e.target.value })} />
                        </div>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Gênero" aria-label="Gênero" aria-describedby="basic-addon1" value={this.state.genero} onChange={(e) => this.setState({ genero: e.target.value })} />
                        </div>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Tipo" aria-label="Tipo" aria-describedby="basic-addon1" value={this.state.tipo} onChange={(e) => this.setState({ tipo: e.target.value })} />
                        </div>
                        <div className="input-group mb-3">
                            <button className="btn btn-primary" type="button" onClick={() => {
                                if (isEditing) {
                                    const petAtualizado = new Pet(this.props.petEmEdicao!.id, this.state.nome, this.state.raca, this.state.genero, this.state.tipo)
                                    this.props.atualizarPet(petAtualizado)
                                } else {
                                    this.props.cadastrarPet(new Pet(Math.random(), this.state.nome, this.state.raca, this.state.genero, this.state.tipo))
                                }
                            }}>{isEditing ? 'Atualizar' : 'Cadastrar'}</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}