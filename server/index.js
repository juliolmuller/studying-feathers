const feathers = require('@feathersjs/feathers')
const socketio = require('@feathersjs/socketio')
const express = require('@feathersjs/express')
const IdeaService = require('./services/IdeaService')

const app = express(feathers())

// Configure Socket.io and enable REST services
app.configure(socketio())
app.configure(express.rest())

// Set middleware for parsing JSON and using service
app.use(express.json())
app.use('/ideas', new IdeaService())

// New connections connect to stream channel
app.on('connection', (conn) => app.channel('stream').join(conn))
app.publish(() => app.channel('stream'))

const PORT = process.env.PORT || 3030
app.listen(PORT).on('listening', () => console.log(`Real-time app running on port ${PORT}`))

// TODO: remove
app.service('ideas').create({
  text: 'Build a cool app',
  tech: 'Node.js',
  viewer: 'John Doe',
})
