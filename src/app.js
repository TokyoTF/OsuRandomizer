import express, { json, urlencoded, static as static_ } from 'express'
import { create } from 'express-handlebars'
import useragent from 'express-useragent'
import { join, dirname } from 'path'
import { frameguard } from 'helmet'
import cors from 'cors'
import session from 'express-session'
import flash from 'connect-flash'
import help from './lib/helper.js'
import { fileURLToPath } from 'url'
import indexRoute from './routes/index.routes.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const app = express()

app.use(useragent.express())
app.use(cors({
  origin: '*'
}))

// Express
app.set('port', 25126)
app.set('views', join(__dirname, 'views'))

const hbs = create({
  defaultLayout: 'main',
  layoutsDir: join(app.get('views'), 'layouts'),
  partialsDir: join(app.get('views'), 'partials'),
  extname: '.hbs',
  helpers: help,
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
  }
})

app.engine('.hbs', hbs.engine)
app.set('view engine', '.hbs')

// middlegwares

app.use(session({
  secret: 'keyforyoubaby',
  resave: false,
  saveUninitialized: false
}))

app.use(frameguard({ action: 'SAMEORIGIN' }))
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(static_(join(__dirname, 'public')))
app.use(flash())

// routes

app.use(indexRoute)

export default app
