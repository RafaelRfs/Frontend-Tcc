import axios from 'axios';
import { navigate } from 'hookrouter';

const baseURL = 'https://api-gerenciador-projetos-tcc.herokuapp.com/';

const Api = axios.create({
	baseURL: baseURL,
});

Api.interceptors.request.use(
	(config) => {
		const USER_TOKEN = localStorage.getItem('token');
		if (USER_TOKEN !== null) {
			config.headers = {
				'Authorization': `Bearer ${USER_TOKEN}`,
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			};
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

Api.interceptors.response.use(undefined, (error) => {

	if(error && error.message.includes('401'))
	{
		navigate('/login');
		window.location.reload(false);
	}

	return Promise.reject(error);
});

export default Api;