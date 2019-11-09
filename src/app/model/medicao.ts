import { Equipamento } from './equipamento';
import { Amostra } from './amostra';

export class Medicao {
    id: number;
    valor: number;
    unidade: String;
    dt_medicao: String;
    equipamento: Equipamento;
    amostra: Amostra;
}
