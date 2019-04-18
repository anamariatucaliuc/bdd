/***************************************** */
/***************************************** */
// on a instancié le router(middleware qui va permettre d'éxécuter plusieurs actions)
// route pour afficher/ route pour créer la liste des presonnages
var router = require('express').Router();


var Categorie = require('./../models/Categorie');

router.get('/new', (req, res) => {
    var categorie = new Categorie();
    res.render('categories/edit.html', { categorie: categorie, endpoint: '/categories/' });
});

router.get('/edit/:id', (req, res) => {
    Categorie.findById(req.params.id).then(categorie => {
      res.render('categories/edit.html', { categorie: categorie, endpoint: '/categories/' + type._id.toString() });
    });
});

router.get('/delete/:id', (req, res) => {
    Categorie.findOneAndDelete({ _id: req.params.id }).then(() => {
    res.redirect('/');
  },
  err => console.log(err));
});

router.get('/:categorie', (req,res) => {
    Categorie.findOne({ name:req.params.categorie}).populate('personnages').then(categorie =>{
        if(!categorie) return res.status(404).send('On ne trouve pas la categorie');
        res.render('categories/show.html',{
           categorie: categorie,
           personnages: categorie.personnages
       }) 
    }, err => console.log(err));
});

router.post('/:id?', (req,res) => {
    //promise = objet qui représente une opération asynchrone
    new Promise((resolve, reject) => {
      if(req.params.id) {
        Categorie.findById(req.params.id).then(resolve, reject);
      }
      else {
        resolve(new Categorie());
      }
    }).then(categorie => {
        categorie.name = req.body.name;
        categorie.color = req.body.color;
  
        return categorie.save();
    }).then(() => {
        res.redirect('/');
    }, err => console.log(err));
  });

module.exports = router;