import { getHValue, setValue } from './RedisConfig'

console.log('hello')
setValue('李明', {
  name: '李明',
  age: 18
})
getHValue('李明').then((res) => {
  console.log('getValue ' + res)
})
