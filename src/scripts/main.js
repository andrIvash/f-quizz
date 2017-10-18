
import '../../node_modules/jquery-modal/jquery.modal.js';
import { API } from './api';
import { Cookie } from './cookie';
import { Auth } from './auth';


import VeeValidate, { Validator } from 'vee-validate';
import ru from 'vee-validate/dist/locale/ru';

import StartComponent from './components/start';
import GameComponent from './components/game';
import FotoComponent from './components/foto';
import FinalComponent from './components/final';

Validator.addLocale(ru);


const configValidate = {
  locale: 'ru'
};

Vue.use(VeeValidate, configValidate);
Vue.config.debug = true;


const _vms = new Vue({
  el: '#app-start',
  data: {
    loading: false, // loader
    startShow: true, // show start page
    gameShow: false, // shop game page
    fotoShow: false, // show foto page
    finalShow: false, // show foto page
    user_type: null, // user type
    game_status: false, // play in game or not
    game_result: null, //result of the game
    foto_status: false, //foto load status
    user: null,
    foto_url: null,
    user_list: []
  },

  components: {
    startComponent: StartComponent,
    gameComponent: GameComponent,
    fotoComponent: FotoComponent,
    finalComponent: FinalComponent
  },

  mounted: function() {
    //console.log('Running App version ! ' + CDN);
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
        const isStudent = roles.find(role => {
          return role === 'EduStudent';
        });
        if (!isStudent) { // проверка на студента
          that.user_type = false;
        } else {
          that.user_type = true;
        }
        that.user = res;
        //console.log(that.user); //EduStudent
      }).then(function() {
        //API.getKeyFromDB({key: `football_activity-${that.user.personId}`}, function(res) {
        API.getKeyFromDB({key: 'football_activity-0001'}, function(res) {
        //console.log(res);
          if (res == null) { // new user !!!!!!!!
            that.user_list = [];
          }
          else {
            that.user_list = JSON.parse(res.Value);
            that.updateData();
          }
        });
      });
    },
    startGame() {
      this.clearView();
      this.gameShow = true;
    },

    getFoto() {
      this.clearView();
      this.fotoShow = true;
    },

    goBack() {
      this.clearView();
      this.startShow = true;
    },

    endGame(score) {
      this.game_result = score;
      this.clearView();
      this.finalShow = true;

      if (!this.game_status) { // save result to base
        this.game_status = true;
        this.saveAllData();
      }
    },

    clearView() { // clear view screen
      this.startShow = false;
      this.gameShow = false;
      this.fotoShow = false;
      this.finalShow = false;
    },

    updateData() { // update user data

      const userId = this.findUser();
      if (userId !== false) {
        this.game_result = this.user_list[userId].game_result;
        this.game_status = this.user_list[userId].game_status;
        this.foto_status = this.user_list[userId].foto_status;
      }
    },

    saveAllData() { // renew user info
      const that = this;
      const userId = this.findUser();
      if (userId !== false) {
        this.user_list[userId].game_result = this.game_result;
        this.user_list[userId].game_status = this.game_status;
        this.user_list[userId].foto_status = this.foto_status;
      } else {
        this.user_list.push({
          id: that.user.personId,
          game_result: this.game_result,
          game_status: this.game_status,
          foto_status: this.foto_status
        });
      }

      API.addKeyToDB({
        label: 'football',
        // key: `football_activity-${that.user.personId}`,
        key: 'football_activity-0001',
        value: JSON.stringify(that.user_list),
        //value: JSON.stringify([]),
        permissionLevel: 'Public'
      }, function(res) {
      });
    },

    saveFoto(data) {  // save foto to base and renew user info
      const that = this;
      API.uploadImage(data, (res) => {
        console.log('save file', res);
        API.checkUploadImage([res], (res) => {
          that.foto_status = res[0].downloadUrl;
          that.saveAllData();
        });
      });
    },

    findUser() { //find active user in user_list
      let result = false;
      this.user_list.forEach((item, i) => {
        if (item.id === this.user.personId) {
          result = i;
        }
      });
      return result;
    }

  }
});

