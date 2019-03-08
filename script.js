Vue.component('star-rating', VueStarRating.default);

let app = new Vue({
  el: '#app',
  data: {
    active: "home",
    password: '',
    passwords: {},
    passwordsEmpty: true,
    number: '',
    user: '',
    pass: '',
    site: '',
    passwordEnter: false,
  },
  methods: {
    makeActive(item){
      // When a model is changed, the view will be automatically updated.
      this.active = item;
      this.password = '';
    },
    goToGenerator() {
      this.active = "generator";
      this.password = '';
    },
    goToManager() {
      this.active = "manager";
      this.password = '';
    },
    generatePassword() {
      let CharacterSet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!%&*$#';
      let password = '';

      for(let i=0; i < 10; i++) {
        password += CharacterSet.charAt(Math.floor(Math.random() * CharacterSet.length));
      }
      this.password = password;
    },
    showEnter() {
      this.passwordEnter = true;
    },
    addPassword() {
      if (!(1 in this.passwords)) {
        Vue.set(app.passwords, 1, new Array);
      }
      this.passwords[1].push({
        user: this.user,
        pass: this.pass,
        site: this.site,
      });
      this.user = '';
      this.pass = '';
      this.site = '';

      console.log("I got here");
      console.log(this.passwords[1]);

      this.passwordEnter = false;

      this.passwordsEmpty = false;
    },
  }
});
