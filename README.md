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
- Biblioteca de produtos e equipamentos
- Glossário técnico
- Avaliações e questionários
- Perfil, configurações e área administrativa demonstrativa

## Biblioteca de produtos

A página de produtos foi ampliada com uma primeira coleção de fichas baseadas no **Catálogo Vonixx 2024**, incluindo lavagem, limpeza pesada, estofados, tecidos, couro, plásticos, pneus, polimento e ceramic coating.

A biblioteca inclui:
- Busca por nome, categoria e aplicação.
- Fichas resumidas com finalidade, apresentação e etapa de uso.
- Calculadora matemática de diluição na convenção total da Vonixx (ex.: 1:5 = 1 parte de produto em 5 partes totais).
- Acesso ao catálogo PDF e aos canais de consulta de documentação de segurança.

### Fontes e documentos

- [Catálogo Vonixx 2024 (PDF)](https://vonixx.com.br/wp-content/uploads/2024/09/catalogo-vonixx-2024_reduzido.pdf)
- [Site oficial Vonixx](https://www.vonixx.com.br/)
- [Índice de FDS Vonixx](https://fds.fispq.org/fabricante/vonixx/)

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

1. Biblioteca completa de produtos por fabricante, com versão e fonte documental por ficha.
2. Central de PDFs: apostilas, manuais, checklists, fichas técnicas e FDS.
3. Enciclopédia de procedimentos passo a passo, com ferramentas, consumíveis, riscos e critérios de qualidade.
4. Calculadoras de diluição, custo por serviço, consumo de produto e orçamento.
5. Catálogo de equipamentos e comparador técnico de marcas.
6. Glossário ampliado com busca e termos relacionados.
7. Área administrativa para cadastrar e revisar cursos, produtos, documentos e imagens.
8. Autenticação, banco de dados e sincronização em nuvem para substituir o perfil demonstrativo local.

## Observação de escopo

O projeto ainda é uma plataforma em desenvolvimento. A área administrativa atual é demonstrativa e o armazenamento de progresso existente é local no navegador. Login real, pagamentos, upload persistente de PDFs e gestão multiusuário exigem implementação de backend e serviços próprios.
