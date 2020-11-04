const fastify = require('fastify')({ logger: true })
const fastifyCaching = require('fastify-caching');

fastify.register(require('fastify-rate-limit'), {
  max: 100,
  timeWindow: 600000,
  addHeaders: {
    'x-ratelimit-limit': true,
    'x-ratelimit-remaining': true,
    'x-ratelimit-reset': true,
    'retry-after': true
  }
});

fastify.register(fastifyCaching, {
  privacy: fastifyCaching.privacy.NOCACHE
}, (err) => { if (err) throw err });

fastify.register(require('./plugin/routes'))

const port = process.env.PORT || 3000

const start = async () => {
  try {
    await fastify.listen(port, '0.0.0.0')
  } catch (e) {
    console.log(e)
    fastify.log.error(e)
  }
}

start().then(() => console.log('started'))
