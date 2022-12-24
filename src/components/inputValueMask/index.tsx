export default function inputValueMask(value: string) {
  let valor = value;
  valor = valor.replace(/\D/g, '');
  valor = valor.replace(/(\d)(\d{2})$/, '$1,$2');
  valor = valor.replace(/(?=(\d{3})+(\D))\B/g, '.');

  return `R$ ${valor}`;
}

export function inputValueMaskLiters(value: string) {
  let valor = value;
  valor = valor.replace(/\D/g, '');
  valor = valor.replace(/(\d)(\d{2})$/, '$1,$2');
  valor = valor.replace(/(?=(\d{3})+(\D))\B/g, '.');

  return valor;
}
