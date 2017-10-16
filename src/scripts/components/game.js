export default {
  template: '#game-template',

  props: ['isShown'],

  data: () => ({
    quizz: [
      {
        cards: [
          `${CDN}img/cards/task1/fig1.jpg`,
          `${CDN}img/cards/task1/fig2.jpg`,
          `${CDN}img/cards/task1/fig3.jpg`,
          `${CDN}img/cards/task1/fig4.jpg`,
          `${CDN}img/cards/task1/fig5.jpg`
        ],
        question: 'Кто из этих футболистов родом из Хорватии?',
        answers: [
          'Иван Ракитич',
          'Артем Ребров',
          'Денис Суарес',
          'Фернандо Торрес',
          'Жорди Альба'
        ],
        right: 0,
        score: 1
      },
      {
        cards: [
          `${CDN}img/cards/task2/fig1.jpg`,
          `${CDN}img/cards/task2/fig2.jpg`,
          `${CDN}img/cards/task2/fig3.jpg`,
          `${CDN}img/cards/task2/fig4.jpg`,
          `${CDN}img/cards/task2/fig5.jpg`
        ],
        question: 'Кто самый молодой из этих пяти футболистов?',
        answers: [
          'Иван Ракитич',
          'Артем Ребров',
          'Денис Суарес',
          'Фернандо Торрес',
          'Жорди Альба'
        ],
        right: 2,
        score: 1
      },
      {
        cards: [
          `${CDN}img/cards/task3/fig1.jpg`,
          `${CDN}img/cards/task3/fig2.jpg`,
          `${CDN}img/cards/task3/fig3.jpg`,
          `${CDN}img/cards/task3/fig4.jpg`,
          `${CDN}img/cards/task3/fig5.jpg`
        ],
        question: 'Кто из этих футболистов — вратарь?',
        answers: [
          'Иван Ракитич',
          'Артем Ребров',
          'Денис Суарес',
          'Фернандо Торрес',
          'Жорди Альба'
        ],
        right: 1,
        score: 1
      },
      {
        cards: [
          `${CDN}img/cards/task4/fig1.jpg`,
          `${CDN}img/cards/task4/fig2.jpg`
        ],
        question: 'Которому из этих футболистов сейчас 33 года?',
        answers: [
          'Андрес Иньеста',
          'Илья Кутепов'
        ],
        right: 0,
        score: 3
      },
      {
        cards: [
          `${CDN}img/cards/task5/fig1.jpg`,
          `${CDN}img/cards/task5/fig2.png`
        ],
        question: 'Кто из этих футболистов играет за испанский футбольный клуб?',
        answers: [
          'Тео Эрнандес',
          'Никола Калинич'
        ],
        right: 0,
        score: 3
      },
      {
        cards: [
          `${CDN}img/cards/task6/fig1.png`,
          `${CDN}img/cards/task6/fig2.png`
        ],
        question: 'Кто из этих футболистов родился в Южной Америке?',
        answers: [
          'Зе Роберто',
          'Джанлуиджи Буффон'
        ],
        right: 0,
        score: 3
      },
      {
        cards: [
          `${CDN}img/cards/task7/fig1.jpg`,
          `${CDN}img/cards/task7/fig2.jpg`
        ],
        question: 'Кто из этих двух футболистов провел больше игр за свою спортивную карьеру?',
        answers: [
          'Секс Фабрегас',
          'Херард Пике'
        ],
        right: 0,
        score: 3
      },
      {
        cards: [
          `${CDN}img/cards/task8/fig1.jpg`,
          `${CDN}img/cards/task8/fig2.jpg`,
          `${CDN}img/cards/task8/fig3.jpg`
        ],
        question: 'Кто из этих футболистов — обладатель «Золотого мяча»?',
        answers: [
          'Лука Модрич',
          'Криштиану Роналду',
          'Гаку Шибасаки'
        ],
        right: 1,
        score: 5
      },
      {
        cards: [
          `${CDN}img/cards/task9/fig1.jpg`,
          `${CDN}img/cards/task9/fig2.jpg`
        ],
        question: 'Кто из этих футболистов — Чемпион мира 2010 года?',
        answers: [
          'Серхио Рамос',
          'Лионель Месси'
        ],
        right: 0,
        score: 5
      },
      {
        cards: [
          `${CDN}img/cards/task10/fig1.jpg`,
          `${CDN}img/cards/task10/fig2.jpg`
        ],
        question: `Кто из этих футболистов в одном сезоне выиграл и Лигу чемпионов, и чемпионат мира?`,
        answers: [
          'Сами Хедира',
          'Джакомо Бонавентура'
        ],
        right: 0,
        score: 5
      }
    ],
    active_quest: 0,
    result: null
  }),

  mounted: function() {
    console.log('game block !');
  },

  methods: {
    checkAnswer(evt) {
      const that = this;
      const id = $(evt.target).data('id');

      if (that.quizz[that.active_quest].right == id) {
        that.result = that.result + that.quizz[that.active_quest].score;
      }

      $('.answer').each((indx, item) => {
        if ($(item).data('id') == that.quizz[that.active_quest].right) {
          $(item).addClass('ok');
        } else {
          $(item).addClass('err');
        }
      });

      const pr = new Promise((resolve, reject) => {
        setTimeout(() => {
          $('.answer').each((indx, item) => {
            $(item).removeClass('ok');
            $(item).removeClass('err');
          });
          resolve();
        }, 3000);
      });
      pr.then(() => {
        if (that.active_quest >= that.quizz.length - 1) {
          that.$emit('stop', that.result);
        } else {
          that.active_quest++;
        }
      });

    }
  }
};
