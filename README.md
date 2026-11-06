# DetailPro Academy

Plataforma educacional especializada em **estética automotiva e detalhamento automotivo profissional**, construída com **React 19, TypeScript, Vite e Tailwind CSS v4**.

## 1. Arquitetura e Estrutura de Pastas

```text
/
├── index.html                        # Entrada HTML com SEO e fontes (Outfit, Plus Jakarta Sans, JetBrains Mono)
├── package.json                      # Dependências e scripts de execução, build, lint e testes
├── tsconfig.json                     # Configuração do TypeScript
├── vite.config.ts                    # Configuração do Vite (porta 3000)
├── docs/
│   └── PERFIL-DEMO.md                # Documentação do perfil demonstrativo local
└── src/
    ├── main.tsx                      # Bootstrap da aplicação React
    ├── App.tsx                       # Orquestrador de navegação e estado persistido
    ├── index.css                     # Estilos globais e tema escuro premium
    ├── types/
    │   └── academy.ts                # Interfaces e contratos TypeScript
    ├── data/
    │   └── academyData.ts            # Currículo das 10 áreas, biblioteca de insumos, glossário e avaliações
    ├── services/
    │   └── storageService.ts         # Persistência em localStorage pronta para futura migração de banco/Auth
    ├── utils/
    │   ├── academyLogic.ts           # Funções puras de cálculo de progresso, filtros e correção de avaliações
    │   └── academyLogic.test.ts      # Testes unitários automatizados (node:test)
    ├── components/
    │   ├── AppShell.tsx              # Barra superior + Menu lateral das 11 áreas da plataforma
    │   ├── CourseCard.tsx            # Card reutilizável de cursos com barra de progresso e favoritos
    │   ├── VideoPlayerSlot.tsx       # Componente preparado para incorporação de vídeos do YouTube
    │   └── ResilientImage.tsx        # Renderizador de imagens com fallback técnico
    └── pages/
        ├── HomePage.tsx              # 1. Página inicial com apresentação da academia
        ├── DashboardPage.tsx         # 2. Painel do aluno
        ├── CoursesPage.tsx           # 3. Área de cursos
        ├── ClassroomPage.tsx         # 4. Área de aulas e módulos
        ├── ProductsPage.tsx          # 5. Biblioteca de produtos e equipamentos
        ├── GlossaryPage.tsx          # 6. Glossário técnico pesquisável
        ├── QuizzesPage.tsx           # 7. Avaliações e questionários com pontuação
        ├── ProgressPage.tsx          # 8. Progresso de aprendizagem e histórico
        ├── ProfilePage.tsx           # 9. Perfil demonstrativo do aluno
        ├── SettingsPage.tsx          # 10. Configurações e backup JSON
        └── AdminPage.tsx             # 11. Área administrativa preparada para expansão
```

## 2. Como Instalar as Dependências

Certifique-se de possuir o **Node.js (v20 ou v22+)** instalado e execute na raiz do projeto:

```bash
npm install
```

## 3. Como Executar Localmente

Para iniciar o servidor de desenvolvimento na porta `3000`:

```bash
npm run dev
```

Para executar os testes unitários da lógica da plataforma:

```bash
npm test
```

## 4. Como Compilar e Publicar o Site

Para gerar o pacote otimizado de produção na pasta `dist/`:

```bash
npm run build
```

Para pré-visualizar a versão de produção localmente:

```bash
npm run preview
```

O conteúdo gerado em `dist/` pode ser publicado diretamente em serviços de hospedagem estática como **GitHub Pages, Vercel, Netlify ou Cloudflare Pages**.
