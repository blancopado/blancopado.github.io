(function toggleColor() {

	var imagenes = document.getElementsByClassName("image");

	for (var i=0; i<imagenes.length; i++) {
		imagenes[i].addEventListener("click", function(e) {
			e.target.classList.toggle("black-and-white");
		});
	}

})();