# Simple Store App

![Demo](./screenshot.png)
Aplicativo mobile em React Native + Expo para explorar produtos, visualizar detalhes, favoritar itens e navegar por categorias.

## Como executar

### Pré-requisitos
- Node.js 18+
- npm ou yarn
- Expo Go instalado no celular, ou um emulador Android/iOS

### Instalação

```bash
npm install
```

### Executar no ambiente local

```bash
npm start
```

Em seguida:
- no celular, abra o app Expo Go e escaneie o QR Code;
- no emulador Android, pressione `a`;
- no emulador iOS, pressione `i`.

### Executar em Android

```bash
npm run android
```

### Executar na web

```bash
npm run web
```

## Tecnologias utilizadas
- React Native
- Expo SDK 57
- TypeScript
- React Navigation
- AsyncStorage
- Axios
- Expo Vector Icons
- Expo Linear Gradient
- Expo Splash Screen

## Decisões técnicas adotadas
- Estrutura modular com pastas separadas para telas, componentes, hooks, serviços e tipos.
- Uso de contexto para gerenciar favoritos de forma compartilhada entre telas.
- Consumo da Fake Store API para buscar produtos, categorias e detalhes.
- Separação de responsabilidades para facilitar manutenção e evolução do app.

## Limitações conhecidas
- Os dados são fornecidos por uma API pública e podem sofrer lentidão ou indisponibilidade temporária.
- A solução atual foi pensada para uso mobile e web básico, sem autenticação.
- A splash screen é configurada para o fluxo padrão do Expo e pode exigir reinício do servidor em alguns ambientes.

## Performance e boas práticas
- Uso de hooks e memoização para evitar recomputações desnecessárias em listas e filtros.
- Componentização de UI para manter o código mais limpo e reutilizável.
- Estado centralizado para favoritos, reduzindo duplicação e inconsistências.
- Carregamento de dados em telas específicas, com tratamento de loading e erro.

## Uso de Inteligência Artificial
Este projeto foi desenvolvido com apoio de ferramentas de IA, como GitHub Copilot, para acelerar a criação de componentes, melhorias de interface e correção de problemas de integração.
