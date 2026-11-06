import {
  Course,
  CourseCategory,
  ProductItem,
  GlossaryTerm,
  QuizAssessment,
  DemoStudentProfile,
} from '../types/academy';

export const COURSE_CATEGORIES: CourseCategory[] = [
  'Fundamentos e segurança',
  'Lavagem técnica',
  'Descontaminação da pintura',
  'Polimento e correção de pintura',
  'Proteção e vitrificação',
  'Higienização interna',
  'Limpeza de couro, plásticos e tecidos',
  'Estética de motores e vidros',
  'Técnicas profissionais avançadas',
  'Gestão e profissionalização de um negócio de estética automotiva',
];

export const GENERATED_IMAGES = {
  heroStudio: '/src/assets/images/hero_detailing_studio_1793934180212.jpg',
  polishing: '/src/assets/images/course_polishing_correction_1793934181422.jpg',
  ceramic: '/src/assets/images/course_ceramic_coating_1793934183541.jpg',
  interior: '/src/assets/images/course_interior_detailing_1793934183784.jpg',
};

export const DEFAULT_DEMO_PROFILE: DemoStudentProfile = {
  displayName: 'Aluno Demonstração',
  roleTitle: 'Profissional em Formação Técnica',
  experienceLevel: 'Intermediário',
  focusArea: 'Polimento e correção de pintura',
  weeklyGoalLessons: 5,
  studioType: 'Estúdio de Detalhamento Independente',
  bio: 'Perfil demonstrativo local para acompanhamento de estudos na DetailPro Academy. Todos os dados de progresso, favoritos, notas de aula e avaliações permanecem salvos localmente neste navegador.',
};

