import axios from 'axios';
import {API_KEY} from './config';

const client = axios.create({
	baseURL: `https://api.outsidein.dev/${API_KEY}`,
});

const api = {
	loadRestaurants() {
		return client.get('/restaurants').then(res => res.data);
	},
};

export default api;
