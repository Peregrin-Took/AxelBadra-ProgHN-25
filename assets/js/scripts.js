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

/*BASE DU PROJET (base : code de l'exercice en classe)*/
window.onload = function() {
    let fileInput = document.getElementById('fileInput');
    let fileDisplayArea = document.getElementById('fileDisplayArea'); 
	let tokensDisplayArea = document.getElementById('tokens-display');
    fileInput.addEventListener('change', function(e) {// On "écoute" si le fichier donné a été modifié. Si on a donné un nouveau fichier, on essaie de le lire.
        let file = fileInput.files[0];// On peut potentiellement donner plusieurs fichiers, mais ici on n'en lit qu'un seul, le premier, donc indice 0.
        let textType = new RegExp("text.*");// on utilise cette expression régulière pour vérifier qu'on a bien un fichier texte.

		if (file.type.match(textType)) { // on vérifie qu'on a bien un fichier texte
            
            var reader = new FileReader();// lecture du fichier. D'abord, on crée un objet qui sait lire un fichier.
			reader.onload = function(e) {
                fileDisplayArea.innerText = reader.result; //on dit au lecteur de fichier de placer le résultat de la lecture dans la zone d'affichage du texte. 
			let result2 = reader.result //crée une variable result2, qui est le texte sans majuscules ni ponctuation 
				.toLowerCase()
				.replace(/[^\p{L}'\s]/gu, ''); //garde tout ce qui n'est pas entre crochets, donc les carcatères de toutes les langues (pour inclure les accents), les apostrophes et les espaces ; appliqué à tous les caractères de manière universelle
            const tokens = result2.split(/[\s,;]+/); //définit les tokens comme le résultat du replace, ignorant les espaces (\s), points, et points virgules
			console.log(tokens);
				let tableHTML = "<table class='table'>"; //crée un tableau html suivant le style "table" défini dans assets/css/styles.css
					tableHTML += "<tr><th>N°</th><th>Word</th></tr>"; //ajoute la première ligne du tableau avec deux colonnes : n° et word
					tokens.forEach((token, index) => { //utilise la méthode forEach, appliquée aux tokens et "index" avec la fonction fléchée
					tableHTML += `<tr><td>${index + 1}</td><td>${token}</td></tr>`; //pour chaque segment, il ajoute une ligne dans le tableau avec une colonne index, débutant à 1, et le mot correspondant dans une deuxème colonne, jusqu'à n'avoir plus d'élément à ajouter
				});
					tableHTML += "</table>"; //ferme le tableau
				tokensDisplayArea.innerHTML = tableHTML; //affiche le tableau dans la div "page-analysis"
			}
            reader.readAsText(file); // on lit concrètement le fichier. Cette lecture lancera automatiquement la fonction "onload" juste au-dessus.
			

            document.getElementById("logger").innerHTML = '<span class="infolog">Fichier chargé avec succès</span>';
        } else { // pas un fichier texte : message d'erreur.
            fileDisplayArea.innerText = "";
            document.getElementById("logger").innerHTML = '<span class="errorlog">Type de fichier non supporté !</span>';
        }
    });
	};


/*SEGMENTATION*/	
function Segmentation() { // segmentation du texte donné dans un fichier .txt
	let separateurTxt = document.getElementById("delimID").value; //définit le séparateur comme le contenu de l'élément delimID
	let fileText = document.getElementById("fileDisplayArea").innerText; //définit fileText comme le texte affiché dans la div "fileDisplayArea", donc le texte lu par le file reader précédemment
	if (separateurTxt === "") { //si le séparateur est vide
		alert("Pas de séparateur.");//alerter "Pas de séparateur."
		return; //arrête la fonction
	}
	if (fileText.trim() === "") { //si le texte, une fois les espaces et retours à la ligne enlevés, est vide
		alert("Pas de texte à segmenter!"); //alerter "Pas de texte à segmenter!"
	} else {
		let delimitersRegex = new RegExp(`[${separateurTxt.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]`); //crée une expression régulière qui remplace les caractères spéciaux ayant une fonction au sein de l'expression régulière, pour qu'ils soient considérés comme de simples caractères et que l'utilisateur puisse entrer plusieurs délimiteurs
		let segments = fileText.split(delimitersRegex); //définit "segments" comme le texte divisé par les délimiteurs
		let tableHTML = "<table class='table'>"; //crée un tableau html suivant le style "table" défini dans assets/css/styles.css
		tableHTML += "<tr><th>N°</th><th>Word</th></tr>"; //ajoute la première ligne du tableau avec deux colonnes : n° et word
		segments.forEach((segment, index) => { //utilise la méthode forEach, appliquée aux éléments "segment" (les mots segmentés) et "index" avec la fonction fléchée
		tableHTML += `<tr><td>${index + 1}</td><td>${segment}</td></tr>`; //pour chaque segment, il ajoute une ligne dans le tableau avec une colonne index, débutant à 1, et le mot correspondant dans une deuxème colonne, jusqu'à n'avoir plus d'élément à ajouter
        });
        tableHTML += "</table>"; //ferme le tableau
        document.getElementById("page-analysis").innerHTML = tableHTML; //affiche le tableau dans la div "page-analysis"
		
}};
function exercice4() { // segmentation d'un texte écrit par l'utilisateur
	let separateur = document.getElementById("delimID").value; //définit le séparateur comme le contenu de l'élément delimID
	if (separateur === "") { //si le séparateur est vide
		alert("Pas de séparateur.");//alerter "Pas de séparateur."
		return;
	}		//arrête la fonction
	let monTexte = document.getElementById("texteExercice4").value; //assigne à "monTexte" la valeur de ce qui est contenu dans la boîte "texteExercice4"
	if (monTexte === "") { 
		alert("Pas de texte à segmenter!"); //si le texte est vide, alerter "Pas de texte à segmenter!"
	}else{
		let delimitersRegex = new RegExp(`[${separateur.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]`); //même code que la fonction précédente
		let segments = monTexte.split(delimitersRegex); 
		let tableHTML = "<table class='table'>"; 
		tableHTML += "<tr><th>N°</th><th>Word</th></tr>";
		segments.forEach((segment, index) => {
		tableHTML += `<tr><td>${index + 1}</td><td>${segment}</td></tr>`;
        });
        tableHTML += "</table>"; //ferme le tableau
        document.getElementById("page-analysis").innerHTML = tableHTML;
    }
}

/*DICTIONNAIRE*/
function dictionnaire() {
	alert("Pas compris")
}







//brouillons + code non compris, à modifier plus tard

  
/*barre de progression
function myFunction() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("myBar").style.width = scrolled + "%";
} */