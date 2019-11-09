import { Cliente } from './cliente';
import { Endereco } from './endereco';

export class Amostra {
    id: number;
    codigo: String;
    dt_amostra: String;
    observacao: String;
    cliente: Cliente;
    endereco: Endereco;
}
