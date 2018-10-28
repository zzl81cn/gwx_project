import { createAPI } from '../util'
import config from '../config'

const baseUrl = {
  mock: 'https://www.easy-mock.com/mock/5bc94237364160152beb30e7/',
  dev: '',
  pre: '',
  prod: ''
}[config.env || 'mock']

export default createAPI(baseUrl)
