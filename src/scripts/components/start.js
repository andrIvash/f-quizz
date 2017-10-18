

export default {
  template: '#start-template',

  props: ['isShown', 'utype', 'gstatus'],

  data: function() {
    return {
      resultArticle: {}
    };
  },

  mounted: function() {
    
  },

  methods: {
    startGame() {
      console.log('start game');
      this.$emit('game');
    },
    sendFoto() {
      console.log('send foto');
      this.$emit('foto');
    },
    buyThis: function() {
      const modal = $('#modal').modal({
        fadeDuration: 250,
        fadeDelay: 1.5
      });
    }
  },
  watch: {

  }
};

