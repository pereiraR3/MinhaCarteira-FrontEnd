import { ContaComplemento } from "./ContaComplemento.model";
import { AbstractEntity } from "./abstract-entity.model";

export class Conta  extends AbstractEntity{

  id:number;
  nome:string;
   
  override deserialize( input: any) {
        Object.assign(this,input);
        return this;
  }

  getId(): number {
        return this.id;
  }


}
