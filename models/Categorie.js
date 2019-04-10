var mongoose = require('mongoose');

var categorieSchema = new mongoose.Schema({
    name: String,                           // catégorie
    color: {
        type : String,
        default: 'red'                      // couleur par défault
    }
});


/****************************************** */
/****************************************** */
// champ virtuel pas stocké dans la base mais tout le temps utilisé (définir des relations entre les différentes categories)
// définr un virtual personnage qui est une référence vers le type Personnage
// relation many to many entre les Personnages et les catégories
categorieSchema.virtual('personnages',{         // on passe un objet
    ref:'Personnage',                           // le nom du modèle concerné par la relation
    localField:'_id',                           // du modèle catégorie
    foreignField: 'categories'                  // modèle personnages 
});


var Categorie = mongoose.model('Categorie',categorieSchema);

module.exports = Categorie;


/************************************** */
//categorie.personnages --> recuperer la liste des personnages de ce type 