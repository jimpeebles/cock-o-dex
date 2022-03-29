/**
 * app
 * -----------------------------------------------------------------------------
 * A new component
 *
 * @type {Component}
 * -----------------------------------------------------------------------------
 */
const TERM_SPIRIT = 'spirit';
const TERM_MODIFIER = 'modifier';

parasails.registerComponent('search', {
  //  ╔═╗╦═╗╔═╗╔═╗╔═╗
  //  ╠═╝╠╦╝║ ║╠═╝╚═╗
  //  ╩  ╩╚═╚═╝╩  ╚═╝
  props: [],

  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: function () {
    return {
      selectedTerms: [],
      termOptions: [
        { label: 'Gin', value: 'gin', type: TERM_SPIRIT },
        { label: 'Vodka', value: 'vodka', type: TERM_SPIRIT },
        { label: 'Whiskey', value: 'whiskey', type: TERM_SPIRIT },
        { label: 'Rum', value: 'rum', type: TERM_SPIRIT },
        { label: 'Lemon', value: 'lemon', type: TERM_MODIFIER },
        { label: 'Lime', value: 'lime', type: TERM_MODIFIER },
        { label: 'Passionfruit', value: 'passionfruit', type: TERM_MODIFIER },
        { label: 'Ancho Reyes', value: 'ancho reyes', type: TERM_MODIFIER },
        { label: 'Ancho Verde', value: 'ancho verde', type: TERM_MODIFIER },
      ],
      results: [],
    };
  },

  //  ╦ ╦╔╦╗╔╦╗╦
  //  ╠═╣ ║ ║║║║
  //  ╩ ╩ ╩ ╩ ╩╩═╝
  template: '#search-template',

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function () {},

  mounted: function () {},

  beforeDestroy: function () {},

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    clear() {
      this.selectedTerms = [];
      this.results = [];
    },
    addTerm(term) {
      this.selectedTerms.push(term);
    },
    async search() {
      const shouldQuery = [];
      this.selectedTerms.forEach((term) => {
        shouldQuery.push({ term: { build: term.value } });
      });
      const fullQuery = {
        query: {
          bool: {
            should: shouldQuery,
          },
        },
      };
      try {
        const response = await $axios.request({
          method: 'post',
          url: 'http://localhost:9200/cocktail/_search',
          data: fullQuery,
          headers: {
            'Content-Type': 'application/json'
          },
          httpsAgent: httpsAgent
        });
        console.log(response);
        const results = response.data.hits.hits.map((r) => r._source);
        console.log(results);
        this.results = results;
      } catch (e) {
        console.log(e);
      }
    }
  },
});
