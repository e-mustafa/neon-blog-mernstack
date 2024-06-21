import axios from 'axios';

const Api = axios.create({
	baseURL: 'http://localhost:5000/api',
	headers: { 'Content-Type': 'application/json' },
	withCredentials: true, // if there is cookies send it with request
});
export default Api;



// frontend domain
export const domainFront = 'http://localhost:3000';
export const domainBack = 'http://localhost:5000';
