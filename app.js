//******************************** */
// fichier principal de l'application lancement dans le terminal avec node app.js
// express permet de simplifier le processus de création d'une application web
// mongoose permet de manipuler plus facilement les données dans la base de données -> création des catégories pour les personnages + modéliser les relation entre modèles
// nunjucks c'est un moteur de template génerer des pages web, inclure des données à l'interieur etc.
var express = require('express');
var mongoose = require('mongoose');
var nunjucks = require('nunjucks');
var bodyParser = require('body-parser');
var multer = require('multer');
/********************************** */

var upload= multer({
    dest : __dirname +'/uploads'
});

// connexion à la base des données sur MongoAtlas
mongoose.connect('mongodb+srv://anamariatucaliuc11:Mongo@cluster0-zbehl.mongodb.net/personnages', {useNewUrlParser: true } );

// definir les differents modèles ici Personnage et Catégories
require('./models/Personnage');
require('./models/Categorie');

// instancier l'application express
var app = express();

/******************************************************************************* */
// bootstrap c'est une librarie css (but faire des pages jolies + rapides, accéssibles depuis le navigateur web)
// on utilse le middleware express statique
// quand dans le navigateur on mets /css/.... ----> express va recuperer le fichier statique css de bootstrap
app.use('/css',express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/images', express.static(__dirname + '/images'));
//*********************************************************************************** */
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(upload.single('file'))                          // dans le fichiers si on aun chanp file on sauvgarde dans le repertoire uploads

// utiliser aussi les routes

app.use('/categories',require('./routes/categories'));  // toutes les routes qui commencent par /categories
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use('/',require('./routes/personnages'));           // toutes les routes qui commencent par /
/****************************** */
/******************************** */
// configuration de nunjucks (1èr le chemin pour les views, 2ème paramètre un objet) ;views pour les differents views
nunjucks.configure('views', {               // on passe un Objet avec des options
    autoescape: true,                       // echaper toutes les caractères html présents dans nos differents variables
    express: app                            // option pour passer l'instance de notre application 
});


app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

/*************************************************** */
/*************** DEBUT******************************* */
// vérification que ça fonctionne 1ér paramètre / et 2ème une fonction par recupère les paramètres request,response
// ici pour le test on définit une route qui va executer la fonction à chaque fois qu'on va à la racine de notre application

/*app.get('/',(req,res) => {                  //request(la reqête vers notre serveur), response(la reponse qu'on envoie aux clients)
/  res.send('==Hello World ==')
}) */