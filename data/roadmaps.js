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
        id: 'foundations-data',
        title: 'Fundamentos de Dados e Estatística',
        description: 'Base sólida em conceitos de dados, estatística e pensamento analítico',
        estimatedHours: 60,
        topics: [
          {
            id: 'data-concepts',
            title: 'Conceitos Básicos de Dados',
            description: 'Tipos de dados, estruturas, qualidade e governança',
            estimatedHours: 15,
            resources: [
              { type: 'Curso', title: 'Introduction to Data Analysis', url: 'https://www.coursera.org/learn/introduction-to-data-analytics', provider: 'Coursera' },
              { type: 'Livro', title: 'Data Science for Business', url: 'https://www.amazon.com/Data-Science-Business-Foster-Provost/dp/1449361323', provider: 'Amazon' },
              { type: 'Vídeo', title: 'What Does a Data Analyst Do?', url: 'https://www.youtube.com/watch?v=yZvFH7B6gKI', provider: 'YouTube' }
            ]
          },
          {
            id: 'statistics-descriptive',
            title: 'Estatística Descritiva',
            description: 'Medidas de tendência central, dispersão e distribuições',
            estimatedHours: 20,
            resources: [
              { type: 'Curso', title: 'Statistics for Data Science', url: 'https://www.udemy.com/course/statistics-for-data-science-and-business-analysis/', provider: 'Udemy' },
              { type: 'Prática', title: 'Khan Academy Statistics', url: 'https://www.khanacademy.org/math/statistics-probability', provider: 'Khan Academy' },
              { type: 'Ferramenta', title: 'StatKey Web Applets', url: 'http://www.lock5stat.com/StatKey/', provider: 'StatKey' }
            ]
          },
          {
            id: 'statistics-inferential',
            title: 'Estatística Inferencial',
            description: 'Testes de hipótese, intervalos de confiança e correlação',
            estimatedHours: 15,
            resources: [
              { type: 'Curso', title: 'Inferential Statistics', url: 'https://www.coursera.org/learn/statistical-inferences', provider: 'Coursera' },
              { type: 'Livro', title: 'Think Stats', url: 'https://greenteapress.com/thinkstats2/', provider: 'Green Tea Press' },
              { type: 'Prática', title: 'Statistics in R', url: 'https://www.datacamp.com/courses/introduction-to-statistics-in-r', provider: 'DataCamp' }
            ]
          },
          {
            id: 'analytical-thinking',
            title: 'Pensamento Analítico',
            description: 'Framework de análise, formulação de perguntas e storytelling',
            estimatedHours: 10,
            resources: [
              { type: 'Curso', title: 'Analytical Thinking for Problem Solving', url: 'https://www.coursera.org/learn/analytical-thinking-problem-solving', provider: 'Coursera' },
              { type: 'Livro', title: 'Good Charts', url: 'https://www.amazon.com/Good-Charts-Smarter-Persuasive-Visualizations/dp/1633690709', provider: 'Amazon' },
              { type: 'Artigo', title: 'Data Storytelling Best Practices', url: 'https://www.tableau.com/learn/articles/data-storytelling', provider: 'Tableau' }
            ]
          }
        ]
      },
      {
        id: 'excel-mastery',
        title: 'Excel Mastery para Análise',
        description: 'Domine Excel para análise de dados profissional e automação',
        estimatedHours: 50,
        topics: [
          {
            id: 'excel-advanced-functions',
            title: 'Fórmulas e Funções Avançadas',
            description: 'VLOOKUP, INDEX/MATCH, SUMIFS, array formulas',
            estimatedHours: 15,
            resources: [
              { type: 'Curso', title: 'Excel para Análise de Dados', url: 'https://www.udemy.com/course/microsoft-excel-data-analysis-course/', provider: 'Udemy' },
              { type: 'Prática', title: 'Excel Practice Online', url: 'https://excel-practice-online.com/', provider: 'Excel Practice' },
              { type: 'Documentação', title: 'Excel Function Reference', url: 'https://support.microsoft.com/en-us/office/excel-functions-alphabetical-b3944572-255d-4efb-bb96-c6d90033e188', provider: 'Microsoft' }
            ]
          },
          {
            id: 'pivot-tables-advanced',
            title: 'Tabelas Dinâmicas Avançadas',
            description: 'Análise multidimensional, campos calculados e segmentação',
            estimatedHours: 12,
            resources: [
              { type: 'Curso', title: 'Mastering Pivot Tables', url: 'https://www.linkedin.com/learning/excel-pivottables-for-beginners', provider: 'LinkedIn Learning' },
              { type: 'Template', title: 'Pivot Table Templates', url: 'https://www.vertex42.com/ExcelTemplates/', provider: 'Vertex42' },
              { type: 'Vídeo', title: 'Advanced Pivot Tables', url: 'https://www.youtube.com/watch?v=qu-AK0Hv0b4', provider: 'YouTube' }
            ]
          },
          {
            id: 'excel-visualization',
            title: 'Visualização e Dashboards em Excel',
            description: 'Gráficos avançados, conditional formatting e dashboards dinâmicos',
            estimatedHours: 15,
            resources: [
              { type: 'Curso', title: 'Excel Dashboards & Data Visualization', url: 'https://www.udemy.com/course/excel-dashboards-reports/', provider: 'Udemy' },
              { type: 'Template', title: 'Professional Dashboard Templates', url: 'https://www.someka.net/excel-template/', provider: 'Someka' },
              { type: 'Galeria', title: 'Excel Dashboard Examples', url: 'https://chandoo.org/wp/excel-dashboards/', provider: 'Chandoo' }
            ]
          },
          {
            id: 'excel-automation',
            title: 'Automação com VBA Básico',
            description: 'Macros, VBA fundamentals e automação de tarefas repetitivas',
            estimatedHours: 8,
            resources: [
              { type: 'Curso', title: 'Excel VBA for Beginners', url: 'https://www.udemy.com/course/excel-vba-for-beginners/', provider: 'Udemy' },
              { type: 'Documentação', title: 'VBA Language Reference', url: 'https://docs.microsoft.com/en-us/office/vba/language/reference/', provider: 'Microsoft' },
              { type: 'Prática', title: 'VBA Code Examples', url: 'https://www.excel-easy.com/vba.html', provider: 'Excel Easy' }
            ]
          }
        ]
      },
      {
        id: 'sql-mastery',
        title: 'SQL Mastery Avançado',
        description: 'Domine a linguagem essencial para trabalhar com dados em todos os níveis',
        estimatedHours: 80,
        topics: [
          {
            id: 'sql-fundamentals',
            title: 'SQL Fundamentals',
            description: 'SELECT, WHERE, GROUP BY, JOIN e funções agregadas',
            estimatedHours: 25,
            resources: [
              { type: 'Curso', title: 'SQL para Data Science', url: 'https://www.coursera.org/learn/sql-for-data-science', provider: 'Coursera' },
              { type: 'Prática', title: 'SQLBolt Interactive Tutorial', url: 'https://sqlbolt.com', provider: 'SQLBolt' },
              { type: 'Prática', title: 'HackerRank SQL', url: 'https://www.hackerrank.com/domains/sql', provider: 'HackerRank' }
            ]
          },
          {
            id: 'sql-intermediate',
            title: 'SQL Intermediário',
            description: 'CTEs, Window Functions, subconsultas avançadas',
            estimatedHours: 25,
            resources: [
              { type: 'Curso', title: 'Advanced SQL', url: 'https://mode.com/sql-tutorial/', provider: 'Mode Analytics' },
              { type: 'Prática', title: 'SQL Exercises - W3Schools', url: 'https://www.w3schools.com/sql/sql_exercises.asp', provider: 'W3Schools' },
              { type: 'Dataset', title: 'Sample Databases', url: 'https://github.com/microsoft/sql-server-samples', provider: 'Microsoft' }
            ]
          },
          {
            id: 'sql-advanced',
            title: 'SQL Avançado',
            description: 'Procedures, triggers, índices complexos e otimização',
            estimatedHours: 20,
            resources: [
              { type: 'Curso', title: 'Database Performance Tuning', url: 'https://www.pluralsight.com/courses/sql-server-performance-tuning', provider: 'Pluralsight' },
              { type: 'Artigo', title: 'SQL Performance Tips', url: 'https://use-the-index-luke.com/', provider: 'Use The Index Luke' },
              { type: 'Ferramenta', title: 'SQL Server Query Analyzer', url: 'https://docs.microsoft.com/en-us/sql/tools/', provider: 'Microsoft' }
            ]
          },
          {
            id: 'sql-analytics',
            title: 'SQL para Analytics',
            description: 'Window functions avançadas, cohort analysis e métricas de negócio',
            estimatedHours: 10,
            resources: [
              { type: 'Curso', title: 'SQL for Analytics', url: 'https://www.datacamp.com/courses/intro-to-sql-for-data-science', provider: 'DataCamp' },
              { type: 'Prática', title: 'SQL Murder Mystery', url: 'https://mystery.knightlab.com/', provider: 'Knight Lab' },
              { type: 'Dataset', title: 'Northwind Database', url: 'https://northwinddatabase.codeplex.com/', provider: 'Northwind' }
            ]
          }
        ]
      },
      {
        id: 'visualization-mastery',
        title: 'Visualização e Business Intelligence',
        description: 'Crie dashboards e relatórios impactantes com ferramentas líderes de mercado',
        estimatedHours: 70,
        topics: [
          {
            id: 'powerbi-fundamentals',
            title: 'Power BI Fundamentals',
            description: 'Interface, modelagem, relacionamentos e conectores de dados',
            estimatedHours: 25,
            resources: [
              { type: 'Curso', title: 'Power BI Completo', url: 'https://www.udemy.com/course/microsoft-power-bi-up-running-with-power-bi-desktop/', provider: 'Udemy' },
              { type: 'Documentação', title: 'Microsoft Power BI Learning Path', url: 'https://docs.microsoft.com/en-us/learn/powerplatform/power-bi/', provider: 'Microsoft Learn' },
              { type: 'Template', title: 'Power BI Sample Datasets', url: 'https://docs.microsoft.com/en-us/power-bi/create-reports/sample-datasets', provider: 'Microsoft' }
            ]
          },
          {
            id: 'dax-essentials',
            title: 'DAX Essentials',
            description: 'Medidas, colunas calculadas, time intelligence e context',
            estimatedHours: 20,
            resources: [
              { type: 'Curso', title: 'Introducing DAX', url: 'https://www.sqlbi.com/training/introducing-dax-video-course/', provider: 'SQLBI' },
              { type: 'Referência', title: 'DAX Guide', url: 'https://dax.guide/', provider: 'DAX Guide' },
              { type: 'Prática', title: 'DAX Exercises', url: 'https://exceleratorbi.com.au/dax-exercises/', provider: 'ExceleratorBI' }
            ]
          },
          {
            id: 'dashboard-design',
            title: 'Design de Dashboards Profissionais',
            description: 'UX/UI, storytelling, color theory e boas práticas visuais',
            estimatedHours: 15,
            resources: [
              { type: 'Livro', title: 'Storytelling with Data', url: 'https://www.storytellingwithdata.com/', provider: 'Cole Nussbaumer Knaflic' },
              { type: 'Curso', title: 'Dashboard Design Principles', url: 'https://www.tableau.com/learn/training/elearning', provider: 'Tableau' },
              { type: 'Inspiração', title: 'Power BI Gallery', url: 'https://community.powerbi.com/t5/Data-Stories-Gallery/bd-p/DataStoriesGallery', provider: 'Power BI Community' }
            ]
          },
          {
            id: 'tableau-basics',
            title: 'Tableau para Analistas',
            description: 'Alternativa poderosa para visualização e análise exploratória',
            estimatedHours: 10,
            resources: [
              { type: 'Curso', title: 'Tableau Desktop Specialist', url: 'https://www.tableau.com/learn/training/20201-tableau-desktop-i-fundamentals', provider: 'Tableau' },
              { type: 'Prática', title: 'Tableau Public', url: 'https://public.tableau.com/app/discover', provider: 'Tableau Public' },
              { type: 'Dataset', title: 'Sample Superstore', url: 'https://help.tableau.com/samples/en-us/superstore_sample.xlsx', provider: 'Tableau' }
            ]
          }
        ]
      },
      {
        id: 'python-for-analysts',
        title: 'Python para Analistas de Dados',
        description: 'Introdução ao Python para automação e análise avançada',
        estimatedHours: 60,
        topics: [
          {
            id: 'python-fundamentals',
            title: 'Python Fundamentals',
            description: 'Sintaxe básica, estruturas de dados e controle de fluxo',
            estimatedHours: 15,
            resources: [
              { type: 'Curso', title: 'Python for Data Analysis', url: 'https://www.coursera.org/learn/python-for-applied-data-science-ai', provider: 'Coursera' },
              { type: 'Livro', title: 'Python Crash Course', url: 'https://nostarch.com/pythoncrashcourse2e', provider: 'No Starch Press' },
              { type: 'Prática', title: 'Codecademy Python', url: 'https://www.codecademy.com/learn/learn-python-3', provider: 'Codecademy' }
            ]
          },
          {
            id: 'pandas-basics',
            title: 'Pandas para Análise',
            description: 'DataFrames, manipulação de dados e análise exploratória',
            estimatedHours: 20,
            resources: [
              { type: 'Curso', title: 'Pandas Tutorial', url: 'https://www.datacamp.com/courses/pandas-foundations', provider: 'DataCamp' },
              { type: 'Livro', title: 'Python for Data Analysis', url: 'https://wesmckinney.com/book/', provider: 'Wes McKinney' },
              { type: 'Prática', title: 'Pandas Exercises', url: 'https://github.com/guipsamora/pandas_exercises', provider: 'GitHub' }
            ]
          },
          {
            id: 'data-visualization-python',
            title: 'Visualização com Python',
            description: 'Matplotlib, Seaborn e Plotly para gráficos e dashboards',
            estimatedHours: 15,
            resources: [
              { type: 'Curso', title: 'Data Visualization with Python', url: 'https://www.coursera.org/learn/python-for-data-visualization', provider: 'Coursera' },
              { type: 'Galeria', title: 'Python Graph Gallery', url: 'https://python-graph-gallery.com/', provider: 'Community' },
              { type: 'Ferramenta', title: 'Plotly Documentation', url: 'https://plotly.com/python/', provider: 'Plotly' }
            ]
          },
          {
            id: 'data-automation',
            title: 'Automação de Tarefas',
            description: 'Scripts para ETL básico, reports automatizados e APIs',
            estimatedHours: 10,
            resources: [
              { type: 'Curso', title: 'Automate the Boring Stuff', url: 'https://automatetheboringstuff.com/', provider: 'Al Sweigart' },
              { type: 'Prática', title: 'Python Automation Examples', url: 'https://github.com/geekcomputers/Python', provider: 'GitHub' },
              { type: 'Ferramenta', title: 'Jupyter Notebooks', url: 'https://jupyter.org/', provider: 'Jupyter' }
            ]
          }
        ]
      },
      {
        id: 'data-analyst-projects',
        title: 'Projetos Data Analyst Premium',
        description: 'Projetos end-to-end para portfólio profissional e preparação para o mercado',
        estimatedHours: 80,
        topics: [
          {
            id: 'sales-performance-analysis',
            title: 'Análise de Performance de Vendas',
            description: 'Dashboard completo com KPIs, tendências e insights acionáveis',
            estimatedHours: 25,
            resources: [
              { type: 'Dataset', title: 'AdventureWorks Sales Data', url: 'https://github.com/microsoft/sql-server-samples', provider: 'Microsoft' },
              { type: 'Template', title: 'Sales Dashboard Template', url: 'https://appsource.microsoft.com/en-us/product/power-bi/pbi-contentpacks.pbi-microsoft-dynamics-crm', provider: 'Microsoft AppSource' },
              { type: 'Tutorial', title: 'Building Sales Analytics', url: 'https://docs.microsoft.com/en-us/power-bi/create-reports/desktop-excel-stunning-report', provider: 'Microsoft' }
            ]
          },
          {
            id: 'customer-segmentation',
            title: 'Segmentação de Clientes',
            description: 'Análise RFM, cohort analysis e perfis de cliente',
            estimatedHours: 20,
            resources: [
              { type: 'Dataset', title: 'E-commerce Customer Data', url: 'https://www.kaggle.com/datasets/carrie1/ecommerce-data', provider: 'Kaggle' },
              { type: 'Curso', title: 'Customer Analytics', url: 'https://www.coursera.org/learn/customer-analytics', provider: 'Coursera' },
              { type: 'Template', title: 'RFM Analysis Template', url: 'https://github.com/sorooshrabet/RFM-analysis', provider: 'GitHub' }
            ]
          },
          {
            id: 'financial-reporting',
            title: 'Relatório Financeiro Automatizado',
            description: 'P&L automatizado, cash flow e analysis financeira',
            estimatedHours: 20,
            resources: [
              { type: 'Dataset', title: 'Financial Sample Data', url: 'https://docs.microsoft.com/en-us/power-bi/create-reports/sample-financial-download', provider: 'Microsoft' },
              { type: 'Template', title: 'Financial Dashboard Template', url: 'https://appsource.microsoft.com/en-us/product/power-bi-template-apps/pbi_template_apps.template-financial-reporting', provider: 'Microsoft AppSource' },
              { type: 'Curso', title: 'Financial Analysis with Power BI', url: 'https://www.udemy.com/course/financial-analysis-with-microsoft-power-bi/', provider: 'Udemy' }
            ]
          },
          {
            id: 'web-analytics-project',
            title: 'Análise de Web Analytics',
            description: 'Google Analytics data, funis de conversão e otimização',
            estimatedHours: 15,
            resources: [
              { type: 'Dataset', title: 'Google Analytics Sample Data', url: 'https://developers.google.com/analytics/devguides/reporting/core/dimsmets', provider: 'Google' },
              { type: 'Ferramenta', title: 'Google Analytics Demo Account', url: 'https://analytics.google.com/analytics/web/demoAccount', provider: 'Google' },
              { type: 'Curso', title: 'Web Analytics Fundamentals', url: 'https://analytics.google.com/analytics/academy/', provider: 'Google Analytics Academy' }
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
        id: 'math-stats-foundation',
        title: 'Matemática e Estatística Avançada',
        description: 'Base matemática sólida para Data Science e Machine Learning',
        estimatedHours: 100,
        topics: [
          {
            id: 'linear-algebra',
            title: 'Álgebra Linear',
            description: 'Vetores, matrizes, eigenvalues e transformações lineares',
            estimatedHours: 30,
            resources: [
              { type: 'Curso', title: 'Linear Algebra - MIT', url: 'https://ocw.mit.edu/courses/mathematics/18-06-linear-algebra-spring-2010', provider: 'MIT OpenCourseWare' },
              { type: 'Vídeo', title: '3Blue1Brown Linear Algebra', url: 'https://youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab', provider: 'YouTube' },
              { type: 'Prática', title: 'NumPy Linear Algebra', url: 'https://numpy.org/doc/stable/reference/routines.linalg.html', provider: 'NumPy' }
            ]
          },
          {
            id: 'calculus-optimization',
            title: 'Cálculo e Otimização',
            description: 'Derivadas, gradientes e algoritmos de otimização',
            estimatedHours: 25,
            resources: [
              { type: 'Curso', title: 'Calculus for Machine Learning', url: 'https://www.coursera.org/learn/machine-learning-calculus', provider: 'Coursera' },
              { type: 'Livro', title: 'Calculus for Machine Learning', url: 'https://mml-book.github.io/', provider: 'MML Book' },
              { type: 'Prática', title: 'SciPy Optimize', url: 'https://docs.scipy.org/doc/scipy/reference/optimize.html', provider: 'SciPy' }
            ]
          },
          {
            id: 'statistics-probability',
            title: 'Estatística e Probabilidade',
            description: 'Distribuições, testes de hipótese e inferência estatística',
            estimatedHours: 30,
            resources: [
              { type: 'Curso', title: 'Statistics for Data Science', url: 'https://www.coursera.org/learn/statistical-inferences', provider: 'Coursera' },
              { type: 'Livro', title: 'Think Stats', url: 'https://greenteapress.com/thinkstats2/', provider: 'Green Tea Press' },
              { type: 'Prática', title: 'Statistical Analysis with Python', url: 'https://www.scipy.org/getting-started.html#scipy-statsmodels', provider: 'SciPy' }
            ]
          },
          {
            id: 'bayesian-statistics',
            title: 'Estatística Bayesiana',
            description: 'Teorema de Bayes, MCMC e inferência bayesiana',
            estimatedHours: 15,
            resources: [
              { type: 'Curso', title: 'Bayesian Methods for Machine Learning', url: 'https://www.coursera.org/learn/bayesian-methods-in-machine-learning', provider: 'Coursera' },
              { type: 'Livro', title: 'Bayesian Analysis with Python', url: 'https://www.packtpub.com/product/bayesian-analysis-with-python-second-edition/9781789341652', provider: 'Packt' },
              { type: 'Ferramenta', title: 'PyMC3 Tutorial', url: 'https://docs.pymc.io/', provider: 'PyMC' }
            ]
          }
        ]
      },
      {
        id: 'python-data-science',
        title: 'Python para Data Science',
        description: 'Ecosystem Python avançado para análise e modelagem de dados',
        estimatedHours: 80,
        topics: [
          {
            id: 'numpy-advanced',
            title: 'NumPy Avançado',
            description: 'Arrays multidimensionais, broadcasting e operações vetorizadas',
            estimatedHours: 20,
            resources: [
              { type: 'Curso', title: 'NumPy Ultimate Guide', url: 'https://www.udemy.com/course/deep-learning-prerequisites-the-numpy-stack-in-python/', provider: 'Udemy' },
              { type: 'Documentação', title: 'NumPy User Guide', url: 'https://numpy.org/doc/stable/user/', provider: 'NumPy' },
              { type: 'Prática', title: 'NumPy Exercises', url: 'https://github.com/rougier/numpy-100', provider: 'GitHub' }
            ]
          },
          {
            id: 'pandas-advanced',
            title: 'Pandas Avançado',
            description: 'Manipulação avançada de dados, performance e memory optimization',
            estimatedHours: 25,
            resources: [
              { type: 'Curso', title: 'Pandas for Data Analysis', url: 'https://www.udemy.com/course/data-analysis-with-pandas/', provider: 'Udemy' },
              { type: 'Livro', title: 'Python for Data Analysis', url: 'https://wesmckinney.com/book/', provider: 'Wes McKinney' },
              { type: 'Prática', title: 'Pandas Exercises', url: 'https://github.com/guipsamora/pandas_exercises', provider: 'GitHub' }
            ]
          },
          {
            id: 'visualization-advanced',
            title: 'Visualização Avançada',
            description: 'Matplotlib, Seaborn, Plotly e visualizações interativas',
            estimatedHours: 20,
            resources: [
              { type: 'Curso', title: 'Data Visualization with Python', url: 'https://www.coursera.org/learn/python-for-data-visualization', provider: 'Coursera' },
              { type: 'Galeria', title: 'Python Graph Gallery', url: 'https://python-graph-gallery.com/', provider: 'Community' },
              { type: 'Ferramenta', title: 'Plotly Documentation', url: 'https://plotly.com/python/', provider: 'Plotly' }
            ]
          },
          {
            id: 'jupyter-advanced',
            title: 'Jupyter e Ambientes de Desenvolvimento',
            description: 'Jupyter Lab, notebooks avançados e deployment',
            estimatedHours: 15,
            resources: [
              { type: 'Curso', title: 'Mastering Jupyter Notebooks', url: 'https://www.datacamp.com/courses/introduction-to-jupyter-notebooks', provider: 'DataCamp' },
              { type: 'Documentação', title: 'JupyterLab Documentation', url: 'https://jupyterlab.readthedocs.io/', provider: 'Jupyter' },
              { type: 'Ferramenta', title: 'Google Colab', url: 'https://colab.research.google.com/', provider: 'Google' }
            ]
          }
        ]
      },
      {
        id: 'machine-learning-fundamentals',
        title: 'Machine Learning Fundamentals',
        description: 'Algoritmos fundamentais e teoria de machine learning',
        estimatedHours: 100,
        topics: [
          {
            id: 'supervised-learning',
            title: 'Aprendizado Supervisionado',
            description: 'Regressão, classificação e algoritmos supervisionados',
            estimatedHours: 35,
            resources: [
              { type: 'Curso', title: 'Machine Learning - Andrew Ng', url: 'https://www.coursera.org/learn/machine-learning', provider: 'Coursera' },
              { type: 'Livro', title: 'Hands-On Machine Learning', url: 'https://www.oreilly.com/library/view/hands-on-machine-learning/9781492032632/', provider: 'O\'Reilly' },
              { type: 'Prática', title: 'Scikit-learn Tutorials', url: 'https://scikit-learn.org/stable/tutorial/', provider: 'Scikit-learn' }
            ]
          },
          {
            id: 'unsupervised-learning',
            title: 'Aprendizado Não-supervisionado',
            description: 'Clustering, redução de dimensionalidade e detecção de anomalias',
            estimatedHours: 25,
            resources: [
              { type: 'Curso', title: 'Unsupervised Learning', url: 'https://www.udacity.com/course/machine-learning--ud262', provider: 'Udacity' },
              { type: 'Artigo', title: 'Clustering Algorithms', url: 'https://scikit-learn.org/stable/modules/clustering.html', provider: 'Scikit-learn' },
              { type: 'Prática', title: 'PCA and t-SNE', url: 'https://www.kaggle.com/learn/data-visualization', provider: 'Kaggle' }
            ]
          },
          {
            id: 'model-evaluation',
            title: 'Avaliação e Validação de Modelos',
            description: 'Cross-validation, métricas e seleção de modelos',
            estimatedHours: 20,
            resources: [
              { type: 'Curso', title: 'Model Validation', url: 'https://www.kaggle.com/learn/machine-learning-explainability', provider: 'Kaggle' },
              { type: 'Artigo', title: 'Cross-validation Guide', url: 'https://scikit-learn.org/stable/modules/cross_validation.html', provider: 'Scikit-learn' },
              { type: 'Ferramenta', title: 'Yellowbrick', url: 'https://www.scikit-yb.org/', provider: 'Yellowbrick' }
            ]
          },
          {
            id: 'feature-engineering',
            title: 'Feature Engineering',
            description: 'Seleção, transformação e criação de features',
            estimatedHours: 20,
            resources: [
              { type: 'Curso', title: 'Feature Engineering', url: 'https://www.kaggle.com/learn/feature-engineering', provider: 'Kaggle' },
              { type: 'Livro', title: 'Feature Engineering for Machine Learning', url: 'https://www.oreilly.com/library/view/feature-engineering-for/9781491953235/', provider: 'O\'Reilly' },
              { type: 'Ferramenta', title: 'Featuretools', url: 'https://docs.featuretools.com/', provider: 'Featuretools' }
            ]
          }
        ]
      },
      {
        id: 'deep-learning',
        title: 'Deep Learning',
        description: 'Redes neurais profundas e arquiteturas avançadas',
        estimatedHours: 90,
        topics: [
          {
            id: 'neural-networks',
            title: 'Redes Neurais Fundamentals',
            description: 'Perceptrons, backpropagation e redes densas',
            estimatedHours: 25,
            resources: [
              { type: 'Curso', title: 'Deep Learning Specialization', url: 'https://www.coursera.org/specializations/deep-learning', provider: 'Coursera' },
              { type: 'Livro', title: 'Deep Learning - Goodfellow', url: 'https://www.deeplearningbook.org/', provider: 'MIT Press' },
              { type: 'Vídeo', title: 'Neural Networks - 3Blue1Brown', url: 'https://youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi', provider: 'YouTube' }
            ]
          },
          {
            id: 'tensorflow-keras',
            title: 'TensorFlow e Keras',
            description: 'Framework para deep learning e implementação prática',
            estimatedHours: 25,
            resources: [
              { type: 'Curso', title: 'TensorFlow Developer Certificate', url: 'https://www.coursera.org/professional-certificates/tensorflow-in-practice', provider: 'Coursera' },
              { type: 'Documentação', title: 'TensorFlow Tutorials', url: 'https://www.tensorflow.org/tutorials', provider: 'TensorFlow' },
              { type: 'Prática', title: 'Keras Examples', url: 'https://keras.io/examples/', provider: 'Keras' }
            ]
          },
          {
            id: 'computer-vision',
            title: 'Computer Vision',
            description: 'CNNs, processamento de imagens e visão computacional',
            estimatedHours: 20,
            resources: [
              { type: 'Curso', title: 'Computer Vision Specialization', url: 'https://www.coursera.org/specializations/computer-vision-tensorflow', provider: 'Coursera' },
              { type: 'Dataset', title: 'ImageNet Dataset', url: 'https://www.image-net.org/', provider: 'ImageNet' },
              { type: 'Ferramenta', title: 'OpenCV Tutorial', url: 'https://opencv-python-tutroals.readthedocs.io/', provider: 'OpenCV' }
            ]
          },
          {
            id: 'nlp-fundamentals',
            title: 'Natural Language Processing',
            description: 'Processamento de texto, RNNs e transformers básicos',
            estimatedHours: 20,
            resources: [
              { type: 'Curso', title: 'Natural Language Processing', url: 'https://www.coursera.org/specializations/natural-language-processing', provider: 'Coursera' },
              { type: 'Livro', title: 'Natural Language Processing with Python', url: 'https://www.nltk.org/book/', provider: 'NLTK' },
              { type: 'Ferramenta', title: 'spaCy Tutorial', url: 'https://spacy.io/usage', provider: 'spaCy' }
            ]
          }
        ]
      },
      {
        id: 'mlops-production',
        title: 'MLOps e Machine Learning em Produção',
        description: 'Deploy, monitoramento e operações de modelos ML',
        estimatedHours: 70,
        topics: [
          {
            id: 'model-deployment',
            title: 'Deploy de Modelos',
            description: 'APIs, containerização e servir modelos em produção',
            estimatedHours: 25,
            resources: [
              { type: 'Curso', title: 'MLOps Specialization', url: 'https://www.coursera.org/specializations/machine-learning-engineering-for-production-mlops', provider: 'Coursera' },
              { type: 'Ferramenta', title: 'MLflow Documentation', url: 'https://mlflow.org/docs/latest/index.html', provider: 'MLflow' },
              { type: 'Prática', title: 'Docker for ML', url: 'https://github.com/docker/labs/tree/master/beginner', provider: 'Docker' }
            ]
          },
          {
            id: 'model-monitoring',
            title: 'Monitoramento de Modelos',
            description: 'Drift detection, performance monitoring e observabilidade',
            estimatedHours: 20,
            resources: [
              { type: 'Artigo', title: 'Model Monitoring Best Practices', url: 'https://neptune.ai/blog/ml-model-monitoring-best-tools', provider: 'Neptune.ai' },
              { type: 'Ferramenta', title: 'Evidently AI', url: 'https://docs.evidentlyai.com/', provider: 'Evidently' },
              { type: 'Curso', title: 'ML Monitoring', url: 'https://www.udacity.com/course/machine-learning-devops-engineer-nanodegree--nd0821', provider: 'Udacity' }
            ]
          },
          {
            id: 'cloud-platforms',
            title: 'Plataformas Cloud para ML',
            description: 'AWS SageMaker, Google Cloud AI, Azure ML',
            estimatedHours: 25,
            resources: [
              { type: 'Curso', title: 'AWS SageMaker', url: 'https://aws.amazon.com/sagemaker/getting-started/', provider: 'AWS' },
              { type: 'Curso', title: 'Google Cloud AI Platform', url: 'https://cloud.google.com/ai-platform/docs', provider: 'Google Cloud' },
              { type: 'Certificação', title: 'Azure AI Engineer', url: 'https://docs.microsoft.com/learn/certifications/azure-ai-engineer/', provider: 'Microsoft' }
            ]
          }
        ]
      },
      {
        id: 'advanced-topics',
        title: 'Tópicos Avançados',
        description: 'Áreas especializadas e tendências emergentes',
        estimatedHours: 60,
        topics: [
          {
            id: 'time-series',
            title: 'Análise de Séries Temporais',
            description: 'ARIMA, LSTM para séries temporais e forecasting',
            estimatedHours: 20,
            resources: [
              { type: 'Curso', title: 'Time Series Analysis', url: 'https://www.coursera.org/learn/practical-time-series-analysis', provider: 'Coursera' },
              { type: 'Livro', title: 'Forecasting: Principles and Practice', url: 'https://otexts.com/fpp3/', provider: 'OTexts' },
              { type: 'Ferramenta', title: 'Prophet by Facebook', url: 'https://facebook.github.io/prophet/', provider: 'Facebook' }
            ]
          },
          {
            id: 'reinforcement-learning',
            title: 'Reinforcement Learning',
            description: 'Q-learning, policy gradients e deep RL',
            estimatedHours: 20,
            resources: [
              { type: 'Curso', title: 'Reinforcement Learning', url: 'https://www.udacity.com/course/reinforcement-learning--ud600', provider: 'Udacity' },
              { type: 'Livro', title: 'Reinforcement Learning: An Introduction', url: 'http://incompleteideas.net/book/', provider: 'Sutton & Barto' },
              { type: 'Ferramenta', title: 'OpenAI Gym', url: 'https://gym.openai.com/', provider: 'OpenAI' }
            ]
          },
          {
            id: 'transformers-llms',
            title: 'Transformers e Large Language Models',
            description: 'BERT, GPT, fine-tuning e aplicações de LLMs',
            estimatedHours: 20,
            resources: [
              { type: 'Curso', title: 'Hugging Face Course', url: 'https://huggingface.co/course', provider: 'Hugging Face' },
              { type: 'Artigo', title: 'Attention Is All You Need', url: 'https://arxiv.org/abs/1706.03762', provider: 'arXiv' },
              { type: 'Ferramenta', title: 'Transformers Library', url: 'https://huggingface.co/docs/transformers/', provider: 'Hugging Face' }
            ]
          }
        ]
      },
      {
        id: 'data-science-projects',
        title: 'Projetos Data Science Premium',
        description: 'Projetos end-to-end para portfólio profissional',
        estimatedHours: 100,
        topics: [
          {
            id: 'predictive-analytics',
            title: 'Sistema de Análise Preditiva',
            description: 'Modelo de previsão de vendas com deployment completo',
            estimatedHours: 35,
            resources: [
              { type: 'Dataset', title: 'Sales Forecasting Dataset', url: 'https://www.kaggle.com/c/demand-forecasting-kernels-only', provider: 'Kaggle' },
              { type: 'Template', title: 'MLOps Project Template', url: 'https://github.com/drivendata/cookiecutter-data-science', provider: 'DrivenData' },
              { type: 'Tutorial', title: 'End-to-End ML Project', url: 'https://github.com/ageron/handson-ml2', provider: 'GitHub' }
            ]
          },
          {
            id: 'recommendation-system',
            title: 'Sistema de Recomendação',
            description: 'Collaborative filtering e content-based recommendations',
            estimatedHours: 30,
            resources: [
              { type: 'Dataset', title: 'MovieLens Dataset', url: 'https://grouplens.org/datasets/movielens/', provider: 'GroupLens' },
              { type: 'Curso', title: 'Recommender Systems', url: 'https://www.coursera.org/specializations/recommender-systems', provider: 'Coursera' },
              { type: 'Ferramenta', title: 'Surprise Library', url: 'https://surprise.readthedocs.io/', provider: 'Surprise' }
            ]
          },
          {
            id: 'nlp-sentiment-analysis',
            title: 'Análise de Sentimentos em Tempo Real',
            description: 'Pipeline NLP com streaming data e dashboard',
            estimatedHours: 35,
            resources: [
              { type: 'Dataset', title: 'Twitter Sentiment Dataset', url: 'https://www.kaggle.com/datasets/kazanova/sentiment140', provider: 'Kaggle' },
              { type: 'Ferramenta', title: 'Streamlit for ML Apps', url: 'https://streamlit.io/', provider: 'Streamlit' },
              { type: 'API', title: 'Twitter API v2', url: 'https://developer.twitter.com/en/docs/twitter-api', provider: 'Twitter' }
            ]
          }
        ]
      }
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
