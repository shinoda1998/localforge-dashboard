# 🔍 LocalForge Dashboard

<p align="center">
  <img src="https://www.genspark.ai/api/files/s/5gB7nTU2" alt="LocalForge Logo" width="300">
</p>

<p align="center">
  <strong>Plataforma para encontrar negócios locais e gerar demonstrações de soluções digitais</strong>
</p>

---

## 📋 Sobre o Projeto

O **LocalForge Dashboard** é uma aplicação SaaS (Software as a Service) que permite freelancers e agências digitais:

- 🔍 **Encontrar negócios locais** que precisam de soluções digitais
- 📊 **Analisar oportunidades** de melhoria digital para cada negócio
- ✨ **Criar demonstrações personalizadas** para impressionar clientes
- 💬 **Gerar mensagens profissionais** para abordagem comercial
- 📚 **Gerenciar histórico** de todas as atividades

---

## ✅ Funcionalidades Implementadas

### 🏠 Dashboard (Home)
- Saudação personalizada ao usuário
- Cards de resumo com estatísticas (buscas, demos, mensagens, plano)
- Barras de progresso indicando uso vs limites
- CTA principal para "Encontrar Negócios"
- Seção de atividades recentes
- Dicas rápidas

### 🔍 Encontrar Negócios
- Formulário de busca por cidade e nicho
- Lista de categorias: Restaurantes, Clínicas, Academias, Salões, Pet Shops, etc.
- Grid de resultados com cards de negócios
- Avaliação com estrelas
- Botão "Analisar" em cada card

### 📊 Análise do Negócio
- Perfil completo do negócio
- Lista de oportunidades identificadas
- Sugestão de solução digital personalizada
- CTAs para criar demonstração ou gerar mensagem

### ✨ Criar Demonstração
- Wizard de 3 etapas:
  1. Seleção do tipo de negócio (8 categorias)
  2. Informações do negócio (nome, localização, diferenciais)
  3. Personalização (cores, upload de imagens)
- Upload de imagens com preview
- Geração de prompt de demonstração

### 📄 Resultado da Demonstração
- Área de texto com prompt gerado
- Botão para copiar prompt
- Botão para exportar PDF (visual)
- Próximos passos sugeridos

### 💬 Message Assist (Mensagens)
- 3 tipos de mensagem:
  - Mensagem inicial
  - Apresentar serviço
  - Responder mensagem do dono
- Geração inteligente de mensagens
- Botões copiar e regenerar

### 📚 Histórico
- Lista de todas as atividades
- Filtros: Todos, Demonstrações, Mensagens, Buscas
- Busca textual
- Paginação
- Ações rápidas (ver, copiar, refazer)

### 💎 Planos & Assinatura
- Comparativo visual: Plano Free vs Pro
- Badge "Mais Popular" no plano Pro
- Preço com desconto: De R$ 499,90 por R$ 49,90
- Lista de features com checks/Xs
- FAQ com accordion

### ⚙️ Configurações
- Perfil do usuário (nome, email, foto)
- Alteração de senha
- Notificações (toggles)
- Zona de perigo (excluir conta)

---

## 📐 Estrutura de Arquivos

```
localforge-dashboard/
├── index.html              # HTML principal com todas as páginas (templates)
├── css/
│   ├── styles.css          # Estilos base e variáveis
│   ├── components.css      # Componentes (sidebar, header, botões, etc.)
│   ├── pages.css           # Estilos específicos de cada página
│   └── responsive.css      # Media queries e responsividade
├── js/
│   ├── app.js              # Lógica principal da aplicação
│   ├── router.js           # Sistema de roteamento hash-based
│   └── components.js       # Componentes UI reutilizáveis
├── vercel.json             # Configuração para deploy na Vercel
├── package.json            # Metadados do projeto
├── .gitignore              # Arquivos ignorados pelo Git
└── README.md               # Este arquivo
```

---

## 🎨 Identidade Visual

### Cores
| Cor | Hex | Uso |
|-----|-----|-----|
| Primária | `#0B1F3B` | Textos principais, sidebar |
| Secundária | `#F59E0B` | Destaques, CTAs, ícones |
| Fundo | `#FFFFFF` | Cards, modais |
| Fundo Alt | `#F8FAFC` | Background geral |
| Texto | `#1F2937` | Texto principal |
| Texto Sec | `#6B7280` | Texto secundário |

### Tipografia
- **Fonte**: Inter (Google Fonts)
- **Headings**: 600-700
- **Texto**: 400-500
- **Botões**: 600

### Cards
- Fundo branco
- Borda fina (1px) na cor secundária (#F59E0B, 20% opacidade)
- Cantos arredondados (12px)
- Sombra suave

---

## 🚀 Como Usar

### Desenvolvimento Local

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/localforge-dashboard.git
cd localforge-dashboard
```

2. Execute um servidor local:
```bash
# Com npx
npx serve .

# Ou com Python
python -m http.server 8080

# Ou com PHP
php -S localhost:8080
```

3. Acesse no navegador:
```
http://localhost:8080
```

### Deploy na Vercel

1. Faça push para o GitHub
2. Conecte o repositório na Vercel
3. A Vercel detectará automaticamente como site estático
4. Deploy é feito automaticamente a cada push

---

## 📱 URIs / Rotas

| Rota | Descrição |
|------|-----------|
| `#dashboard` | Página inicial / Dashboard |
| `#encontrar-negocios` | Busca de negócios |
| `#analise` | Análise de negócio selecionado |
| `#criar-demonstracao` | Wizard de criação de demo |
| `#resultado` | Resultado da demonstração |
| `#mensagens` | Message Assist |
| `#historico` | Histórico de atividades |
| `#planos` | Planos e assinatura |
| `#configuracoes` | Configurações do usuário |

---

## 🔧 Tecnologias

- **HTML5** - Estrutura semântica
- **CSS3** - Estilização moderna com variáveis CSS
- **JavaScript ES6+** - Lógica e interatividade
- **Font Awesome 6** - Ícones
- **Google Fonts (Inter)** - Tipografia
- **Hash-based SPA** - Navegação sem reload

---

## 📦 Features Técnicas

- ✅ SPA (Single Page Application) com hash routing
- ✅ 100% responsivo (mobile-first)
- ✅ Sidebar colapsável
- ✅ Sistema de toasts/notificações
- ✅ Modais reutilizáveis
- ✅ Tabs dinâmicas
- ✅ Accordion FAQ
- ✅ Upload de imagens com preview
- ✅ Wizard multi-step
- ✅ Filtros e busca
- ✅ Validação de formulários
- ✅ Animações suaves

---

## 🚧 Próximos Passos (Não Implementados)

1. **Backend Integration**
   - Integração com API real para dados
   - Autenticação de usuários (Supabase/Firebase)
   - Persistência de dados

2. **Funcionalidades Avançadas**
   - Integração com Google Places API para busca real
   - IA para análise de negócios
   - Geração de prompts com ChatGPT
   - Exportação PDF real
   - Sistema de pagamento (Stripe)

3. **Melhorias**
   - Testes automatizados
   - PWA (Progressive Web App)
   - Dark mode
   - Internacionalização (i18n)

---

## 📄 Licença

Este projeto está sob a licença MIT.

---

## 👨‍💻 Desenvolvido por

**LocalForge Team**

---

<p align="center">
  <strong>🔍 LocalForge - Encontre negócios, crie demonstrações, conquiste clientes!</strong>
</p>
