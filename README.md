<div align="center">
  <img src="assets/icon.png" alt="Finances Logo" width="120" />
  
  # 💰 FINANCES
  
  **Controle financeiro pessoal inteligente para React Native**
  
  *Gerencie suas finanças com facilidade: despesas, receitas, cartão de crédito e relatórios em tempo real*
  
  [![React Native](https://img.shields.io/badge/React%20Native-Latest-blue.svg)](https://reactnative.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-Latest-blue.svg)](https://www.typescriptlang.org/)
  [![Expo](https://img.shields.io/badge/Expo-Latest-black.svg)](https://expo.dev/)
  [![Supabase](https://img.shields.io/badge/Supabase-Backend-green.svg)](https://supabase.com/)
  [![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
  
  [📱 Demo](#-demonstração) • [⚡ Instalação](#-instalação-rápida) • [📈 Recursos](#-funcionalidades) • [🚀 Deploy](#-deploy)
  
</div>

---

## 🎯 Características Principais

<table>
  <tr>
    <td>💱</td>
    <td><strong>Controle Total</strong></td>
    <td>Gerencie receitas, despesas e cartão de crédito em um só lugar</td>
  </tr>
  <tr>
    <td>📈</td>
    <td><strong>Relatórios Visuais</strong></td>
    <td>Gráficos interativos e estatísticas detalhadas</td>
  </tr>
  <tr>
    <td>🔒</td>
    <td><strong>Segurança</strong></td>
    <td>Autenticação via Supabase e dados criptografados</td>
  </tr>
  <tr>
    <td>🔄</td>
    <td><strong>Sincronização</strong></td>
    <td>Dados sempre atualizados na nuvem</td>
  </tr>
  <tr>
    <td>⚡</td>
    <td><strong>Performance</strong></td>
    <td>Interface rápida e responsiva</td>
  </tr>
  <tr>
    <td>📱</td>
    <td><strong>Multiplataforma</strong></td>
    <td>Funciona perfeitamente em iOS e Android</td>
  </tr>
</table>

## 📱 Demonstração

> **Nota:** Screenshots e demo em vídeo serão adicionados em breve!

## 🚀 Visão Geral

Finances é um aplicativo completo de gerenciamento financeiro pessoal desenvolvido com React Native e Expo. Oferece controle total sobre suas finanças com interface moderna, sincronização em nuvem e relatórios detalhados.

## 💸 Funcionalidades Principais

### 🔐 Autenticação & Segurança
- ✓ Login seguro com email/senha
- ✓ Cadastro rápido de novos usuários
- ✓ Recuperação de senha
- ✓ Sessão persistente

### 📈 Dashboard & Relatórios
- ✓ Visão geral financeira em tempo real
- ✓ Gráficos interativos (pizza, barras, linhas)
- ✓ Relatórios por período
- ✓ Estatísticas de gastos por categoria
- ✓ Balanço mensal e anual

### 💳 Controle de Transações
- ✓ **Despesas à vista** - Controle total de gastos
- ✓ **Cartão de crédito** - Acompanhe faturas e limites
- ✓ **Receitas** - Registre todas as entradas
- ✓ **Transferências** - Movimentação entre contas
- ✓ **Categorização** - Organize por tipo de gasto
- ✓ **Anexos** - Fotos de comprovantes

### 🎨 Interface & Experiência
- ✓ Design moderno e intuitivo
- ✓ Modo escuro/claro
- ✓ Animações fluidas
- ✓ Interface responsiva
- ✓ Onboarding interativo

## 🚀 Stack Tecnológico

### 📱 Frontend & Mobile
```
📱 React Native           - Framework mobile nativo
⚡ Expo                    - Plataforma de desenvolvimento
🔷 TypeScript             - Tipagem estática
🧭 React Navigation       - Navegação entre telas
🎨 React Native Reanimated - Animações de alta performance
📈 React Native SVG        - Gráficos e ícones vetoriais
✨ Lottie                  - Animações complexas
```

### 💾 Backend & Dados
```
🔋 Supabase                - Backend-as-a-Service completo
🔐 Supabase Auth          - Autenticação e autorização
💾 PostgreSQL             - Banco de dados relacional
📱 AsyncStorage            - Cache local no dispositivo
```

### 🚀 DevOps & Deploy
```
🚀 GitHub Actions         - CI/CD automatizado
📦 EAS Build               - Builds nativas
🔄 EAS Update              - Atualizações OTA
📋 Expo Application Services - Infraestrutura completa
```

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

## ⚡ Instalação Rápida

```bash
# Clone o repositório
git clone https://github.com/ademisson-Auto/Finances.git
cd Finances

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o .env com suas credenciais do Supabase

# Inicie o projeto
npx expo start
```

### 📝 Pré-requisitos

- Node.js 18+
- npm ou yarn
- Expo CLI global: `npm install -g @expo/cli`
- Conta no [Supabase](https://supabase.com) (gratuita)
- Expo Go app no seu dispositivo (para testes)

### 🚀 Comandos de Desenvolvimento

```bash
# Executar no Android
npx expo run:android

# Executar no iOS  
npx expo run:ios

# Executar na Web
npx expo start --web

# Limpar cache
npx expo start --clear
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

## 🛣️ Roadmap

### 🕰️ Próximas Atualizações

- [ ] 📸 **Screenshots & Demo** - Adicionar imagens e vídeo demonstrativo
- [ ] 📄 **Exportação de Relatórios** - PDF e Excel
- [ ] 📡 **Notificações Push** - Lembretes de vencimentos
- [ ] 📅 **Planejamento** - Orçamentos e metas financeiras
- [ ] 🔄 **Backup Automático** - Sincronização com Google Drive
- [ ] 🌍 **Multi-idiomas** - Suporte internacional

### 💡 Ideias Futuras

- 🤖 **IA Financeira** - Análise inteligente de gastos
- 🏦 **Integração Bancária** - Open Banking
- 💹 **Investimentos** - Controle de ações e criptomoedas
- 👥 **Colaborativo** - Finanças familiares

## 🤝 Como Contribuir

Contribuições são muito bem-vindas! Aqui está como você pode ajudar:

### 🐛 Reportar Bugs
1. Verifique se o bug já foi reportado nas [Issues](https://github.com/ademisson-Auto/Finances/issues)
2. Crie uma nova issue com detalhes do problema
3. Inclua screenshots e informações do dispositivo

### ✨ Sugerir Melhorias
1. Abra uma issue com o label `enhancement`
2. Descreva detalhadamente sua ideia
3. Explique por que seria útil

### 📝 Contribuir com Código
1. Faça um fork do projeto
2. Crie uma branch: `git checkout -b feature/nova-funcionalidade`
3. Commit suas mudanças: `git commit -m 'Adiciona nova funcionalidade'`
4. Push para a branch: `git push origin feature/nova-funcionalidade`
5. Abra um Pull Request

## 📱 Download

O aplicativo está disponível para download:
- [🤖 Android APK](https://expo.dev/accounts/ademisson/projects/Finances/builds)
- 🍎 iOS (em breve na App Store)

## 📋 Licença

Este projeto está licenciado sob a **Licença MIT** - veja o arquivo [LICENSE](LICENSE) para detalhes.

---

<div align="center">
  
  **💰 Finances - Controle financeiro inteligente**
  
  Desenvolvido com ❤️ por [Ademisson](https://github.com/ademisson-Auto)
  
  [![GitHub](https://img.shields.io/badge/GitHub-ademisson--Auto-black?logo=github)](https://github.com/ademisson-Auto)
  [![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?logo=linkedin)](https://linkedin.com/in/ademisson)
  
  **Se este projeto te ajudou, deixe uma ⭐!**
  
</div>
