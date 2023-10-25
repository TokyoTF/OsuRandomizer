import app from './app.js'

app.use((req, res) => {
  res.status(404).render('others/404')
})

app.listen(app.get('port'), () => {
  console.log('Server start on', app.get('port'))
})
