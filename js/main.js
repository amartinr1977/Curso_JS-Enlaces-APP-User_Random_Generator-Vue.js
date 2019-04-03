Vue.component("comp-usuario", {
  props: ["user"],
  template: "#t-usuario",
  methods: {
    Seleccionar() {
      this.$emit("eseleccionado");
    }
  },
  computed: {
    nombreMayusculas() {
      return this.user.nombre
        .split(" ")
        .map(trozo => trozo[0].toUpperCase() + trozo.substring(1))
        .join(" ");
    }
  }
});

const miapp = new Vue({
  el: "#contenedor",
  data: {
    titulo: "Random User Generator con Vue.js",
    busqueda: "",
    url: "https://randomuser.me/api/?results=20&nat=es",
    listado: []
  },
  updated() {
    console.log("La lista de seleccionados es: " + this.nSeleccionados);
  },
  computed: {
    listadoFiltrado() {
      return this.listado.filter(usuario =>
        usuario.nombre.includes(this.busqueda)
      );
    },
    listadoSeleccionados() {
      return this.listado.filter(usuario => usuario.seleccionado);
    },
    nSeleccionados() {
      return this.listadoSeleccionados.length;
    }
  },
  methods: {
    SeleccionarUsuario(usuario) {
      usuario.seleccionado = !usuario.seleccionado;
    }
  },
  mounted() {
    console.log("Vue Montado ...");
    axios
      .get(this.url)
      .then(respuesta => {
        console.log(respuesta.data.results);
        this.listado = respuesta.data.results.map(usuario => {
          return {
            nombre: `${usuario.name.title} ${usuario.name.first} ${
              usuario.name.last
            }`,
            email: usuario.email,
            foto: usuario.picture.large,
            seleccionado: false
          };
        });
        console.log(this.listado);
      })
      .catch(respuesta => {
        console.log(respuesta);
      });
  }
});
