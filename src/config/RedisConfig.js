// import { type } from 'os'
import redis from 'redis'
// import { cli } from 'webpack'
import config from './index'

const options = {
  detect_buffers: true,
  retry_strategy: function (options) {
    if (options.error && options.error.code === 'ECONNREFUSED') {
      // End reconnecting on a specific error and flush all commands with
      // a individual error
      return new Error('The server refused the connection')
    }
    if (options.total_retry_time > 1000 * 60 * 60) {
      // End reconnecting after a specific timeout and flush all commands
      // with a individual error
      return new Error('Retry time exhausted')
    }
    if (options.attempt > 10) {
      // End reconnecting with built in error
      return undefined
    }
    // reconnect after
    return Math.min(options.attempt * 100, 3000)
  }
}

const client = redis.createClient(Object.assign(options, config.REDIS))

const setValue = (key, value, time) => {
  if (typeof value === 'undefined' || !value) {
    return
  }
  if (typeof value === 'string') {
    client.set(key, value)
    if (typeof time !== 'undefined') {
      client.set(key, value, 'EX', time)
    } else {
      client.set(key, value)
    }
  } else {
    Object.keys(value).map((item) => {
      client.hset(key, item, value[item], redis.print)
    })
  }
  // return client.set(key, value)
}
const { promisify } = require('util')
const getAsync = promisify(client.get).bind(client)
const getValue = (key) => {
  return getAsync(key)
}
const getHValue = (key) => {
  return promisify(client.hgetall).bind(client)(key)
}
export { client, setValue, getValue, getHValue }
