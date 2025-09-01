import { AbstractTO } from "../../model/abstract-to.model";
import { PerfilUsuario, PerfilUsuarioEnum } from "../../model/enums/perfil-usuario.model";


export class AccessToken extends AbstractTO{

    access_token: string;
    token_type: string;
    perfilUsuario: PerfilUsuario;

    override deserialize( input: any) {
        Object.assign(this,input);
        this.perfilUsuario = PerfilUsuarioEnum.valueOf(input.perfilUsuario);
        return this;
    }

}
