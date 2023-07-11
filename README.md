# Digital-Republic-API

<p>Esse repositório tem como objetivo atingir os requisitos propostos no desafio técnico da empresa Digital Republic, o backend como API foi desenvolvido utilizando Node.js, MongoDB para o banco de dados não relacional e JEST para teste de integrações.</p>

# Preparando Ambiente
<p> Abaixo os pré-requisitos necessários para que a API execute corretamente em localhost:3000 <p>

<h3> Instale o Node.js </h3>
<span> Acesse esse <a href="https://nodejs.org/en/download/" target="_blank"> link </a> e faça o download do node.js em sua última versão </span>

<h3> Instale o MongoDb </h3>
<span> Acesse esse <a href="https://www.mongodb.com/try/download/community" target="_blank"> link </a> e faça o download do MongoDb </span>

<h3> Instale o MongoDb Compass </h3>
<span> Acesse esse <a href="https://www.mongodb.com/try/download/compass" target="_blank"> link </a> e faça o download do MongoDb Compass </span><br><br>
 
<p> Após instalar os softwares acima, acesse a raiz do projeto e execute o comando <strong> npm install </strong> para que a pasta /node_modules seja gerada.</p>
<p> Por fim execute o comando <strong> npm start </strong> então a API estará online na porta 3000.</p>

# Rotas da API

<h3> Cadastrar uma nova conta Bancária</h3>
<code> Método: post </code> <br>
<code> Url: http://localhost:3000/account </code><br>
<code>
  Payload: {
    "cpf": Int,
    "name": String,
    "balance": Float (Opcional, se não inserido será 0)
  } 
</code><br>

<h3> Depósito para a própria conta bancária</h3>

<code> Método: put </code> <br>
<code> Url: http://localhost:3000/account/${account_id} </code><br>
<code>
  Payload: {
    "transaction": Float (Máximo permitido é R$2000)
  } 
</code><br>

<h3> Transferência entre contas bancárias</h3>

<code> Método: put </code> <br>
<code> Url: http://localhost:3000/account/${account_id}/transaction/${account_to_recive_id} </code><br>
<code>
  Payload: {
    "transaction": Float (Máximo permitido é R$2000)
  } 
</code><br>

# Testes Automatizados
<p> Para executar os testes desenvolvidos utilizando JEST, execute o comando <strong>npm test</strong></p>
<p> <strong> Atenção </strong>, após executar os testes uma vez, caso queira executa-los novamente é aconselhável que a base de dados seja limpa, o motivo disso é devido a um requisito funcional do sistema onde um usuário (cpf) pode ter somente uma única conta bancária. </p>

<h3> Descrição dos testes sobre criação de uma nova conta </h3>

<code> - Registro de um novo customer e sua conta bancária, sem saldo informado. </code><br>
<code> - Registro de um novo customer e sua conta bancária, com saldo informado. </code><br>
<code> - Registro de um customer sem CPF informado. </code><br>
<code> - Registro de um customer e sua conta bancária, porém já existe uma conta atrelada ao cpf informado. </code><br>
<code> - Registro de um customer sem o nome completo informado. </code><br>
<code> - Registro de um customer com cpf inválido. </code><br>
<code> - Registro de um customer com saldo negativo. </code><br>

<h3> Descrição dos testes sobre depósito para a própria conta bancária </h3>

<code> - Depósito respeitando o limite de R$2000</code><br>
<code> - Depósito não respeitando o limite de R$2000</code><br>
<code> - Depósito com valor negativo</code><br>
 
<h3> Descrição dos testes sobre transferência bancária entre contas. </h3>

<code> - Transação respeitando o limite de R$2000</code><br>
<code> - Transação não respeitando o limite de R$2000</code><br>
<code> - Transação com valor negativo</code><br>
<code> - Transação com o montante maior do que o disponível em conta</code><br>

# Digital-Republic-api
