const moment = require('moment')

class IdeaService {

  constructor() {
    this.ideas = []
  }

  find() {
    return Promise.resolve(this.ideas)
  }

  create(data) {
    const idea = {
      id: this.ideas.length + 1,
      text: data.text,
      tech: data.tech,
      viewer: data.viewer,
      time: moment().format('h:mm:ss A'),
    }

    this.ideas.push(idea)

    return Promise.resolve(idea)
  }
}

module.exports = IdeaService
