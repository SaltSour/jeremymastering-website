const express = require('express')
const next = require('next')
const path = require('path')

// Configuration de base
const dev = false
const port = process.env.PORT || 3000
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    const server = express()
    
    // Servir les fichiers statiques
    server.use(express.static(path.join(__dirname, 'public')))
    
    // Redirect root path to projects page
    server.get('/', (req, res) => {
      res.redirect(301, '/projets')
    })
    
    // Route par défaut pour Next.js
    server.all('*', (req, res) => {
      return handle(req, res)
    })

    // Démarrer le serveur
    server.listen(port, () => {
      console.log(`> Ready on port ${port}`)
    })
  })
  .catch((err) => {
    console.error('Error:', err)
    process.exit(1)
  }) 