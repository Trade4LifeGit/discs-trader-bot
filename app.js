const Telegraf = require('telegraf')
const TelegrafInlineMenu = require('telegraf-inline-menu')

const menu = new TelegrafInlineMenu('Ну здравствуйте, тут у нас главное меню:)')

menu.simpleButton('Логин', 'login click', {
  doFunc: async ctx => ctx.answerCbQuery('you clicked login')
})

menu.simpleButton('Регистрация', 'register click', {
  doFunc: async ctx => ctx.answerCbQuery('you clicked registration')
})

menu.setCommand('start')


const loginMenu = new TelegrafInlineMenu('Меню входа')

loginMenu.simpleButton('Логин', 'login click', {
  doFunc: async ctx => ctx.answerCbQuery('you clicked login')
})

menu.submenu('Login menu', 'login', loginMenu)


const bot = new Telegraf('960038286:AAGZZHaFHCj1VCxvkBhGTLAYYWxd7DT7JNk')

bot.use((ctx, next) => {
  if (ctx.callbackQuery) {
    console.log(ctx.callbackQuery.data)
  }
  return next()
})

bot.use(menu.init({
  backButtonText: 'back…',
  mainMenuButtonText: 'back to main menu…'
}))

bot.catch(error => {
  console.log('telegraf error', error.response, error.parameters, error.on || error)
})

async function startup() {
  await bot.launch()
  console.log(new Date(), 'Bot started as', bot.options.username)
}

startup()