//formulaire + alerte  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
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
	
//bouton ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const AnswerMe = document.getElementById('AnswerMe'); //crée un objet invariable AnswerMe et l'identifie comme l'élément AnswerMe défini dans le ficier html, c'est-à-dire le bouton
const messageDiv = document.getElementById('messageDiv');//même chose avec messageDiv, le message affiché
let showFirstMessage = true;//crée une variable showFirstMessage qu'on définit comme vraie par défaut
AnswerMe.addEventListener('click', function () {//crée un EventListener qui exécute la fonction quand le bouton est cliqué
    if (showFirstMessage) {
        messageDiv.textContent = 'What do we fight for?';/*si la variable showFirstMessage est vraie, il affiche le premier message dans la div*/
    } else {
        messageDiv.textContent = 'Death!';/*sinon, il affiche la réponse à la question*/
    }
    showFirstMessage = !showFirstMessage;/*si showFirstMessage est vrai, il le change en faux, et inversement, ce qui permet de répéter l'action*/
});

//LECTURE ET TOKENISATION (basé sur le code de l'exercice en classe) ---------------------------------------------------------------------------------------------------------------------------------------
let lignes;
let NombreDeLignes; 
let tokens;
let NombreDeTokens;
window.onload = function() {
    let fileInput = document.getElementById('fileInput');
    let fileDisplayArea = document.getElementById('fileDisplayArea'); 
	let tokensDisplayArea = document.getElementById('tokens-display');
    fileInput.addEventListener('change', function(e) {//On "écoute" si le fichier donné a été modifié. Si on a donné un nouveau fichier, on essaie de le lire.
        let file = fileInput.files[0];// On peut potentiellement donner plusieurs fichiers, mais ici on n'en lit qu'un seul, le premier, donc indice 0.
        let textType = new RegExp("text.*");// on utilise cette expression régulière pour vérifier qu'on a bien un fichier texte.

		if (file.type.match(textType)) { //on vérifie qu'on a bien un fichier texte
            
            var reader = new FileReader();//lecture du fichier. D'abord, on crée un objet qui sait lire un fichier.
			reader.onload = function(e) { 
			
				//divise le texte en lignes et l'alerte : 
				lignes = reader.result.split(/\r?\n/);
				NombreDeLignes = lignes.length; 
				alert(`File read successfully! Click "OK" to proceed.`);
				document.getElementById("logger1").innerHTML = `${NombreDeLignes} lines`
					
					//affiche et tokenise le texte : 
				fileDisplayArea.innerText = reader.result; //on dit au lecteur de fichier de placer le résultat de la lecture dans la zone d'affichage du texte.			
				let result2 = reader.result //crée une variable result2, qui est le texte sans majuscules ni ponctuation 
						.toLowerCase()
						.replace(/[^\p{L}'\s]/gu, ''); //garde tout ce qui n'est pas entre crochets, donc les carcatères de toutes les langues (pour inclure les accents), les apostrophes et les espaces ; appliqué à tous les caractères de manière universelle
				tokens = result2.split(/[\s,;]+/); //définit les tokens comme le résultat du replace, ignorant les espaces (\s), points, et points virgules
					NombreDeTokens = tokens.length;
				document.getElementById("logger2").innerHTML = `${NombreDeTokens} tokens`;
			}
            reader.readAsText(file); // on lit concrètement le fichier. Cette lecture lancera automatiquement la fonction "onload" juste au-dessus.
			

        } else { // pas un fichier texte : message d'erreur.
            fileDisplayArea.innerText = "";
            document.getElementById("logger").innerHTML = '<span class="errorlog">Not a text file!</span>';
        }
    });
	};

//SEGMENTATION ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function Segmentation() {
	let fileText; 
	let separateurTxt = document.getElementById("delimID").value; //définit le séparateur comme le contenu de l'élément delimID
	if(document.getElementById("fileDisplayArea").innerText === "") { 
	    fileText = document.getElementById("texteExercice4").value;
	} else { 
	    fileText = document.getElementById("fileDisplayArea").innerText;
	}
	if (separateurTxt === "") { //si le séparateur est vide
		alert("No delimiter.");//alerter "No delimiter."
		return; //arrête la fonction
	}
	if (fileText.trim() === "") { //si le texte, une fois les espaces et retours à la ligne enlevés, est vide
		alert("No text."); //alerter "No text."
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

//GREP  -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function GREP() {
	let Texte;
	if(document.getElementById("fileDisplayArea").innerText === "") { 
	    Texte = document.getElementById("texteExercice4").value;
	} else { 
	    Texte = document.getElementById("fileDisplayArea").innerText;7
	}
	let Pole = document.getElementById("poleID").value;
		if (Pole === ""){
			alert("No pole!");
			return;
		}
	let myregex = new RegExp(Pole, "g"); //crée une RegExp globale avec la valeur de Pole
	let TexteRep = Texte.replace(myregex, match => `<span class="empans">${match}</span>`); //trouve les segments correspondant au pôle dans le texte du fichier et les remplace par une version de style .empans (définie en styles.css)
	document.getElementById("fileDisplayArea").innerHTML = TexteRep; //remplace le texte affiché par le résultat de l'opération précédente
}

//DICTIONNAIRE  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function dictionnaire() {
	if (document.getElementById('fileDisplayArea').innerHTML==""){ //si le contenu de la div définie en index.html est vide (est égale à rien donc =="")
        alert("No text!");
    } else {
            let tokenFreq = {}; //définit un objet vide "tokenFreq" dans lequel on stockera la fréquence d'apparition du token
            tokens.forEach(token => tokenFreq[token] = (tokenFreq[token] || 0) + 1);//applique la méthode forEach pour vérifier si chaque token a déjà été stocké et ajouter 1 à la fréquence qui lui est associée
            let freqPairs = Object.entries(tokenFreq); //convertit l'objet en tableau de paires clé-valeur
            freqPairs.sort((a, b) => b[1] - a[1]);//trie le tableau par fréquence décroissante
            let tableArr = [['<b>Token:</b>', 'Frequence:']];// ajoute l'entête du tableau
            let tableData = freqPairs.map(pair => [pair[0], pair[1]]);// Crée un tableau de tableaux contenant les tokens et leurs fréquences
            let finalTable = tableArr.concat(tableData); //utilise .concat pour concaténer l'en-tête et le tableau de data
            let tableHtml = finalTable
				.filter(row => row.length > 0) //filtre les lignes vides
				.map(row =>  
						`<tr>` + row.map(cell => `<td>${cell}</td>`).join('') + `</tr>`
				).join(''); //construit les lignes en définissant les cellules et les joignant ensemble : <tr><td>Cellule1</td><td>Cellule2</td></tr> et ainsi de suite
				document.getElementById('page-analysis').innerHTML = '<table class="table">' + tableHtml + '</table>'; //affiche le tableau
	}
}

//CONCORDANCIER  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function Concordancier() {
    if (document.getElementById('fileDisplayArea').innerHTML == "") {
        alert("No text!");
        } else {
            let poleInput = document.getElementById('poleID').value;
            if (poleInput == "") {
                alert("No pole!");
                } else {
					if (document.getElementById('lgID').value == "") {
						alert("No length value!");
					} else {	
                    let lgInput = document.getElementById('lgID').value;
					let long = parseInt(document.getElementById('lgID').value);//Récupérer la valeur de "lgInput" (longueur de contexte) et conversion en nombre entier
                    if (long <= 0) { // Vérifie si la longueur est inférieure ou égale à 0
						alert("Length must be >0.");
                        } else {
                            // Récupérer le pôle et le convertir en regex
						  	let poleRegex = new RegExp("^" + poleInput + "$", "gi"); // le "i" indique de ne pas prendre en compte la casse, ^ et $ pour délimiter le mot
						  	
						  	// Chercher le pôle et créer une liste de concordance avec la méthode Array.prototype.reduce()
						  	// On applique .reduce sur global_var_tokens. Le callback prend en paramètres acc : accumulateur initialisé à 0 ;  token : valeur courante ; i : index de la valeur courante
						  	let concordance = tokens.reduce((acc, token, i) => {
						  		// A chaque itération du callback on teste si le "poleRegex" correspond au token courant
						    	if (poleRegex.test(token)) {
						    		// Si oui, création du contexte gauche (cLeft) et droit (cRight)
						      		let cLeft = tokens.slice(Math.max(0, i - long), i).join(" ");
						      		let cRight = tokens.slice(i + 1, Math.min(tokens.length, i + long + 1)).join(" ");
						      		acc.push([cLeft, token, cRight]); // Ajout de (contexte gauche, pôle, contexte droit) à la liste acc, comme affiché sur le navigateur en cours
						   	 		}
						    		return acc;
						    		}, []); // réinitialise la première valeur de la fonction "reduce" initialisée l.166, donc la valeur 0, pour éviter que le tableau ne commence à la deuxième ligne						
								  
								  // Afficher les résultat dans une table HTML
								  let table = document.getElementById("page-analysis1");
								  table.innerHTML = "<thead><tr><th>Context (left)</th><th>Pole</th><th>Context (right)</th></tr></thead>";
								  concordance.forEach(([cLeft, pole, cRight]) => { // la fonction forEach parcourt la liste de concordance créée ci-dessus
								  	let row = table.insertRow();// Insertion d'une nouvelle ligne dans la table
								    let leftCell = row.insertCell(); // Ajout des données à la ligne
									leftCell.innerText = cLeft; //
									let poleCell = row.insertCell();
									poleCell.innerText = pole;
									let rightCell = row.insertCell();
									rightCell.innerText = cRight;
								    });
								    
                             		// Vérifier si aucun résultat n'a été trouvé précédemment
                               		if (table.innerHTML == "<thead><tr><th>Context (left)</th><th>Pole</th><th>Context (right)</th></tr></thead>") {
	                                    // Effacer les résulats précédent
	                                    document.getElementById('page-analysis1').innerHTML = "";
										document.getElementById("page-analysis1").innerHTML = table;
 
                                          	}
                                    }
                        }
            }
}
}

