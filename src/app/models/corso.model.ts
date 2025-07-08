import { Docente } from "./docente.model";
import { Discente } from "./discente.model";
export interface Corso{
     id :number;
    nome : string ;
    annoAccademico : number;
    nomeDocente: string;
    cognomeDocente : string;
    discenti : Discente[];
}