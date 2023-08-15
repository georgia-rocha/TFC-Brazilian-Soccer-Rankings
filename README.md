# Boas vindas ao repositório do projeto TFC 🚀
 # O que foi desenvolvido 👩‍🎓

  O TFC é um site informativo sobre partidas e classificações de futebol! soccer

  Nesse projeto, foi construido um back-end dockerizado que é consumido por um front-end já desenvolvido. com a modelagem de dados através do Sequelize e respeitando as regras de negócio.
  Esse projeto tem 4 entidades que são importantes para sua estrutura, são elas:
  
  - Banco de Dados;
  - Back-End;
  - Front-End;
  - Docker;

   ![Exemplo app front](/front.png)  

# Tecnologias utilizadas <a name="tecnologias"></a>

- [**Node JS**](https://nodejs.org/pt-br/)
- [**Express**](https://expressjs.com/pt-br/)
- [**MySQL**](https://www.mysql.com/)
- [**Sequelize**](https://sequelize.org/)
- [**Docker**](https://www.docker.com/)
- [**Mocha**](https://mochajs.org/)
- [**Chai**](https://www.chaijs.com)
- [**Sinon**](https://sinonjs.org/)

# Orientações <a name="orientacoes"></a>

<details>
<summary><strong> ⚠️ Configurações mínimas para execução do projeto</strong></summary><br />

Na sua máquina você deve ter:

 - Sistema Operacional Distribuição Unix
 - Node versão 16
 - Docker
 - Docker-compose versão >=1.29.2

➡️ O `node` deve ter versão igual ou superior à `16.14.0 LTS`:
  - Para instalar o nvm, [acesse esse link](https://github.com/nvm-sh/nvm#installing-and-updating);
  - Rode os comandos abaixo para instalar a versão correta de `node` e usá-la:
    - `nvm install 16.14 --lts`
    - `nvm use 16.14`
    - `nvm alias default 16.14`

➡️ O `docker-compose` deve ter versão igual ou superior à`ˆ1.29.2`:
  * Use esse [link de referência para realizar a instalação corretamente no ubuntu](https://app.betrybe.com/learn/course/5e938f69-6e32-43b3-9685-c936530fd326/module/94d0e996-1827-4fbc-bc24-c99fb592925b/section/5987fa2d-0d04-45b2-9d91-1c2ffce09862/day/2f1a5c4d-74b1-488a-8d9b-408682c93724/lesson/b883b81d-21f6-4b60-aa62-8508f6017ea0);
  * Acesse o [link da documentação oficial com passos para desinstalar](https://docs.docker.com/compose/install/#uninstallation) caso necessário.

</details>
<details>
<summary><strong> 🔰 Iniciando o projeto</strong></summary><br />

  1. Clone o repositório
  * `git@github.com:georgia-rocha/TFC-Brazilian-Soccer-Rankings.git`

  2. Entre na pasta do repositório que você acabou de clonar:
  * `cd TFC-Brazilian-Soccer-Rankings`

  3. Instale as dependências (Isso ja ira instalar tanto o front quanto o backend).
  * `npm install`

  4. Execute o docker compose.
  * `npm run compose:up`
  * Obs: São utilizas as portas 3306, 3001 e 3000 , certifique-se que elas estão disponíveis no momento de executar o comando.

  5. Para acessar.
   - Porta Front-End - http://localhost:3000
   - Porta Back-End - http://localhost:3001
</details>

<details>

## Testes Integração Back-end 

  <summary><strong>🛠 Execução de testes localmente</strong></summary>

  Para executar os testes localmente, basta executar o comando `npm run test:coverage`.

  Você verá a lista de testes aprovados e a tabela de cobertura deles.
  <br>
</details>

## Requisitos Obrigatórios 100%
### Fluxo 1
- [x] 1- Desenvolvi em /app/backend/src/database nas pastas correspondentes, uma migration e um model para a tabela de times;
- [x] 2- Desenvolvi o endpoint /teams no back-end de forma que ele retorna todos os times corretamente;
- [x] 3- Desenvolvi o endpoint /teams/:id no back-end de forma que ele retorna dados de um time específico;
### Fluxo 2
- [x] 1- Desenvolvi em /app/backend/src/database nas pastas correspondentes, uma migration e um model para a tabela de pessoas usuárias;
- [x] 2- Desenvolvi o endpoint /login no back-end de maneira que ele permite o acesso com dados válidos no front-end;
- [x] 3- Desenvolvi o endpoint /login no back-end de maneira que ele não permite o acesso com um email não cadastrado ou senha incorreta no front-end;
- [x] 4- Desenvolvi um middleware de validação para o token, verificando se ele é válido, e desenvolvi o endpoint /login/role no back-end de maneira que ele retorna os dados corretamente no front-end;
### Fluxo 3
- [x] 1- Desenvolvi em /app/backend/src/database nas pastas correspondentes, uma migration e um model para a tabela de partidas;
- [x] 2- Desenvolvi o endpoint /matches de forma que os dados aparecem corretamente na tela de partidas no front-end;
- [x] 3- Desenvolvi o endpoint /matches de forma que é possível filtrar somente as partidas em andamento, e também filtrar somente as partidas finalizadas, na tela de partidas do front-end;
- [x] 4- Desenvolvi o endpoint /matches/:id/finish de modo que é possível finalizar uma partida no banco de dados;
- [x] 5- Desenvolvi o endpoint /matches/:id de forma que é possível atualizar partidas em andamento;
- [x] 6- Desenvolvi o endpoint /matches de modo que é possível cadastrar uma nova partida em andamento no banco de dados;
- [x] 7- Desenvolvi o endpoint /matches de forma que não é possível inserir uma partida com times iguais nem com um time que não existe na tabela de times;
### Fluxo 4
- [x] 1- Desenvolvi o endpoint /leaderboard/home de forma que retorna as informações do desempenho dos times da casa com as seguintes propriedades: name, totalPoints, totalGames, totalVictories, totalDraws, totalLosses, goalsFavor e goalsOwn;
- [x] 2- Desenvolvi o endpoint /leaderboard/home de forma que é possível filtrar as classificações dos times da casa na tela de classificação do front-end com os dados iniciais do banco de dados, incluindo as propriedades goalsBalance e efficiency, além das propriedades do requisito anterior;
- [x] 3- Desenvolvi o endpoint /leaderboard/home de forma que é possível filtrar as classificações dos times da casa na tela de classificação do front-end, e atualizar a tabela ao inserir a partida Corinthians 2 X 1 Internacional;
- [x] 4- Desenvolvi o endpoint /leaderboard/away de forma que retorna as informações do desempenho dos times visitantes com as seguintes propriedades: name, totalPoints, totalGames, totalVictories, totalDraws, totalLosses, goalsFavor e goalsOwn;
- [x] 5- Desenvolvi o endpoint /leaderboard/away, de forma que é possível filtrar as classificações dos times quando visitantes na tela de classificação do front-end, com os dados iniciais do banco de dados, incluindo as propriedades goalsBalance e efficiency, além das propriedades do requisito anterior;
- [x] 6- Desenvolvi o endpoint /leaderboard/away de forma que é possível filtrar as classificações dos times quando visitantes na tela de classificação do front-end e atualizar a tabela ao inserir a partida Corinthians 2 X 1 Internacional;
      
### Desenvolvi testes que cubrem no mínimo 80 por cento dos arquivos em /app/backend/src e contém mais de 100 linhas cobertas.

