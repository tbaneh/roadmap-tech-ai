// Trilhas de Tecnologia Específicas
// Baseado em roadmap.sh e DataCamp

const techTracks = {
  sql: {
    id: 'sql',
    title: 'Trilha SQL',
    subtitle: 'Do Básico ao Avançado',
    description: 'Domine SQL desde consultas básicas até análises complexas e otimização de performance',
    icon: '🗄️',
    color: '#FF6B35',
    duration: '4-6 meses',
    difficulty: 'Iniciante → Avançado',
    prerequisites: 'Nenhum',
    sections: [
      {
        id: 'sql-basics',
        title: 'Fundamentos SQL',
        description: 'Sintaxe básica, SELECT, WHERE, ORDER BY',
        duration: '3-4 semanas',
        difficulty: 'Iniciante',
        topics: [
          {
            id: 'sql-intro',
            title: 'Introdução ao SQL',
            description: 'O que é SQL, bancos relacionais, conceitos básicos',
            estimatedHours: 4,
            resources: [
              { type: 'video', title: 'SQL em 10 minutos', url: 'https://www.youtube.com/watch?v=HXV3zeQKqGY' },
              { type: 'article', title: 'Guia Completo SQL', url: 'https://www.w3schools.com/sql/' },
              { type: 'practice', title: 'SQLBolt - Exercícios', url: 'https://sqlbolt.com/' }
            ]
          },
          {
            id: 'select-basics',
            title: 'Consultas SELECT Básicas',
            description: 'SELECT, FROM, WHERE, ORDER BY, LIMIT',
            estimatedHours: 6,
            resources: [
              { type: 'video', title: 'SELECT Statement Tutorial', url: 'https://www.youtube.com/watch?v=9Pzj7Aj25lw' },
              { type: 'practice', title: 'HackerRank SQL', url: 'https://www.hackerrank.com/domains/sql' },
              { type: 'article', title: 'SQL SELECT Guide', url: 'https://www.sqlshack.com/sql-select-statement/' }
            ]
          },
          {
            id: 'filtering-sorting',
            title: 'Filtragem e Ordenação',
            description: 'WHERE avançado, LIKE, IN, BETWEEN, NULL',
            estimatedHours: 5,
            resources: [
              { type: 'video', title: 'SQL WHERE Clause', url: 'https://www.youtube.com/watch?v=VSIbPwTZeOE' },
              { type: 'practice', title: 'SQL Zoo', url: 'https://sqlzoo.net/' },
              { type: 'article', title: 'SQL Filtering Techniques', url: 'https://mode.com/sql-tutorial/sql-where/' }
            ]
          }
        ]
      },
      {
        id: 'sql-functions',
        title: 'Funções SQL',
        description: 'Funções agregadas, de texto, data e matemáticas',
        duration: '2-3 semanas',
        difficulty: 'Iniciante',
        topics: [
          {
            id: 'aggregate-functions',
            title: 'Funções Agregadas',
            description: 'COUNT, SUM, AVG, MIN, MAX, GROUP BY',
            estimatedHours: 6,
            resources: [
              { type: 'video', title: 'SQL Aggregate Functions', url: 'https://www.youtube.com/watch?v=YNeHKLsQZws' },
              { type: 'practice', title: 'LeetCode SQL', url: 'https://leetcode.com/problemset/database/' },
              { type: 'article', title: 'GROUP BY Tutorial', url: 'https://www.sqlshack.com/sql-group-by-clause/' }
            ]
          },
          {
            id: 'string-functions',
            title: 'Funções de Texto',
            description: 'CONCAT, SUBSTRING, UPPER, LOWER, TRIM',
            estimatedHours: 4,
            resources: [
              { type: 'video', title: 'SQL String Functions', url: 'https://www.youtube.com/watch?v=DN5xCM_8Jn0' },
              { type: 'practice', title: 'W3Schools SQL Functions', url: 'https://www.w3schools.com/sql/sql_functions.asp' },
              { type: 'article', title: 'Text Processing in SQL', url: 'https://learnsql.com/blog/sql-string-functions/' }
            ]
          },
          {
            id: 'date-functions',
            title: 'Funções de Data',
            description: 'DATE, DATETIME, EXTRACT, DATE_ADD, DATEDIFF',
            estimatedHours: 5,
            resources: [
              { type: 'video', title: 'SQL Date Functions', url: 'https://www.youtube.com/watch?v=qmx_0lQJDXA' },
              { type: 'practice', title: 'Date Exercises', url: 'https://pgexercises.com/questions/date/' },
              { type: 'article', title: 'Working with Dates', url: 'https://mode.com/sql-tutorial/sql-datetime-format/' }
            ]
          }
        ]
      },
      {
        id: 'sql-joins',
        title: 'JOINs e Relacionamentos',
        description: 'INNER, LEFT, RIGHT, FULL JOIN, subconsultas',
        duration: '3-4 semanas',
        difficulty: 'Intermediário',
        topics: [
          {
            id: 'basic-joins',
            title: 'JOINs Básicos',
            description: 'INNER JOIN, LEFT JOIN, RIGHT JOIN',
            estimatedHours: 8,
            resources: [
              { type: 'video', title: 'SQL JOINs Explained', url: 'https://www.youtube.com/watch?v=9yeOJ0ZMUYw' },
              { type: 'practice', title: 'JOIN Exercises', url: 'https://sqlzoo.net/wiki/The_JOIN_operation' },
              { type: 'article', title: 'Visual JOIN Guide', url: 'https://blog.codinghorror.com/a-visual-explanation-of-sql-joins/' }
            ]
          },
          {
            id: 'advanced-joins',
            title: 'JOINs Avançados',
            description: 'FULL OUTER JOIN, CROSS JOIN, SELF JOIN',
            estimatedHours: 6,
            resources: [
              { type: 'video', title: 'Advanced SQL JOINs', url: 'https://www.youtube.com/watch?v=Yh4CrPHVBdE' },
              { type: 'practice', title: 'Complex JOIN Problems', url: 'https://www.hackerrank.com/domains/sql?filters%5Bsubdomains%5D%5B%5D=join' },
              { type: 'article', title: 'SELF JOIN Tutorial', url: 'https://www.sqlshack.com/sql-self-join/' }
            ]
          },
          {
            id: 'subqueries',
            title: 'Subconsultas',
            description: 'Subqueries, EXISTS, IN, correlated subqueries',
            estimatedHours: 7,
            resources: [
              { type: 'video', title: 'SQL Subqueries', url: 'https://www.youtube.com/watch?v=nJIEIzF7tDw' },
              { type: 'practice', title: 'Subquery Challenges', url: 'https://leetcode.com/tag/subquery/' },
              { type: 'article', title: 'Subqueries vs JOINs', url: 'https://learnsql.com/blog/subquery-vs-join/' }
            ]
          }
        ]
      },
      {
        id: 'sql-advanced',
        title: 'SQL Avançado',
        description: 'Window functions, CTEs, stored procedures',
        duration: '4-5 semanas',
        difficulty: 'Avançado',
        topics: [
          {
            id: 'window-functions',
            title: 'Window Functions',
            description: 'ROW_NUMBER, RANK, LAG, LEAD, PARTITION BY',
            estimatedHours: 10,
            resources: [
              { type: 'video', title: 'SQL Window Functions', url: 'https://www.youtube.com/watch?v=Ww71knvhQ-s' },
              { type: 'practice', title: 'Window Function Exercises', url: 'https://learnsql.com/course/window-functions/' },
              { type: 'article', title: 'Complete Window Functions Guide', url: 'https://mode.com/sql-tutorial/sql-window-functions/' }
            ]
          },
          {
            id: 'ctes',
            title: 'Common Table Expressions',
            description: 'WITH clause, recursive CTEs, complex queries',
            estimatedHours: 8,
            resources: [
              { type: 'video', title: 'SQL CTEs Explained', url: 'https://www.youtube.com/watch?v=QYj5RQoN9dc' },
              { type: 'practice', title: 'CTE Practice Problems', url: 'https://learnsql.com/course/common-table-expressions/' },
              { type: 'article', title: 'When to Use CTEs', url: 'https://www.sqlshack.com/sql-server-common-table-expressions-cte/' }
            ]
          },
          {
            id: 'performance',
            title: 'Otimização e Performance',
            description: 'Índices, EXPLAIN PLAN, query optimization',
            estimatedHours: 12,
            resources: [
              { type: 'video', title: 'SQL Performance Tuning', url: 'https://www.youtube.com/watch?v=BHwzDmr6d7s' },
              { type: 'practice', title: 'Query Optimization Lab', url: 'https://use-the-index-luke.com/' },
              { type: 'article', title: 'SQL Indexing Guide', url: 'https://www.sqlshack.com/sql-server-index-design-guidelines-and-best-practices/' }
            ]
          }
        ]
      }
    ]
  },

  python: {
    id: 'python',
    title: 'Trilha Python',
    subtitle: 'Programação Completa',
    description: 'Aprenda Python desde o básico até desenvolvimento avançado e ciência de dados',
    icon: '🐍',
    color: '#3776AB',
    duration: '6-8 meses',
    difficulty: 'Iniciante → Avançado',
    prerequisites: 'Nenhum',
    sections: [
      {
        id: 'python-basics',
        title: 'Fundamentos Python',
        description: 'Sintaxe, variáveis, estruturas de controle',
        duration: '4-6 semanas',
        difficulty: 'Iniciante',
        topics: [
          {
            id: 'python-intro',
            title: 'Introdução ao Python',
            description: 'Instalação, IDE, primeiro programa, sintaxe básica',
            estimatedHours: 6,
            resources: [
              { type: 'video', title: 'Python para Iniciantes', url: 'https://www.youtube.com/watch?v=rfscVS0vtbw' },
              { type: 'article', title: 'Python.org Tutorial', url: 'https://docs.python.org/3/tutorial/' },
              { type: 'practice', title: 'Codecademy Python', url: 'https://www.codecademy.com/learn/learn-python-3' }
            ]
          },
          {
            id: 'variables-types',
            title: 'Variáveis e Tipos de Dados',
            description: 'int, float, string, boolean, operadores',
            estimatedHours: 5,
            resources: [
              { type: 'video', title: 'Python Data Types', url: 'https://www.youtube.com/watch?v=A37-3lflh8I' },
              { type: 'practice', title: 'Python Exercises', url: 'https://www.w3resource.com/python-exercises/' },
              { type: 'article', title: 'Python Variables Guide', url: 'https://realpython.com/python-variables/' }
            ]
          },
          {
            id: 'control-flow',
            title: 'Estruturas de Controle',
            description: 'if/elif/else, for, while, break, continue',
            estimatedHours: 7,
            resources: [
              { type: 'video', title: 'Python Control Flow', url: 'https://www.youtube.com/watch?v=DZwmZ8Usvnk' },
              { type: 'practice', title: 'HackerRank Python', url: 'https://www.hackerrank.com/domains/python' },
              { type: 'article', title: 'Control Flow Tutorial', url: 'https://realpython.com/python-conditional-statements/' }
            ]
          }
        ]
      },
      {
        id: 'python-structures',
        title: 'Estruturas de Dados',
        description: 'Listas, dicionários, sets, tuplas',
        duration: '3-4 semanas',
        difficulty: 'Iniciante',
        topics: [
          {
            id: 'lists-tuples',
            title: 'Listas e Tuplas',
            description: 'Criação, indexação, slicing, métodos',
            estimatedHours: 8,
            resources: [
              { type: 'video', title: 'Python Lists and Tuples', url: 'https://www.youtube.com/watch?v=W8KRzm-HUcc' },
              { type: 'practice', title: 'List Comprehensions', url: 'https://www.datacamp.com/tutorial/python-list-comprehension' },
              { type: 'article', title: 'Lists vs Tuples', url: 'https://realpython.com/python-lists-tuples/' }
            ]
          },
          {
            id: 'dictionaries-sets',
            title: 'Dicionários e Sets',
            description: 'Chave-valor, métodos, operações de conjunto',
            estimatedHours: 6,
            resources: [
              { type: 'video', title: 'Python Dictionaries', url: 'https://www.youtube.com/watch?v=daefaLgNkw0' },
              { type: 'practice', title: 'Dictionary Exercises', url: 'https://pynative.com/python-dictionary-exercise-with-solutions/' },
              { type: 'article', title: 'Sets in Python', url: 'https://realpython.com/python-sets/' }
            ]
          }
        ]
      }
    ]
  },

  powerbi: {
    id: 'powerbi',
    title: 'Trilha Power BI',
    subtitle: 'Business Intelligence',
    description: 'Domine Power BI para criar dashboards e relatórios profissionais',
    icon: '📊',
    color: '#F2C811',
    duration: '3-4 meses',
    difficulty: 'Iniciante → Intermediário',
    prerequisites: 'Excel básico',
    sections: [
      {
        id: 'powerbi-basics',
        title: 'Fundamentos Power BI',
        description: 'Interface, importação de dados, primeiros relatórios',
        duration: '2-3 semanas',
        difficulty: 'Iniciante',
        topics: [
          {
            id: 'powerbi-intro',
            title: 'Introdução ao Power BI',
            description: 'Interface, conceitos básicos, ecossistema Microsoft',
            estimatedHours: 4,
            resources: [
              { type: 'video', title: 'Power BI em 20 minutos', url: 'https://www.youtube.com/watch?v=yKTSLffVGbk' },
              { type: 'article', title: 'Getting Started with Power BI', url: 'https://docs.microsoft.com/en-us/power-bi/fundamentals/desktop-getting-started' },
              { type: 'practice', title: 'Power BI Learning Path', url: 'https://docs.microsoft.com/en-us/learn/powerplatform/power-bi' }
            ]
          },
          {
            id: 'data-import',
            title: 'Importação de Dados',
            description: 'Conectores, Excel, CSV, bancos de dados',
            estimatedHours: 6,
            resources: [
              { type: 'video', title: 'Power BI Data Sources', url: 'https://www.youtube.com/watch?v=1mHIVnVqVZA' },
              { type: 'practice', title: 'Data Import Lab', url: 'https://powerbi.microsoft.com/en-us/learning/' },
              { type: 'article', title: 'Data Sources Guide', url: 'https://docs.microsoft.com/en-us/power-bi/connect-data/desktop-data-sources' }
            ]
          }
        ]
      }
    ]
  }
};

export default techTracks;
