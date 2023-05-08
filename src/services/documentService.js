/**
 * owner : Hitachi
 * author : Manish from Affine
 */
import api from "./interceptor";

class documentService {

    getAllApplications(){
		return api.get('https://engineering-task.elancoapps.com/api/applications')
			.then(response => {
				console.log("response");
				console.log(response);
				return response;
			
			})
			.catch(err => {});
	}
	getApplication(payloadObj){
	
		return api.get('https://engineering-task.elancoapps.com/api/applications/'+ payloadObj )
			.then(response => {
			
				return response;
			
			})
			.catch(err => {});
	}
	getAllResources(){
		return api.get('https://engineering-task.elancoapps.com/api/resources')
			.then(response => {
				console.log("response");
				console.log(response);
				return response;
			
			})
			.catch(err => {});
	}

	getResource(payloadObj){
		
		return api.get('https://engineering-task.elancoapps.com/api/resources/' + payloadObj)
			.then(response => {
				console.log("response");
				console.log(response);
				return response;
			
			})
			.catch(err => {});
	}



}

export default new documentService();