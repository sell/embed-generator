const path = require('path')

const routes = (fastify, options, done) => {
  fastify.register(require('point-of-view'), {
    engine: {
      handlebars: require('handlebars')
    },
    layout: './src/views/layouts/layout.hbs',
    options: {
      partials: {
        _meta: './src/views/partials/_meta.hbs',
        _form: './src/views/partials/_form.hbs',
        _nav: './src/views/partials/_nav.hbs',
        _placeholder: './src/views/partials/_placeholder.hbs',
        _advertisements: './src/views/partials/_advertisements.hbs'
      }
    }
  });

  fastify.register(require('fastify-static'), {
    root: path.join(__dirname, '/../', 'views')
  });

  fastify.get('/', (req, rep) => {
    rep.view('./src/views/index.hbs', { text: 'text', home: true})
  });

  fastify.get('/oembed', (req, rep) => {
    return { type: "photo", "author_name": req.query.a}
  });

  fastify.get('/:title', (req, rep) => {
    const replacePlus = (a) => a ? a.replace(/[+]/g, ' ') : a
    let { description, url, image, color, author } = req.query;
    let { title } = req.params;
    rep.view('./src/views/index.hbs', {
      title: replacePlus(title),
      author: replacePlus(author),
      description: replacePlus(description),
      url: replacePlus(url),
      image: replacePlus(image),
      color: replacePlus(color ?
          color.startsWith('#') ? color : `#${color}`
          : '#191722'),
      home: false
    })
  });

  fastify.setNotFoundHandler((req, rep) => {
    rep.redirect('/')
  })

  done()
}

module.exports = routes
