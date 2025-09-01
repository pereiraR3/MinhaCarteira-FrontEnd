import { AbstractTO } from "../../model/abstract-to.model";

export class Autenticacao extends AbstractTO{

    grant_type: string;
    username: string;
    password: string;
    tipo:string;

}
