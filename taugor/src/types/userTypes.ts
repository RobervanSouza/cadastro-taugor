export type UserType = {
  id: string;
  name: string;
  sexo: string;
  endereco: string;
  telefone: number | string;
  foto: string;
  nascimento: number | string;
  cargo: string;
  setor: string;
  salario: string;
  admisao: string | number;
  cargoHistorico?: string[];
};
