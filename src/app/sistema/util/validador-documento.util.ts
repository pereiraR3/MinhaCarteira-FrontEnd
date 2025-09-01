export class ValidadorDocumentoUtil {

  static validarCpf(cpf: string): boolean {
    if (!cpf) {
      return false;
    }

    const cpfNumerico = ValidadorDocumentoUtil.removerFormatacao(cpf);

    if (cpfNumerico.length !== 11 || /^(\d)\1{10}$/.test(cpfNumerico)) {
      return false;
    }

    let soma = 0;
    let resto;

    for (let i = 1; i <= 9; i++) {
      soma = soma + parseInt(cpfNumerico.substring(i - 1, i), 10) * (11 - i);
    }

    resto = (soma * 10) % 11;

    if ((resto === 10) || (resto === 11)) {
      resto = 0;
    }

    if (resto !== parseInt(cpfNumerico.substring(9, 10), 10)) {
      return false;
    }

    soma = 0;
    for (let i = 1; i <= 10; i++) {
      soma = soma + parseInt(cpfNumerico.substring(i - 1, i), 10) * (12 - i);
    }

    resto = (soma * 10) % 11;

    if ((resto === 10) || (resto === 11)) {
      resto = 0;
    }

    return resto === parseInt(cpfNumerico.substring(10, 11), 10);
  }

  static validarCnpj(cnpj: string): boolean {
    if (!cnpj) {
      return false;
    }

    const cnpjNumerico = ValidadorDocumentoUtil.removerFormatacao(cnpj);

    if (cnpjNumerico.length !== 14 || /^(\d)\1{13}$/.test(cnpjNumerico)) {
      return false;
    }

    let tamanho = cnpjNumerico.length - 2;
    let numeros = cnpjNumerico.substring(0, tamanho);
    const digitos = cnpjNumerico.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i), 10) * pos--;
      if (pos < 2) {
        pos = 9;
      }
    }

    let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado !== parseInt(digitos.charAt(0), 10)) {
      return false;
    }

    tamanho = tamanho + 1;
    numeros = cnpjNumerico.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i), 10) * pos--;
      if (pos < 2) {
        pos = 9;
      }
    }

    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado !== parseInt(digitos.charAt(1), 10)) {
      return false;
    }

    return true;
  }

  private static removerFormatacao(documento: string): string {
    return documento.replace(/[^\d]/g, '');
  }
}
