// src/routes/types.ts
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// 1. Defina quais telas existem e quais parâmetros elas recebem
export type RootStackParamList = {
  Home: undefined;                // Home não recebe nenhum parâmetro
  ProductDetails: { id: string }; // Details EXIGE receber um objeto contendo o id (string)
  // Adicione novas telas aqui conforme o app crescer (ex: Cart: undefined)
};

// 2. Atalho de tipagem para o hook 'useNavigation' não dar erro nas telas
export type AutoNavigationProp = NativeStackNavigationProp<RootStackParamList>;
