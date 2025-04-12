import { Arbitre } from "./arbitre.model";

export interface Designation {
    id?: number;
    date: string;
    division: string;
    equipeA: string;
    equipeB: string;
    salle: string;
    ville: string;
    collegue: Arbitre;
    kmParcourus: number;
    revenus: number;
}
