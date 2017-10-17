(function toggleColor() {

	var imagenes = document.getElementsByClassName("image");

	for (var i=0; i<imagenes.length; i++) {
		imagenes[i].addEventListener("click", function(e) {
			e.target.classList.toggle("black-and-white");

			// var contador = 0;
			// while (contador < 1000) {
			// 	console.log("El número es " + contador);
			// 	contador++;
			// }
		});
	}

})();