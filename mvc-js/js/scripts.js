(function() {
/*****

  Modelo

*****/

var modelo = {
  marcadores: [],

  agregarMarcador: function(nuevoMarcador) {
    this.marcadores.push(nuevoMarcador);
  },

  eliminarMarcador: function(id) {
    for (var i = 0; i < this.marcadores.length; i++) {
      if (this.marcadores[i].id == id) {
        this.marcadores.splice(i, 1);
        break;
      }
    }
  },

  obtenerMarcadores: function() {
    return this.marcadores;
  }
};

/*****

  Controlador

*****/

var controlador = {
  init: function() {
    vista.init();
  },

  agregarMarcador: function(nuevoMarcador) {
    modelo.agregarMarcador(nuevoMarcador);
    vista.representar();
  },

  eliminarMarcador: function(id) {
    modelo.eliminarMarcador(id);
    vista.representar();
  },

  obtenerMarcadores: function() {
    return modelo.obtenerMarcadores();
  }
};

/*****

  Vista

*****/

var vista = {
  
  init: function() {
    var form = document.getElementById("form-marcadores");
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      var nuevoMarcador = {
        id: Date.now(),
        nombre: form.nombre.value,
        descripcion: form.descripcion.value,
        url: form.url.value
      }
      form.reset();
      controlador.agregarMarcador(nuevoMarcador);
    });

    var listaMarcadores = document.getElementById("lista-marcadores");
    listaMarcadores.addEventListener("click", function(e) {
      if (e.target.id === "btn-eliminar") {
        controlador.eliminarMarcador(e.target.parentNode.id);
      }
    }); 
  },

  representar: function() {
    var listaMarcadores = document.getElementById("lista-marcadores");
    listaMarcadores.innerHTML = "";

    controlador.obtenerMarcadores().forEach(function(marcador) {
      listaMarcadores.innerHTML += 
                                    '<div class="well" id=' + marcador.id + '>'
                                +     '<a href="#" class="btn btn-danger pull-right" id="btn-eliminar">X</a>'
                                +     '<h3 id="titulo"><a target="_blank" href=http://' + marcador.url + '>' + marcador.nombre + '</a></h3>'
                                +     '<p>' + marcador.descripcion + '</p>'
                                +   '</div>'
    });
  }

};


controlador.init();

})();