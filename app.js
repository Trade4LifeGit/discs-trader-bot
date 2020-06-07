const Telegraf = require('telegraf')
const TelegrafInlineMenu = require('telegraf-inline-menu')
const session = require('telegraf/session')


const bot = new Telegraf('960038286:AAGZZHaFHCj1VCxvkBhGTLAYYWxd7DT7JNk')

bot.catch(error => {
  console.log('telegraf error', error.response, error.parameters, error.on || error)
})

bot.start((ctx) => {
  console.log(ctx.message);
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

bot.command('menu', (ctx) => {
  ctx.reply('Меню ещё не готово');
});

async function startup() {
  await bot.launch()
  console.log(new Date(), 'Bot started as', bot.options.username)
}

startup()