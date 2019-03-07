Vue.component('star-rating', VueStarRating.default);

let app = new Vue({
  el: '#app',
  data: {
    active: "home",
    password: '',






    number: '',
    max: '',
    current: {
      title: '',
      img: '',
      alt: '',
    },
    loading: true,
    addedName: '',
    addedComment: '',
    addedDate: '',
    comments: {},
    ratings: {},
  },
  computed: {
    month() {
      var month = new Array;
      if (this.current.month === undefined) {
        return '';
      }
      month[0] = "January";
      month[1] = "February";
      month[2] = "March";
      month[3] = "April";
      month[4] = "May";
      month[5] = "June";
      month[6] = "July";
      month[7] = "August";
      month[8] = "September";
      month[9] = "October";
      month[10] = "November";
      month[11] = "December";
      return month[this.current.month - 1];
    },
    averageRating() {
      var currentRating = this.ratings[this.number];

      if (!(this.number in this.ratings)) {
        return 0.0;
      }

      return currentRating.sum / currentRating.total;
    },
  },
  watch: {
    number(value, oldvalue) {
      if (oldvalue === '') {
        this.max = value;
      } else {
        this.xkcd();
      }
    }
  },
  created() {
    this.xkcd();
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





    async xkcd() {
      try {
        this.loading = true;
        const response = await axios.get('https://xkcd.now.sh/' + this.number);
        this.current = response.data;
        this.loading = false;
        this.number = response.data.num;
        return true;
      } catch (error) {
        console.log(error);
        this.number = this.max;
      }
    },
    previousComic() {
      this.number = this.current.num - 1;
      if (this.number < 1) {
        this.number = this.max
      }
    },
    nextComic() {
      console.log("Got here");
      this.number = this.current.num + 1;
      if (this.number > this.max) {
        console.log("This");
        this.number = 1
      }
    },
    firstComic() {
      this.number = 1;
    },
    lastComic() {
      this.number = this.max;
    },
    getRandom(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    randomComic() {
      this.number = this.getRandom(1, this.max);
    },
    addComment() {
      if (!(this.number in this.comments)) {
        Vue.set(app.comments, this.number, new Array);
      }
      this.comments[this.number].push({
        author: this.addedName,
        text: this.addedComment,
        date: moment(),
      });
      this.addedName = '';
      this.addedComment = '';
      this.addedDate = '';
    },
    setRating(rating) {
      if (!(this.number in this.ratings))
      Vue.set(this.ratings, this.number, {
        sum: 0,
        total: 0
      });
      this.ratings[this.number].sum += rating;
      this.ratings[this.number].total += 1;
    },
  }
});
