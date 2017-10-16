export default {
  template: '#teacher-template',

  props: ['isShown'],

  data: () => ({
    address: '',
    username: '',
    index: null,
    phone: '',
    school_number: null,
    alb_one: null,
    alb_two: null,
    alb_three: null,
    personal_data: false
  }),

  mounted: function() {
    console.log('teacher block !');
    const that = this;
    $('.tform__input').on('focus', () => {
      that.errors.clear();
    });
  },

  methods: {
    validateBeforeSubmit() {
      const that = this;
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.$emit('send', {
            username: that.username,
            index: that.index,
            address: that.address,
            phone: that.phone,
            school_number: that.school_number,
            alb_one: that.alb_one,
            alb_two: that.alb_two,
            alb_three: that.alb_three,
            personal_data: that.personal_data
          });
          return;
        }
        $('#modal2 .modal__content').text('Форма содержит неверные данные !');
        this.showModal();
      });
    },
    showModal: function() {
      const modal = $('#modal2').modal({
        fadeDuration: 250,
        fadeDelay: 1.5
      });
    }
  }
};
