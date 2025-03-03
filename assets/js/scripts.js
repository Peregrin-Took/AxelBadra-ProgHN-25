//form
function Form() {
let x = document.forms["myForm"]["fname"].value;
if (x == "") {
alert("Give me your name.");
return false;
}
else { 
alert("Hello " + document.myForm.fname.value + "! ☺ ");
return true;
} 
}

//barre de progression
function myFunction() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("myBar").style.width = scrolled + "%";
}

/*read txt file
document.getElementById('inputFile').addEventListener('change', function() {
        var file = new FileReader();
        file.onload = () => {
          document.getElementById('output').textContent = file.result;
        }
        file.readAsText(this.files[0]);
      }
	  */