export default {
  template: '#foto-template',

  props: ['isShown', 'gstatus', 'fstatus', 'ulist'],

  data: () => ({
    active_foto: null
  }),
  computed: {
    getName: function (index) {
      return 'file' + index
    }
  },

  mounted: function() {
    
    
  },

  methods: {
    goBack() {
      this.$emit('back');
    },

    addFoto(evt) {
      const that = this;
      const elem = $(evt.target);
      this.active_foto = $(elem).closest('.foto').find('.foto__self');
      
      if (!this.gstatus) {
        $('#modal2 .modal__content').text('Активность доступна только после прохождения викторины !');
        this.showModal();
      } else {
        if (!this.fstatus) {
          const file = elem[0].files[0];
          this.getBase64(file).then(data => {
            const index = data.indexOf(',');
            const result = [
              {
                name: file.name,
                file: data.slice(index + 1)
              }
            ];
            that.$emit('savefile', result);
          });
        } else {
          console.log('file alredy saved');
          $('#modal2 .modal__content').text('Возможно сохранение только одной фотографии !');
          this.showModal();
        }
      }
    },

    showModal() {
      const modal = $('#modal2').modal({
        fadeDuration: 250,
        fadeDelay: 1.5
      });
    },
    getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    },
    showModal: function() {
      const modal = $('#modal2').modal({
        fadeDuration: 250,
        fadeDelay: 1.5
      });
    }

  },
  watch: {
    fstatus: function(newVal) {
      if (newVal) {
        //$(this.active_foto).css('display', 'block');
        //$(this.active_foto).css('background-image', `url(${newVal})`);
      }
    },
    ulist: function(newVal) {
      if (newVal) {
        this.ulist = newVal;
      }
    }
  }
};
