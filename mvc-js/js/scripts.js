/*****

  Modelo

*****/

var modelo = {
  marcadores: [],

  obtenerTodosMarcadores: function() {
    return this.marcadores;
  }
};



/*****

  Controlador

*****/

var controlador = {
  agregarMarcador: function(nuevoMarcador) {
    modelo.marcadores.push(nuevoMarcador);

    vista.representar();

  },

  obtenerMarcadores: function() {
    return modelo.obtenerTodosMarcadores();
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
      controlador.agregarMarcador(nuevoMarcador);
    });

    form.reset();
  },

  representar: function() {
    var listaMarcadores = document.getElementById("lista-marcadores");
    listaMarcadores.innerHTML = "";

    controlador.obtenerMarcadores().forEach(function(marcador) {
      listaMarcadores.innerHTML += 
                                    '<div class="well">'
                                +     '<a href="#" class="btn btn-danger pull-right">X</a>'
                                +     '<h3><a href=http://' + marcador.url + '>' + marcador.nombre + '</a></h3>'
                                +     '<p>' + marcador.descripcion + '</p>'
                                +   '</div>'
    });
  }

};


vista.init();