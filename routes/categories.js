/***************************************** */
/***************************************** */
// on a instancié le router(middleware qui va permettre d'éxécuter plusieurs actions)
// route pour afficher/ route pour créer la liste des presonnages
var router = require('express').Router();


var Categorie = require('./../models/Categorie');

router.get('/:categorie', (req,res) => {
    Categorie.findOne({ name:req.params.type}).populate('personnages').then(categorie =>{
        if(!categorie) return res.status(404).send('On ne trouve pas la categorie');
     
        res.render('/categories/show.html',{
           categorie: categorie,
           personnages: categorie.personnages
       }) ;
    }, err => console.log(err));
});
module.exports = router;