export default function inputDataNascimentoMask(value: string) {
  let valor = value;
  valor = valor.replace(/\D/g, '');
  valor = valor.replace(/^(\d{2})(\d)/, '$1-$2');
  valor = valor.replace(/(\d{2})(\d)/, '$1-$2');

  return valor;
}
