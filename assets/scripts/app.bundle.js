webpackJsonp([1],{12:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a=e(9),o=(e.n(a),e(3)),i=e(1),u=e(2),n=e(11),l=e(10),r=e.n(l),h=e(7),f=e(6),c=e(5),_=e(4);n.a.addLocale(r.a);var g={locale:"ru"};Vue.use(n.b,g),Vue.config.debug=!0;new Vue({el:"#app-start",data:{loading:!1,startShow:!0,gameShow:!1,fotoShow:!1,finalShow:!1,user_type:null,game_status:!1,game_result:null,foto_status:!1,user:null,foto_url:null,user_list:[]},components:{startComponent:h.a,gameComponent:f.a,fotoComponent:c.a,finalComponent:_.a},mounted:function(){o.a.init(),void 0!==i.a.get("token")?(o.a.token=i.a.get("token"),this.startApp()):-1===document.location.search.indexOf("auth")&&u.a.auth()},methods:{startApp:function(){var t=this;o.a.getUserInfo().then(function(s){t.loading=!0;var e=o.a.getData().user.roles,a=e.find(function(t){return"EduStudent"===t});t.user_type=!!a,t.user=s}).then(function(){o.a.getKeyFromDB({key:"football_activity-0001"},function(s){null==s?t.user_list=[]:(t.user_list=JSON.parse(s.Value),t.updateData())})})},startGame:function(){this.clearView(),this.gameShow=!0},getFoto:function(){this.clearView(),this.fotoShow=!0},goBack:function(){this.clearView(),this.startShow=!0},endGame:function(t){this.game_result=t,this.clearView(),this.finalShow=!0,this.game_status||(this.game_status=!0,this.saveAllData())},clearView:function(){this.startShow=!1,this.gameShow=!1,this.fotoShow=!1,this.finalShow=!1},updateData:function(){var t=this.findUser();!1!==t&&(this.game_result=this.user_list[t].game_result,this.game_status=this.user_list[t].game_status,this.foto_status=this.user_list[t].foto_status)},saveAllData:function(){var t=this,s=this.findUser();!1!==s?(this.user_list[s].game_result=this.game_result,this.user_list[s].game_status=this.game_status,this.user_list[s].foto_status=this.foto_status):this.user_list.push({id:t.user.personId,game_result:this.game_result,game_status:this.game_status,foto_status:this.foto_status}),o.a.addKeyToDB({label:"football",key:"football_activity-0001",value:JSON.stringify(t.user_list),permissionLevel:"Public"},function(t){})},saveFoto:function(t){var s=this;o.a.uploadImage(t,function(t){console.log("save file",t),o.a.checkUploadImage([t],function(t){s.foto_status=t[0].downloadUrl,s.saveAllData()})})},findUser:function(){var t=this,s=!1;return this.user_list.forEach(function(e,a){e.id===t.user.personId&&(s=a)}),s}}})},15:function(t,s,e){t.exports=e(12)}},[15]);
//# sourceMappingURL=app.bundle.js.map