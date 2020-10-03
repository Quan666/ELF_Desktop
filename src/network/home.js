import {
    request
} from './request'

import {
    RSS
} from '../../config'

const RSSList = RSS
const RSSListLength = RSSList.length

export function getData(url = '/api1/twitter/user/key_official/exclude_rts') {
    console.log(url);
    return request({
        method: 'get',
        url: url
    })
}