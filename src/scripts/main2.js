import '../../node_modules/jquery-modal/jquery.modal.js';
import { API } from './api';
import { Cookie } from './cookie';
import { Auth } from './auth';


import VeeValidate, { Validator } from 'vee-validate';
import ru from 'vee-validate/dist/locale/ru';

import StartComponent from './components/start';
import TeacherComponent from './components/teacher';
import GameComponent from './components/game';
import FotoComponent from './components/foto';
import FinalComponent from './components/final';

Validator.addLocale(ru);


const configValidate = {
  locale: 'ru'
};

Vue.use(VeeValidate, configValidate);
Vue.config.debug = true;


const _vmt = new Vue({
  el: '#app-teacher',
  data: {
    eduShow: false,
    user_type: null, // user type
    user: null
  },

  components: {
    teacherComponent: TeacherComponent
  },

  mounted: function() {
    console.log('Running App version ! ' + CDN);
    const that = this;

    API.init();
    if (void 0 !== Cookie.get('token')) {
      API.token = Cookie.get('token');
      this.startApp();
    } else if (document.location.search.indexOf('auth') === -1) {
      Auth.auth();
      
    }

  },
  methods: {
    startApp() {
      const that = this;
      API.getUserInfo().then((res) => {
        that.loading = true; // инициализация спиннера
        const roles = API.getData().user.roles;
        that.user = res;
        console.log(that.user);
        const isEdu = roles.find(role => {
          return role === 'EduStaff';
        });
        this.clearView();
        if (!isEdu) { // проверка на учителя
          $('#modal2 .modal__content').text('Активность возможна только для преподавателей !');
          this.showModal();
        } else {
          that.eduShow = true;
        }
      });
    },
    showModal: function() {
      const modal = $('#modal2').modal({
        fadeDuration: 250,
        fadeDelay: 1.5
      });
    },
    sendData(data) {
      console.log('send data');
      $.ajax({
        url: 'https://formspree.io/ebelopukhova@paninirus.com',
        method: 'POST',
        data: {
          username: data.username,
          index: data.index,
          address: data.address,
          phone: data.phone,
          school_number: data.school_number,
          alb_one: data.alb_one,
          alb_two: data.alb_two,
          alb_three: data.alb_three,
          personal_data: data.personal_data
        },
        dataType: 'json'
      });
    },
    clearView() {
      this.eduShow = false;
    },
    saveAllData() {
      const that = this;
      // user list update
      this.userList.forEach((elem) => {
        if (elem.id === this.user.personId) {
          elem.summ = this.info.summ;
        }
      });

      API.addKeyToDB({
        label: 'raff',
        key: `raff_activity-${this.user.personId}`,
        value: JSON.stringify(this.info),
        permissionLevel: 'Public'
      }, function(res) {
        API.addKeyToDB({
          key: `raff_activity-articles-${that.article.id}`,
          value: JSON.stringify(that.article),
          permissionLevel: 'Public'
        }, function(res) {
          API.addKeyToDB({
            key: 'raff_activity-userList',
            value: JSON.stringify(that.userList),
            permissionLevel: 'Public'
          }, function(res) {

          });
        });
      });
    }
  }
});

