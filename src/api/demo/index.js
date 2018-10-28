import instance from './instance';
import { convertRESTAPI } from '../util';

/** 获取初始数据 */
function first_get(opts) {
  return instance({
    method: 'get',
    url:  '/first',
    opts: opts
  });
}

/** 获取初始数据 */
function first_post(opts) {
  return instance({
    method: 'post',
    url:  '/first',
    opts: opts
  });
}

/** 获取第一次数据 */
function get_first_data_post(opts) {
  return instance({
    method: 'post',
    url:  '/get_first_data',
    opts: opts
  });
}

export {
  first_get,
  first_post,
  get_first_data_post
};
