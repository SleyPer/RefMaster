export interface StatistiquesGlobalesDto {
    totalMatchs: number;
    totalKm: number;
    totalRevenus: number;
    parAnnee: StatistiquesParAnneeDto[];
}

export interface StatistiquesParAnneeDto {
    annee: number;
    matchs: number;
    km: number;
    revenus: number;
    sallePreferee?: string;
    equipeFavorite?: string;
    collegueFavori?: string;
    matchsAvecCollegueFavori?: number;
    parMois: StatistiquesParMoisDto[];
}

export interface StatistiquesParMoisDto {
    mois: number;
    matchs: number;
    km: number;
    revenus: number;
    salleFrequency: { [salle: string]: number };
    equipeFrequency: { [equipe: string]: number };
    collegueFrequency: { [collegue: string]: number };
}
