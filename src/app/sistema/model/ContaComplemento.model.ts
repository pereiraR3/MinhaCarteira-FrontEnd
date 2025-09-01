export class  ContaComplemento {

  cep?:String;
  pais?:String;
  estado?:String;
  cidade?:String;
  bairro?:String;
  rua?:String;
  numero?:String;
  complemento?:String;
  telefone?:String;
  celular?:String;
  email?:String;

  constructor(complementos:any){
    let idx = 0;
    while (idx < complementos.length ) {
      switch (complementos[idx].nome) {
        case "cep":
             this.cep = complementos[idx].valor;
             break;
        case "pais":
              this.pais = complementos[idx].valor;
             break;
        case "estado":
             this.estado = complementos[idx].valor;
             break;
        case "cidade":
              this.cidade = complementos[idx].valor;
             break;
        case "bairro":
              this.bairro = complementos[idx].valor;
             break;
        case "rua":
              this.rua = complementos[idx].valor;
             break;
        case "numero":
             this.numero = complementos[idx].valor;
              break;
        case "complemento":
              this.complemento = complementos[idx].valor;
              break;
        case "telefone":
             this.telefone = complementos[idx].valor;
             break;
        case "celular":
              this.celular = complementos[idx].valor;
             break;
        case "email":
            this.email = complementos[idx].valor;
            break;

      }
      idx++;
    }
  }
}
