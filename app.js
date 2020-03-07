const Telegraf = require('telegraf')
const TelegrafInlineMenu = require('telegraf-inline-menu')
const menu = new TelegrafInlineMenu('Main Menu')

menu.simpleButton('Login', 'login click', {
    doFunc: async ctx => ctx.answerCbQuery('you clicked login')
})

menu.simpleButton('Register', 'register click', {
    doFunc: async ctx => ctx.answerCbQuery('you clicked registration')
})

menu.setCommand('start')

const bot = new Telegraf('960038286:AAGZZHaFHCj1VCxvkBhGTLAYYWxd7DT7JNk')

bot.use((ctx, next) => {
    if (ctx.callbackQuery) {
    //   console.log('another callbackQuery happened', ctx.callbackQuery.data.length, ctx.callbackQuery.data)
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