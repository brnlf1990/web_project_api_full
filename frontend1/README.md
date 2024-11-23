- [Título e Imagem de capa] (#The AroundUS)
- [Descrição do Projeto](#descrição-do-projeto)
- [Funcionalidades e Demonstração da Aplicação](#funcionalidades-e-demonstração-da-aplicação)
- [Acesso ao Projeto](#acesso-ao-projeto)
- [Tecnologias utilizadas](#tecnologias-utilizadas)
- [Pessoas Contribuidoras](#pessoas-contribuidoras)
- [Pessoas Desenvolvedoras do Projeto](#pessoas-desenvolvedoras)
- [Conclusão](#conclusão)

# Descrição do Projeto

Rede Social de Lugares nos EUA

Este projeto é uma rede social onde você pode compartilhar os melhores lugares dos Estados Unidos que visitou. Outros usuários podem curtir suas fotos e interagir com seu conteúdo.

Funcionalidades principais:
-Cadastro e login: Crie sua conta e faça login.
-Edição de perfil: Atualize seu nome, informações sobre você e adicione um avatar personalizado.
-Interatividade: Publique fotos, compartilhe seus lugares favoritos e receba curtidas de outros usuários.
-Design responsivo: A interface se adapta perfeitamente para uso em computadores e dispositivos móveis.

Tecnologia utilizada:

Frontend:

-Inicialmente desenvolvido com HTML, CSS e JavaScript, utilizando princípios de -Orientação a Objetos.
-Refatorado para usar componentes funcionais e JSX, garantindo um código mais modular e organizado.
-Responsividade implementada para oferecer uma boa experiência em qualquer dispositivo.

Backend:

-Criado com Node.js e Express.
-Banco de dados NoSQL (MongoDB) para armazenar informações de usuários, posts e interações.
-Implementação de autenticação com JWT (JSON Web Token), permitindo que os usuários permaneçam logados sem a necessidade de repetir o login.
-Este projeto combina funcionalidades práticas com uma arquitetura moderna e eficiente, tornando a experiência do usuário intuitiva e fluida!

# :hammer: Funcionalidades do projeto

- `Registro`: 
 O registro é onde o usuário poderá criar sua conta de acesso ao aplicativo. A criação é simples: basta inserir o e-mail e a senha. Tome cuidado ao criar a senha, pois, como ainda não há confirmação de senha, digitar errado pode impedir o acesso à conta. (Nota: será implementada uma funcionalidade de confirmação de senha e recuperação de senha no futuro.)
Caso a criação da conta falhe, uma mensagem de erro será exibida. Em caso de sucesso, o site redirecionará o usuário para a página de login, com uma mensagem informando que a conta foi criada com sucesso.
- `Login`: 
  O login é o ponto de acesso principal ao aplicativo. Nele, o usuário precisará inserir o e-mail e a senha previamente cadastrados na seção de registro para autenticar sua conta.
Após realizar o login com sucesso, o usuário será redirecionado para a página principal, onde poderá acessar e aproveitar todas as funcionalidades e conteúdos oferecidos pelo site, garantindo uma experiência segura e personalizada.

- `Edição do perfil`: A edição do perfil está dividida em três partes: nome, descrição (sobre você) e avatar. O usuário pode configurar seu nome, escrever algo sobre si mesmo e adicionar uma foto como avatar.
- `Adição de cards`: Ao clicar no botão maior com o símbolo de “+”, o usuário poderá criar cartões, inserindo um link para a foto e um nome. Atenção: é possível usar apenas links de imagens disponíveis na internet. Caso a imagem não apareça, verifique se ela não possui proteção contra "hotlinking".
- `Ampliar imagens, likes e deslikes`: Após postar uma imagem, o usuário pode ampliá-la clicando nela. Para fechar a visualização ampliada, basta clicar no ícone de "X", na área preta ao redor da imagem ou pressionar a tecla ESC.


# Autores

 [<img loading="lazy" src="https://avatars.githubusercontent.com/u/114805570?s=400&u=a591c1f671119e0c150e6a5178465b744cd8c912&v=4" width=115><br><sub>Bruno Lopes FUruya</sub>](https://github.com/brnlf1990) 


# Conclusão

Foi um grande aprendizado criar um site em React e administrar os componentes com componentes funcionais. Um dos maiores desafios foi fazer a ligação do front-end com o back-end. Após o login acontecer, ele não carregava as informações do usuário e muito menos os cartões. Isso acontecia porque o /cards não estava sendo devidamente autorizado. Para resolver esse problema, precisei criar uma função em api.js para que ela recebesse o token e, assim, autorizasse as informações do usuário.

# Abaixo uma explicação feita para uso do Create React App e testar o site.

Este projeto foi inicializado com o Create React App.

Scripts Disponíveis
No diretório do projeto, você pode executar:

npm start
Executa o aplicativo no modo de desenvolvimento.
Abra http://localhost:3000 para visualizá-lo no navegador.

A página será recarregada quando você fizer alterações.
Você também pode ver erros de lint no console.

npm test
Inicia o executor de testes no modo interativo.
Veja a seção sobre execução de testes para mais informações.

npm run build
Cria o aplicativo para produção na pasta build.
Ele empacota corretamente o React no modo de produção e otimiza a construção para obter o melhor desempenho.

A construção é minimizada e os nomes dos arquivos incluem hashes.
Seu aplicativo está pronto para ser implantado!

Veja a seção sobre implantação para mais informações.

npm run eject
Nota: esta é uma operação sem volta. Uma vez que você eject, não pode desfazer!

Se você não estiver satisfeito com as escolhas de ferramentas e configurações, pode eject a qualquer momento. Este comando removerá a dependência única do projeto.

Em vez disso, ele copiará todos os arquivos de configuração e as dependências transitivas (webpack, Babel, ESLint, etc.) diretamente para o seu projeto, para que você tenha controle total sobre eles. Todos os comandos, exceto o eject, continuarão funcionando, mas agora apontarão para os scripts copiados, permitindo que você os modifique. A partir desse ponto, você estará por conta própria.

Você nunca precisará usar eject. O conjunto de recursos fornecido é adequado para implantações pequenas e médias, e você não deve se sentir obrigado a usá-lo. No entanto, entendemos que esta ferramenta não seria útil se você não pudesse personalizá-la quando estivesse pronto para isso.
