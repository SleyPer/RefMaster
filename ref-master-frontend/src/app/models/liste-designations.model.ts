import { Designation } from "./designation.model";

export interface ListeDesignations {
    past: Designation[];
    future: Designation[];
}