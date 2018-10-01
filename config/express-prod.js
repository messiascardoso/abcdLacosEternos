//Configuracao do express

var express = require('express');
var consign = require('consign');
//Muter
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require("cookie-parser");
var session = require("express-session");
var passport = require("passport");
//Validar dados do formulario
var expressValidator = require('express-validator');
//Liberar acesso de outros ips externo 
var cors = require('cors');
//Camada de seguranca
var helmet = require('helmet');

var flash = require('connect-flash');


module.exports = function () {


  //Ao usar somente a função cors(), estaremos liberando acesso completo
  // de nossa API para qualquer cliente consumir.   

  var app = express();

  app.use(cors());

  /* app.use(cors({
     origin: ["http://localhost:8100/"],
     methods: ["GET", "POST", "PUT", "DELETE"],
     allowedHeaders: ["Content-Type", "Authorization"]
   }));*/

  app.set('port', 80);
  // app.use(express.static(path.join('./public')));
  app.use(express.static(path.join('./dist')));

  //Config para modulo Formidable 
  /* app.set('view engine', 'ejs');
   app.set('views', './api/views');*/

  // novos middlewares
  app.use(bodyParser.urlencoded({ extended: true }));
  //Le o req.body e faz o parse para Json 
  app.use(bodyParser.json());
  app.use(require('method-override')());

  //Obrigatoriamente logo apos o bodyParser
  app.use(expressValidator());

  //Autentica PASSPORT
  /* O primeiro middleware cookieParser realiza o parser do header de
  cookies da requisição populando req.cookies e armazena o ID da sessão.*/
  app.use(cookieParser());
  /* O segundo middleware session cria por padrão a sessão do usuário em
   memória. Ele recebe três parâmetros: */
  app.use(session({ secret: '#Macaco@India2016', resave: true, saveUninitialized: true }));



  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());


  //Camada de seguranca
  app.use(helmet());




  /*app sendo carregado primeiro
   para nao precisar usar requiere para importar modulos
   CWD indica diretorio raiz*/
  consign({ cwd: 'api' })
    .include('models')
    .then('controllers')
    // .then('routes/login.js')
    .then('routes')
    .into(app);//Recebe a instancia do Express() e carrega nos arquivos o modulo app


  return app;
};