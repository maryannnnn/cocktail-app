import {number, string} from "yup";

export interface IMenu {
    id: string;
    name: string;
    url: string;
    order: number;
}