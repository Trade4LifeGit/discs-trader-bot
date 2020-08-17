const Telegraf = require('telegraf')
const TelegrafInlineMenu = require('telegraf-inline-menu')
const {mockedGames, TELEGRAM_BOT_KEY} = require('./constants.js')

const bot = new Telegraf(TELEGRAM_BOT_KEY);
// bot.use(Telegraf.log());

bot.catch(error => {
  console.log('telegraf error', error.response, error.parameters, error.on || error)
});

const firstMenu = new TelegrafInlineMenu(ctx => `Здравствуй, ${ctx.from.first_name + ' ' + (ctx.from.last_name ? ctx.from.last_name : '')}!`);
firstMenu.setCommand('start');
firstMenu.simpleButton('Продажа', 'a', {
  doFunc: ctx => ctx.answerCbQuery('Поздравляю! Вы ищите чего бы продать!')
});
firstMenu.simpleButton('Покупка', 'b', {
  doFunc: ctx => ctx.answerCbQuery('Поздравляю! Вы ищите чего бы купить!'),
  joinLastRow: true,
});
firstMenu.simpleButton('Мои объявления', 'c', {
  doFunc: ctx => ctx.answerCbQuery('Поздравляю! Вы решили посмотреть на свои лоты!')
});

// console.log(mockedGames.games[0]);
let currentGameNumber = 0;

firstMenu.submenu('Я просто смотрю', 'explore', new TelegrafInlineMenu(mockedGames.games[currentGameNumber].name, {
  photo: mockedGames.games[currentGameNumber].pictureURL
}))
  .setCommand('explore')
  .simpleButton('Назад', 'a', {
    doFunc: async () => {
      currentGameNumber--
      console.log("nazad ", currentGameNumber)
      // ctx.answerCbQuery('Just a callback query answer')
    }
  })
  .simpleButton('В меню', 'b', {
    doFunc: async ctx => ctx.answerCbQuery('Just a callback query answer'),
    joinLastRow: true
  })
  .simpleButton('Вперёд', 'c', {
    doFunc: async () => {
      currentGameNumber++
      console.log("vperyod ", currentGameNumber)
      // ctx.answerCbQuery('Just a callback query answer')
    },
    joinLastRow: true
  })


bot.use(firstMenu.init());
bot.startPolling();


async function startup() {
  await bot.launch()
  console.log(new Date(), 'Bot started as', bot.options.username)
}

startup();