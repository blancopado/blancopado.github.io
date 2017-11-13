(function toggleColor() {

	var imagenes = document.getElementsByClassName("image");

	var nodoDiv = document.createElement('div');

	for (var i=0; i<imagenes.length; i++) {
		imagenes[i].addEventListener("click", function(e) {
			e.target.classList.toggle("black-and-white");
			
			for (var i = 0; i < 100; i++) {
				var nodoP = document.createElement("p");
				nodoP.innerHTML = 'Nuevo párrafo';
				nodoDiv.appendChild(nodoP);
				nodosSeparadosDelDom = nodoDiv;
			}

		});
	}

})();