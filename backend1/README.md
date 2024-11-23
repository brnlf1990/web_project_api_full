# Tripleten web_project_around_express

- [Descrição do Projeto](#descrição-do-projeto)
- [Funcionalidades e Demonstração da Aplicação](#funcionalidades-e-demonstração-da-aplicação)
- [Tecnologias utilizadas](#tecnologias-utilizadas)
- [Pessoas Desenvolvedoras do Projeto](#autores)
- [Conclusão](#conclusão)

# Descrição do projeto:

Esse projeto foi criado para fazer uma API do site AroundUs.
Foram utilizados nesse  projeto Express e Node.js.
Foram utilizados middlware, Router(), path para montar as rotas para cada caminho específico.
Servidor foi conectado com Banco de dados NoSQL, Mongodb, e pode pegar as informações do banco de dados, tanto do usuario quanto dos cartões. 
Para Autorização, foi criado um módulo para Registro, onde quando o usuario é criado, retorna as informações do mesmo, mas sem a senha. A senha é armazenado com hash e ao fazer o login usuario recebe um token JWT que o servidor cria e manda como resposta. 

# Funcionalidades e Demonstração da Aplicação
Para testar essa API, você pode usar:
npm run dev e para executar o programa localmente.
Utilizar o Postman para fazer as requisições para o back-end.
Ter instalado o Mongodb, que é o banco de dados utilizado para guardar nossas informações.

Você pode usar http://localhost:3000/users, http://localhost:3000/users/_id" do cliente" ou http://localhost:3000/cards para retornar os cards que já foram salvos no programa.


# Tecnologias utilizadas

<img align="center" alt="JavaScript" src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=blac" />
<img align="center" alt="Node" src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" />
<img align="center" alt="Express" src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" />
<img align="center" alt="Mongodb" src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" />

# Autores

 [<img loading="lazy" src="https://avatars.githubusercontent.com/u/114805570?s=400&u=a591c1f671119e0c150e6a5178465b744cd8c912&v=4" width=115><br><sub>Bruno Lopes FUruya</sub>](https://github.com/brnlf1990) 

# Conclusão
A criação do back-end foi um desafio muito gratificante e divertido. Durante esse processo, obtive um entendimento mais profundo sobre o que é uma API. Desenvolvi as principais operações (GET, PUT, PATCH, POST e DELETE) para manipular os dados armazenados no banco de dados MongoDB.

Além disso, implementei um módulo de autorização, onde o servidor é responsável por criar usuários, salvar senhas de forma segura utilizando criptografia hash, e gerenciar autenticações. Ao realizar o login, o sistema retorna os dados do usuário (sem a senha) juntamente com um token JWT.

Com essa funcionalidade, aprendi a implementar uma página para registro e login de usuários, conectando front-end e back-end de forma segura e eficiente.
