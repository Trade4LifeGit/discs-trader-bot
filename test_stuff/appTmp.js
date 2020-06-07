// const Telegraf = require('telegraf')
// const TelegrafInlineMenu = require('telegraf-inline-menu')

// const menu = new TelegrafInlineMenu('Ну здравствуйте, тут у нас главное меню:)')

// menu.simpleButton('Логин', 'login click', {
//   doFunc: async ctx => ctx.answerCbQuery('you clicked login')
// })

// menu.simpleButton('Регистрация', 'register click', {
//   doFunc: async ctx => ctx.answerCbQuery('you clicked registration')
// })

// menu.setCommand('start')


// const loginMenu = new TelegrafInlineMenu('Меню входа')

// loginMenu.simpleButton('Логин', 'login click', {
//   doFunc: async ctx => ctx.answerCbQuery('you clicked login')
// })

// menu.submenu('Login menu', 'login', loginMenu)


// const bot = new Telegraf('960038286:AAGZZHaFHCj1VCxvkBhGTLAYYWxd7DT7JNk')

// bot.use((ctx, next) => {
//   if (ctx.callbackQuery) {
//     console.log(ctx.callbackQuery.data)
//   }
//   return next()
// })

// bot.use(menu.init({
//   backButtonText: 'back…',
//   mainMenuButtonText: 'back to main menu…'
// }))

// bot.catch(error => {
//   console.log('telegraf error', error.response, error.parameters, error.on || error)
// })

// async function startup() {
//   await bot.launch()
//   console.log(new Date(), 'Bot started as', bot.options.username)
// }

// startup()


const {readFileSync} = require('fs')

const Telegraf = require('telegraf')
const session = require('telegraf/session')

const TelegrafInlineMenu = require('telegraf-inline-menu')

const menu = new TelegrafInlineMenu('Main Menu')

let mainMenuToggle = false
menu.toggle('toggle me', 'a', {
  setFunc: (_ctx, newVal) => {
    mainMenuToggle = newVal
  },
  isSetFunc: () => mainMenuToggle
})

menu.simpleButton('click me', 'c', {
  doFunc: async ctx => ctx.answerCbQuery('you clicked me!'),
  hide: () => mainMenuToggle
})

menu.simpleButton('click me harder', 'd', {
  doFunc: async ctx => ctx.answerCbQuery('you can do better!'),
  joinLastRow: true,
  hide: () => mainMenuToggle
})

let selectedKey = 'b'
menu.select('s', ['A', 'B', 'C'], {
  setFunc: async (ctx, key) => {
    selectedKey = key
    await ctx.answerCbQuery(`you selected ${key}`)
  },
  isSetFunc: (_ctx, key) => key === selectedKey
})

const foodMenu = new TelegrafInlineMenu('People like food. What do they like?')

const people = {Mark: {}, Paul: {}}
const food = ['bread', 'cake', 'bananas']

function personButtonText(_ctx, key) {
  const entry = people[key]
  if (entry && entry.food) {
    return `${key} (${entry.food})`
  }

  return key
}

function foodSelectText(ctx) {
  const person = ctx.match[1]
  const hisChoice = people[person].food
  if (!hisChoice) {
    return `${person} is still unsure what to eat.`
  }

  return `${person} likes ${hisChoice} currently.`
}

const foodSelectSubmenu = new TelegrafInlineMenu(foodSelectText)
  .toggle('Prefer Tee', 't', {
    setFunc: (ctx, choice) => {
      const person = ctx.match[1]
      people[person].tee = choice
    },
    isSetFunc: ctx => {
      const person = ctx.match[1]
      return people[person].tee === true
    }
  })
  .select('f', food, {
    setFunc: (ctx, key) => {
      const person = ctx.match[1]
      people[person].food = key
    },
    isSetFunc: (ctx, key) => {
      const person = ctx.match[1]
      return people[person].food === key
    }
  })

foodMenu.selectSubmenu('p', () => Object.keys(people), foodSelectSubmenu, {
  textFunc: personButtonText,
  columns: 2
})

foodMenu.question('Add person', 'add', {
  uniqueIdentifier: '666',
  questionText: 'Who likes food too?',
  setFunc: (_ctx, key) => {
    people[key] = {}
  }
})

menu.submenu('Food menu', 'food', foodMenu, {
  hide: () => mainMenuToggle
})

let isAndroid = true
menu.submenu('Photo Menu', 'photo', new TelegrafInlineMenu('', {
  photo: () => isAndroid ? 'https://telegram.org/img/SiteAndroid.jpg' : 'https://telegram.org/img/SiteiOs.jpg'
}))
  .setCommand('photo')
  .simpleButton('Just a button', 'a', {
    doFunc: async ctx => ctx.answerCbQuery('Just a callback query answer')
  })
  .select('img', ['iOS', 'Android'], {
    isSetFunc: (_ctx, key) => key === 'Android' ? isAndroid : !isAndroid,
    setFunc: (_ctx, key) => {
      isAndroid = key === 'Android'
    }
  })

menu.setCommand('start')

// const token = readFileSync('token.txt', 'utf8').trim()

const bot = new Telegraf('960038286:AAGZZHaFHCj1VCxvkBhGTLAYYWxd7DT7JNk')
bot.use(session())

bot.use((ctx, next) => {
  if (ctx.callbackQuery) {
    console.log('another callbackQuery happened', ctx.callbackQuery.data.length, ctx.callbackQuery.data)
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