/**
 * search
 * -----------------------------------------------------------------------------
 * Search the cockodex
 *
 * @type {Component}
 * -----------------------------------------------------------------------------
 */
const TERM_SPIRIT = 'spirit';
const TERM_MODIFIER = 'modifier';

parasails.registerComponent('search', {
  props: [],

  data: function () {
    return {
      selectedTerms: [],
      termOptions: [
        { label: 'Gin', value: 'gin', type: TERM_SPIRIT },
        { label: 'Vodka', value: 'vodka', type: TERM_SPIRIT },
        { label: 'Whiskey', value: 'whiskey', type: TERM_SPIRIT },
        { label: 'Rum', value: 'rum', type: TERM_SPIRIT },
        { label: 'Tequila', value: 'tequila', type: TERM_SPIRIT },
        { label: 'Pisco', value: 'rum', type: TERM_SPIRIT },
        { label: 'Cognac', value: 'rum', type: TERM_SPIRIT },
        { label: 'Lemon', value: 'lemon', type: TERM_MODIFIER },
        { label: 'Lime', value: 'lime', type: TERM_MODIFIER },
        { label: 'Passionfruit', value: 'passionfruit', type: TERM_MODIFIER },
        { label: 'Ancho Reyes', value: 'ancho reyes', type: TERM_MODIFIER },
        { label: 'Ancho Verde', value: 'ancho verde', type: TERM_MODIFIER },
      ],
      results: [],
    };
  },

  template: '#search-template',

  beforeMount: function () {},

  mounted: function () {},

  beforeDestroy: function () {},

  computed: {
    // sortedTerms() {
    //   const spirits = [];
    //   const modifiers = [];
    //   this.termOptions.forEach(option => {
    //     switch (option.type) {
    //       case TERM_SPIRIT:
    //         spirits.push(option);
    //         break;
    //       case TERM_MODIFIER:
    //         modifiers.
    //     }
    //     if (option.type === TERM_SPIRIT) {}
    //   })
    // }
  },

  methods: {
    clear() {
      this.selectedTerms = [];
      this.results = [];
    },
    addTerm(term) {
      if (!this.selectedTerms.includes(term)) {
        this.selectedTerms.push(term);
      }
    },
    async search() {
      const terms = this.selectedTerms.map((term) => term.value);
      const url =  `http://54.146.240.115:1337/search?terms=${terms.join(',')}`;
      try {
        const response = await fetch(url).then((res) => res.json());
        console.log(response);
        this.results = response;
      } catch (e) {
        console.log(e);
      }
    }
  },
});
