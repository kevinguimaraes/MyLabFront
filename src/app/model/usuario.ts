import { Perfil } from './perfil';
import { Pessoa } from './pessoa';

export class Usuario {
    id: number;
    login: String;
    password: String;
    cargo: String;
    pessoa: Pessoa;
    perfil: Perfil;
}
