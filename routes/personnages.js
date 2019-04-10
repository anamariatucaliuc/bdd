/***************************************** */
/***************************************** */
// on a instancié le router(middleware qui va permettre d'éxécuter plusieurs actions)
// route pour afficher/ route pour créer la liste des presonnages
var router = require('express').Router();

var Personnage = require('./../models/Personnage');

// récupérer la liste de toutes les categories
var Categorie = require('./../models/Categorie');


// définir la page d'accueil
router.get('/',(req,res) => {
	Personnage.find({}).populate('categories').then(personnages => {				// on éxécute la fonction , on récupère request et response
      res.render('personnages/index.html', {personnages: personnages}) ;  			// récupérer le personange et la catégorie de chaque personnage
    });
});

// routes vers le formulaire 
// endpoint c'est l'URL du formulaire à appeller
router.get('/new', (req, res)=> {
	Categorie.find({}).then(categories => {									// récupére toutes les categories de la base
		var personnage = new Personnage();									// on éxécute la fonction , on récupère request et response
		res.render('personnages/edit.html', {personnage: personnage, categories: categories, endpoint: '/' });	    // récupérer le personange et la catégorie de chaque personnage
	  });
});

router.get('/edit/:id', (req, res)=> {
	Categorie.find({}).then(categories => {	
		Personnage.findById(req.params.id).then(personnage => {
			res.render('personnages/edit.html', {personnage: personnage, categories: categories , endpoint:'/' + personnage._id.toString() });
		})
	});
});

router.get('/delete/:id', (req,res) =>{
	Personnage.findOneAndRemove({_id: req.params.id}).then(()=>{
		res.redirect('/')
	})
})

// on éxécute la fonction; on récupère request et response (la dernière qui doit être défini)
router.get('/:id', (req, res)=> {
	Personnage.findById(req.params.id).populate('categories').then(personnage => {
		res.render('personnages/show.html', {personnage: personnage});
	},
	err => res.status(500).send(err));
});


// ? il s'aggit un paramètre optionnel
router.post('/:id?' , (req, res)=> {
	// vérifier s'il existe un id
	new Promise( (resolve,reject) => {
		if(req.params.id){
			//on récupére les personnages de la base
			Personnage.findById(req.params.id).then(resolve,reject);
		} else{
			resolve(new Personnage())
		}
	}).then(personnage => {
		personnage.name = req.body.name;
		personnage.description = req.body.description;
		personnage.number = req.body.number;
		personnage.categories = req.body.categories;

		if(req.file) personnage.picture = req.file.filename;				// le nom du fichier qui a été uploadé
		

		return personnage.save();
	}).then( () => {
		res.redirect('/');
	}, err => console.log(err) )
});
module.exports = router;