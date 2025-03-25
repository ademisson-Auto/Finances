# Finances App

Aplicativo de finanças pessoais desenvolvido com React Native e Expo.

## Tecnologias Utilizadas

- React Native
- Expo
- TypeScript
- Supabase
- React Navigation

## Configuração do Projeto

### Pré-requisitos

- Node.js
- npm ou yarn
- Expo CLI

### Instalação

```bash
# Clone o repositório
git clone https://github.com/ademisson-Auto/Finances.git
cd finances

# Instale as dependências
npm install
```

### Executando o Aplicativo

```bash
# Iniciar o app
npm start
```

## Automatização do Deploy (CI/CD)

Este projeto está configurado com GitHub Actions para automatizar o processo de build e deploy para o Expo.

### Configuração do GitHub Actions

1. Crie um token de acesso do Expo:
   - Acesse [expo.dev](https://expo.dev)
   - Vá para Configurações > API de acesso
   - Crie um novo token com o nome "GitHub Actions"

2. Adicione o token como segredo no GitHub:
   - No repositório GitHub, vá para Settings > Secrets > Actions
   - Adicione um novo segredo com o nome `EXPO_TOKEN`
   - Cole o token gerado pelo Expo

3. Faça um push para a branch principal (main ou master) para acionar o workflow.

## Estrutura do Projeto

- `/src/assets` - Imagens e recursos
- `/src/components` - Componentes reutilizáveis
- `/src/contexts` - Contextos React, incluindo autenticação
- `/src/navigation` - Configuração de navegação
- `/src/screens` - Telas do aplicativo
- `/src/services` - Serviços de API
- `/src/types` - Definições de tipos TypeScript
- `/src/utils` - Funções utilitárias
