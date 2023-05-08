/**
 * owner : Hitachi
 * author : Manish from Affine
 */
import axios from 'axios';
import helper from './tokenStore';

const api = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	headers: {'Content-Type': 'application/json'}
});

// Add a request interceptor
api.interceptors.request.use(function (config) {
    // Do something before request is sent
	if(config.url !== '/authenticateService/login'){
		config.headers.Authorization = 'Bearer ' + helper.fetchToken()
	}
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
api.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response dat
    return response;
  }, async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
	const originalRequest = error.config;
	if(error.response.status === 401 && !originalRequest._retry){
		originalRequest._retry = true;
		try{
			const rs = await refreshToken();
			const accessToken = rs.data.access_token;
			const refresh_Token = rs.data.refresh_token;
			helper.setToken(accessToken)
			helper.setRefreshToken(refresh_Token)
			return api(originalRequest);
		}
		catch(_error){
			if (_error.response && _error.response.data) {
				return Promise.reject(_error.response.data);
			}

			return Promise.reject(_error);
		}

	}

	if (error.response.status === 403 && error.response.data) {
		return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
  });

function refreshToken(){
	const payload = new FormData()
	payload.append('refresh_token',helper.fetchRefreshToken())
	return api.post("/authenticateService/refreshToken/", payload);
}

export default api