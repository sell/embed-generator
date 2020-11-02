const fastify = require('fastify')({ logger: true })

fastify.register(require('./plugin/routes'))

const start = async () => {
  try {
    await fastify.listen(3000)
  } catch (e) {
    console.log(e)
    fastify.log.error(e)
  }
}

start().then(() => console.log('started'))
