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
}

const delimInput = document.getElementById('delimID');
const delimiters = delimInput.value;
const segments = segmentText(fileContent, delimiters);

//brouillons, code non compris
/*read txt file : lien de la source du code dans la page html, je n'ai pas compris comment le faire moi-même donc j'essaie de comprendre les étapes du code de quelqu'un d'autre*/
document.getElementById('inputFile').addEventListener('change', function() { /*sélectionne l'élément inputFile défini dans le code html et crée un EventListener pour l'élément change, déclenché quand on sélectionne un fichier*/
        var file = new FileReader(); /*crée une variable "file" définie comme un nouvel objet FileReader, qui permet de lire le contenu du fichier sélectionné*/
        file.onload = () => { /*définit la fonction qui est exécutée après*/
          document.getElementById('output').textContent = file.result; /*sélectionne l'élément "output" défini dans le code html, donc la balise <pre>, et y affiche le résultat de la lecture du fichier*/
        }
        file.readAsText(this.files[0]);
      }
	  )	   
/*barre de progression
function myFunction() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("myBar").style.width = scrolled + "%";
} */