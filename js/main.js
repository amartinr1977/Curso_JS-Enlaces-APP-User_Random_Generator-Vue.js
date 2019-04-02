const miapp = new Vue({
  el: "#contenedor",
  data: {
    titulo: "Random User Generator con Vue.js",
    busqueda: "",
    url: "https://randomuser.me/api/?results=50&nat=es"
  },
  computed: {},
  methods: {},
  mounted() {
    console.log("Vue Montado ...");
    axios
      .get(this.url)
      .then(respuesta => {
        console.log(respuesta.data.results);
      })
      .catch(respuesta => {
        console.log(respuesta);
      });
  }
});
