import {Injectable} from '@angular/core';

export class PerfilUsuario {

    codigo: string;
    descricao: string;

    constructor( codigo: string, descricao: string){
        this.codigo = codigo;
        this.descricao = descricao;
    }

    equals( item: PerfilUsuario ): boolean{
        return item.codigo == this.codigo;
    }

}

@Injectable()
export class PerfilUsuarioEnum {

    public static ASSINANTE: PerfilUsuario = new PerfilUsuario( "ASSINANTE", "Assinante" );
    public static SISTEMA: PerfilUsuario = new PerfilUsuario( "SISTEMA", "Sistema" );

    private static perfis: PerfilUsuario[] = [
        PerfilUsuarioEnum.ASSINANTE,
        PerfilUsuarioEnum.SISTEMA
    ];

    constructor() {}

    public static values(): PerfilUsuario[] {
        return this.perfis;
    }

    public static valueOf( codigo: String ): PerfilUsuario{
        let item :PerfilUsuario = PerfilUsuarioEnum.SISTEMA;
        this.perfis.forEach( _item => {
            if( _item.codigo == codigo ){
                item = _item;
            }
        });
        return item;
    }

}
