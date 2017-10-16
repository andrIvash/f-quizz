export default {
  template: '#final-template',

  props: ['isShown', 'result'],

  data: () => ({
    
  }),

  mounted: function() {
    console.log('final block !');
    
  },

  methods: {
    goBack() {
      this.$emit('back');
    }
  }
};
