# Tripleten web_project_around_express

- [Título e Imagem de capa](#The AroundUS)
- [Descrição do Projeto](#descrição-do-projeto)
- [Funcionalidades e Demonstração da Aplicação](#funcionalidades-e-demonstração-da-aplicação)
- [Tecnologias utilizadas](#tecnologias-utilizadas)
- [Pessoas Contribuidoras](#pessoas-contribuidoras)
- [Pessoas Desenvolvedoras do Projeto](#pessoas-desenvolvedoras)
- [Licença](#licença)
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
[https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=blac]
[https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white]
[https://img.shields.io/badge/Express.js-404D59?style=for-the-badge]
[https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white]
