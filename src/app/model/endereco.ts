import { Cidade } from './cidade';

export class Endereco {
    id: number;
    logradouro: String;
    numero: number;
    complemento: String;
    cidade: Cidade;
}
