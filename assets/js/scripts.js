//formulaire + alerte
function Form() { 
	let x = document.forms["myForm"]["fname"].value; /*crée une variable x correspondant à la valeur de fname*/
	if (x == "") { /*vérifie si la valeur de x est vide*/
		alert("Give me your name."); /*si c'est le cas, crée une alerte avec message "Give me your name"*/
		return false; /*arrête la fonction et empêche une action par défaut*/
	}
	else { /*sinon, si x n'est pas vide*/
		alert("Hello " + document.myForm.fname.value + "! ☺ ");/*crée une alerte avec message "Hello Nom ! ☺"*/
		return true; /*arrête la fonction sans empêcher une action par défaut*/
	} 
}
	
//bouton 	
const AnswerMe = document.getElementById('AnswerMe'); /*crée un objet invariable AnswerMe et l'identifie comme l'élément AnswerMe défini dans le ficier html, c'est-à-dire le bouton*/
const messageDiv = document.getElementById('messageDiv');/*même chose avec messageDiv, le message affiché*/
let showFirstMessage = true;/*crée une variable showFirstMessage qu'on définit comme vraie par défaut*/
AnswerMe.addEventListener('click', function () {/*crée un EventListener qui exécute la fonction quand le bouton est cliqué*/
    if (showFirstMessage) {
        messageDiv.textContent = 'What do we fight for?';/*si la variable showFirstMessage est vraie, il affiche le premier message dans la div*/
    } else {
        messageDiv.textContent = 'Death!';/*sinon, il affiche la réponse à la question*/
    }
    showFirstMessage = !showFirstMessage;/*si showFirstMessage est vrai, il le change en faux, et inversement, ce qui permet de répéter l'action*/
});

/*base du projet, code de l'exercice en classe*/
window.onload = function() {
    let fileInput = document.getElementById('fileInput');
    let fileDisplayArea = document.getElementById('fileDisplayArea');

    // On "écoute" si le fichier donné a été modifié.
    // Si on a donné un nouveau fichier, on essaie de le lire.
    fileInput.addEventListener('change', function(e) {
        // Dans le HTML (ligne 22), fileInput est un élément de tag "input" avec un attribut type="file".
        // On peut récupérer les fichiers données avec le champs ".files" au niveau du javascript.
        // On peut potentiellement donner plusieurs fichiers,
        // mais ici on n'en lit qu'un seul, le premier, donc indice 0.
        let file = fileInput.files[0];
        // on utilise cette expression régulière pour vérifier qu'on a bien un fichier texte.
        let textType = new RegExp("text.*");

        if (file.type.match(textType)) { // on vérifie qu'on a bien un fichier texte
            // lecture du fichier. D'abord, on crée un objet qui sait lire un fichier.
            var reader = new FileReader();

            // on dit au lecteur de fichier de placer le résultat de la lecture
            // dans la zone d'affichage du texte.
            reader.onload = function(e) {
                fileDisplayArea.innerText = reader.result;
            }

            // on lit concrètement le fichier.
            // Cette lecture lancera automatiquement la fonction "onload" juste au-dessus.
            reader.readAsText(file);    

            document.getElementById("logger").innerHTML = '<span class="infolog">Fichier chargé avec succès</span>';
        } else { // pas un fichier texte : message d'erreur.
            fileDisplayArea.innerText = "";
            document.getElementById("logger").innerHTML = '<span class="errorlog">Type de fichier non supporté !</span>';
        }
    });
	};

/*segmentation du texte*/	
function Segmentation() {
	let fileText = document.getElementById("fileDisplayArea").innerText; //définit fileText comme le texte affiché dans la div "fileDisplayArea", donc le texte lu par le file reader précédemment
	let separateur = ","; //définit le séparateur comme ","
	if (fileText === "") { 
		alert("Pas de texte à segmenter!"); //si le texte est vide, alerter "Pas de texte à segmenter!"
	}else{
		let segments = fileText.split(separateur); //sinon, définit "segments" comme le texte divisé par les instances de ","
		document.getElementById("page-analysis").innerHTML = segments.join(" ||| "); //affiche les segments joints par " ||| " au lieu de "," dans la div "page-analysis"
	}
}

/*exercice 4 du TD7*/
function exercice4() {
	let separateur2 = " "; //définit le séparateur comme un espace
	let monTexte = document.getElementById("texteExercice4").value; //assigne à "monTexte" la valeur de ce qui est contenu dans la boîte "texteExercice4"
	if (monTexte === "") { 
		alert("Pas de texte à segmenter!"); //si le texte est vide, alerter "Pas de texte à segmenter!"
	}else{
		let segments2 = monTexte.split(separateur2); //sinon, définit "segments" comme le texte divisé par les espaces
		let tableHTML = "<table class='table'>"; //crée un tableau html suivant le style "table" défini dans assets/css/styles.css
		tableHTML += "<tr><th>N° du mot</th><th>Mot</th></tr>"; //ajoute la première ligne du tableau avec deux colonnes : n° de mot et mot
		segments2.forEach((segment, index) => { //utilise la méthode forEach, appliquée aux éléments "segment" (les mots segmentés) et "index" avec la fonction fléchée
		tableHTML += `<tr><td>${index + 1}</td><td>${segment}</td></tr>`; //pour chaque segment, il ajoute une ligne dans le tableau avec une colonne index, débutant à 1, et le mot correspondant dans une deuxème colonne, jusqu'à n'avoir plus d'élément à ajouter
        });
        tableHTML += "</table>"; //ferme le tableau
        document.getElementById("exercice4Resultat").innerHTML = tableHTML; //affiche le tableau dans la div "exercice4Resultat"
    }
}









//brouillons + code non compris, à modifier plus tard

//let separateur = document.getElementById("delimID").value;
  
/*barre de progression
function myFunction() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("myBar").style.width = scrolled + "%";
} */