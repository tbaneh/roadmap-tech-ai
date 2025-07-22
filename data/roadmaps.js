// Roadmaps data structure
export const roadmaps = {
  'data-analyst': {
    id: 'data-analyst',
    title: 'Data Analyst',
    description: 'Transforme dados em insights acionáveis. Domine SQL, Excel, Power BI e Python básico para se tornar um analista de dados requisitado no mercado.',
    icon: '📊',
    difficulty: 'beginner',
    duration: '4-6 meses',
    color: 'blue',
    gradient: 'from-blue-500 to-blue-700',
    tags: ['SQL', 'Excel', 'Power BI', 'Python'],
    prerequisite: 'Conhecimento básico de matemática e lógica',
    careerPath: 'Data → BI Analyst → Data Scientist',
    averageSalary: 'R$ 4.000 - R$ 8.000',
    sections: [
      {
        id: 'foundations',
        title: 'Fundamentos de Dados',
        description: 'Base sólida em conceitos de dados e estatística',
        estimatedHours: 40,
        topics: [
          {
            id: 'data-concepts',
            title: 'Conceitos Básicos de Dados',
            description: 'Tipos de dados, estruturas e qualidade',
            estimatedHours: 8,
            resources: [
              { type: 'Curso', title: 'Introduction to Data Analysis', url: 'https://www.coursera.org/learn/introduction-to-data-analytics', provider: 'Coursera' },
              { type: 'Livro', title: 'Data Science for Business', url: 'https://www.amazon.com/Data-Science-Business-Foster-Provost/dp/1449361323', provider: 'Amazon' },
              { type: 'Vídeo', title: 'What Does a Data Analyst Do?', url: 'https://www.youtube.com/watch?v=yZvFH7B6gKI', provider: 'YouTube' }
            ]
          },
          {
            id: 'statistics-basics',
            title: 'Estatística Descritiva',
            description: 'Medidas de tendência central, dispersão e distribuições',
            estimatedHours: 16,
            resources: [
              { type: 'Curso', title: 'Statistics for Data Science', url: 'https://www.udemy.com/course/statistics-for-data-science-and-business-analysis/', provider: 'Udemy' },
              { type: 'Prática', title: 'Khan Academy Statistics', url: 'https://www.khanacademy.org/math/statistics-probability', provider: 'Khan Academy' },
              { type: 'Ferramenta', title: 'StatKey Web Applets', url: 'http://www.lock5stat.com/StatKey/', provider: 'StatKey' }
            ]
          },
          {
            id: 'excel-advanced',
            title: 'Excel Avançado',
            description: 'Fórmulas, tabelas dinâmicas e visualizações',
            estimatedHours: 16,
            resources: [
              { type: 'Curso', title: 'Excel para Análise de Dados', url: 'https://udemy.com/excel-data-analysis', provider: 'Udemy' },
              { type: 'Prática', title: 'Exercícios Excel - Hashtag', url: 'https://hashtagtreinamentos.com/excel', provider: 'Hashtag' },
              { type: 'Template', title: 'Templates de Dashboards', url: 'https://excel-templates.com', provider: 'Excel Templates' }
            ]
          }
        ]
      },
      {
        id: 'sql',
        title: 'SQL Mastery',
        description: 'Domine a linguagem essencial para trabalhar com dados',
        estimatedHours: 60,
        topics: [
          {
            id: 'sql-basics',
            title: 'SQL Fundamentals',
            description: 'SELECT, WHERE, GROUP BY, JOIN e funções agregadas',
            estimatedHours: 24,
            resources: [
              { type: 'Curso', title: 'SQL para Data Science', url: 'https://coursera.org/sql-data-science', provider: 'Coursera' },
              { type: 'Prática', title: 'SQLBolt Interactive Tutorial', url: 'https://sqlbolt.com', provider: 'SQLBolt' },
              { type: 'Prática', title: 'HackerRank SQL', url: 'https://hackerrank.com/domains/sql', provider: 'HackerRank' }
            ]
          },
          {
            id: 'sql-intermediate',
            title: 'SQL Intermediário',
            description: 'CTEs, Window Functions, subconsultas avançadas',
            estimatedHours: 20,
            resources: [
              { type: 'Curso', title: 'Advanced SQL', url: 'https://mode.com/sql-tutorial', provider: 'Mode Analytics' },
              { type: 'Prática', title: 'SQL Exercises - W3Schools', url: 'https://w3schools.com/sql/sql_exercises.asp', provider: 'W3Schools' },
              { type: 'Dataset', title: 'Sample Databases', url: 'https://github.com/microsoft/sql-server-samples', provider: 'Microsoft' }
            ]
          },
          {
            id: 'sql-optimization',
            title: 'Otimização e Performance',
            description: 'Índices, query optimization e boas práticas',
            estimatedHours: 16,
            resources: [
              { type: 'Artigo', title: 'SQL Performance Tips', url: 'https://sqlperformance.com', provider: 'SQL Performance' },
              { type: 'Curso', title: 'Database Performance Tuning', url: 'https://pluralsight.com/sql-performance', provider: 'Pluralsight' },
              { type: 'Ferramenta', title: 'SQL Server Query Analyzer', url: 'https://docs.microsoft.com/sql/tools', provider: 'Microsoft' }
            ]
          }
        ]
      },
      {
        id: 'visualization',
        title: 'Visualização de Dados',
        description: 'Crie dashboards e relatórios impactantes',
        estimatedHours: 50,
        topics: [
          {
            id: 'powerbi-fundamentals',
            title: 'Power BI Fundamentals',
            description: 'Interface, modelagem e relacionamentos',
            estimatedHours: 20,
            resources: [
              { type: 'Curso', title: 'Power BI Completo', url: 'https://udemy.com/powerbi-complete', provider: 'Udemy' },
              { type: 'Documentação', title: 'Microsoft Power BI Docs', url: 'https://docs.microsoft.com/power-bi', provider: 'Microsoft' },
              { type: 'Template', title: 'Power BI Templates', url: 'https://powerbi.microsoft.com/templates', provider: 'Microsoft' }
            ]
          },
          {
            id: 'dax-basics',
            title: 'DAX Essentials',
            description: 'Medidas, colunas calculadas e time intelligence',
            estimatedHours: 16,
            resources: [
              { type: 'Curso', title: 'DAX Formulas', url: 'https://sqlbi.com/dax', provider: 'SQLBI' },
              { type: 'Referência', title: 'DAX Guide', url: 'https://dax.guide', provider: 'DAX Guide' },
              { type: 'Prática', title: 'DAX Exercises', url: 'https://exceleratorbi.com.au/dax-exercises', provider: 'ExceleratorBI' }
            ]
          },
          {
            id: 'dashboard-design',
            title: 'Design de Dashboards',
            description: 'UX/UI, storytelling e boas práticas visuais',
            estimatedHours: 14,
            resources: [
              { type: 'Livro', title: 'Storytelling with Data', url: 'https://storytellingwithdata.com', provider: 'Cole Nussbaumer Knaflic' },
              { type: 'Curso', title: 'Dashboard Design Principles', url: 'https://tableau.com/learn/training', provider: 'Tableau' },
              { type: 'Inspiração', title: 'Power BI Gallery', url: 'https://community.powerbi.com/t5/Data-Stories-Gallery/bd-p/DataStoriesGallery', provider: 'Power BI Community' }
            ]
          }
        ]
      },
      {
        id: 'python-intro',
        title: 'Python para Análise',
        description: 'Introdução ao Python para manipulação de dados',
        estimatedHours: 40,
        topics: [
          {
            id: 'python-basics',
            title: 'Python Fundamentals',
            description: 'Sintaxe, estruturas de dados e controle de fluxo',
            estimatedHours: 16,
            resources: [
              { type: 'Curso', title: 'Python para Análise de Dados', url: 'https://python.org.br/introducao', provider: 'Python Brasil' },
              { type: 'Prática', title: 'Python Exercises', url: 'https://w3schools.com/python/python_exercises.asp', provider: 'W3Schools' },
              { type: 'IDE', title: 'Jupyter Notebook', url: 'https://jupyter.org', provider: 'Jupyter' }
            ]
          },
          {
            id: 'pandas-numpy',
            title: 'Pandas & NumPy',
            description: 'Manipulação e análise de dados estruturados',
            estimatedHours: 16,
            resources: [
              { type: 'Curso', title: 'Pandas Fundamentals', url: 'https://kaggle.com/learn/pandas', provider: 'Kaggle' },
              { type: 'Documentação', title: 'Pandas User Guide', url: 'https://pandas.pydata.org/docs/user_guide', provider: 'Pandas' },
              { type: 'Prática', title: '100 Pandas Exercises', url: 'https://github.com/ajcr/100-pandas-puzzles', provider: 'GitHub' }
            ]
          },
          {
            id: 'visualization-python',
            title: 'Matplotlib & Seaborn',
            description: 'Criação de gráficos e visualizações em Python',
            estimatedHours: 8,
            resources: [
              { type: 'Tutorial', title: 'Matplotlib Tutorial', url: 'https://matplotlib.org/stable/tutorials', provider: 'Matplotlib' },
              { type: 'Galeria', title: 'Seaborn Examples', url: 'https://seaborn.pydata.org/examples', provider: 'Seaborn' },
              { type: 'Prática', title: 'Python Graph Gallery', url: 'https://python-graph-gallery.com', provider: 'Python Graph Gallery' }
            ]
          }
        ]
      },
      {
        id: 'projects',
        title: 'Projetos Práticos',
        description: 'Aplique seus conhecimentos em projetos reais',
        estimatedHours: 60,
        topics: [
          {
            id: 'sales-dashboard',
            title: 'Dashboard de Vendas',
            description: 'Análise completa de performance de vendas',
            estimatedHours: 20,
            resources: [
              { type: 'Dataset', title: 'Sample Superstore', url: 'https://kaggle.com/datasets/vivek468/superstore-dataset-final', provider: 'Kaggle' },
              { type: 'Tutorial', title: 'Sales Analysis Tutorial', url: 'https://youtube.com/watch?v=sales-dashboard', provider: 'YouTube' },
              { type: 'Template', title: 'Dashboard Template', url: 'https://powerbi.microsoft.com/templates', provider: 'Microsoft' }
            ]
          },
          {
            id: 'customer-segmentation',
            title: 'Segmentação de Clientes',
            description: 'Análise RFM e clustering básico',
            estimatedHours: 20,
            resources: [
              { type: 'Dataset', title: 'Online Retail Dataset', url: 'https://kaggle.com/datasets/hellbuoy/online-retail-customer-dataset', provider: 'Kaggle' },
              { type: 'Artigo', title: 'RFM Analysis Guide', url: 'https://clevertap.com/blog/rfm-analysis', provider: 'CleverTap' },
              { type: 'Notebook', title: 'Customer Segmentation Example', url: 'https://github.com/customer-segmentation', provider: 'GitHub' }
            ]
          },
          {
            id: 'financial-analysis',
            title: 'Análise Financeira',
            description: 'KPIs financeiros e forecasting básico',
            estimatedHours: 20,
            resources: [
              { type: 'Dataset', title: 'Financial Sample', url: 'https://docs.microsoft.com/power-bi/create-reports/sample-financial-download', provider: 'Microsoft' },
              { type: 'Curso', title: 'Financial Analysis in Excel', url: 'https://coursera.org/financial-analysis-excel', provider: 'Coursera' },
              { type: 'Template', title: 'Financial Dashboard', url: 'https://powerbi.microsoft.com/templates', provider: 'Microsoft' }
            ]
          }
        ]
      }
    ]
  },

  'bi-analyst': {
    id: 'bi-analyst',
    title: 'BI Analyst',
    description: 'Crie dashboards e relatórios impactantes. Especialize-se em Power BI, Tableau, DAX e storytelling com dados.',
    icon: '📈',
    difficulty: 'intermediate',
    duration: '5-7 meses',
    color: 'green',
    gradient: 'from-green-500 to-green-700',
    tags: ['Power BI', 'Tableau', 'DAX', 'SQL', 'ETL'],
    prerequisite: 'Conhecimento básico de SQL e Excel',
    careerPath: 'Data Analyst → BI Analyst → BI Manager',
    averageSalary: 'R$ 6.000 - R$ 12.000',
    sections: [
      {
        id: 'bi-foundations',
        title: 'Fundamentos de BI',
        description: 'Conceitos essenciais de Business Intelligence',
        estimatedHours: 40,
        topics: [
          {
            id: 'bi-concepts',
            title: 'Conceitos de BI',
            description: 'OLAP, OLTP, Data Warehouse, Data Mart',
            estimatedHours: 12,
            resources: [
              { type: 'Curso', title: 'Business Intelligence Fundamentals', url: 'https://coursera.org/learn/business-intelligence-fundamentals', provider: 'Coursera' },
              { type: 'Livro', title: 'The Data Warehouse Toolkit', url: 'https://www.amazon.com/Data-Warehouse-Toolkit-Definitive-Dimensional/dp/1118530802', provider: 'Amazon' },
              { type: 'Artigo', title: 'BI vs Analytics', url: 'https://tableau.com/learn/articles/business-intelligence', provider: 'Tableau' }
            ]
          },
          {
            id: 'dimensional-modeling',
            title: 'Modelagem Dimensional',
            description: 'Star schema, snowflake e fact tables',
            estimatedHours: 16,
            resources: [
              { type: 'Curso', title: 'Data Modeling for BI', url: 'https://www.udemy.com/course/data-modeling-for-business-intelligence/', provider: 'Udemy' },
              { type: 'Documentação', title: 'Power BI Data Modeling', url: 'https://docs.microsoft.com/power-bi/guidance/star-schema', provider: 'Microsoft' },
              { type: 'Prática', title: 'AdventureWorks Sample', url: 'https://github.com/microsoft/sql-server-samples', provider: 'Microsoft' }
            ]
          },
          {
            id: 'etl-basics',
            title: 'ETL e Data Integration',
            description: 'Extract, Transform, Load e integração de dados',
            estimatedHours: 12,
            resources: [
              { type: 'Curso', title: 'ETL with Power BI', url: 'https://www.pluralsight.com/courses/power-bi-etl', provider: 'Pluralsight' },
              { type: 'Ferramenta', title: 'Power Query M Language', url: 'https://docs.microsoft.com/powerquery-m/', provider: 'Microsoft' },
              { type: 'Prática', title: 'ETL Examples', url: 'https://github.com/MicrosoftLearning/DA-100-Analyzing-Data-with-Power-BI', provider: 'GitHub' }
            ]
          }
        ]
      },
      {
        id: 'power-bi-mastery',
        title: 'Power BI Mastery',
        description: 'Domine a ferramenta líder de BI da Microsoft',
        estimatedHours: 80,
        topics: [
          {
            id: 'power-bi-basics',
            title: 'Power BI Desktop',
            description: 'Interface, conectores de dados e transformações básicas',
            estimatedHours: 20,
            resources: [
              { type: 'Curso', title: 'Power BI Complete Course', url: 'https://www.udemy.com/course/microsoft-power-bi-up-running-with-power-bi-desktop/', provider: 'Udemy' },
              { type: 'Documentação', title: 'Power BI Learning Path', url: 'https://docs.microsoft.com/learn/powerplatform/power-bi', provider: 'Microsoft Learn' },
              { type: 'Prática', title: 'Power BI Samples', url: 'https://docs.microsoft.com/power-bi/create-reports/sample-datasets', provider: 'Microsoft' }
            ]
          },
          {
            id: 'dax-fundamentals',
            title: 'DAX Fundamentals',
            description: 'Linguagem de fórmulas do Power BI',
            estimatedHours: 25,
            resources: [
              { type: 'Curso', title: 'DAX Mastery', url: 'https://www.sqlbi.com/training/introducing-dax-video-course/', provider: 'SQLBI' },
              { type: 'Livro', title: 'The Definitive Guide to DAX', url: 'https://www.sqlbi.com/books/the-definitive-guide-to-dax-2nd-edition/', provider: 'SQLBI' },
              { type: 'Referência', title: 'DAX Function Reference', url: 'https://docs.microsoft.com/dax/dax-function-reference', provider: 'Microsoft' }
            ]
          },
          {
            id: 'advanced-visualizations',
            title: 'Visualizações Avançadas',
            description: 'Custom visuals, formatação e design principles',
            estimatedHours: 20,
            resources: [
              { type: 'Curso', title: 'Power BI Data Visualization', url: 'https://www.coursera.org/learn/analytics-tableau', provider: 'Coursera' },
              { type: 'Galeria', title: 'Power BI Visuals Gallery', url: 'https://appsource.microsoft.com/marketplace/apps?product=power-bi-visuals', provider: 'Microsoft AppSource' },
              { type: 'Inspiração', title: 'Power BI Community Gallery', url: 'https://community.powerbi.com/t5/Data-Stories-Gallery/bd-p/DataStoriesGallery', provider: 'Power BI Community' }
            ]
          },
          {
            id: 'power-bi-service',
            title: 'Power BI Service & Collaboration',
            description: 'Publicação, compartilhamento e governança',
            estimatedHours: 15,
            resources: [
              { type: 'Curso', title: 'Power BI Service Administration', url: 'https://www.pluralsight.com/courses/power-bi-service-administration', provider: 'Pluralsight' },
              { type: 'Documentação', title: 'Power BI Admin Guide', url: 'https://docs.microsoft.com/power-bi/admin/', provider: 'Microsoft' },
              { type: 'Certificação', title: 'Power BI Data Analyst Associate', url: 'https://docs.microsoft.com/certifications/data-analyst-associate/', provider: 'Microsoft' }
            ]
          }
        ]
      },
      {
        id: 'tableau-expertise',
        title: 'Tableau Expertise',
        description: 'Alternativa poderosa para visualização de dados',
        estimatedHours: 60,
        topics: [
          {
            id: 'tableau-desktop',
            title: 'Tableau Desktop',
            description: 'Interface, conexões e visualizações básicas',
            estimatedHours: 25,
            resources: [
              { type: 'Curso', title: 'Tableau Desktop Specialist', url: 'https://www.tableau.com/learn/training/20201-tableau-desktop-i-fundamentals', provider: 'Tableau' },
              { type: 'Prática', title: 'Tableau Public', url: 'https://public.tableau.com/app/discover', provider: 'Tableau Public' },
              { type: 'Dataset', title: 'Sample Superstore', url: 'https://help.tableau.com/samples/en-us/superstore_sample.xlsx', provider: 'Tableau' }
            ]
          },
          {
            id: 'tableau-calculations',
            title: 'Cálculos Avançados',
            description: 'LOD expressions, table calculations e parâmetros',
            estimatedHours: 20,
            resources: [
              { type: 'Curso', title: 'Advanced Tableau', url: 'https://www.udemy.com/course/tableau20-advanced/', provider: 'Udemy' },
              { type: 'Documentação', title: 'Tableau Calculations', url: 'https://help.tableau.com/current/pro/desktop/en-us/calculations_calculatedfields.htm', provider: 'Tableau' },
              { type: 'Prática', title: 'Workout Wednesday', url: 'http://www.workout-wednesday.com/', provider: 'Community' }
            ]
          },
          {
            id: 'tableau-server',
            title: 'Tableau Server & Publishing',
            description: 'Deployment, segurança e colaboração',
            estimatedHours: 15,
            resources: [
              { type: 'Curso', title: 'Tableau Server Administration', url: 'https://www.tableau.com/learn/training/tableau-server-administration', provider: 'Tableau' },
              { type: 'Documentação', title: 'Tableau Server Guide', url: 'https://help.tableau.com/current/server/en-us/', provider: 'Tableau' },
              { type: 'Certificação', title: 'Tableau Desktop Certified Associate', url: 'https://www.tableau.com/learn/certification/desktop-certified-associate', provider: 'Tableau' }
            ]
          }
        ]
      },
      {
        id: 'data-storytelling',
        title: 'Data Storytelling',
        description: 'Transforme dados em narrativas impactantes',
        estimatedHours: 40,
        topics: [
          {
            id: 'design-principles',
            title: 'Princípios de Design',
            description: 'UX/UI para dashboards e relatórios',
            estimatedHours: 15,
            resources: [
              { type: 'Livro', title: 'Storytelling with Data', url: 'https://www.storytellingwithdata.com/', provider: 'Cole Nussbaumer Knaflic' },
              { type: 'Curso', title: 'Data Visualization and Communication', url: 'https://www.coursera.org/learn/analytics-tableau', provider: 'Coursera' },
              { type: 'Blog', title: 'The Big Book of Dashboards', url: 'https://bigbookofdashboards.com/', provider: 'Wiley' }
            ]
          },
          {
            id: 'dashboard-best-practices',
            title: 'Dashboard Best Practices',
            description: 'Layout, cores, hierarquia visual e usabilidade',
            estimatedHours: 12,
            resources: [
              { type: 'Artigo', title: 'Dashboard Design Principles', url: 'https://www.klipfolio.com/resources/articles/what-is-a-dashboard', provider: 'Klipfolio' },
              { type: 'Template', title: 'Dashboard Templates', url: 'https://powerbi.microsoft.com/en-us/desktop/', provider: 'Microsoft' },
              { type: 'Inspiração', title: 'Dashboard Examples Gallery', url: 'https://public.tableau.com/app/discover/viz-of-the-day', provider: 'Tableau Public' }
            ]
          },
          {
            id: 'executive-reporting',
            title: 'Executive Reporting',
            description: 'Relatórios para C-level e stakeholders',
            estimatedHours: 13,
            resources: [
              { type: 'Curso', title: 'Executive Dashboard Design', url: 'https://www.linkedin.com/learning/executive-reporting-with-power-bi', provider: 'LinkedIn Learning' },
              { type: 'Template', title: 'Executive Dashboard Templates', url: 'https://appsource.microsoft.com/marketplace/apps?search=executive%20dashboard', provider: 'Microsoft AppSource' },
              { type: 'Artigo', title: 'KPIs for Executives', url: 'https://www.klipfolio.com/resources/kpi-examples', provider: 'Klipfolio' }
            ]
          }
        ]
      },
      {
        id: 'advanced-analytics',
        title: 'Advanced Analytics',
        description: 'Análises preditivas e estatísticas em BI',
        estimatedHours: 50,
        topics: [
          {
            id: 'statistical-analysis',
            title: 'Análise Estatística',
            description: 'Correlação, regressão e testes de hipótese',
            estimatedHours: 20,
            resources: [
              { type: 'Curso', title: 'Statistics for Business Analytics', url: 'https://www.coursera.org/learn/wharton-statistics', provider: 'Coursera' },
              { type: 'Ferramenta', title: 'Power BI R Integration', url: 'https://docs.microsoft.com/power-bi/connect-data/desktop-r-scripts', provider: 'Microsoft' },
              { type: 'Prática', title: 'Statistical Analysis Examples', url: 'https://github.com/microsoft/powerbi-desktop-samples', provider: 'GitHub' }
            ]
          },
          {
            id: 'forecasting',
            title: 'Forecasting & Time Series',
            description: 'Previsões e análise de séries temporais',
            estimatedHours: 18,
            resources: [
              { type: 'Curso', title: 'Time Series Forecasting', url: 'https://www.udemy.com/course/time-series-analysis/', provider: 'Udemy' },
              { type: 'Ferramenta', title: 'Power BI Forecasting', url: 'https://docs.microsoft.com/power-bi/visuals/power-bi-visualization-forecasting', provider: 'Microsoft' },
              { type: 'Dataset', title: 'Time Series Datasets', url: 'https://github.com/datasets/time-series', provider: 'GitHub' }
            ]
          },
          {
            id: 'cohort-analysis',
            title: 'Cohort & Retention Analysis',
            description: 'Análise de coortes e retenção de usuários',
            estimatedHours: 12,
            resources: [
              { type: 'Artigo', title: 'Cohort Analysis Guide', url: 'https://blog.amplitude.com/cohort-analysis', provider: 'Amplitude' },
              { type: 'Template', title: 'Cohort Analysis Template', url: 'https://community.powerbi.com/t5/Community-Blog/Cohort-Analysis-in-Power-BI/ba-p/1081067', provider: 'Power BI Community' },
              { type: 'Dataset', title: 'E-commerce Cohort Data', url: 'https://www.kaggle.com/datasets/carrie1/ecommerce-data', provider: 'Kaggle' }
            ]
          }
        ]
      },
      {
        id: 'bi-projects',
        title: 'Projetos BI Premium',
        description: 'Projetos práticos para portfólio profissional',
        estimatedHours: 80,
        topics: [
          {
            id: 'sales-dashboard',
            title: 'Dashboard de Vendas Executivo',
            description: 'Dashboard completo para área comercial',
            estimatedHours: 25,
            resources: [
              { type: 'Dataset', title: 'AdventureWorks Sales', url: 'https://github.com/microsoft/sql-server-samples', provider: 'Microsoft' },
              { type: 'Template', title: 'Sales Dashboard Template', url: 'https://appsource.microsoft.com/product/power-bi/pbi-contentpacks.pbi-microsoft-dynamics-crm', provider: 'Microsoft' },
              { type: 'Tutorial', title: 'Building Sales Dashboards', url: 'https://docs.microsoft.com/power-bi/create-reports/desktop-excel-stunning-report', provider: 'Microsoft' }
            ]
          },
          {
            id: 'financial-reporting',
            title: 'Relatório Financeiro Automatizado',
            description: 'P&L, cash flow e KPIs financeiros',
            estimatedHours: 30,
            resources: [
              { type: 'Dataset', title: 'Financial Sample Data', url: 'https://docs.microsoft.com/power-bi/create-reports/sample-financial-download', provider: 'Microsoft' },
              { type: 'Template', title: 'Financial Report Template', url: 'https://appsource.microsoft.com/product/power-bi-template-apps/pbi_template_apps.template-financial-reporting', provider: 'Microsoft AppSource' },
              { type: 'Curso', title: 'Financial Analysis with Power BI', url: 'https://www.udemy.com/course/financial-analysis-with-microsoft-power-bi/', provider: 'Udemy' }
            ]
          },
          {
            id: 'hr-analytics',
            title: 'HR Analytics Dashboard',
            description: 'Métricas de RH, turnover e performance',
            estimatedHours: 25,
            resources: [
              { type: 'Dataset', title: 'HR Analytics Dataset', url: 'https://www.kaggle.com/datasets/pavansubhasht/ibm-hr-analytics-attrition-dataset', provider: 'Kaggle' },
              { type: 'Template', title: 'HR Dashboard Template', url: 'https://community.powerbi.com/t5/Data-Stories-Gallery/HR-Analytics-Dashboard/m-p/182749', provider: 'Power BI Community' },
              { type: 'Artigo', title: 'HR Metrics that Matter', url: 'https://www.bamboohr.com/hr-metrics/', provider: 'BambooHR' }
            ]
          }
        ]
      }
    ]
  },

  'data-scientist': {
    id: 'data-scientist',
    title: 'Data Scientist',
    description: 'Construa modelos de ML e IA. Domine Python, estatística, machine learning e algoritmos avançados.',
    icon: '🧠',
    difficulty: 'advanced',
    duration: '8-12 meses',
    color: 'purple',
    gradient: 'from-purple-500 to-purple-700',
    tags: ['Python', 'Machine Learning', 'Statistics', 'Deep Learning', 'MLOps'],
    prerequisite: 'Python intermediário, matemática e estatística',
    careerPath: 'Data Analyst → Data Scientist → ML Engineer',
    averageSalary: 'R$ 8.000 - R$ 18.000',
    sections: [
      {
        id: 'math-stats',
        title: 'Matemática e Estatística',
        description: 'Base matemática sólida para Data Science',
        estimatedHours: 80,
        topics: [
          {
            id: 'linear-algebra',
            title: 'Álgebra Linear',
            description: 'Vetores, matrizes e transformações lineares',
            estimatedHours: 25,
            resources: [
              { type: 'Curso', title: 'Linear Algebra - MIT', url: 'https://ocw.mit.edu/courses/mathematics/18-06-linear-algebra-spring-2010', provider: 'MIT OpenCourseWare' },
              { type: 'Vídeo', title: '3Blue1Brown Linear Algebra', url: 'https://youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab', provider: 'YouTube' },
              { type: 'Prática', title: 'NumPy Linear Algebra', url: 'https://numpy.org/doc/stable/reference/routines.linalg.html', provider: 'NumPy' }
            ]
          }
          // ... mais tópicos
        ]
      }
      // ... mais seções
    ]
  },

  'data-engineer': {
    id: 'data-engineer',
    title: 'Data Engineer',
    description: 'Construa pipelines de dados robustos. Especialize-se em Python, SQL, tecnologias Cloud e Big Data.',
    icon: '⚙️',
    difficulty: 'advanced',
    duration: '6-10 meses',
    color: 'red',
    gradient: 'from-red-500 to-red-700',
    tags: ['Python', 'SQL', 'Cloud', 'ETL', 'Apache Spark', 'Docker'],
    prerequisite: 'SQL avançado, Python intermediário, conceitos de sistemas',
    careerPath: 'Data Analyst → Data Engineer → Data Architect',
    averageSalary: 'R$ 10.000 - R$ 20.000',
    sections: [
      {
        id: 'data-pipelines',
        title: 'Pipelines de Dados',
        description: 'ETL/ELT, orquestração e automação',
        estimatedHours: 60,
        topics: [
          {
            id: 'etl-concepts',
            title: 'Conceitos ETL/ELT',
            description: 'Extract, Transform, Load vs Extract, Load, Transform',
            estimatedHours: 20,
            resources: [
              { type: 'Curso', title: 'Data Engineering Foundations', url: 'https://coursera.org/data-engineering', provider: 'Coursera' },
              { type: 'Artigo', title: 'ETL vs ELT', url: 'https://fivetran.com/blog/etl-vs-elt', provider: 'Fivetran' },
              { type: 'Ferramenta', title: 'Apache Airflow', url: 'https://airflow.apache.org', provider: 'Apache' }
            ]
          }
          // ... mais tópicos
        ]
      }
      // ... mais seções
    ]
  }
};

// Utility functions
export function getRoadmapById(id) {
  return roadmaps[id];
}

export function getAllRoadmaps() {
  return Object.values(roadmaps);
}

export function filterRoadmapsByDifficulty(difficulty) {
  return Object.values(roadmaps).filter(roadmap => roadmap.difficulty === difficulty);
}

export function filterRoadmapsByTag(tag) {
  return Object.values(roadmaps).filter(roadmap => 
    roadmap.tags.some(t => t.toLowerCase().includes(tag.toLowerCase()))
  );
}

export function searchRoadmaps(query) {
  const searchTerm = query.toLowerCase();
  return Object.values(roadmaps).filter(roadmap => 
    roadmap.title.toLowerCase().includes(searchTerm) ||
    roadmap.description.toLowerCase().includes(searchTerm) ||
    roadmap.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  );
}
