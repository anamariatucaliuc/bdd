var mongoose = require('mongoose');

/******************************************* */
/******************************************* */
// on definit un modèle avec des champs
// on passe un paramètre un objet qui contient des differents champs
// un personnage peut avoir plusieurs categories, et une categorie peut avoir plusieurs personnages
var personnageSchema = new mongoose.Schema({
    name: String,
    number: Number,
    description: String,
    picture: String,                             // chemin de l'image
    categories: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categorie'                        // ces ObjetId sont references vers des objets du modèle Categorie
    }
    ]
});

var Personnage = mongoose.model('Personnage',personnageSchema);

// on va exporter le modèle car on va l'utiliser dans d'autres parties de l'application
module.exports = Personnage;