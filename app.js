const Telegraf = require('telegraf')
const TelegrafInlineMenu = require('telegraf-inline-menu')

const bot = new Telegraf('960038286:AAGZZHaFHCj1VCxvkBhGTLAYYWxd7DT7JNk');
bot.use(Telegraf.log());

bot.catch(error => {
  console.log('telegraf error', error.response, error.parameters, error.on || error)
})

bot.start((ctx) => {
  ctx.reply('Здарова, ' + ctx.from.first_name + ' ' + (ctx.from.last_name ? ctx.from.last_name : '') + '!\n' +
  'Тут такое дело: на данный момент бот находится в разработке и его функции ограничены, \n' +
  'но несмотря на это некоторые функции можно опробовать уже сейчас: \n' +
  '/personal \n'+
  '/menu \n' +
  '/test');
});

bot.command('personal', (ctx) => {
  ctx.reply('Личный кабинет ещё не готов');
});

const testMenu = new TelegrafInlineMenu(ctx => `Тестовая менюшка`);
testMenu.setCommand('test');
testMenu.simpleButton('Первая кнопка меню', 'a', {
  doFunc: ctx => ctx.answerCbQuery('Нажата кнопка 1')
});
testMenu.simpleButton('Вторая кнопка меню', 'b', {
  doFunc: ctx => ctx.answerCbQuery('Нажата кнопка 2'),
  joinLastRow: true,
});

bot.use(testMenu.init());
// bot.startPolling();


const firstMenu = new TelegrafInlineMenu(ctx => `Здравствуй, уважаемый ${ctx.from.first_name + ' ' + (ctx.from.last_name ? ctx.from.last_name : '')}`);
firstMenu.setCommand('menu');
firstMenu.simpleButton('Продажа', 'a', {
  doFunc: ctx => ctx.answerCbQuery('Нажата кнопка 1')
});
firstMenu.simpleButton('Покупка', 'b', {
  doFunc: ctx => ctx.answerCbQuery('Нажата кнопка 2'),
  joinLastRow: true,
});

bot.use(firstMenu.init());
bot.startPolling();


async function startup() {
  await bot.launch()
  console.log(new Date(), 'Bot started as', bot.options.username)
}

startup();