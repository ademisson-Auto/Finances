# Finances App

<p align="center">
  <img src="assets/icon.png" alt="Finances App Logo" width="150" />
</p>

Finances é um aplicativo de gerenciamento financeiro pessoal que permite controlar despesas, receitas e transferências. Desenvolvido com React Native e Expo, oferece uma interface intuitiva para acompanhar suas finanças de forma eficiente.

## 🚀 Funcionalidades

- **Autenticação Segura**: Login e cadastro de usuários com Supabase
- **Dashboard Financeiro**: Visão geral das suas finanças com gráficos e totais
- **Controle de Transações**:
  - Registro de despesas (à vista)
  - Registro de despesas no cartão de crédito
  - Registro de receitas
  - Transferências entre contas
- **Categorização**: Organize suas transações por categorias
- **Relatórios**: Visualize resumos de gastos e ganhos por período
- **Design Responsivo**: Interface amigável e adaptável a diferentes dispositivos

## 🛠️ Tecnologias Utilizadas

- **Frontend**:
  - React Native
  - Expo
  - TypeScript
  - React Navigation (navegação entre telas)
  - Reanimated (animações)
  - React Native SVG (gráficos)
  - Lottie (animações)

- **Backend**:
  - Supabase (autenticação e banco de dados)
  - Async Storage (armazenamento local)

- **DevOps**:
  - GitHub Actions (CI/CD)
  - EAS Build (builds automáticas)

## 📱 Telas do Aplicativo

- **Onboarding**: Introdução ao aplicativo para novos usuários
- **Autenticação**: Login e cadastro de usuários
- **Home/Dashboard**: Visão geral das finanças
- **Transações**:
  - Despesas (à vista)
  - Despesas de cartão
  - Receitas
  - Transferências
- **Relatórios**: Visualização de dados financeiros por período

## 🔧 Instalação e Uso

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

## 🚀 Automatização do Deploy (CI/CD)

Este projeto usa GitHub Actions para automatizar o processo de build e deploy para o Expo.

### Configuração do GitHub Actions

1. Crie um token de acesso do Expo:
   - Acesse [expo.dev](https://expo.dev)
   - Vá para Configurações > API de acesso
   - Crie um novo token com o nome "GitHub Actions"

2. Adicione o token como segredo no GitHub:
   - No repositório GitHub, vá para Settings > Secrets > Actions
   - Adicione um novo segredo com o nome `EXPO_TOKEN`
   - Cole o token gerado pelo Expo

3. Faça um push para a branch principal (main) para acionar o workflow.

## 📂 Estrutura do Projeto

```
finances/
├── assets/              # Imagens e recursos
├── src/
│   ├── assets/          # Assets específicos para componentes
│   ├── components/      # Componentes reutilizáveis
│   │   ├── auth/        # Componentes de autenticação 
│   │   ├── common/      # Componentes comuns (botões, inputs)
│   │   └── onboarding/  # Componentes de onboarding
│   ├── contexts/        # Contextos React (AuthContext)
│   ├── navigation/      # Configuração de navegação
│   ├── screens/         # Telas do aplicativo
│   │   ├── auth/        # Telas de autenticação
│   │   └── transactions/# Telas de transações financeiras
│   ├── services/        # Serviços de API (Supabase)
│   ├── types/           # Definições de tipos TypeScript
│   └── utils/           # Funções utilitárias
└── ...
```

## 👨‍💻 Desenvolvimento

### Contribuição

1. Faça o fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📱 Download

O aplicativo está disponível para download:
- [Android APK](https://expo.dev/accounts/ademisson/projects/Finances/builds)

## 📞 Contato

- **Desenvolvedor**: Ademisson
- **GitHub**: [ademisson-Auto](https://github.com/ademisson-Auto)

---

<p align="center">
  Desenvolvido com ❤️ e ☕
</p>
