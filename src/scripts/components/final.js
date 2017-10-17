export default {
  template: '#final-template',

  props: ['isShown', 'result'],

  data: () => ({
    
  }),
  computed: {
    decl: function() {
      return this.declOfNum(this.result, ['бaлл', 'балла', 'баллов']);
    }
  },
  mounted: function() {
    console.log('final block !');
    
  },

  methods: {
    goBack() {
      this.$emit('back');
    },
    
    declOfNum(number, titles) {
      const cases = [2, 0, 1, 1, 1, 2];
      return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
    }
  }
};
