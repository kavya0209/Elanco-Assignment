/**
 * owner : Hitachi
 * author : Manish and Divyangi from Affine
 */

class helperService {

	setToken = (token) => {
		sessionStorage.setItem('accessToken', token)// make up your own token
	}

	setRefreshToken = (token) => {
		sessionStorage.setItem('refreshToken', token)// make up your own token
	}

	setRole = (role) => {
		sessionStorage.setItem('userRole', role)// make up your own token
	}

	fetchToken = () => {
		return sessionStorage.getItem('accessToken');
	}

	getRole = () => {
		return sessionStorage.getItem('userRole')// make up your own token
	}

	fetchRefreshToken = () =>{
		return sessionStorage.getItem('refreshToken');
	}

	setQA = (obj) =>{
		return localStorage.setItem("lsqah",JSON.stringify(obj))
	}

	getQA = () =>{
		return localStorage.getItem("lsqah")
	}
}


export default new helperService();