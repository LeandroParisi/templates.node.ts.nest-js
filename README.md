
  <p align="center">
    <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /><a>
  </p>
  <p align="center">Exemplo de aplicação do Clean Architecture com Nest JS</p>

  [![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=clean-architecture-nestjs&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=clean-architecture-nestjs)
  [![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=clean-architecture-nestjs&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=clean-architecture-nestjs)
  [![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=clean-architecture-nestjs&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=clean-architecture-nestjs)
  [![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=clean-architecture-nestjs&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=clean-architecture-nestjs)
  [![Coverage](https://sonarcloud.io/api/project_badges/measure?project=clean-architecture-nestjs&metric=coverage)](https://sonarcloud.io/summary/new_code?id=clean-architecture-nestjs)
  [![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=clean-architecture-nestjs&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=clean-architecture-nestjs)
  [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=clean-architecture-nestjs&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=clean-architecture-nestjs)
  [![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=clean-architecture-nestjs&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=clean-architecture-nestjs)
  [![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=clean-architecture-nestjs&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=clean-architecture-nestjs)
  [![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=clean-architecture-nestjs&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=clean-architecture-nestjs)
  [![Bugs](https://sonarcloud.io/api/project_badges/measure?project=clean-architecture-nestjs&metric=bugs)](https://sonarcloud.io/summary/new_code?id=clean-architecture-nestjs)

## Descrição

Esse projeto tem o intuito de apresentar um exemplo de implementação dos conceitos e técnicas do [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) em uma aplicação usando o framework [Nest JS](https://nestjs.com/).

## Requisitos

Alguns poucos requisitos são necessários para a execução do projeto, a saber:

- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/) instalados localmente.

- [Node Js](https://nodejs.org/en/) Versão >= 14

## Setup

O setup inicial é bem simples e requer 3 variáveis de ambientes inicialmente, que devem ser configuradas em seu ambiente local, a saber:

- GITLAB_AUTH_TOKEN: [Personal Access Token](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html) do Git lab.

- SNIPPET_DEV_FILE_ID: Identificador para baixar e configurar o Snippet que contém as variáveis de ambiente da aplicação em DEV (Valor Atual: 2390472)

- SNIPPET_TEST_FILE_ID: : Identificador para baixar e configurar o Snippet que contém as variáveis de ambiente da aplicação em TEST (Valor Atual: 2390473)

<br/>

Após configurar as variáveis de ambiente siga os seguintes passos para execução da aplicação:

```bash
# Instalando dependências
yarn install
```

```bash
# Subindo ambiente local (Docker compose)
yarn start:env:local
```


```bash
# Inicia a aplicação em modo de desenvolvimento
yarn start:dev
```

A partir desse ponto, a aplicação já estará em execução em modo watch mode. Verifique se o swagger esta ativo: <http://localhost:3000/api/>


<br/>

### O que o ambiente local disponibiliza?

<br/>

- [Postgres](https://www.postgresql.org/) Como banco de dados relacional.

- [PgAdmin](https://www.pgadmin.org/) Para administração do Postgres.

- [Redis](https://redis.io/) Como banco de dados não relacional para cache de resposta HTTP.

- [Redis Insight](https://redis.com/redis-enterprise/redis-insight/) Para administração do Redis.

- [SonarQube](https://www.sonarqube.org/) Para análise estática de código fonte.

<br/>

### Usando as ferramentas de administração local

**PgAdimin**: Click no link <http://localhost:16543/>. Você será direcionado para página de Login. Insira as seguintes credências: Email: ```admin@admin.com.br```, Senha: ```admin```. Para finalizar adicione do banco de dados local. Credências de acesso estão em ```./env/.env.development```. [Tutorial](https://www.programandocomcarlos.com.br/2020/01/pgadmin-4-configurando-um-server.html) como adicionar base de dados no PGAdmin. HostName: "pgsql".

**Redis Insight**: Click no link <http://localhost:8001/>, aceite os termos de licença, click em "I already have a database", depois click em "Connect to a Redis Database". No campo "Host" insira ```redis://redis:6379``` em "Password" insira ```redis```. Para finalizar click em "ADD REDIS DATABASE".

**SonarQube**: Click no link <http://localhost:9000/>, você será redirecionado para página de login. Insira o usuário "admin" e senha "admin". Após isso será solicitado a troca de senha. Crie um novo projeto manualmente, siga o [setup oficial](https://docs.sonarqube.org/latest/setup/get-started-2-minutes/). Serão necessárias mais duas variáveis de ambiente, que serão criadas com as informações do projeto no SonarQube, a saber:

**Sugestão de projectKey**: example-clean-architecture

- SONAR_TOKEN: Token de autenticação gerado no setup
- SONAR_PROJECT_KEY: Project Key gerado no setup

<br/>

Para testar se está tudo bem com sonar podemos usar o comando:

```bash
yarn sonar
```

Após a execução já veremos os dados de análise do nosso projeto. Devem ser idênticos a esses do [Sonar Cloud](https://sonarcloud.io/organizations/clean-architecture-example/projects).

Pronto já temos uma ambiente de desenvolvimento!

## Executando testes

```bash
# Unitários
yarn test:local
```

```bash
# End to End (Ambiente de testes com docker compose)
yarn test:e2e:docker
```