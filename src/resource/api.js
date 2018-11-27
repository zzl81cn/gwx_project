import axios from 'axios'
import qs from 'qs'
axios.defaults.baseURL = `${window.location.origin}/api/pc/`
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded; charset=UTF-8'
axios.defaults.timeout = 50000

const callApi = ({
  api,
  param,
  readonly = true,
  axiosOptions = {},
  error = '调用接口失败',
  success = '',
  async = false,
  mock = false
}) => {
  if (mock) {
    axiosOptions = Object.assign(axiosOptions, {
      baseURL: 'https://easy-mock.com/mock/5bc94237364160152beb30e7/'
    })
  }
  const axiosInstance = axios.create(axiosOptions)
  const params = qs.stringify({
    apiparams: JSON.stringify({ params: param, readonly, async })
  })
  return axiosInstance
    .post(api, params)
    .then(({ data: { ret: { code, msg }, data } }) => {
      if (code !== '200') {
        const message = { code, message: msg || error }
        return Promise.reject(message)
      }
      return data
    })
    .catch(error => {
      console.log(`
        ${'*'.repeat(24)}  api = ${api}  ${'*'.repeat(24)}
        params = ${JSON.stringify(param, null, 2)}
          code = ${error.code} 
          errorMessage = ${error.message}
          ${'#'.repeat(70)}
        `)
      return Promise.reject(error)
    })
}

export default callApi