export const INITIAL_COURSES: Course[] = [
  {
    id: 'course-01-fundamentos',
    code: 'DP-101',
    title: 'Fundamentos, Química Aplicada e Segurança Operacional',
    category: 'Fundamentos e segurança',
    level: 'Iniciante',
    shortDescription:
      'Domine a escala de pH, cálculos de diluição exatos, leitura de FISPQ e protocolos de EPI para estúdios profissionais.',
    fullDescription:
      'Base obrigatória para qualquer detailer profissional. Compreenda a diferença entre lavagem estética, detalhamento técnico e restauração, dominando o comportamento químico de tensoativos ácidos, neutros e alcalinos sobre diferentes substratos automotivos.',
    estimatedHours: 6,
    coverImage: GENERATED_IMAGES.heroStudio,
    instructorNote:
      'Nunca inicie um procedimento sem identificar o substrato e consultar a diluição recomendada pelo fabricante.',
    skillsAcquired: [
      'Cálculo exato de proporções de diluição (1:5 a 1:400)',
      'Seleção de EPIs para vapores orgânicos, ácidos e alcalinos',
      'Diagnóstico inicial de materiais automotivos (verniz, PPF, anodizados)',
      'Organização ergonômica e iluminação técnica do box',
    ],
    modules: [
      {
        id: 'mod-01-1',
        courseId: 'course-01-fundamentos',
        order: 1,
        title: 'Módulo 1: Química Aplicada e Diluições',
        description: 'Escala de pH, ação tensoativa e cálculos matemáticos para preparo seguro de soluções.',
        lessons: [
          {
            id: 'les-01-1',
            courseId: 'course-01-fundamentos',
            moduleId: 'mod-01-1',
            order: 1,
            title: 'Introdução à Estética Automotiva e Diagnóstico de Superfícies',
            summary: 'Diferenças entre conservação, detalhamento e correção técnica, com mapeamento de materiais.',
            durationMinutes: 25,
            imageUrl: GENERATED_IMAGES.heroStudio,
            imageCaption: 'Inspeção preliminar sob túnel de iluminação hexagonal e luz pontual de diagnóstico.',
            contentParagraphs: [
              'A estética automotiva profissional não se resume ao brilho superficial imediato. Trata-se da ciência de limpar, descontaminar, corrigir e proteger cada substrato do veículo — verniz poliuretano, plásticos texturizados, alumínio anodizado, borrachas EPDM, couro natural ou sintético — respeitando seus limites físicos e químicos.',
              'Antes de aplicar qualquer produto ou encostar uma ferramenta na superfície, o profissional executa o check-in técnico: avalia a temperatura das chapas, identifica repinturas anteriores, verifica a presença de manchas ácidas (water spots) e alinha expectativas reais com o proprietário.',
              'O domínio dos fundamentos evita os erros mais caros de um estúdio: manchar frisos cromados ou black piano com produtos alcalinos concentrados, ou remover verniz excessivo sem necessidade.'
            ],
            keyTakeaways: [
              'Jamais aplique produtos químicos sobre carroceria ou rodas quentes.',
              'Diferencie pintura original OEM de repintura antes de propor correção severa.',
              'Documente todas as avarias pré-existentes sob iluminação dedicada.'
            ],
            technicalSpecs: [
              { label: 'Temperatura Ideal da Chapa', value: '18°C a 26°C (sempre à sombra)' },
              { label: 'Iluminação de Inspeção', value: 'CRI > 95 | 4000K a 6000K' },
              { label: 'Umidade Relativa Recomendada', value: '40% a 65% no box seco' },
            ],
            videoConfig: {
              title: 'Diagnóstico Inicial e Mapeamento de Substratos no Estúdio',
              description: 'Estrutura preparada para vídeo demonstrativo sobre inspeção visual e tátil na entrada do veículo.',
              duration: '14:20',
              category: 'Fundamentos e segurança',
              youtubeUrl: '',
            },
            materials: [
              {
                id: 'mat-01-1',
                title: 'Checklist de Recebimento e Inspeção Técnica (Check-in)',
                type: 'Checklist Técnico',
                summary: 'Roteiro de 12 pontos para vistoria externa e interna antes de iniciar o serviço.',
                contentSteps: [
                  'Conferir temperatura do capô, rodas e discos de freio com termômetro infravermelho.',
                  'Mapear riscos profundos (teste de unha suave), descascados de verniz e marcas de calcificação.',
                  'Verificar integridade de frisos anodizados, emblemas e borrachas de vedação.',
                  'Registrar fotos de ângulos padronizados antes da pré-lavagem.'
                ],
              },
            ],
            exercise: {
              title: 'Mapeamento Completo de Materiais em Veículo de Estudo',
              objective: 'Identificar e catalogar 8 diferentes materiais externos e internos antes da lavagem.',
              requiredTools: ['Lanterna de inspeção CRI alto', 'Ficha de check-in', 'Termômetro infravermelho'],
              steps: [
                'Posicione o veículo em área coberta e meça a temperatura do capô e das rodas dianteiras.',
                'Classifique o tipo de acabamento das rodas (pintada envernizada, diamantada, anodizada ou fosca).',
                'Inspecione os plásticos externos e identifique se há ressecamento ou contaminação por cera antiga.'
              ],
              safetyWarning: 'Não toque nos discos de freio ou escapamento logo após a chegada do veículo.',
              successCriteria: 'Ficha preenchida com 100% dos substratos identificados e temperatura aferida abaixo de 28°C.',
            },
          },
          {
            id: 'les-01-2',
            courseId: 'course-01-fundamentos',
            moduleId: 'mod-01-1',
            order: 2,
            title: 'Escala de pH, Diluição Matemática e Leitura de Rótulos',
            summary: 'Como calcular diluições exatas em ml e escolher o pH correto para cada tipo de sujidade.',
            durationMinutes: 30,
            contentParagraphs: [
              'Na química do detalhamento, a escala de pH varia de 0 a 14. Produtos ácidos (pH < 6) são formulados para remover incrustações minerais, chuva ácida e oxidação inorgânica. Produtos neutros (pH 6,5 a 7,5) preservam ceras, selantes e revestimentos em lavagens de manutenção. Já os alcalinos e desengraxantes (pH > 8) saponificam óleos, graxas, insetos e sujidade orgânica pesada.',
              'Para calcular uma diluição 1:10 em um borrifador de 500 ml, some as partes (1 parte de produto + 9 partes de água = 10 partes totais) ou divida o volume final pelo fator total conforme a convenção técnica adotada pelo rótulo (na convenção 1 parte em 10 partes finais: 500 ml ÷ 10 = 50 ml de produto + 450 ml de água).',
              'Identifique todos os frascos pulverizadores com etiquetas resistentes a químicos contendo nome do produto, data, proporção diluída e faixa de pH.'
            ],
            keyTakeaways: [
              'Nunca misture produtos químicos diferentes no mesmo frasco ou balde.',
              'Adicione sempre a água primeiro e o produto concentrado depois para evitar espuma excessiva.',
              'Respeite rigorosamente o tempo de ação (dwell time) sem permitir secagem na peça.'
            ],
            technicalSpecs: [
              { label: 'Fórmula de Diluição Prática', value: 'Volume do Frasco (ml) ÷ Partes Totais = ml de Produto' },
              { label: 'Exemplo 1:10 em 500 ml', value: '50 ml de produto + 450 ml de água filtrada' },
              { label: 'Exemplo 1:400 em Balde 10 L', value: '25 ml de shampoo concentrado para 10.000 ml de água' },
            ],
            videoConfig: {
              title: 'Cálculo Prático de Diluições e Uso de Copo Dosador Graduado',
              description: 'Componente preparado para vídeo explicativo sobre diluições de APCs, shampoos e desengraxantes.',
              duration: '16:45',
              category: 'Fundamentos e segurança',
              youtubeUrl: '',
            },
            materials: [
              {
                id: 'mat-01-2',
                title: 'Tabela Rápida de Diluições para Frascos de 500 ml e 1 Litro',
                type: 'Tabela de Diluição',
                summary: 'Referência imediata em mililitros para bancada de preparação química.',
                contentSteps: [
                  'Proporção 1:5 (500 ml) -> 100 ml de produto + 400 ml de água.',
                  'Proporção 1:10 (500 ml) -> 50 ml de produto + 450 ml de água.',
                  'Proporção 1:20 (500 ml) -> 25 ml de produto + 475 ml de água.',
                  'Proporção 1:50 (1000 ml) -> 20 ml de produto + 980 ml de água.'
                ],
              },
            ],
            exercise: {
              title: 'Preparação de Bancada com 3 Diluições Padronizadas',
              objective: 'Preparar e rotular soluções de limpeza leve, intermediária e pesada sem erro volumétrico.',
              requiredTools: ['3 frascos pulverizadores graduados de 500 ml', 'Seringa ou copo Becker de 100 ml', 'Etiquetas'],
              steps: [
                'Calcule o volume em ml para as proporções 1:5, 1:10 e 1:20 em frascos de 500 ml.',
                'Abasteça primeiro a água limpa e em seguida adicione o concentrado medido no copo graduado.',
                'Aplique a etiqueta técnica indicando produto, diluição e superfície recomendada.'
              ],
              safetyWarning: 'Utilize óculos de proteção e luvas nitrílicas durante o manuseio de produtos concentrados.',
              successCriteria: 'Frascos rotulados corretamente e volumes conferidos na marcação de 500 ml.',
            },
          },
          {
            id: 'les-01-3',
            courseId: 'course-01-fundamentos',
            moduleId: 'mod-01-1',
            order: 3,
            title: 'EPIs, Ergonomia e Segurança do Profissional no Box',
            summary: 'Proteção respiratória, ocular, dérmica e elétrica no ambiente úmido e seco.',
            durationMinutes: 25,
            contentParagraphs: [
              'A longevidade na carreira de detalhador exige proteção rigorosa contra exposição química cumulativa, ruído contínuo de máquinas e fadiga ergonômica. Luvas nitrílicas sem pó protegem a pele contra dermatites de contato provocadas por desengraxantes, solventes de piche e revestimentos cerâmicos.',
              'Durante a aplicação de vitrificadores (coatings à base de solventes e silanos) ou descontaminantes ácidos/ferrosos em ambientes fechados, é indispensável o uso de respirador semifacial equipado com cartuchos para vapores orgânicos e gases ácidos (VO/GA).',
              'Mantenha cabos elétricos de politrizes e extratoras suspensos ou afastados de lâminas de água, utilizando tomadas com proteção DR (Diferencial Residual) e botas impermeáveis antiderrapantes no box de lavagem.'
            ],
            keyTakeaways: [
              'Máscaras descartáveis comuns não filtram vapores químicos de solventes e vitrificadores.',
              'Use protetor auricular durante longas jornadas com politrizes, aspiradores e sopradores.',
              'Utilize banqueta ergonômica com rodízios ao trabalhar nas laterais baixas do veículo.'
            ],
            videoConfig: {
              title: 'Seleção e Conservação de EPIs para Estética Automotiva',
              description: 'Slot preparado para vídeo sobre respiradores VO/GA, luvas nitrílicas e segurança elétrica.',
              duration: '12:10',
              category: 'Fundamentos e segurança',
              youtubeUrl: '',
            },
            materials: [
              {
                id: 'mat-01-3',
                title: 'Protocolo de Segurança e Consulta de FISPQ',
                type: 'Ficha de Segurança (FISPQ)',
                summary: 'Quadro de EPIs obrigatórios por etapa operacional do estúdio.',
                contentSteps: [
                  'Lavagem e Descontaminação: Botas impermeáveis, avental, luvas nitrílicas e óculos de segurança.',
                  'Polimento Técnico: Protetor auricular, iluminação sem ofuscamento direto e postura neutra de punho.',
                  'Vitrificação e Impermeabilização: Respirador semifacial com filtro VO, luvas nitrílicas e exaustão ativa.'
                ],
              },
            ],
            exercise: {
              title: 'Auditoria de Segurança do Ambiente de Trabalho',
              objective: 'Inspecionar o box de trabalho quanto a ventilação, aterramento elétrico e disponibilidade de EPIs.',
              requiredTools: ['Respirador com filtro VO', 'Luvas nitrílicas', 'Óculos de proteção incolor'],
              steps: [
                'Verifique a validade e vedação dos cartuchos do respirador semifacial.',
                'Inspecione extensões elétricas e conexões de lavadora de alta pressão quanto a isolamento.',
                'Organize uma pasta física ou digital com as FISPQs dos principais químicos utilizados.'
              ],
              safetyWarning: 'Substitua imediatamente qualquer extensão elétrica com emendas expostas em área molhada.',
              successCriteria: 'Kit de EPI individual completo, higienizado e pronto para uso imediato.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'course-02-lavagem',
    code: 'DP-102',
    title: 'Lavagem Técnica Detalhada e Prevenção de Micro-Riscos',
    category: 'Lavagem técnica',
    level: 'Iniciante',
    shortDescription:
      'Pré-lavagem por flotação (Snow Foam), técnica dos dois baldes com separadores de partículas, detalhamento de rodas e secagem segura.',
    fullDescription:
      'Cerca de 80% dos micro-riscos circulares (swirl marks) surgem durante lavagens incorretas. Neste curso você aprenderá a remover a sujeira abrasiva antes do toque físico e a executar a lavagem de contato com lubrificação máxima.',
    estimatedHours: 7,
    instructorNote:
      'Quanto mais sujeira você remover na pré-lavagem sem toque, menor será a chance de induzir marcas no verniz.',
    skillsAcquired: [
      'Regulagem de canhão Snow Foam e escolha do shampoo de pré-lavagem',
      'Execução da técnica de dois baldes com Grit Guard e múltiplas luvas',
      'Limpeza técnica de rodas, caixas de roda e pinças de freio',
      'Secagem por absorção capilar e soprador térmico sem atrito',
    ],
    modules: [
      {
        id: 'mod-02-1',
        courseId: 'course-02-lavagem',
        order: 1,
        title: 'Módulo 1: Pré-Lavagem, Contato Seguro e Secagem',
        description: 'Sequência operacional completa no box molhado para zero indução de defeitos.',
        lessons: [
          {
            id: 'les-02-1',
            courseId: 'course-02-lavagem',
            moduleId: 'mod-02-1',
            order: 1,
            title: 'Pré-Lavagem Segura e Flotação de Partículas com Snow Foam',
            summary: 'Como encapsular e soltar terra, lama e poeira abrasiva antes de encostar a luva de microfibra.',
            durationMinutes: 28,
            contentParagraphs: [
              'A pré-lavagem é a etapa mais importante para evitar que grãos de quartzo e poeira mineral sejam arrastados sobre o verniz. Iniciamos sempre pelas rodas e caixas de roda utilizando ferramentas exclusivas, pois são as áreas mais contaminadas por pó de pastilha de freio e piche.',
              'Na carroceria fria, aplicamos a espuma densa (Snow Foam) com shampoo de alta lubrificação (como V-FLOC em carros protegidos ou V-MOL / CITRON quando há necessidade de remover filme de tráfego estático). A espuma deve agir por 3 a 5 minutos promovendo a flotação da sujeira sem secar.',
              'Enquanto a espuma age, utilizamos pincéis de cerdas macias nas grades frontais, emblemas, frestas de faróis, tampão de combustível e borrachas de janela, finalizando com enxágue abundante em leque aberto.'
            ],
            keyTakeaways: [
              'Lave sempre as quatro rodas e caixas de roda antes de molhar a carroceria.',
              'Ajuste o leque da lavadora de alta pressão (25° ou 40°) mantendo distância segura de 40 a 60 cm.',
              'Use pincéis de cerdas macias nas áreas de emblemas e black piano externo.'
            ],
            technicalSpecs: [
              { label: 'Diluição Típica Snow Foam', value: '1:10 a 1:20 na garrafa da Snow Foam (conforme produto)' },
              { label: 'Tempo de Flotação', value: '3 a 5 minutos (nunca deixar secar)' },
              { label: 'Ângulo do Bico de Alta Pressão', value: 'Leque 25° ou 40°' },
            ],
            videoConfig: {
              title: 'Pré-Lavagem por Flotação e Detalhamento de Emblemas com Pincel Macio',
              description: 'Slot preparado para vídeo prático de aplicação de Snow Foam e enxágue técnico.',
              duration: '18:00',
              category: 'Lavagem técnica',
              youtubeUrl: '',
            },
            materials: [
              {
                id: 'mat-02-1',
                title: 'Fluxograma de Pré-Lavagem sem Toque',
                type: 'Checklist Técnico',
                summary: 'Ordem exata de aplicação e enxágue para máxima remoção de abrasivos.',
                contentSteps: [
                  '1. Limpeza detalhada de rodas, pneus e caixas de roda com balde e escovas dedicados.',
                  '2. Aplicação de espuma de pré-lavagem de baixo para cima ou de cima para baixo cobrindo 100% do veículo.',
                  '3. Esfregação suave de frestas, grades e emblemas com pincel macio.',
                  '4. Enxágue de alta vazão removendo toda a espuma e partículas em suspensão.'
                ],
              },
            ],
            exercise: {
              title: 'Teste Comparativo de Pré-Lavagem em Painel Sujo',
              objective: 'Avaliar o percentual de sujeira removida apenas com pré-lavagem química e enxágue.',
              requiredTools: ['Canhão Snow Foam', 'Shampoo V-FLOC ou V-MOL', 'Pincel de detalhamento externo'],
              steps: [
                'Aplique a espuma regulada sobre a carroceria fria e aguarde 4 minutos.',
                'Detalhe os emblemas e grades com pincel macio lubrificado pela própria espuma.',
                'Realize o enxágue completo e inspecione a superfície antes de iniciar o toque manual.'
              ],
              safetyWarning: 'Nunca direcione jato de alta pressão próximo a sensores de estacionamento ou bordas de PPF.',
              successCriteria: 'Remoção de mais de 85% da sujidade superficial sem contato mecânico na lata.',
            },
          },
          {
            id: 'les-02-2',
            courseId: 'course-02-lavagem',
            moduleId: 'mod-02-1',
            order: 2,
            title: 'Método de Dois Baldes, Luvas de Microfibra e Secagem Técnica',
            summary: 'Divisão do veículo por zonas de contaminação, movimentos retilíneos e secagem sem arrasto.',
            durationMinutes: 32,
            contentParagraphs: [
              'Na lavagem de contato, utilizamos dois baldes equipados com separadores de partículas (Grit Guard) no fundo: um balde com água e shampoo neutro de alta lubrificação (ex.: V-FLOC 1:400) e outro balde com água limpa exclusivamente para enxaguar a luva após cada painel.',
              'Dividimos o veículo em três zonas horizontais: Zona Superior (teto, capô, tampa traseira e vidros), Zona Intermediária (portas e laterais superiores) e Zona Inferior (saias laterais e partes baixas dos para-choques). Trabalhe com movimentos retilíneos suaves, sem exercer pressão sobre a luva.',
              'Após o enxágue final em lâmina d’água (sheeting), realize a secagem utilizando toalha de microfibra de alta gramatura (GSM > 600) por contato ou deslize sem pressão, complementada por soprador de ar nas frestas de retrovisores, grades, maçanetas e lanternas.'
            ],
            keyTakeaways: [
              'Execute movimentos retilíneos; nunca esfregue a luva em movimentos circulares.',
              'Utilize uma luva exclusiva para as partes inferiores (saias e base de para-choques).',
              'Nunca lave toalhas de secagem com amaciante de roupas, pois ele impermeabiliza as fibras.'
            ],
            videoConfig: {
              title: 'Técnica dos Dois Baldes e Secagem Combinada (Toalha + Soprador)',
              description: 'Slot preparado para vídeo sobre divisão de zonas da carroceria e secagem sem toque.',
              duration: '21:15',
              category: 'Lavagem técnica',
              youtubeUrl: '',
            },
            materials: [
              {
                id: 'mat-02-2',
                title: 'Protocolo de Manutenção de Microfibras (MICROLAV)',
                type: 'Checklist Técnico',
                summary: 'Como lavar, secar e armazenar luvas e toalhas de secagem preservando a maciez.',
                contentSteps: [
                  'Separar microfibras por função: pintura/secagem, vidros, interior e rodas/motor.',
                  'Lavar com shampoo próprio para microfibras (ex.: MICROLAV) sem alvejante e sem amaciante.',
                  'Secar à sombra e armazenar em caixas organizadoras vedadas contra poeira.'
                ],
              },
            ],
            exercise: {
              title: 'Execução Cronometrada de Lavagem por 3 Zonas e Secagem',
              objective: 'Concluir a lavagem de contato e secagem total sem deixar escorrimentos nos retrovisores.',
              requiredTools: ['2 Baldes com Grit Guard', '2 Luvas de microfibra', 'Toalha de secagem GSM 800+', 'Soprador de ar'],
              steps: [
                'Lave a Zona Superior enxaguando a luva no balde de água limpa a cada peça.',
                'Troque para a segunda luva ao lavar a Zona Inferior e para-choques.',
                'Seque os painéis com a toalha aberta e expulse a água retida nas frestas com o soprador.'
              ],
              safetyWarning: 'Se uma luva ou toalha cair no chão, descarte-a imediatamente da operação até ser lavada.',
              successCriteria: 'Pintura e vidros 100% secos, sem manchas d’água ou marcas de arrasto.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'course-03-descontaminacao',
    code: 'DP-103',
    title: 'Descontaminação Química e Mecânica da Pintura',
    category: 'Descontaminação da pintura',
    level: 'Iniciante',
    shortDescription:
      'Remoção segura de partículas ferrosas (IZER), piche e seiva (STRIKE), e uso técnico de Clay Bar com lubrificação dedicada (V-LUB).',
    fullDescription:
      'Mesmo após uma lavagem perfeita, contaminantes invisíveis ou ásperos permanecem cravados nos poros do verniz. Aprenda a combinar a descontaminação química e mecânica preparando a superfície para ceras, selantes ou polimento.',
    estimatedHours: 5,
    instructorNote:
      'A descontaminação química antes da Clay Bar reduz drasticamente o atrito mecânico e o risco de marring no verniz.',
    skillsAcquired: [
      'Teste tátil de aspereza com filme plástico fino',
      'Descontaminação ferrosa na pintura e rodas com indicador colorimétrico',
      'Remoção localizada de piche, asfalto e resíduos de adesivo',
      'Classificação de abrasividade de Clay Bar (suave, média e agressiva)',
    ],
    modules: [
      {
        id: 'mod-03-1',
        courseId: 'course-03-descontaminacao',
        order: 1,
        title: 'Módulo 1: Descontaminação Ferrosa, Piche e Clay Bar',
        description: 'Processos químicos e mecânicos para devolver a lisura absoluta ao verniz.',
        lessons: [
          {
            id: 'les-03-1',
            courseId: 'course-03-descontaminacao',
            moduleId: 'mod-03-1',
            order: 1,
            title: 'Descontaminação Química: Partículas Ferrosas e Remoção de Piche',
            summary: 'Como dissolver limalhas de freio oxidadas e pontos de asfalto sem esfregar a pintura.',
            durationMinutes: 25,
            contentParagraphs: [
              'Partículas metálicas incandescentes provenientes de pastilhas e discos de freio oxidam e se fixam no verniz e nas rodas. O descontaminante ferroso de pH neutro (como o IZER) reage quimicamente com o óxido de ferro, assumindo coloração púrpura avermelhada e solubilizando a partícula para enxágue seguro.',
              'Já respingos de piche asfáltico, cola de adesivos e seiva de árvores são apolares e exigem um removedor específico à base de solventes terpênicos ou hidrocarbonetos seguros para verniz (como o STRIKE).',
              'Ao realizar primeiro a descontaminação química, removemos grande parte dos contaminantes cortantes sem precisar arrastá-los na etapa seguinte de Clay Bar.'
            ],
            keyTakeaways: [
              'Jamais aplique descontaminante ferroso sob sol ou sobre superfície aquecida.',
              'Após usar removedor de piche (STRIKE), neutralize e enxágue a peça antes de aplicar revestimentos.',
              'Não permita que o descontaminante ferroso seque sobre vidros ou plásticos.'
            ],
            technicalSpecs: [
              { label: 'Tempo de Ação Ferroso (IZER)', value: '2 a 3 minutos (reagindo para cor roxa)' },
              { label: 'Superfícies Sensíveis', value: 'Evitar pinças sem pintura, chumbo de balanceamento e zinco' },
            ],
            videoConfig: {
              title: 'Descontaminação Química com IZER e STRIKE na Prática',
              description: 'Slot preparado para vídeo demonstrando a reação química púrpura e dissolução de piche.',
              duration: '15:30',
              category: 'Descontaminação da pintura',
              youtubeUrl: '',
            },
            materials: [
              {
                id: 'mat-03-1',
                title: 'Guia de Compatibilidade de Descontaminantes Químicos',
                type: 'Guia de Inspeção',
                summary: 'Cuidados por tipo de acabamento em rodas e pintura.',
                contentSteps: [
                  'Verificar se as pinças de freio possuem pintura original ou anodização delicada.',
                  'Pulverizar o descontaminante ferroso em painel frio e acompanhar a mudança de cor.',
                  'Enxaguar abundantemente com alta pressão de cima para baixo.'
                ],
              },
            ],
            exercise: {
              title: 'Descontaminação Química de Caixas Laterais e Tampa Traseira',
              objective: 'Eliminar pontos de piche e contaminação ferrosa acumulada nas áreas de turbulência do carro.',
              requiredTools: ['Descontaminante ferroso IZER', 'Removedor de piche STRIKE', 'Microfibra macia', 'EPIs'],
              steps: [
                'Com o carro limpo e frio, aplique o removedor de piche nos pontos pretos das portas inferiores.',
                'Remova suavemente sem pressão e enxágue.',
                'Pulverize o descontaminante ferroso na tampa traseira, aguarde 2 minutos e enxágue completamente.'
              ],
              safetyWarning: 'Trabalhe em local ventilado e utilize luvas e proteção respiratória.',
              successCriteria: 'Ausência de pontos pretos de asfalto ou pontos alaranjados de oxidação superficial.',
            },
          },
          {
            id: 'les-03-2',
            courseId: 'course-03-descontaminacao',
            moduleId: 'mod-03-1',
            order: 2,
            title: 'Descontaminação Mecânica com Clay Bar e Lubrificação Dedicada',
            summary: 'Técnica de deslizamento sem pressão, dobra da barra e inspeção pós-descontaminação.',
            durationMinutes: 25,
            contentParagraphs: [
              'A Clay Bar (barra descontaminante) funciona por cisalhamento controlado: enquanto desliza sobre uma película espessa de lubrificante específico (como V-LUB), ela captura apenas a ponta dos contaminantes que se projetam acima do nível do verniz (névoa de tinta/overspray, seiva cristalizada e poluição industrial).',
              'Para diagnosticar a necessidade de Clay Bar, vista a ponta dos dedos com um saquinho plástico fino (celofane) e deslize suavemente sobre o capô limpo: o plástico amplifica o tato e revela imediatamente qualquer aspereza.',
              'Use sempre a barra menos agressiva possível (gramatura suave para carros que não serão polidos ou que têm verniz macio), mantenha lubrificação abundante e dobre a barra frequentemente para expor uma face limpa.'
            ],
            keyTakeaways: [
              'Nunca use detergente ou shampoo agressivo como improvisação se ele degradar a liga da Clay Bar.',
              'Se a Clay Bar cair no chão, descarte-a imediatamente sem exceção.',
              'Pinturas escuras e vernizes macios podem apresentar leve marring após a Clay Bar, exigindo lustro.'
            ],
            videoConfig: {
              title: 'Uso Técnico de Clay Bar com V-LUB e Teste do Saquinho Plástico',
              description: 'Slot preparado para vídeo sobre avaliação tátil antes e depois da barra descontaminante.',
              duration: '14:50',
              category: 'Descontaminação da pintura',
              youtubeUrl: '',
            },
            materials: [
              {
                id: 'mat-03-2',
                title: 'Seleção de Grau de Clay Bar (Suave, Média e Pesada)',
                type: 'Guia de Inspeção',
                summary: 'Quando utilizar cada gramatura de barra descontaminante.',
                contentSteps: [
                  'Clay Suave (Fina): Manutenção periódica e preparação antes de ceras/selantes sem polimento.',
                  'Clay Média: Contaminação moderada quando o veículo passará por etapa de refino/lustro.',
                  'Clay Agressiva: Exclusiva para névoa pesada de tinta (overspray), seguida obrigatoriamente de polimento.'
                ],
              },
            ],
            exercise: {
              title: 'Teste Tátil Comparativo em Capô Dividido (50/50)',
              objective: 'Sentir a diferença de lisura e tensão superficial antes e após a descontaminação mecânica.',
              requiredTools: ['Clay Bar Suave (25g)', 'Lubrificante V-LUB', 'Saquinho plástico fino', 'Toalha de microfibra'],
              steps: [
                'Realize o teste do saquinho plástico em ambos os lados do capô.',
                'Lubrifique uma área de 40x40 cm com V-LUB e deslize a Clay Bar em movimentos lineares sem pressão.',
                'Seque com microfibra e repita o teste tátil comparando com o lado não descontaminado.'
              ],
              safetyWarning: 'Nunca deslize a Clay Bar sobre área seca para evitar marcas profundas de atrito.',
              successCriteria: 'Superfície totalmente lisa ao toque com filme plástico e sem marcas de arrasto.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'course-04-polimento',
    code: 'DP-201',
    title: 'Polimento Técnico e Correção de Pintura',
    category: 'Polimento e correção de pintura',
    level: 'Intermediário',
    shortDescription:
      'Inspeção micrométrica de verniz, setup de corte, refino e lustro (V10, V20, V30 / V-Cut, V-Polish, V-Finish) com roto-orbital e rotativa.',
    fullDescription:
      'Curso central de correção óptica de pintura automotiva. Aprenda a diagnosticar a dureza do verniz (macio, médio ou cerâmico duro), executar o Teste de Setup em 40x40 cm e alcançar acabamento espelhado livre de hologramas.',
    estimatedHours: 12,
    coverImage: GENERATED_IMAGES.polishing,
    instructorNote:
      'Preservar a camada de proteção UV do verniz é sempre mais importante do que perseguir a remoção de 100% de um risco profundo.',
    skillsAcquired: [
      'Medição de espessura com medidor digital em mícrons (µm)',
      'Combinação estratégica de boinas (lã, espuma corte, refino e lustro) e compostos',
      'Controle de velocidade de braço, pressão, rotação/OPM e temperatura de chapa',
      'Inspeção verdadeira com IPA / REVELAX para eliminar mascaramento por óleos',
    ],
    modules: [
      {
        id: 'mod-04-1',
        courseId: 'course-04-polimento',
        order: 1,
        title: 'Módulo 1: Diagnóstico de Verniz, Máquinas e Setup de Correção',
        description: 'Mapeamento micrométrico, cinemática das politrizes e execução de corte, refino e lustro.',
        lessons: [
          {
            id: 'les-04-1',
            courseId: 'course-04-polimento',
            moduleId: 'mod-04-1',
            order: 1,
            title: 'Inspeção de Pintura, Medição em Mícrons e Classificação de Verniz',
            summary: 'Como diagnosticar swirls, RIDS, oxidação e espessura segura antes de ligar a politriz.',
            durationMinutes: 35,
            imageUrl: GENERATED_IMAGES.polishing,
            imageCaption: 'Correção de pintura com politriz roto-orbital sob iluminação linear de diagnóstico.',
            contentParagraphs: [
              'A camada de verniz (clearcoat) de um automóvel moderno mede tipicamente entre 35 µm e 55 µm dentro de um sistema total (primer + base colorida + verniz) de 90 µm a 140 µm. Como a maior parte dos absorvedores de radiação UV concentra-se no terço superior do verniz, remover verniz de forma indiscriminada compromete a vida útil da pintura.',
              'Durante a inspeção, classificamos os defeitos em: Swirl Marks (micro-riscos circulares superficiais de lavagem), RIDS (Random Isolated Deeper Scratches — riscos isolados mais profundos), Hologramas (marcas tridimensionais deixadas por boinas rotativas mal finalizadas) e Calcificação/Water Spots.',
              'Sempre isole plásticos porosos, borrachas, quinas vivas e emblemas com fita crepe automotiva antes de iniciar o teste de setup.'
            ],
            keyTakeaways: [
              'Leituras totais abaixo de 80 µm exigem cautela máxima (apenas lustro ou refino leve).',
              'Inicie o Teste de Setup sempre pela combinação menos agressiva capaz de entregar a correção desejada.',
              'Proteja quinas e vincos: a espessura de verniz nas bordas é até 40% menor que no centro do painel.'
            ],
            technicalSpecs: [
              { label: 'Espessura Total OEM Típica', value: '95 µm a 135 µm (Base + Primer + Verniz)' },
              { label: 'Margem Segura de Desbaste Total', value: 'Máximo 3 µm a 8 µm ao longo da vida do veículo' },
              { label: 'Área Padrão de Teste (Test Spot)', value: 'Quadrante de 40 cm x 40 cm delimitado' },
            ],
            videoConfig: {
              title: 'Diagnóstico com Medidor de Espessura e Execução do Test Spot 40x40 cm',
              description: 'Slot preparado para vídeo sobre mapeamento em mícrons e escolha da combinação boina + composto.',
              duration: '22:40',
              category: 'Polimento e correção de pintura',
              youtubeUrl: 'https://www.youtube.com/watch?v=0jR8soZYSxA',
            },
            materials: [
              {
                id: 'mat-04-1',
                title: 'Mapa de Medição de Espessura por Painel (Mícrons)',
                type: 'Guia de Inspeção',
                summary: 'Folha técnica para registro de 5 pontos de leitura por peça.',
                contentSteps: [
                  'Calibrar o medidor de espessura nas lâminas padrão (ferrosa e alumínio).',
                  'Aferir 5 pontos por painel (quatro cantos e centro) e registrar a menor leitura.',
                  'Isolar borrachas, plásticos texturizados e frisos com fita automotiva de baixa aderência.'
                ],
              },
            ],
            exercise: {
              title: 'Execução de Test Spot e Inspeção com Revelador de Hologramas',
              objective: 'Encontrar o setup ideal para um verniz específico sem mascaramento por lubrificantes.',
              requiredTools: ['Lanterna de inspeção', 'Revelador REVELAX', 'Fita automotiva', 'Politriz roto-orbital'],
              steps: [
                'Delimite um quadrante de 40x40 cm no capô e inspecione os defeitos sob luz de 4000K e 6000K.',
                'Execute 4 passadas cruzadas com setup intermediário (ex.: boina de refino + composto V20 ou V-Polish).',
                'Remova os resíduos, aplique REVELAX para desengordurar a área e avalie o nível real de correção.'
              ],
              safetyWarning: 'Aguarde o painel esfriar antes de borrifar reveladores à base de solventes/álcool.',
              successCriteria: 'Identificação clara da dureza do verniz e definição justificada do setup para o restante do carro.',
            },
          },
          {
            id: 'les-04-2',
            courseId: 'course-04-polimento',
            moduleId: 'mod-04-1',
            order: 2,
            title: 'Técnica Roto-Orbital, Rotativa e Acabamento de Super Lustro',
            summary: 'Domínio das etapas de corte, refino e lustro com limpeza constante de boinas.',
            durationMinutes: 40,
            contentParagraphs: [
              'As politrizes roto-orbitais livres (15 mm ou 21 mm de órbita) combinam movimento orbital excêntrico com rotação livre do prato, reduzindo drasticamente o aquecimento localizado e eliminando o risco de gerar hologramas típicos da máquina rotativa.',
              'Na etapa de Corte (usando compostos como V10 ou V-CUT com boina de lã ou espuma agressiva), nivelamos os defeitos mais acentuados trabalhando em velocidade moderada, pressão controlada e movimento de braço lento (cerca de 2 a 3 cm por segundo) em passadas cruzadas (horizontal e vertical).',
              'No Refino (V20 / V-POLISH) e Lustro (V30 / V-FINISH), refinamos as micro-marcas do corte com boinas macias, aliviando a pressão nas duas passadas finais para atingir máxima profundidade óptica (gloss meter) e reflexão cristalina.'
            ],
            keyTakeaways: [
              'Limpe a boina com ar comprimido ou escova/lavadora de boinas a cada quadrante trabalhado.',
              'Boina saturada de composto velho e verniz removido perde o poder de corte e embaça o acabamento.',
              'Use sempre o revelador de hologramas (REVELAX) antes de aprovar a peça para vitrificação.'
            ],
            videoConfig: {
              title: 'Passo a Passo de Corte, Refino e Lustro com Roto-Orbital 15 mm',
              description: 'Slot preparado para vídeo técnico demonstrando velocidade de braço, passadas cruzadas e limpeza de boina.',
              duration: '26:10',
              category: 'Polimento e correção de pintura',
              youtubeUrl: 'https://www.youtube.com/watch?v=L0L3Vx-WD1o',
            },
            materials: [
              {
                id: 'mat-04-2',
                title: 'Matriz de Combinação: Compostos x Boinas Voxer',
                type: 'Checklist Técnico',
                summary: 'Guia rápido de pareamento entre abrasivos e densidades de espuma/lã.',
                contentSteps: [
                  'Corte Pesado: Composto V10 ou V-CUT + Boina de Lã ou Espuma de Corte Pesado.',
                  'Refino Intermediário: Composto V20 ou V-POLISH + Boina de Espuma de Refino.',
                  'Lustro e Acabamento: Composto V30 ou V-FINISH + Boina de Espuma Macia de Lustro.'
                ],
              },
            ],
            exercise: {
              title: 'Ciclo Completo de 3 Etapas em Painel Escuro',
              objective: 'Realizar corte, refino e lustro em peça escura eliminando 100% dos hologramas sob luz pontual.',
              requiredTools: ['Politriz roto-orbital', 'Boinas de corte, refino e lustro', 'Compostos V10/V20/V30', 'REVELAX'],
              steps: [
                'Lubrifique a boina (priming) e aplique 4 gotas de composto trabalhando em área de 40x40 cm.',
                'Limpe a boina após o ciclo, remova o resíduo com microfibra sem costura e inspecione.',
                'Avance para o refino e lustro, finalizando com inspeção química com REVELAX.'
              ],
              safetyWarning: 'Mantenha a máquina totalmente plana em relação ao painel; só ligue e desligue com a boina apoiada na peça.',
              successCriteria: 'Reflexo limpo, profundo e isento de marcas de boina ou névoa (haze) após inspeção com REVELAX.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'course-05-protecao',
    code: 'DP-202',
    title: 'Proteção de Pintura, Selantes e Vitrificação Cerâmica (Coating)',
    category: 'Proteção e vitrificação',
    level: 'Avançado',
    shortDescription:
      'Ceras nobres de Carnaúba + Sílica, selantes sintéticos e aplicação profissional de revestimentos cerâmicos (V-Paint, V-Plastic, V-Light, SiO2-Pro).',
    fullDescription:
      'Aprenda a ciência dos Last Step Products (LSP): desde ceras híbridas de carnaúba tipo 1 com sílica até vitrificadores cerâmicos de alta dureza. Domine a preparação da superfície, o ponto exato de flash time, o nivelamento com múltiplas microfibras e o protocolo de cura.',
    estimatedHours: 8,
    coverImage: GENERATED_IMAGES.ceramic,
    instructorNote:
      'O segredo da ancoragem e durabilidade de um coating cerâmico está 70% na descontaminação e desengorduramento prévio da superfície.',
    skillsAcquired: [
      'Diferenciação técnica entre ceras naturais, selantes poliméricos, carbosiloxy e SiO2 puro',
      'Aplicação cruzada de coating cerâmico sem deixar manchas escuras (high spots)',
      'Controle de temperatura, umidade, tempo de flash e cura parcial/total',
      'Manutenção profissional de veículos vitrificados com SiO2-PRO',
    ],
    modules: [
      {
        id: 'mod-05-1',
        courseId: 'course-05-protecao',
        order: 1,
        title: 'Módulo 1: Selantes Híbridos e Vitrificação Cerâmica',
        description: 'Ancoragem química, aplicação controlada, inspeção contra high spots e manutenção.',
        lessons: [
          {
            id: 'les-05-1',
            courseId: 'course-05-protecao',
            moduleId: 'mod-05-1',
            order: 1,
            title: 'Ceras de Carnaúba, Selantes Sintéticos e Tecnologias Híbridas (Carbosiloxy)',
            summary: 'Comparativo de ângulo de contato hidrofóbico, resistência química, brilho quente vs. vítreo e durabilidade.',
            durationMinutes: 25,
            contentParagraphs: [
              'Os produtos de proteção final (LSP) dividem-se em famílias com propostas distintas. As ceras de Carnaúba pura (como a linha Native) entregam um brilho quente e aveludado inconfundível, ideal para veículos de coleção e exposição, com durabilidade média de 60 a 120 dias.',
              'Já os sistemas híbridos de Carnaúba + Sílica (linha Blend) e os coatings spray de Carbosiloxy (linha Sinergy Paint) combinam facilidade de aplicação com alta hidrofobicidade e proteção de até 7 a 12 meses.',
              'Para máxima performance, toda proteção exige superfície previamente descontaminada e livre de óleos residuais.'
            ],
            keyTakeaways: [
              'Camada mais grossa de cera não significa maior proteção; aplique sempre uma película fina e uniforme.',
              'Respeite o tempo de cura antes de expor o veículo ao sereno ou chuva.',
              'eduque o cliente sobre a lavagem neutra para não degradar prematuramente o LSP.'
            ],
            videoConfig: {
              title: 'Comparativo Prático: Cera de Carnaúba, Híbrida SiO2 e Selante Spray',
              description: 'Slot preparado para vídeo demonstrando aplicação, remoção e teste de repelência à água.',
              duration: '16:20',
              category: 'Proteção e vitrificação',
              youtubeUrl: 'https://www.youtube.com/watch?v=Yle10pgcnj8',
            },
            materials: [
              {
                id: 'mat-05-1',
                title: 'Quadro Comparativo de Proteções (Durabilidade x Aplicação)',
                type: 'Guia de Inspeção',
                summary: 'Referência comercial e técnica para montagem de pacotes de proteção.',
                contentSteps: [
                  'Cera de Carnaúba (Native): Brilho profundo quente | Durabilidade até 4 meses.',
                  'Cera Híbrida Carnaúba + SiO2 (Blend Paste/Spray): Brilho + Hidrofobia | Até 7 meses (pasta).',
                  'Coating Spray Carbosiloxy (Sinergy Paint): Ancoragem rápida | Até 12 meses.'
                ],
              },
            ],
            exercise: {
              title: 'Aplicação Fina de Cera Híbrida e Avaliação de Ângulo de Contato',
              objective: 'Aplicar camada ultrafina com aplicador de espuma e remover sem sombras em pintura escura.',
              requiredTools: ['Cera Blend ou Native', 'Aplicador de espuma macio', '2 Toalhas de microfibra felpudas'],
              steps: [
                'Com a peça descontaminada, aplique movimentos uniformes formando um véu quase transparente.',
                'Aguarde o ponto de cura indicado no rótulo (teste do dedo limpo).',
                'Lustre com a primeira microfibra e dê o acabamento final com a segunda face limpa.'
              ],
              safetyWarning: 'Não aplique sob sol ou com a lataria acima de 28°C para evitar manchas de secagem rápida.',
              successCriteria: 'Toque extremamente aveludado e ausência total de sombras ou hologramas de cera.',
            },
          },
          {
            id: 'les-05-2',
            courseId: 'course-05-protecao',
            moduleId: 'mod-05-1',
            order: 2,
            title: 'Vitrificação Cerâmica Profissional (V-Paint) e Controle de Cura',
            summary: 'Desengorduramento com REVELAX, aplicação cruzada, identificação de Flash Time e prevenção de High Spots.',
            durationMinutes: 40,
            imageUrl: GENERATED_IMAGES.ceramic,
            imageCaption: 'Aplicação de revestimento cerâmico com bloco aplicador e suede sobre verniz espelhado.',
            contentParagraphs: [
              'A vitrificação cerâmica forma uma ligação covalente semipermanente com os poros do verniz, criando uma barreira micrométrica de dióxido de silício (SiO2) resistente a intempéries, fezes de aves, seiva de árvores, raios UV e micro-abrasão.',
              'Antes de abrir o frasco do vitrificador (ex.: V-PAINT), execute a limpeza química rigorosa de todo o veículo com REVELAX em duas etapas para garantir que nenhum óleo de polidor impeça a ancoragem do coating.',
              'Aplique o vitrificador em áreas pequenas (50x50 cm) em movimentos cruzados (horizontal e vertical). Observe o efeito arco-íris ou formação de micro-gotículas (flash time, que varia conforme temperatura e umidade) e faça o nivelamento imediato utilizando duas toalhas de microfibra novas: a primeira remove o excesso e a segunda refina as bordas para eliminar qualquer High Spot (mancha escura de excesso de produto).'
            ],
            keyTakeaways: [
              'Inspecione cada peça sob luz difusa e luz indireta de múltiplos ângulos para caçar High Spots antes que o coating endureça.',
              'Descarte os panos de microfibra usados na remoção imediata do coating ou deixe-os imersos em água imediatamente após o uso, pois o SiO2 cristaliza nas fibras.',
              'Explique com transparência ao cliente: vitrificação protege e facilita a limpeza, mas não torna o carro à prova de riscos mecânicos.'
            ],
            technicalSpecs: [
              { label: 'Temperatura de Aplicação', value: '18°C a 25°C em box fechado sem corrente de vento' },
              { label: 'Tempo sem Contato com Água', value: 'Mínimo 24h a 72h (cura inicial em abrigo seco)' },
              { label: 'Cura Total para Lavagem Química', value: '7 a 14 dias (usar apenas shampoo neutro após cura)' },
            ],
            videoConfig: {
              title: 'Protocolo Completo de Vitrificação V-Paint e Manutenção com SiO2-Pro',
              description: 'Slot preparado para vídeo sobre preparação com REVELAX, aplicação cruzada e inspeção de High Spots.',
              duration: '28:00',
              category: 'Proteção e vitrificação',
              youtubeUrl: 'https://www.youtube.com/watch?v=nbKBV9nBAMY',
            },
            materials: [
              {
                id: 'mat-05-2',
                title: 'Termo de Orientação Pós-Vitrificação para o Cliente',
                type: 'Checklist Técnico',
                summary: 'Instruções obrigatórias de entrega de veículo vitrificado.',
                contentSteps: [
                  'Respeitar o período de cura inicial sem expor o veículo à chuva ou lavagem.',
                  'Realizar lavagens exclusivamente com shampoo neutro (V-FLOC) e luva de microfibra.',
                  'Agendar manutenção periódica a cada 4 ou 6 meses com aplicação de SiO2-PRO.'
                ],
              },
            ],
            exercise: {
              title: 'Simulação de Nivelamento em Quadrante e Inspeção Contra High Spots',
              objective: 'Dominar o movimento cruzado e a técnica de 2 toalhas na remoção de revestimentos.',
              requiredTools: ['Bloco aplicador + Suede', 'Revestimento cerâmico ou selante', '2 Microfibras sem borda', 'Respirador VO'],
              steps: [
                'Coloque o respirador semifacial VO e luvas nitrílicas.',
                'Desengordure um painel de 50x50 cm com REVELAX.',
                'Realize a aplicação cruzada, aguarde o ponto de flash e faça o nivelamento com duas microfibras inspecionando as bordas.'
              ],
              safetyWarning: 'Obrigatório o uso de respirador para vapores orgânicos durante toda a aplicação de coatings.',
              successCriteria: 'Superfície espelhada, toque vítreo uniforme e zero manchas de excesso (high spots) sob luz indireta.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'course-06-interna',
    code: 'DP-301',
    title: 'Higienização Interna Profunda e Sanitização de Cabine',
    category: 'Higienização interna',
    level: 'Intermediário',
    shortDescription:
      'Aspiração técnica mapeada, higienização de forro de teto sem descolamento, extração controlada e descontaminação microbiológica.',
    fullDescription:
      'Domine o protocolo completo de higienização de interiores automotivos sem encharcar espumas ou comprometer componentes eletrônicos do console. Aprenda a utilizar limpadores bactericidas (Sintra Pro, Bactran) e finalizadores sanitizantes com segurança total.',
    estimatedHours: 7,
    coverImage: GENERATED_IMAGES.interior,
    instructorNote:
      'Um interior mal seco gera retorno garantido por odor de mofo. Controle a umidade em cada etapa.',
    skillsAcquired: [
      'Sequência de cima para baixo (teto -> painel/colunas -> bancos -> carpete)',
      'Limpeza segura de forro de teto sem dissolver a cola do tecido acoplado',
      'Extração de estofados e carpetes com enxágue neutralizador',
      'Sanitização e neutralização de odores orgânicos na cabine',
    ],
    modules: [
      {
        id: 'mod-06-1',
        courseId: 'course-06-interna',
        order: 1,
        title: 'Módulo 1: Protocolo de Cabine, Teto e Controle Microbiológico',
        description: 'Metodologia estruturada para limpeza interna sem excesso de umidade.',
        lessons: [
          {
            id: 'les-06-1',
            courseId: 'course-06-interna',
            moduleId: 'mod-06-1',
            order: 1,
            title: 'Aspiração Técnica, Forro de Teto e Cintos de Segurança',
            summary: 'Remoção de particulados secos e limpeza delicada de teto sem saturar a espuma.',
            durationMinutes: 30,
            imageUrl: GENERATED_IMAGES.interior,
            imageCaption: 'Detalhamento interno de precisão com pincel de cerdas naturais e espuma controlada.',
            contentParagraphs: [
              'Toda higienização interna começa a seco: antes de borrifar qualquer líquido, realizamos o sopro de frestas e trilhos seguido de aspiração minuciosa com escova macia acoplada. Molhar poeira acumulada transforma sujeira solta em lama impregnada nas fibras.',
              'O forro de teto exige cuidado redobrado: o tecido é unido à estrutura por uma fina camada de espuma e adesivo sensível a solventes e umidade excessiva. Nunca borrife líquido diretamente no teto nem utilize extratora ou escovas duras. Trabalhe aplicando espuma seca ou microfibra levemente umedecida com limpador neutro/suave (ex.: SINTRA diluído ou EXTRACTUS SENSITIVE) em movimentos lineares leves.',
              'Os cintos de segurança devem ser totalmente estendidos, presos com grampo plástico, higienizados com bactericida, enxaguados com pano úmido e mantidos esticados até secarem por completo antes de recolher.'
            ],
            keyTakeaways: [
              'Trabalhe sempre de cima para baixo: Teto -> Colunas e Cintos -> Painel/Portas -> Bancos -> Carpete.',
              'Jamais encharque o forro de teto para não degradar a espuma de acoplamento.',
              'Recolha e organize todos os pertences pessoais do cliente em sacola lacrada no check-in.'
            ],
            videoConfig: {
              title: 'Higienização Segura de Forro de Teto e Cintos de Segurança',
              description: 'Slot preparado para vídeo sobre controle de umidade no teto e limpeza completa das fitas do cinto.',
              duration: '19:10',
              category: 'Higienização interna',
              youtubeUrl: '',
            },
            materials: [
              {
                id: 'mat-06-1',
                title: 'Roteiro de Higienização Interna em 6 Etapas',
                type: 'Checklist Técnico',
                summary: 'Sequência operacional padrão de estúdio para interiores.',
                contentSteps: [
                  '1. Retirada de tapetes móveis, sopro com ar comprimido e aspiração seca completa.',
                  '2. Limpeza controlada de forro de teto, quebra-sóis e colunas superiores.',
                  '3. Estiramento, limpeza e secagem das fitas dos cintos de segurança.',
                  '4. Detalhamento de painel, console central, difusores de ar e forros de porta.',
                  '5. Higienização de bancos (couro ou tecido) e carpete inferior.',
                  '6. Secagem forçada, aplicação de Sanitizante Finalizador e inspeção de vidros.'
                ],
              },
            ],
            exercise: {
              title: 'Limpeza de Quebra-Sol, Coluna A e Cinto de Segurança',
              objective: 'Remover marcas de mão na coluna e sujidade de uso no cinto sem deixar auréolas de água.',
              requiredTools: ['Limpador SINTRA FAST/PRO', 'Frasco espumador', '3 Panos de microfibra', 'Grampo de fixação'],
              steps: [
                'Puxe o cinto até o final do curso e trave com o grampo para não recolher.',
                'Aplique a espuma do limpador no pano de microfibra e limpe a coluna A de ponta a ponta.',
                'Escove suavemente a fita do cinto, remova o resíduo com pano úmido e seque antes de destravar.'
              ],
              safetyWarning: 'Não aplique condicionadores escorregadios ou silicones nas fitas do cinto de segurança.',
              successCriteria: 'Coluna uniforme sem manchas de borda e cinto limpo e 100% seco.',
            },
          },
          {
            id: 'les-06-2',
            courseId: 'course-06-interna',
            moduleId: 'mod-06-1',
            order: 2,
            title: 'Descontaminação Bactericida, Extração e Secagem Técnica',
            summary: 'Eliminação de fungos, ácaros e odores com controle rigoroso de umidade residual.',
            durationMinutes: 28,
            contentParagraphs: [
              'Na limpeza por extração de bancos de tecido e carpetes, o erro mais comum é injetar litros de solução química até encharcar a espuma de poliuretano interna do assento. O processo correto baseia-se nos 4 pilares de Sinner: Química adequada (ex.: EXTRACTUS ou BACTRAN), Tempo de ação, Ação mecânica suave e Enxágue/Extração eficiente.',
              'Pulverize a solução diluída apenas na camada têxtil superficial, aguarde alguns minutos para o tensoativo soltar a sujeira, escove com cerdas macias e utilize a máquina extratora primeiro apenas aspirando e depois com jato fino de água limpa para enxaguar o tensoativo.',
              'Finalize com ventiladores/sopradores de piso até que a umidade residual seja zero e aplique o SANITIZANTE FINALIZADOR 4 EM 1.'
            ],
            keyTakeaways: [
              'Sempre enxágue o tecido na extratora apenas com água limpa para não deixar resíduo químico pegajoso.',
              'Nunca entregue um veículo com bancos úmidos ou janelas fechadas ainda evaporando umidade.',
              'Use EPIs (luvas e máscara) ao manusear água residual escura do tanque da extratora.'
            ],
            videoConfig: {
              title: 'Técnica de Extração sem Encharcamento e Sanitização Final',
              description: 'Slot preparado para vídeo de uso correto da extratora em bancos automotivos.',
              duration: '20:30',
              category: 'Higienização interna',
              youtubeUrl: '',
            },
            materials: [
              {
                id: 'mat-06-2',
                title: 'Tabela de Diluição: Extractus, Bactran e Sintra Pro',
                type: 'Tabela de Diluição',
                summary: 'Proporções recomendadas por grau de sujidade em estofados e painéis.',
                contentSteps: [
                  'Extractus (Sujidade Pesada em Estofados): 1:10 a 1:20 na pré-pulverização.',
                  'Extractus (Manutenção / Extratora): 1:40 a 1:60.',
                  'Sintra Pro (Painéis, Laterais e Plásticos Internos): 1:10 a 1:50 conforme sujidade.'
                ],
              },
            ],
            exercise: {
              title: 'Ciclo de Extração e Enxágue em Assento de Tecido',
              objective: 'Extrair a sujidade do tecido mantendo a espuma interna seca.',
              requiredTools: ['Extratora profissional', 'Pulverizador com EXTRACTUS', 'Escova de cerdas macias', 'Toalha seca'],
              steps: [
                'Aspire o assento a seco em duas direções.',
                'Pulverize névoa controlada de EXTRACTUS diluído, aguarde 3 minutos e escove sem pressão.',
                'Realize passadas lentas de sucção com a ponteira da extratora até cessar a saída de espuma.'
              ],
              safetyWarning: 'Cuidado com bancos dotados de sensores de presença de airbag ou aquecimento elétrico.',
              successCriteria: 'Tecido limpo, água de enxágue translúcida e secagem completa rápida.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'course-07-couro-plasticos',
    code: 'DP-302',
    title: 'Tratamento de Couro, Plásticos, Vinil e Impermeabilização Têxtil',
    category: 'Limpeza de couro, plásticos e tecidos',
    level: 'Intermediário',
    shortDescription:
      'Higienização e hidratação de couro (Higicouro, Hidracouro, V-Leather), renovação UV de plásticos (Intense, Restaurax) e impermeabilização (Impermax).',
    fullDescription:
      'Especialize-se no cuidado de materiais nobres e sensíveis. Aprenda a distinguir couro pigmentado revestido, couro anilina, sintético (PU/Courvin) e Alcântara, aplicando limpadores seguros, condicionadores de toque seco e revestimentos protetores.',
    estimatedHours: 6,
    instructorNote:
      'Couro limpo é sempre fosco e macio. Brilho excessivo no banco ou no volante é sinal de gordura corporal e suor acumulados.',
    skillsAcquired: [
      'Identificação de couro natural revestido, sintético e Alcântara',
      'Limpeza de poros do couro com escova de crina e condicionamento sem oleosidade',
      'Proteção acetinada UV de painéis internos (Intense) e revitalização externa (Restaurax)',
      'Impermeabilização profissional de tecidos com Impermax',
    ],
    modules: [
      {
        id: 'mod-07-1',
        courseId: 'course-07-couro-plasticos',
        order: 1,
        title: 'Módulo 1: Couro, Plásticos Internos/Externos e Impermeabilização',
        description: 'Limpeza profunda sem agressão ao topcoat e proteção duradoura.',
        lessons: [
          {
            id: 'les-07-1',
            courseId: 'course-07-couro-plasticos',
            moduleId: 'mod-07-1',
            order: 1,
            title: 'Limpeza Técnica e Condicionamento de Couro Automotivo',
            summary: 'Remoção de oleosidade dos poros com HIGICOURO e proteção com HIDRACOURO / V-LEATHER.',
            durationMinutes: 28,
            contentParagraphs: [
              'Mais de 90% dos bancos de couro automotivos modernos possuem um acabamento poliuretano de fábrica (topcoat) que protege a pele tingida. Com o uso diário, suor, óleos corporais e poeira preenchem os poros da textura, tornando o couro brilhante, escorregadio e propenso a trincas por abrasão.',
              'Utilize limpador específico para couro (HIGICOURO) com frasco espumador e escova macia de crina de cavalo em movimentos curtos e suaves. Remova a espuma suja imediatamente com microfibra limpa e úmida antes que ela seque de volta nos poros.',
              'Após a secagem natural (15 a 20 minutos), aplique o condicionador à base de lanolina (HIDRACOURO) ou coating específico para couro (V-LEATHER) para devolver a elasticidade, proteger contra raios UV e reduzir a transferência de cor de calças jeans.'
            ],
            keyTakeaways: [
              'Jamais use APCs alcalinos fortes, querosene ou esponjas mágicas (melamina) sobre bancos e volantes de couro.',
              'A esponja mágica é um micro-abrasivo que lixa e destrói o verniz protetor original do couro.',
              'Use fita crepe para fazer demonstração 50/50 apenas em peças íntegras e remova a fita devagar.'
            ],
            videoConfig: {
              title: 'Limpeza Profunda de Couro com Escova de Crina e Condicionamento Acetinado',
              description: 'Slot preparado para vídeo sobre recuperação do aspecto fosco original de bancos e volantes.',
              duration: '17:40',
              category: 'Limpeza de couro, plásticos e tecidos',
              youtubeUrl: '',
            },
            materials: [
              {
                id: 'mat-07-1',
                title: 'Guia de Diagnóstico de Couro e Costuras',
                type: 'Guia de Inspeção',
                summary: 'Como identificar desgaste de tinta vs. sujeira acumulada antes de limpar.',
                contentSteps: [
                  'Inspecionar abas laterais do banco do motorista e aro do volante quanto a perda de pigmento.',
                  'Fazer teste de compatibilidade em área oculta antes de iniciar a escovação.',
                  'Usar escova macia sem pressão excessiva sobre costuras e couro perfurado.'
                ],
              },
            ],
            exercise: {
              title: 'Descontaminação e Hidratação de Apoio de Braço ou Assento em Couro',
              objective: 'Devolver o acabamento fosco acetinado e o toque macio original do couro.',
              requiredTools: ['HIGICOURO', 'HIDRACOURO', 'Escova de crina macia', 'Aplicador de microfibra', '2 Panos limpos'],
              steps: [
                'Aplique HIGICOURO na escova de crina e trabalhe uma seção por vez sem encharcar costuras.',
                'Recolha a espuma imediatamente com pano de microfibra limpo.',
                'Com o couro seco, espalhe uma camada fina de HIDRACOURO e remova o eventual excesso após 10 minutos.'
              ],
              safetyWarning: 'Em couro perfurado, aplique o condicionador no aplicador e nunca esprema produto dentro dos furos.',
              successCriteria: 'Acabamento fosco uniforme, poros limpos e toque seco não escorregadio.',
            },
          },
          {
            id: 'les-07-2',
            courseId: 'course-07-couro-plasticos',
            moduleId: 'mod-07-1',
            order: 2,
            title: 'Renovação de Plásticos Internos/Externos e Impermeabilização de Tecidos',
            summary: 'Acabamento UV natural em painéis (INTENSE), plásticos externos (RESTAURAX / V-PLASTIC) e tecidos (IMPERMAX).',
            durationMinutes: 26,
            contentParagraphs: [
              'Plásticos internos de painel e portas sofrem incidência solar intensa através do para-brisa. Produtos antigos à base de silicone gorduroso causam reflexo perigoso no vidro e atraem poeira. O acabamento profissional exige protetores de toque seco e brilho acetinado original (como o INTENSE), aplicados com aplicador de espuma ou microfibra.',
              'Para plásticos externos texturizados esbranquiçados pelo sol (para-choques, churrasqueira do capô e molduras de caixa de roda), realizamos primeiro a limpeza profunda dos poros e em seguida aplicamos um restaurador polimérico (RESTAURAX) ou vitrificador permanente para plásticos (V-PLASTIC).',
              'Já nos bancos de tecido limpos e 100% secos, a aplicação cruzada do impermeabilizante (IMPERMAX) cria uma barreira hidrofóbica que impede a penetração de líquidos derramados acidentalmente.'
            ],
            keyTakeaways: [
              'Nunca borrife produtos diretamente sobre telas multimídia, cluster de instrumentos ou botões do volante.',
              'Jamais aplique revitalizadores de plástico em pedais (freio, acelerador, embreagem) ou tapetes de borracha onde o pé apoia.',
              'A impermeabilização de tecidos exige uso obrigatório de máscara respiratória VO e ambiente bem ventilado.'
            ],
            videoConfig: {
              title: 'Acabamento de Plásticos (Intense e Restaurax) e Impermeabilização (Impermax)',
              description: 'Slot preparado para vídeo sobre proteção UV de painéis e aplicação segura de impermeabilizante.',
              duration: '18:25',
              category: 'Limpeza de couro, plásticos e tecidos',
              youtubeUrl: '',
            },
            materials: [
              {
                id: 'mat-07-2',
                title: 'Protocolo de Segurança na Aplicação de Impermeabilizantes',
                type: 'Ficha de Segurança (FISPQ)',
                summary: 'Condições obrigatórias de umidade, EPI e cura para impermeabilização têxtil.',
                contentSteps: [
                  'Certificar que o tecido está 100% limpo, neutralizado (sem resíduo de sabão) e totalmente seco.',
                  'Isolar partes plásticas e couro adjacentes antes da pulverização.',
                  'Utilizar respirador semifacial com filtro para vapores orgânicos e manter exaustão ligada.'
                ],
              },
            ],
            exercise: {
              title: 'Restauração e Proteção UV de Moldura Plástica Externa e Painel',
              objective: 'Eliminar o aspecto esbranquiçado de plástico externo e proteger o painel sem brilho oleoso.',
              requiredTools: ['Limpador SINTRA', 'INTENSE (interno)', 'RESTAURAX (externo)', 'Aplicadores de espuma'],
              steps: [
                'Descontamine a peça plástica e aguarde secar completamente.',
                'Aplique INTENSE no painel interno usando aplicador de microfibra e dê acabamento uniforme.',
                'Aplique RESTAURAX na moldura plástica externa e nivele com microfibra após 5 minutos.'
              ],
              safetyWarning: 'Não aplique produtos deslizantes em manoplas de câmbio, aro do volante ou pedais.',
              successCriteria: 'Plástico com tonalidade preta profunda original, toque seco e zero manchas sob luz.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'course-08-motores-vidros',
    code: 'DP-303',
    title: 'Estética Técnica de Cofre do Motor e Descontaminação de Vidros',
    category: 'Estética de motores e vidros',
    level: 'Avançado',
    shortDescription:
      'Limpeza segura de motores modernos sem risco eletrônico (Vexus, Verniz de Motor / Verom) e remoção de chuva ácida em vidros (Prizm).',
    fullDescription:
      'Dois dos serviços de maior valor percebido e que exigem rigor técnico absoluto: a limpeza detalhada do cofre do motor preservando módulos eletrônicos e sensores, e a descontaminação química/polimento de vidros para visibilidade cristalina.',
    estimatedHours: 6,
    instructorNote:
      'No cofre do motor, água em excesso é inimiga; no vidro com chuva ácida, tempo de ação descontrolado pode causar esbranquiçamento irreversível.',
    skillsAcquired: [
      'Mapeamento e isolamento de módulos de injeção (ECU), alternador, bobinas e conectores',
      'Limpeza técnica a vapor ou baixa vazão com limpador específico (Vexus) e proteção (Verom / V-Energy)',
      'Remoção segura de marcas d’água calcificadas (chuva ácida) em vidros automotivos com Prizm',
      'Selagem hidrofóbica de para-brisa para segurança sob chuva intensa',
    ],
    modules: [
      {
        id: 'mod-08-1',
        courseId: 'course-08-motores-vidros',
        order: 1,
        title: 'Módulo 1: Cofre do Motor Seguro e Vidros sem Chuva Ácida',
        description: 'Procedimentos de segurança eletrônica no motor e recuperação óptica de vidros.',
        lessons: [
          {
            id: 'les-08-1',
            courseId: 'course-08-motores-vidros',
            moduleId: 'mod-08-1',
            order: 1,
            title: 'Limpeza Técnica e Proteção do Cofre do Motor',
            summary: 'Isolamento de componentes sensíveis, limpeza controlada com VEXUS e proteção com VEROM / V-ENERGY.',
            durationMinutes: 30,
            contentParagraphs: [
              'Motores modernos concentram dezenas de sensores, chicotes, módulos eletrônicos (ECU) e bobinas de ignição. Nunca execute lavagem com jatos de alta pressão a curta distância nem trabalhe com o motor quente (risco de choque térmico em coletores e trincas em blocos/sensores).',
              'Inicie soprando folhas e poeira seca das galerias de escoamento da churrasqueira. Isole o módulo de injeção, alternador, caixa de fusíveis, tomada de ar (intake) e bateria. Trabalhe por zonas utilizando limpador específico para motores e rodas (como o VEXUS, que não oxida alumínio e borrachas) aplicado com pincéis de detalhamento e removido com névoa controlada de baixa pressão, vapor ou panos úmidos.',
              'Secar 100% dos conectores com ar comprimido ou soprador térmico é obrigatório antes de aplicar o protetor de motor à base d’água (VEROM) ou coating específico (V-ENERGY).'
            ],
            keyTakeaways: [
              'Jamais lave um motor quente; aguarde o resfriamento completo.',
              'Em veículos híbridos, elétricos ou com histórico de falhas de chicote, realize apenas limpeza a seco localizada.',
              'Seque cada conector e alojamento de vela com ar comprimido antes de dar a partida.'
            ],
            videoConfig: {
              title: 'Isolamento Eletrônico, Limpeza com Vexus e Proteção do Cofre do Motor',
              description: 'Slot preparado para vídeo sobre limpeza segura de motores modernos e acabamento acetinado.',
              duration: '23:15',
              category: 'Estética de motores e vidros',
              youtubeUrl: '',
            },
            materials: [
              {
                id: 'mat-08-1',
                title: 'Checklist de Isolamento de Cofre do Motor',
                type: 'Checklist Técnico',
                summary: 'Itens obrigatórios para verificar e isolar antes da limpeza do motor.',
                contentSteps: [
                  'Aferir temperatura do motor (< 30°C) e verificar se há cabos ressecados ou fita isolante solta.',
                  'Isolar ECU (módulo), caixa de fusíveis, alternador, entrada do filtro de ar e sirene de alarme.',
                  'Limpar por quadrantes com pincel e VEXUS, secar com soprador e proteger com VEROM.'
                ],
              },
            ],
            exercise: {
              title: 'Mapeamento de Componentes Sensíveis e Limpeza da Tampa Acústica Superior',
              objective: 'Identificar todos os pontos críticos de um cofre do motor e executar limpeza controlada a seco/baixa umidade.',
              requiredTools: ['Limpador VEXUS', 'Protetor VEROM', 'Pincéis de detalhamento', 'Soprador de ar', 'Plástico de isolamento'],
              steps: [
                'Identifique e aponte: alternador, módulo ECU, caixa de fusíveis, corpo de borboleta e bateria.',
                'Limpe a manta/forração do capô e a capa superior do motor com VEXUS e microfibra.',
                'Seque com soprador e aplique VEROM nivelando com aplicador de espuma.'
              ],
              safetyWarning: 'Nunca ligue a ignição enquanto estiver trabalhando com líquidos ou desconectando sensores.',
              successCriteria: 'Cofre limpo, conexões 100% secas e acabamento acetinado sem excesso pegajoso.',
            },
          },
          {
            id: 'les-08-2',
            courseId: 'course-08-motores-vidros',
            moduleId: 'mod-08-1',
            order: 2,
            title: 'Descontaminação de Chuva Ácida em Vidros (Prizm) e Visibilidade',
            summary: 'Remoção segura de calcificação mineral sem manchar vidros ou frisos.',
            durationMinutes: 28,
            contentParagraphs: [
              'As manchas conhecidas como "chuva ácida" nos vidros são, na verdade, depósitos minerais alcalinos/calcários (cálcio, magnésio e sílica) deixados pela evaporação de gotas de água sobre o vidro quente. Esses minerais aderem fortemente ao silicato do vidro e prejudicam o trabalho das palhetas do limpador.',
              'O descontaminante químico ácido para vidros (como o PRIZM) dissolve rapidamente essas incrustações, mas exige técnica cirúrgica: trabalhe apenas na sombra, com o vidro totalmente frio, usando luvas nitrílicas e aplicando pequenas quantidades no aplicador de microfibra em áreas de no máximo 30x30 cm por 15 a 30 segundos, enxaguando abundantemente logo em seguida.',
              'Jamais deixe o produto escorrer para a pintura, frisos anodizados ou espelhos retrovisores, e nunca utilize em para-brisas trincados ou com delaminação.'
            ],
            keyTakeaways: [
              'Nunca deixe o descontaminante de vidros secar na superfície: o ácido pode esbranquiçar (queimar) o vidro permanentemente.',
              'Evite ou redobre a cautela no para-brisa dianteiro (vidro laminado é mais sensível que os vidros laterais temperados).',
              'Finalize limpando as borrachas das palhetas do limpador para não riscar o vidro recém-tratado.'
            ],
            technicalSpecs: [
              { label: 'Área Máxima por Vez', value: 'Quadrante de 30 cm x 30 cm' },
              { label: 'Tempo Máximo de Contato', value: '15 a 30 segundos em movimento contínuo' },
              { label: 'Neutralização / Enxágue', value: 'Água em abundância imediatamente após a ação' },
            ],
            videoConfig: {
              title: 'Remoção Segura de Chuva Ácida nos Vidros com Prizm',
              description: 'Slot preparado para vídeo sobre protocolo de segurança e enxágue imediato na descontaminação de vidros.',
              duration: '16:50',
              category: 'Estética de motores e vidros',
              youtubeUrl: '',
            },
            materials: [
              {
                id: 'mat-08-2',
                title: 'Protocolo de Segurança para Uso de Descontaminante Ácido em Vidros',
                type: 'Ficha de Segurança (FISPQ)',
                summary: 'Regras de ouro para evitar manchas ácidas acidentais.',
                contentSteps: [
                  'Usar obrigatoriamente luvas nitrílicas e óculos de segurança.',
                  'Isolar borrachas e frisos adjacentes e manter mangueira de água aberta ao lado.',
                  'Fazer teste prévio de 10 segundos no canto inferior de um vidro lateral.'
                ],
              },
            ],
            exercise: {
              title: 'Descontaminação de Vidro Lateral Temperado em Quadrantes',
              objective: 'Remover marcas de calcificação mineral de um vidro lateral com enxágue imediato.',
              requiredTools: ['PRIZM', 'Aplicador de microfibra', 'Luvas nitrílicas', 'Óculos de proteção', 'Água corrente'],
              steps: [
                'Lave e esfrie o vidro lateral na sombra.',
                'Coloque 3 gotas de PRIZM no aplicador úmido e esfregue suavemente uma área de 30x30 cm por 20 segundos.',
                'Enxágue imediatamente com água abundante e seque com pano próprio para vidros.'
              ],
              safetyWarning: 'Nunca aplique sobre espelhos retrovisores externos ou vidros aquecidos pelo sol.',
              successCriteria: 'Vidro 100% translúcido, hidrofílico uniforme na limpeza e sem marcas de gotas.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'course-09-avancadas',
    code: 'DP-401',
    title: 'Técnicas Profissionais Avançadas: Faróis, Lixamento e Micro-Detalhamento',
    category: 'Técnicas profissionais avançadas',
    level: 'Especialista',
    shortDescription:
      'Restauração óptica de faróis de policarbonato com vitrificação UV (V-Light), uso de Nano Politriz em Black Piano e correção localizada.',
    fullDescription:
      'Domine os procedimentos de alta precisão que diferenciam os grandes especialistas: restauração de faróis oxidados por lixamento progressivo controlado, polimento de colunas Black Piano e emblemas com Nano Politriz e tratamento técnico de rodas e pinças.',
    estimatedHours: 9,
    instructorNote:
      'Polir um farol sem aplicar proteção UV dedicada (V-Light) fará o policarbonato amarelar novamente em poucas semanas.',
    skillsAcquired: [
      'Lixamento úmido progressivo em policarbonato (grãos 800, 1200, 1500, 2000 e 3000)',
      'Vitrificação de faróis com V-LIGHT para reposição de barreira UV',
      'Correção de colunas Black Piano e consoles internos com Nano Politriz',
      'Coating específico de rodas e pinças de freio (Sinergy Wheel)',
    ],
    modules: [
      {
        id: 'mod-09-1',
        courseId: 'course-09-avancadas',
        order: 1,
        title: 'Módulo 1: Restauração de Faróis e Micro-Polimento com Nano Politriz',
        description: 'Nivelamento progressivo de policarbonato e acabamento em áreas restritas.',
        lessons: [
          {
            id: 'les-09-1',
            courseId: 'course-09-avancadas',
            moduleId: 'mod-09-1',
            order: 1,
            title: 'Restauração Técnica de Faróis e Proteção UV Permanente (V-Light)',
            summary: 'Diagnóstico interno vs. externo, sequência cruzada de lixas e aplicação de coating UV.',
            durationMinutes: 35,
            contentParagraphs: [
              'As lentes dos faróis modernos são fabricadas em policarbonato revestido de fábrica com um verniz protetor UV. Com os anos de exposição solar, esse verniz original oxida, fica amarelado e descasca, reduzindo em até 60% a eficiência luminosa noturna.',
              'Antes de orçar a restauração, avalie com lanterna se o dano é externo (camada oxidada áspera) ou se há micro-trincas internas no plástico (crazing) e infiltração de umidade. Proteja a pintura ao redor do farol com camada dupla de fita automotiva.',
              'Execute o lixamento úmido progressivo alternando o sentido da lixa a cada grão (ex.: grão 1000 na horizontal, 1500 na vertical, 2000 na horizontal e 3000 na vertical) para garantir que as marcas da lixa anterior foram 100% removidas. Em seguida, faça o corte e lustro com politriz de 3 polegadas e aplique obrigatoriamente o vitrificador UV para policarbonato (V-LIGHT).'
            ],
            keyTakeaways: [
              'Alternar a direção entre os grãos de lixa (horizontal vs. vertical) permite visualizar se restou algum risco do grão anterior.',
              'Mantenha a lixa sempre limpa e lubrificada com água.',
              'Nunca finalize uma restauração de farol sem aplicar proteção UV (V-LIGHT).'
            ],
            technicalSpecs: [
              { label: 'Sequência Típica de Lixas', value: 'P1000 -> P1500 -> P2000 -> P3000 (úmido)' },
              { label: 'Proteção Final Obrigatória', value: 'Coating de Quartzo UV V-LIGHT (ou verniz/PPF dedicado)' },
            ],
            videoConfig: {
              title: 'Lixamento Progressivo Cruzado, Polimento e Aplicação de V-Light em Faróis',
              description: 'Slot preparado para vídeo passo a passo de restauração óptica de lentes de policarbonato.',
              duration: '25:10',
              category: 'Técnicas profissionais avançadas',
              youtubeUrl: '',
            },
            materials: [
              {
                id: 'mat-09-1',
                title: 'Guia de Sequência de Lixamento para Faróis por Nível de Oxidação',
                type: 'Checklist Técnico',
                summary: 'Como escolher o grão inicial sem desbastar além do necessário.',
                contentSteps: [
                  'Amarelamento Leve sem Descascado: Iniciar em lixa P1500 -> P2000 -> P3000 + Polimento + V-Light.',
                  'Oxidação Moderada: Iniciar em P1000 -> P1500 -> P2000 -> P3000 + Polimento + V-Light.',
                  'Verniz Descascando Severamente: Iniciar em P800 -> P1200 -> P1500 -> P2000 -> P3000 + Polimento + V-Light.'
                ],
              },
            ],
            exercise: {
              title: 'Prática de Lixamento Cruzado e Nivelamento Óptico em Farol',
              objective: 'Eliminar 100% da camada oxidada e das marcas de lixa deixando a lente cristalina.',
              requiredTools: ['Fita automotiva larga', 'Lixas d’água 1000, 1500, 2000 e 3000', 'Politriz 3"', 'Compostos V10/V20', 'V-LIGHT'],
              steps: [
                'Isole todo o contorno da pintura ao redor do farol com fita dupla.',
                'Realize o lixamento úmido alternando o sentido horizontal e vertical a cada troca de grão.',
                'Faça o polimento de corte e refino, desengordure com REVELAX e aplique o V-LIGHT.'
              ],
              safetyWarning: 'Não aqueça excessivamente o policarbonato durante o polimento para não deformar a lente.',
              successCriteria: 'Transparência cristalina sem marcas de lixa visíveis sob lanterna de inspeção.',
            },
          },
          {
            id: 'les-09-2',
            courseId: 'course-09-avancadas',
            moduleId: 'mod-09-1',
            order: 2,
            title: 'Micro-Polimento de Colunas Black Piano e Acabamentos Delicados',
            summary: 'Uso de Nano Politriz de 1" e 2" em colunas de porta, emblemas e consoles internos.',
            durationMinutes: 28,
            contentParagraphs: [
              'As colunas externas em plástico Black Piano (preto brilhante) possuem um dos acabamentos mais macios e suscetíveis a riscos de toda a indústria automotiva. Até mesmo o toque de uma microfibra seca de baixa qualidade marca essas peças.',
              'Com o auxílio de uma Nano Politriz (pratos de 1 e 2 polegadas em modo roto-orbital), isolamos as borrachas das janelas e trabalhamos com boina de espuma macia ou média e polidor de refino/lustro (como V20/V30 ou V-FINISH) em velocidade baixa.',
              'Após corrigir e desengordurar com pano de altíssima maciez sem costura (corte a laser), protegemos imediatamente as colunas com coating cerâmico (V-PAINT ou V-PLASTIC) para preservar o acabamento espelhado.'
            ],
            keyTakeaways: [
              'Em Black Piano, use sempre a combinação de boina e polidor mais macia capaz de corrigir.',
              'Remova o resíduo de polidor com microfibra de corte a laser levemente umedecida para não riscar na limpeza.',
              'Mantenha rotação baixa para não aquecer o plástico.'
            ],
            videoConfig: {
              title: 'Correção de Colunas Black Piano e Console Interno com Nano Politriz',
              description: 'Slot preparado para vídeo sobre micro-polimento de precisão com pratos de 1 e 2 polegadas.',
              duration: '17:55',
              category: 'Técnicas profissionais avançadas',
              youtubeUrl: '',
            },
            materials: [
              {
                id: 'mat-09-2',
                title: 'Protocolo de Correção de Superfícies Black Piano',
                type: 'Checklist Técnico',
                summary: 'Cuidados para evitar marring na remoção do polidor.',
                contentSteps: [
                  'Isolar borrachas adjacentes com fita crepe automotiva.',
                  'Usar Nano Politriz no modo roto-orbital com boina de refino/lustro e composto V-FINISH.',
                  'Remover resíduos com microfibra felpuda sem costura e proteger com coating.'
                ],
              },
            ],
            exercise: {
              title: 'Espelhamento de Coluna B em Black Piano',
              objective: 'Corrigir os micro-riscos de lavagem na coluna B sem induzir marcas de pano na remoção.',
              requiredTools: ['Nano Politriz (prato 2")', 'Boina de espuma macia 2"', 'Polidor V30 ou V-FINISH', 'Microfibra corte a laser'],
              steps: [
                'Isole as borrachas laterais da coluna B.',
                'Execute 4 passadas lentas com Nano Politriz e boina macia.',
                'Remova o composto com pano de corte a laser sem pressão e inspecione com lanterna.'
              ],
              safetyWarning: 'Evite encostar a borda do prato nas borrachas das janelas.',
              successCriteria: 'Coluna Black Piano com reflexo profundo e livre de micro-riscos sob luz pontual.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'course-10-gestao',
    code: 'DP-501',
    title: 'Gestão, Precificação, Atendimento e Posicionamento de Estúdio',
    category: 'Gestão e profissionalização de um negócio de estética automotiva',
    level: 'Avançado',
    shortDescription:
      'Cálculo de hora-técnica, precificação de pacotes, check-in fotográfico jurídico, fotografia automotiva de portfólio e fidelização.',
    fullDescription:
      'Transforme excelência técnica em um negócio lucrativo, previsível e respeitado. Aprenda a calcular o custo real de hora-box e insumos por ml, estruturar cardápios de serviços em 3 níveis, conduzir o atendimento consultivo e produzir fotografias reais que vendem seu trabalho.',
    estimatedHours: 8,
    instructorNote:
      'Cobrar pelo preço do concorrente sem conhecer seu custo de hora-box é o caminho mais curto para trabalhar muito e não ver lucro.',
    skillsAcquired: [
      'Cálculo de custo fixo, custo variável de insumos por ml e valor da hora-técnica',
      'Estruturação de pacotes de serviços (Essencial, Avançado e Signature)',
      'Protocolo de vistoria de entrada (Check-in) e entrega técnica encantadora',
      'Fotografia automotiva técnica (50/50, reflexo de luz e pós-venda recorrente)',
    ],
    modules: [
      {
        id: 'mod-10-1',
        courseId: 'course-10-gestao',
        order: 1,
        title: 'Módulo 1: Precificação, Atendimento Consultivo e Marketing Técnico',
        description: 'Gestão financeira de estúdio, transparência técnica e retenção de clientes.',
        lessons: [
          {
            id: 'les-10-1',
            courseId: 'course-10-gestao',
            moduleId: 'mod-10-1',
            order: 1,
            title: 'Cálculo de Hora-Box, Consumo de Insumos e Montagem de Orçamentos',
            summary: 'Como precificar serviços por tempo real, complexidade, risco e margem líquida.',
            durationMinutes: 35,
            contentParagraphs: [
              'Na estética automotiva profissional, você não vende "produtos"; você vende horas de conhecimento técnico aplicado, infraestrutura segura e resultado estético duradouro. Para precificar com precisão, o primeiro passo é calcular o Custo da Hora-Box: some todas as despesas fixas mensais (aluguel, energia, água, internet, depreciação de máquinas, pró-labore base) e divida pelo total de horas produtivas reais no mês (tipicamente 140 a 160 horas).',
              'Em seguida, calcule o custo variável de insumos por serviço (graças à alta diluição dos produtos profissionais, o custo químico de uma lavagem detalhada ou higienização costuma representar apenas 5% a 12% do ticket, enquanto vitrificadores têm custo unitário mais elevado por carro).',
              'Jamais passe orçamento fechado de correção de pintura apenas por mensagem sem avaliar o tamanho do veículo, a cor, o estado atual do verniz e a expectativa do cliente.'
            ],
            keyTakeaways: [
              'Classifique a tabela de preços por porte do veículo (Hatch/Sedan Compacto, Sedan Médio/SUV, Pick-up/SUV Grande).',
              'Apresente sempre 3 opções de pacote no orçamento presencial para ancorar valor.',
              'Separe as contas pessoa física e pessoa jurídica do estúdio desde o primeiro dia.'
            ],
            technicalSpecs: [
              { label: 'Fórmula Base Hora-Box', value: 'Custos Fixos Totais Mensais ÷ Horas Produtivas no Mês' },
              { label: 'Composição do Preço Final', value: '(Horas x Hora-Box) + Insumos + Impostos/Taxas + Margem de Lucro' },
            ],
            videoConfig: {
              title: 'Planilha Prática de Hora-Box e Precificação de Serviços de Estética',
              description: 'Slot preparado para vídeo sobre cálculo financeiro e estruturação de pacotes lucrativos.',
              duration: '24:00',
              category: 'Gestão e profissionalização de um negócio de estética automotiva',
              youtubeUrl: '',
            },
            materials: [
              {
                id: 'mat-10-1',
                title: 'Modelo de Estrutura de Orçamento Consultivo em 3 Níveis',
                type: 'Planilha de Orçamento',
                summary: 'Como apresentar opções claras ao cliente durante a avaliação presencial.',
                contentSteps: [
                  'Pacote 1 (Conservação & Brilho): Lavagem técnica + Descontaminação + Lustro/Selante (6 meses).',
                  'Pacote 2 (Correção & Proteção Híbrida): Correção de 70-80% + Higienização + Coating Spray 1 ano.',
                  'Pacote 3 (Full Detail & Vitrificação): Correção técnica avançada + Vitrificação V-Paint + Vidros e Rodas.'
                ],
              },
            ],
            exercise: {
              title: 'Cálculo do Custo de Hora-Box e Precificação de um Polimento Técnico',
              objective: 'Determinar o preço mínimo e o preço ideal de um serviço de 12 horas de duração.',
              requiredTools: ['Calculadora', 'Tabela de custos de produtos diluídos', 'Ficha de orçamento'],
              steps: [
                'Liste os custos fixos mensais estimados da sua operação e divida por 150 horas produtivas.',
                'Multiplique o valor da hora-box por 12 horas de trabalho em um Polimento Técnico.',
                'Adicione o custo de compostos, boinas (fração de desgaste), energia, taxas e margem de 30%.'
              ],
              safetyWarning: 'Orçar serviços complexos sem vistoria presencial gera prejuízo de horas extras não cobradas.',
              successCriteria: 'Tabela de preços estruturada por porte de veículo com margem líquida positiva comprovada.',
            },
          },
          {
            id: 'les-10-2',
            courseId: 'course-10-gestao',
            moduleId: 'mod-10-1',
            order: 2,
            title: 'Check-in, Fotografia Automotiva Realista e Pós-Venda Recorrente',
            summary: 'Como documentar resultados reais sem filtros artificiais e criar receita recorrente de manutenção.',
            durationMinutes: 30,
            contentParagraphs: [
              'A confiança do cliente nasce na transparência do atendimento. Durante o check-in, utilize a lanterna de inspeção junto com o proprietário para mostrar os defeitos reais da pintura e explicar com honestidade o que pode ser removido com segurança e quais riscos profundos serão apenas suavizados para preservar o verniz.',
              'Ao fotografar e filmar o processo para o seu portfólio, mantenha o mesmo ângulo, a mesma distância focal e a mesma intensidade de iluminação no "Antes" e no "Depois". Jamais utilize filtros que escureçam a foto ou desligue a luz de inspeção no "Depois" — clientes exigentes reconhecem transparência técnica.',
              'Na entrega do veículo, apresente o certificado/orientação de cuidados e deixe agendada a lavagem de manutenção de 30 dias. O plano de manutenção recorrente garante o fluxo de caixa mensal do estúdio.'
            ],
            keyTakeaways: [
              'Fotografe o reflexo da lâmpada de inspeção exatamente na mesma posição antes e depois da correção.',
              'Envie 2 ou 3 fotos do andamento técnico (ex.: descontaminação, isolamento com fita) pelo WhatsApp do cliente durante o serviço.',
              'Crie um programa de manutenção mensal para todos os carros vitrificados no estúdio.'
            ],
            videoConfig: {
              title: 'Fotografia Automotiva de Portfólio (Antes/Depois Honestos) e Entrega Técnica',
              description: 'Slot preparado para vídeo sobre ângulos de câmera, foco no reflexo do verniz e protocolo de entrega.',
              duration: '19:45',
              category: 'Gestão e profissionalização de um negócio de estética automotiva',
              youtubeUrl: '',
            },
            materials: [
              {
                id: 'mat-10-2',
                title: 'Roteiro de Entrega Técnica e Pós-Venda de 7 e 30 Dias',
                type: 'Checklist Técnico',
                summary: 'Passos para encantamento na retirada do veículo e agendamento de retorno.',
                contentSteps: [
                  'Revisar vidros, pneus, frestas e odor interno 30 minutos antes da chegada do cliente.',
                  'Apresentar o veículo sob iluminação de destaque explicando os procedimentos realizados.',
                  'Enviar mensagem de acompanhamento 7 dias após a entrega e convite de manutenção aos 30 dias.'
                ],
              },
            ],
            exercise: {
              title: 'Registro Fotográfico Padronizado 50/50 de Correção ou Limpeza',
              objective: 'Capturar um comparativo técnico Antes/Depois com iluminação idêntica e foco cravado no grão da pintura.',
              requiredTools: ['Smartphone com lente limpa e trava de exposição (AE/AF Lock)', 'Lanterna de inspeção', 'Fita automotiva'],
              steps: [
                'Posicione a luz de inspeção a 45 graus refletindo no defeito da peça.',
                'Trave o foco e a exposição da câmera no reflexo da luz no verniz (não no fundo da lâmpada).',
                'Registre o Antes e o Depois mantendo exatamente a mesma posição e altura.'
              ],
              safetyWarning: 'Sempre solicite autorização do proprietário e oculte a placa do veículo antes de publicar fotos em redes sociais.',
              successCriteria: 'Par de fotos Antes/Depois com exposição idêntica evidenciando a correção real sem edição enganosa.',
            },
          },
        ],
      },
    ],
  },
];

export const PRODUCT_LIBRARY: ProductItem[] = [
  {
    id: 'prod-vfloc',
    name: 'V-FLOC',
    line: 'Linha V / Lavagem',
    category: 'Shampoo Automotivo Superconcentrado',
    stage: 'Lavagem técnica',
    type: 'Químico',
    phLevel: 'pH Neutro (7.0)',
    dilutionRatio: '1:20 na Snow Foam | 1:400 no balde',
    applicationSurface: 'Pintura, verniz, superfícies vitrificadas ou enceradas',
    technicalUsage:
      'Alto grau de lubrificação que reduz o coeficiente de atrito da luva de microfibra sobre o verniz, prevenindo micro-riscos e preservando ceras e coatings.',
    safetyEpi: ['Luvas nitrílicas (opcional em uso prolongado)'],
  },
  {
    id: 'prod-vmol',
    name: 'V-MOL',
    line: 'Linha V / Lavagem',
    category: 'Lava Autos Desincrustante',
    stage: 'Lavagem técnica',
    type: 'Químico',
    phLevel: 'Levemente Básico (pH ~8.0 a 9.0)',
    dilutionRatio: '1:10 a 1:50 (sujidade pesada) | 1:100 (manutenção)',
    applicationSurface: 'Carroceria com barro, lama, argila e filme de tráfego',
    technicalUsage:
      'Ideal para pré-lavagem por flotação quando há contaminação orgânica ou mineral aderida sem agredir a superfície.',
    safetyEpi: ['Luvas nitrílicas', 'Óculos de proteção'],
  },
  {
    id: 'prod-citron',
    name: 'CITRON',
    line: 'Linha V / Desengraxante',
    category: 'Lava Autos Desengraxante Cítrico',
    stage: 'Lavagem técnica',
    type: 'Químico',
    phLevel: 'Alcalino Cítrico',
    dilutionRatio: '1:10 a 1:50 na Snow Foam | 1:100 no balde',
    applicationSurface: 'Pintura em preparação para polimento, remoção de ceras antigas e insetos',
    technicalUsage:
      'Formulado com tensoativos e solventes naturais extraídos de frutas cítricas para remoção de matéria orgânica, graxa e ceras antigas.',
    safetyEpi: ['Luvas nitrílicas', 'Óculos de proteção'],
  },
  {
    id: 'prod-izer',
    name: 'IZER',
    line: 'Descontaminação',
    category: 'Descontaminante Ferroso',
    stage: 'Descontaminação da pintura',
    type: 'Químico',
    phLevel: 'pH Neutro (7.0)',
    dilutionRatio: 'Pronto uso',
    applicationSurface: 'Pintura automotiva e rodas envernizadas',
    technicalUsage:
      'Reage com partículas de ferro oxidado (pó de freio), mudando para coloração roxa e permitindo remoção no enxágue sem atrito mecânico.',
    safetyEpi: ['Luvas nitrílicas', 'Óculos de proteção', 'Respirador VO/GA em local fechado'],
  },
  {
    id: 'prod-strike',
    name: 'STRIKE',
    line: 'Descontaminação',
    category: 'Removedor de Piche e Cola',
    stage: 'Descontaminação da pintura',
    type: 'Químico',
    phLevel: 'Base Solvente Seguro',
    dilutionRatio: 'Pronto uso',
    applicationSurface: 'Pintura, partes baixas de portas e rodas com respingos de asfalto',
    technicalUsage:
      'Dissolve piche betuminoso, seiva de árvores e resíduos de adesivos sem necessidade de esfregação agressiva.',
    safetyEpi: ['Luvas nitrílicas', 'Óculos de proteção', 'Ventilação ativa'],
  },
  {
    id: 'prod-vlub',
    name: 'V-LUB',
    line: 'Descontaminação',
    category: 'Lubrificante para Clay Bar',
    stage: 'Descontaminação da pintura',
    type: 'Químico',
    phLevel: 'pH Neutro',
    dilutionRatio: 'Pronto uso',
    applicationSurface: 'Pintura e vidros durante descontaminação mecânica',
    technicalUsage:
      'Cria filme polímero deslizante que reduz o atrito da barra descontaminante (Clay Bar), evitando marring e sem degradar a liga da barra.',
    safetyEpi: ['Luvas nitrílicas'],
  },
  {
    id: 'prod-revelax',
    name: 'REVELAX',
    line: 'Inspeção Técnica',
    category: 'Revelador de Hologramas e Desengordurante',
    stage: 'Polimento e correção de pintura',
    type: 'Químico',
    dilutionRatio: 'Pronto uso',
    applicationSurface: 'Pintura durante polimento e pré-vitrificação',
    technicalUsage:
      'Remove óleos e lubrificantes de compostos polidores, revelando o real estado de correção do verniz e preparando a peça para ancoragem de coatings.',
    safetyEpi: ['Luvas nitrílicas', 'Ambiente ventilado'],
  },
  {
    id: 'prod-v10-v20-v30',
    name: 'Linha V10, V20 e V30 / V-Cut, V-Polish e V-Finish',
    line: 'Polimento Técnico',
    category: 'Sistema de Compostos Polidores (Corte, Refino e Lustro)',
    stage: 'Polimento e correção de pintura',
    type: 'Composto Polidor',
    dilutionRatio: 'Pronto uso (aplicação em gotas na boina)',
    applicationSurface: 'Vernizes automotivos originais e repinturas curadas',
    technicalUsage:
      'Abrasivos calibrados para nivelamento de riscos (Corte V10 / V-Cut), remoção de marcas de corte (Refino V20 / V-Polish) e espelhamento final (Lustro V30 / V-Finish).',
    safetyEpi: ['Protetor auricular', 'Óculos de proteção', 'Máscara contra poeira/particulados'],
  },
  {
    id: 'prod-voxer-polisher',
    name: 'Politriz Roto-Orbital Voxer 15 mm / 21 mm & Boinas Voxer',
    line: 'Equipamentos Voxer',
    category: 'Máquinas e Boinas de Polimento',
    stage: 'Polimento e correção de pintura',
    type: 'Equipamento',
    dilutionRatio: 'Equipamento elétrico / Acessório mecânico',
    applicationSurface: 'Correção de pintura em chapas planas e curvas',
    technicalUsage:
      'Órbita livre de 15 mm para equilíbrio entre corte e contornos, acompanhada de boinas de lã e espumas técnicas de células abertas/fechadas.',
    safetyEpi: ['Protetor auricular', 'Óculos de proteção', 'Postura ergonômica'],
  },
  {
    id: 'prod-vpaint',
    name: 'V-PAINT & SIO2-PRO',
    line: 'Ceramic Coating',
    category: 'Vitrificador Cerâmico para Pintura e Manutenção',
    stage: 'Proteção e vitrificação',
    type: 'Coating / Proteção',
    dilutionRatio: 'Pronto uso',
    applicationSurface: 'Pintura automotiva descontaminada e corrigida',
    technicalUsage:
      'Forma camada vítrea de SiO2 com alta dureza superficial, proteção UV, resistência química e hidrofobicidade por até 3 anos, mantido com SiO2-PRO.',
    safetyEpi: ['Respirador semifacial com filtro VO (obrigatório)', 'Luvas nitrílicas', 'Óculos de proteção'],
  },
  {
    id: 'prod-blend-native',
    name: 'Linhas BLEND (Carnaúba + SiO2) e NATIVE (Carnaúba Pura)',
    line: 'Ceras e Selantes',
    category: 'Proteção de Pintura em Pasta e Spray',
    stage: 'Proteção e vitrificação',
    type: 'Coating / Proteção',
    dilutionRatio: 'Pronto uso',
    applicationSurface: 'Pintura automotiva clara e escura',
    technicalUsage:
      'Combina o brilho quente da carnaúba cearense tipo 1 com a resistência e repelência à água da sílica (linha Blend).',
    safetyEpi: ['Luvas nitrílicas'],
  },
  {
    id: 'prod-sintra-extractus',
    name: 'SINTRA PRO, EXTRACTUS e BACTRAN',
    line: 'Higienização Interna',
    category: 'Limpadores Bactericidas e Extração Têxtil',
    stage: 'Higienização interna',
    type: 'Químico',
    phLevel: 'Balanceado para Interiores',
    dilutionRatio: '1:10 a 1:60 conforme nível de sujidade',
    applicationSurface: 'Painéis, laterais de porta, carpetes, teto e estofados de tecido',
    technicalUsage:
      'Flotação e remoção de sujidade orgânica e gordura em cabines com ação bactericida e baixa formação de espuma para extratoras.',
    safetyEpi: ['Luvas nitrílicas', 'Óculos de proteção'],
  },
  {
    id: 'prod-higicouro-hidracouro',
    name: 'HIGICOURO, HIDRACOURO e V-LEATHER',
    line: 'Cuidado do Couro',
    category: 'Limpeza, Hidratação e Coating para Couro',
    stage: 'Limpeza de couro, plásticos e tecidos',
    type: 'Químico',
    phLevel: 'Neutro / Específico para Couro',
    dilutionRatio: 'Pronto uso',
    applicationSurface: 'Bancos, volantes e painéis revestidos em couro natural ou sintético',
    technicalUsage:
      'Limpa profundamente os poros sem ressecar (Higicouro), devolve a maciez com acabamento fosco original (Hidracouro) e protege contra atrito e transferência de cor (V-Leather).',
    safetyEpi: ['Luvas nitrílicas'],
  },
  {
    id: 'prod-intense-restaurax',
    name: 'INTENSE, RESTAURAX e IMPERMAX',
    line: 'Plásticos e Tecidos',
    category: 'Proteção UV de Plásticos e Impermeabilizante Têxtil',
    stage: 'Limpeza de couro, plásticos e tecidos',
    type: 'Coating / Proteção',
    dilutionRatio: 'Pronto uso',
    applicationSurface: 'Plásticos internos (Intense), externos (Restaurax) e tecidos (Impermax)',
    technicalUsage:
      'Renova e protege plásticos contra degradação UV com toque seco e impermeabiliza fibras têxteis contra penetração de líquidos.',
    safetyEpi: ['Luvas nitrílicas', 'Respirador VO (obrigatório para Impermax)'],
  },
  {
    id: 'prod-vexus-verom-prizm',
    name: 'VEXUS, VEROM e PRIZM',
    line: 'Motor, Rodas e Vidros',
    category: 'Limpeza/Proteção de Motor e Descontaminante de Vidros',
    stage: 'Estética de motores e vidros',
    type: 'Químico',
    dilutionRatio: 'Pronto uso',
    applicationSurface: 'Cofre do motor, rodas (Vexus/Verom) e vidros externos (Prizm)',
    technicalUsage:
      'Vexus limpa graxa sem oxidar metais ou borrachas; Verom forma filme protetor à base d’água no motor; Prizm remove calcificação (chuva ácida) de vidros.',
    safetyEpi: ['Luvas nitrílicas (obrigatório)', 'Óculos de segurança'],
  },
  {
    id: 'prod-vlight-nano',
    name: 'V-LIGHT & Nano Politriz Voxer',
    line: 'Técnicas Avançadas',
    category: 'Coating UV para Faróis e Micro-Polimento',
    stage: 'Técnicas profissionais avançadas',
    type: 'Equipamento',
    dilutionRatio: 'Pronto uso / Equipamento técnico',
    applicationSurface: 'Faróis de policarbonato restaurados, colunas Black Piano e emblemas',
    technicalUsage:
      'Restabelece a proteção UV em lentes de faróis lixadas e permite correção cirúrgica com boinas de 1" e 2" em áreas estreitas.',
    safetyEpi: ['Respirador VO', 'Luvas nitrílicas', 'Óculos de proteção'],
  },
];

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    id: 'term-apc',
    term: 'APC (All Purpose Cleaner)',
    category: 'Fundamentos e segurança',
    definition:
      'Limpador multiuso concentrado cuja alcalinidade e poder de limpeza são ajustados por diluição em água conforme a superfície.',
    practicalContext:
      'Utilizado em caixas de roda, frestas externas ou interiores (quando específico para cabine, como o Sintra). Nunca deve secar sobre a peça.',
    relatedTerms: ['Diluição', 'pH', 'Tensoativo'],
  },
  {
    id: 'term-claybar',
    term: 'Clay Bar (Barra Descontaminante)',
    category: 'Descontaminação da pintura',
    definition:
      'Composto polimérico elástico utilizado com lubrificante específico para remover contaminantes sólidos ancorados nos poros do verniz.',
    practicalContext:
      'Remove névoa de tinta (overspray), seiva cristalizada e poluição industrial que não saem na lavagem comum.',
    relatedTerms: ['V-LUB', 'Marring', 'Overspray'],
  },
  {
    id: 'term-coating',
    term: 'Coating Cerâmico (Vitrificador)',
    category: 'Proteção e vitrificação',
    definition:
      'Revestimento líquido à base de dióxido de silício (SiO2) ou polissilazanos que cura formando uma camada vítrea covalente sobre o verniz.',
    practicalContext:
      'Oferece alta resistência química (pH 2 a 12), proteção UV, facilidade de limpeza e brilho vítreo por anos.',
    relatedTerms: ['Flash Time', 'High Spot', 'LSP'],
  },
  {
    id: 'term-flashtime',
    term: 'Flash Time (Ponto de Nivelamento)',
    category: 'Proteção e vitrificação',
    definition:
      'Intervalo de tempo entre a aplicação do vitrificador cerâmico na peça e o momento exato de evaporar o solvente portador para nivelamento com microfibra.',
    practicalContext:
      'Identificado visualmente pelo efeito arco-íris ou formação de micro-gotículas. Depende diretamente da temperatura e umidade do box.',
    relatedTerms: ['Coating Cerâmico', 'High Spot'],
  },
  {
    id: 'term-highspot',
    term: 'High Spot',
    category: 'Proteção e vitrificação',
    definition:
      'Mancha escura ou iridescente causada por excesso de vitrificador cerâmico que não foi nivelado corretamente antes da cura.',
    practicalContext:
      'Se detectado nos primeiros minutos, pode ser nivelado com o próprio aplicador; se já cristalizado após horas, exige polimento localizado e reaplicação.',
    relatedTerms: ['Flash Time', 'REVELAX'],
  },
  {
    id: 'term-holograma',
    term: 'Holograma (Buffer Trail)',
    category: 'Polimento e correção de pintura',
    definition:
      'Rastro óptico tridimensional em formato de ondas deixado no verniz pelo uso de máquinas rotativas, boinas agressivas ou técnica incorreta sem etapa de refino.',
    practicalContext:
      'Mais visível sob luz solar direta ou lanterna de inspeção pontual em carros escuros, especialmente após remover os óleos do polidor com REVELAX.',
    relatedTerms: ['Roto-Orbital', 'Refino', 'Swirl Marks'],
  },
  {
    id: 'term-swirls',
    term: 'Swirl Marks (Teias de Aranha)',
    category: 'Lavagem técnica',
    definition:
      'Micro-riscos multidirecionais que parecem circulares ao redor do reflexo de uma fonte de luz pontual.',
    practicalContext:
      'Causados principalmente por lavagens com esponjas sujas, panos inadequados ou secagem arrastando poeira abrasiva sobre o verniz.',
    relatedTerms: ['RIDS', 'Método de Dois Baldes', 'Snow Foam'],
  },
  {
    id: 'term-rids',
    term: 'RIDS (Random Isolated Deeper Scratches)',
    category: 'Polimento e correção de pintura',
    definition:
      'Riscos isolados, aleatórios e mais profundos que permanecem visíveis mesmo após a remoção dos swirl marks superficiais.',
    practicalContext:
      'Avaliados no check-in: se a unha travar no risco, muitas vezes atingiu a base colorida e deve ser apenas suavizado (arredondamento das bordas) sem remover todo o verniz.',
    relatedTerms: ['Mícrons (µm)', 'Verniz (Clearcoat)'],
  },
  {
    id: 'term-marring',
    term: 'Marring',
    category: 'Descontaminação da pintura',
    definition:
      'Leve embaçamento ou micro-marcas superficiais causadas por atrito mecânico de Clay Bar, toalha ou boina em vernizes macios.',
    practicalContext:
      'Facilmente removido com uma etapa rápida de lustro com boina macia.',
    relatedTerms: ['Clay Bar', 'Lustro'],
  },
  {
    id: 'term-lsp',
    term: 'LSP (Last Step Product)',
    category: 'Proteção e vitrificação',
    definition:
      'Produto aplicado na última etapa do detalhamento externo com a finalidade de proteger e dar acabamento à superfície.',
    practicalContext:
      'Inclui ceras de carnaúba, selantes sintéticos, ceras híbridas e revestimentos cerâmicos.',
    relatedTerms: ['Coating Cerâmico', 'Ângulo de Contato'],
  },
  {
    id: 'term-microns',
    term: 'Mícron (µm)',
    category: 'Polimento e correção de pintura',
    definition:
      'Unidade de medida equivalente à milésima parte de um milímetro (0,001 mm), utilizada para aferir a espessura das camadas de pintura automotiva.',
    practicalContext:
      'Uma folha de papel sulfite mede cerca de 90 a 100 µm — próximo da espessura total de toda a pintura original de um carro moderno.',
    relatedTerms: ['Verniz (Clearcoat)', 'Inspeção de Pintura'],
  },
  {
    id: 'term-waterspot',
    term: 'Water Spot (Calcificação / Chuva Ácida)',
    category: 'Estética de motores e vidros',
    definition:
      'Depósito mineral (cálcio, magnésio, sílica) deixado após a evaporação de gotas de água sobre vidros ou pintura.',
    practicalContext:
      'Classificado em Tipo I (depósito superficial mineral removível quimicamente) e Tipo II/III (corrosão/cratera no verniz que exige nivelamento por polimento).',
    relatedTerms: ['PRIZM', 'Escala de pH'],
  },
];

export const QUIZ_ASSESSMENTS: QuizAssessment[] = [
  {
    id: 'quiz-fundamentos-lavagem',
    title: 'Avaliação Técnica 01: Química, Diluições, EPIs e Lavagem Segura',
    category: 'Fundamentos e segurança',
    courseId: 'course-01-fundamentos',
    level: 'Iniciante',
    passingScorePercent: 75,
    description:
      'Verifique seu domínio sobre cálculos matemáticos de diluição, escala de pH, seleção de EPIs e prevenção de swirl marks na lavagem.',
    questions: [
      {
        id: 'qf-1',
        question:
          'Você precisa preparar um frasco pulverizador de 500 ml com um limpador na proporção de diluição 1:10 (1 parte de produto em 10 partes finais). Qual volume exato de produto concentrado e água deve ser utilizado?',
        options: [
          { id: 'a', text: '10 ml de produto e 490 ml de água' },
          { id: 'b', text: '50 ml de produto e 450 ml de água' },
          { id: 'c', text: '100 ml de produto e 400 ml de água' },
          { id: 'd', text: '25 ml de produto e 475 ml de água' },
        ],
        correctOptionId: 'b',
        explanation:
          'Dividindo o volume total de 500 ml por 10 partes iguais, cada parte corresponde a 50 ml (50 ml de produto concentrado + 450 ml de água = 500 ml).',
      },
      {
        id: 'qf-2',
        question:
          'Qual é o EPI respiratório correto e obrigatório durante a aplicação de vitrificadores cerâmicos (coatings) ou impermeabilizantes à base de solventes em estúdio?',
        options: [
          { id: 'a', text: 'Máscara cirúrgica descartável de TNT' },
          { id: 'b', text: 'Respirador semifacial com cartuchos químicos para Vapores Orgânicos (VO)' },
          { id: 'c', text: 'Apenas óculos de segurança, pois o produto é aplicado com bloco manual' },
          { id: 'd', text: 'Protetor auricular tipo concha' },
        ],
        correctOptionId: 'b',
        explanation:
          'Solventes portadores e compostos organossilano liberam vapores orgânicos que atravessam máscaras comuns de poeira/TNT, exigindo cartucho químico de carvão ativado específico para Vapores Orgânicos (VO).',
      },
      {
        id: 'qf-3',
        question:
          'Por que a pré-lavagem com espuma (Snow Foam) e enxágue de alta pressão deve ser executada antes de encostar a luva de microfibra na pintura?',
        options: [
          { id: 'a', text: 'Apenas para produzir efeito visual para redes sociais' },
          { id: 'b', text: 'Para encapsular e remover por flotação a sujeira abrasiva solta antes do atrito mecânico' },
          { id: 'c', text: 'Para substituir completamente a necessidade de secar o veículo no final' },
          { id: 'd', text: 'Para aquecer o verniz antes do polimento' },
        ],
        correctOptionId: 'b',
        explanation:
          'Os tensoativos da pré-lavagem quebram a tensão superficial e soltam grãos minerais abrasivos para que saiam no enxágue, evitando que sejam arrastados pela luva.',
      },
      {
        id: 'qf-4',
        question:
          'Qual o principal erro ao lavar toalhas de microfibra de secagem e acabamento na máquina de lavar?',
        options: [
          { id: 'a', text: 'Usar shampoo específico para microfibras (ex.: MICROLAV)' },
          { id: 'b', text: 'Secar as toalhas à sombra em local ventilado' },
          { id: 'c', text: 'Utilizar amaciante de roupas ou alvejante com cloro' },
          { id: 'd', text: 'Separar os panos de rodas dos panos de pintura' },
        ],
        correctOptionId: 'c',
        explanation:
          'O amaciante deposita polímeros graxos que entopem as microfibras, destruindo sua capacidade de absorção capilar de água e causando manchas na pintura.',
      },
    ],
  },
  {
    id: 'quiz-polimento-descontaminacao',
    title: 'Avaliação Técnica 02: Descontaminação e Correção de Pintura',
    category: 'Polimento e correção de pintura',
    courseId: 'course-04-polimento',
    level: 'Intermediário',
    passingScorePercent: 75,
    description:
      'Avalie seus conhecimentos sobre descontaminação ferrosa, Clay Bar, medição em mícrons, inspeção com REVELAX e cinemática de politrizes.',
    questions: [
      {
        id: 'qp-1',
        question:
          'Qual é a função principal da etapa de descontaminação (química e com Clay Bar) antes do polimento ou aplicação de proteção?',
        options: [
          { id: 'a', text: 'Dar brilho imediato substituindo a cera' },
          { id: 'b', text: 'Remover contaminantes ancorados nos poros do verniz que a lavagem comum não retira' },
          { id: 'c', text: 'Aumentar a espessura do verniz em 20 mícrons' },
          { id: 'd', text: 'Secar a lataria mais rapidamente' },
        ],
        correctOptionId: 'b',
        explanation:
          'Partículas ferrosas, piche e névoa de tinta permanecem cravados no verniz após a lavagem. Removê-los evita que se soltem na boina de polimento ou prejudiquem a ancoragem da proteção.',
      },
      {
        id: 'qp-2',
        question:
          'Durante um processo de polimento, por que o profissional deve utilizar um revelador de hologramas (como o REVELAX) após remover o composto com pano?',
        options: [
          { id: 'a', text: 'Para adicionar silicone brilhante e esconder os riscos restantes' },
          { id: 'b', text: 'Para remover os óleos lubrificantes do composto e inspecionar a correção real do verniz' },
          { id: 'c', text: 'Para substituir o uso da boina de espuma' },
          { id: 'd', text: 'Para amolecer os plásticos externos' },
        ],
        correctOptionId: 'b',
        explanation:
          'Os óleos lubrificantes dos polidores podem preencher temporariamente micro-riscos e hologramas (efeito filler). O REVELAX limpa a superfície revelando a correção verdadeira.',
      },
      {
        id: 'qp-3',
        question:
          'O que deve ser feito imediatamente se uma barra descontaminante (Clay Bar) cair acidentalmente no chão do estúdio?',
        options: [
          { id: 'a', text: 'Lavar em água corrente e continuar usando na lateral do carro' },
          { id: 'b', text: 'Dobrar a barra ao meio para esconder os grãos de areia e continuar' },
          { id: 'c', text: 'Descartar a barra imediatamente, pois micro-grãos abrasivos do piso riscarão severamente a pintura' },
          { id: 'd', text: 'Borrifar mais lubrificante V-LUB e usar nos vidros' },
        ],
        correctOptionId: 'c',
        explanation:
          'A Clay Bar tem alta aderência e captura instantaneamente partículas minerais cortantes do piso que não saem com lavagem e causam riscos profundos se passadas no carro.',
      },
      {
        id: 'qp-4',
        question:
          'Ao medir um capô com medidor de espessura de camada, você encontra leituras médias de 72 µm (mícrons). Qual a conduta técnica correta?',
        options: [
          { id: 'a', text: 'Executar lixamento pesado P1200 seguido de corte agressivo com boina de lã' },
          { id: 'b', text: 'Redobrar a cautela, alertar o cliente sobre o verniz fino e optar por setup conservador de lustro/refino leve' },
          { id: 'c', text: 'Aplicar removedor ácido concentrado sob o sol' },
          { id: 'd', text: 'Polir com alta pressão nas quinas e vincos do capô' },
        ],
        correctOptionId: 'b',
        explanation:
          'Leituras totais abaixo de 80 µm indicam camada de verniz extremamente fina; desbaste agressivo pode atravessar o verniz (strike-through) ou remover toda a proteção UV.',
      },
    ],
  },
  {
    id: 'quiz-protecao-interna-gestao',
    title: 'Avaliação Técnica 03: Vitrificação, Interiores, Motores e Gestão',
    category: 'Proteção e vitrificação',
    courseId: 'course-05-protecao',
    level: 'Avançado',
    passingScorePercent: 75,
    description:
      'Teste seus conhecimentos avançados em aplicação de coatings cerâmicos, cuidado com couro e forro de teto, descontaminação de vidros e precificação.',
    questions: [
      {
        id: 'qg-1',
        question:
          'Qual é a aparência natural de um banco ou volante de couro automotivo perfeitamente limpo e descontaminado?',
        options: [
          { id: 'a', text: 'Aspecto fosco/acetinado e toque macio, seco e não escorregadio' },
          { id: 'b', text: 'Brilho espelhado intenso e toque oleoso' },
          { id: 'c', text: 'Superfície áspera após uso de esponja mágica de melamina' },
          { id: 'd', text: 'Encharcado de silicone líquido perfumado' },
        ],
        correctOptionId: 'a',
        explanation:
          'O acabamento original de fábrica do couro automotivo é fosco/acetinado. O brilho em volantes e bancos usados é causado pelo acúmulo de suor, sebo e sujidade nos poros.',
      },
      {
        id: 'qg-2',
        question:
          'Qual cuidado é indispensável ao utilizar um descontaminante ácido de vidros (como o PRIZM) para remover marcas de chuva ácida?',
        options: [
          { id: 'a', text: 'Aplicar em todos os vidros ao mesmo tempo sob o sol e deixar agir por 20 minutos' },
          { id: 'b', text: 'Trabalhar à sombra com vidro frio, em pequenas áreas (30x30 cm) por 15-30s, sem deixar secar e enxaguando com água abundante' },
          { id: 'c', text: 'Aplicar também nos espelhos retrovisores e frisos cromados sem enxaguar' },
          { id: 'd', text: 'Trabalhar sem luvas para sentir a temperatura do ácido' },
        ],
        correctOptionId: 'b',
        explanation:
          'Descontaminantes ácidos para vidros agem em segundos; se secarem ou forem aplicados em vidro quente, podem causar manchas esbranquiçadas permanentes no silicato.',
      },
      {
        id: 'qg-3',
        question:
          'Por que é obrigatório aplicar um revestimento com proteção UV (como o V-LIGHT) logo após lixar e polir um farol de policarbonato amarelado?',
        options: [
          { id: 'a', text: 'Porque o lixamento remove os restos do verniz UV original, deixando o policarbonato exposto para amarelar novamente em poucas semanas' },
          { id: 'b', text: 'Para mudar a cor da lâmpada interna do farol' },
          { id: 'c', text: 'Para substituir as lixas d’água' },
          { id: 'd', text: 'Não é necessário proteger; apenas a massa de polir já garante 5 anos de proteção' },
        ],
        correctOptionId: 'a',
        explanation:
          'O policarbonato sem barreira UV sofre fotodegradação rápida sob o sol. O coating V-LIGHT repõe a proteção UV evitando a oxidação precoce.',
      },
      {
        id: 'qg-4',
        question:
          'Na gestão financeira de um estúdio de estética automotiva, como se calcula corretamente o Custo da Hora-Box?',
        options: [
          { id: 'a', text: 'Copiando a tabela de preços do concorrente mais barato do bairro e descontando 10%' },
          { id: 'b', text: 'Somando todos os custos fixos mensais da operação e dividindo pelo total de horas produtivas reais no mês' },
          { id: 'c', text: 'Multiplicando o preço de um frasco de shampoo por 2' },
          { id: 'd', text: 'Cobrando o mesmo valor fixo para qualquer serviço, independentemente de durar 2 horas ou 16 horas' },
        ],
        correctOptionId: 'b',
        explanation:
          'Conhecer o custo exato de cada hora produtiva do box garante que o tempo investido em serviços longos (polimento, higienização, vitrificação) cubra a estrutura e gere lucro líquido.',
      },
    ],
  },
];