//NOMBRE DE PHRASES -------------------------------------------------------------------------------------------------------------------------------------------------
function nbPhrases() {
    if (document.getElementById("fileDisplayArea").innerHTML==""){
        alert("No text!");
        } else {
            let text = document.getElementById("fileDisplayArea").innerHTML; //définit le texte comme le contenu de la div fileDisplayArea
            let phrase= /[.!?]/g; //crée une regex qui cherche les signes de ponctuation marquant la fin d'une phrase
            let nbPhrases = text.split(phrase); //divise le texte par ces caractères et stocke les segments trouvés dans nbPhrases
            let resultat = nbPhrases.length; //assigne à resultat la valeur du nombre de segments
            document.getElementById("logger3").innerHTML = `${resultat} sentences`;
            }
}

//MOTS LES PLUS LONGS ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function tokenLong() {
	if (document.getElementById('fileDisplayArea').innerHTML==""){
        alert("No text!");
        } else {
            document.getElementById('fileDisplayArea').innerHTML="";
            // Trier le tableau 'global_var_tokens' par ordre décroissant de longueur et garder les X premiers éléments
            let lgt = document.getElementById("lgID").value; 
			let tokenSort = tokens
				.sort((a, b) => b.length - a.length) //trie les tokens par ordre du plus long au plus court
				.slice(0, lgt); //extrait les premiers mots du classement selon le nombre indiqué dans la boîte "length"
            
            // Convertir chaque token en une ligne de tableau HTML avec sa longueur
            let map = tokenSort.map(token => '<tr><td>' + token + '</td><td>' + token.length + '</td></tr>').join('');
            //Tableau HTML
            let resultat = '<table class="tablelist"><tr><th colspan=2><b>Longest words</b></th></tr><tr><th><b>Word</b></th><th><b>length</b></th></tr>' + map + '</table>';
            // Injecter le tableau dans l'élément HTML
            document.getElementById('page-analysis1').innerHTML = resultat;
            }
}

//ALTERNANCE MAJ/MIN (bouton "oH rEaLlY?") ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function altMinMaj() { 	
//Définition de txt comme texte du fichier txt ou de la boîte exercice4
	let txt;
	if(document.getElementById("fileDisplayArea").innerText === "") { 
	    txt = document.getElementById("texteExercice4").value;
		} else { 
			txt = document.getElementById("fileDisplayArea").innerText;
		}
		
			let txt2 = txt
				.split("") //divise le texte en caractères (pas de délimiteur)
				.map((char, index) => index % 2 === 0 ? char.toUpperCase() : char.toLowerCase()) //si l'index est pair, caractère mis en majuscule, sinon, en minuscule
				.join(""); //joint les caractères pour recomposer le texte
		document.getElementById("fileDisplayArea").innerText = txt2;
}