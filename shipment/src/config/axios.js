// 'use strict';

import axios from 'axios';
import Config from './config';

axios.defaults.baseURL = Config.base_url;
axios.interceptors.request.use(req => {
    req.headers = Config.headers;
    return req;
});

export default axios;