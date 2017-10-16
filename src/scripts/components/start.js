

export default {
  template: '#start-template',

  props: ['isShown', 'utype', 'gstatus'],

  data: function() {
    return {
      resultArticle: {}
    };
  },

  mounted: function() {
    console.log('start block !');
  },

  methods: {
    startGame() {
      console.log('start game');
      this.$emit('game');
    },
    sendFoto() {
      console.log('send foto');
      this.$emit('foto');
    }
  },
  watch: {

  }
};

