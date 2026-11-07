# Estética Detalhamento. edu

Plataforma educacional de estética automotiva e detalhamento profissional. Este projeto evolui a base técnica do antigo DetailPro Academy e mantém o repositório **DetailPro Academy**.

## Identidade do produto

- Nome exibido: **Estética Detalhamento. edu**
- Objetivo: reunir formação técnica, procedimentos, biblioteca de produtos, equipamentos, documentos PDF, glossário, avaliações e ferramentas de apoio para detailers.
- Stack: React 19, TypeScript, Vite e Tailwind CSS v4.
- Tema: escuro, com destaque dourado e interface responsiva.

## Áreas já existentes

- Início e apresentação
- Painel do aluno e progresso de aprendizagem
- Cursos, módulos e sala de aula
- Biblioteca de produtos multi-marcas (Vonixx e Easytech, com links de fonte oficial)
- Guia de máquinas e equipamentos com critérios de compra, operação e manutenção
- Enciclopédia interativa de procedimentos (6 guias iniciais)
- Calculadora de custo e orçamento de serviços
- Central pesquisável de PDFs e referências técnicas
- Glossário técnico
- Avaliações e questionários
- Perfil, configurações e área administrativa demonstrativa

## Biblioteca de produtos

A página de produtos reúne fichas iniciais Vonixx baseadas no **Catálogo Vonixx 2024** e produtos Easytech consultados nas páginas oficiais, incluindo lavagem, limpeza pesada, descontaminação ferrosa, estofados, couro, plásticos, pneus, polimento e proteção.

A biblioteca inclui:
- Busca por nome, categoria e aplicação.
- Fichas resumidas com finalidade, apresentação, marca, aplicação e fonte externa por produto quando disponível.
- Filtro por fabricante e categoria.
- Calculadora matemática de diluição na convenção total da Vonixx (ex.: 1:5 = 1 parte de produto em 5 partes totais).
- Acesso ao catálogo PDF e aos canais de consulta de documentação de segurança.

### Central de documentos e fontes

A área **PDFs e Referências** reúne links externos para:
- [Catálogo Vonixx 2025 (PDF)](https://www.vonixx.com.br/wp-content/uploads/2025/05/catalogo-vonixx-2025.pdf)
- [Catálogo Vonixx 2024 (PDF)](https://vonixx.com.br/wp-content/uploads/2024/09/catalogo-vonixx-2024_reduzido.pdf)
- [Catálogos oficiais](https://www.vonixx.com.br/catalogos/)
- [Produtos no site oficial](https://www.vonixx.com.br/produto/)
- [Índice externo de FDS Vonixx](https://fds.fispq.org/fabricante/vonixx/)

Os documentos abrem nas fontes originais; não são armazenados nem versionados pelo site.

**Importante:** o catálogo 2024 é uma referência histórica. As fichas resumidas não substituem rótulos, fichas técnicas ou FDS atuais. Diluições e aplicações devem ser confirmadas na documentação vigente do produto específico. Não misture produtos químicos.

## Executar localmente

Requisitos: Node.js 20 ou 22+.

```bash
npm install
npm run dev
```

O servidor de desenvolvimento inicia na porta 3000.

## Verificações

```bash
npm run lint
npm test
npm run build
```

## Próximas expansões planejadas

1. Ampliar a biblioteca multi-marcas com fichas documentadas, versão, imagens autorizadas e fonte por produto.
2. Incluir PDFs próprios: apostilas, manuais, checklists e documentos autorizados.
3. Expandir a enciclopédia com mais procedimentos e critérios técnicos revisados.
4. Adicionar cálculo de consumo, diluição avançada e simulador de orçamento com histórico.
5. Expandir o guia de equipamentos para catálogo comparativo por marca, modelo e ficha técnica.
6. Ampliar glossário, cursos, avaliações e materiais para download.
7. Evoluir a área administrativa para cadastro e revisão de conteúdos.
8. Implementar autenticação, banco de dados, upload persistente e sincronização em nuvem.

## Observação de escopo

O projeto ainda é uma plataforma em desenvolvimento. A área administrativa atual é demonstrativa e o armazenamento de progresso existente é local no navegador. Login real, pagamentos, upload persistente de PDFs e gestão multiusuário exigem implementação de backend e serviços próprios.
