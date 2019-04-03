Vue.component("comp-usuario", {
  props: ["user"],
  /*html*/
  template: `
  <div 
    v-bind:class="['p-2', 'my-4' ,'mx-4', 'manita', user.seleccionado ? 'seleccionado' : '' ]" 
    v-on:click="Seleccionar">
    <figure class="figure text-center">
      <img
        v-bind:src="user.foto"
        class="figure-img img-fluid rounded-circle"
        v-bind:alt="nombreMayusculas"
      />
      <figcaption class="figure-caption">
        <b>{{ nombreMayusculas }}</b>
        <br />
        <span class="badge badge-success">{{ user.email }}</span>
      </figcaption>
    </figure>
  </div>
  `,
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
    console.log("La lista de seleccionados es: " + this.listadoSeleccionados);
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
