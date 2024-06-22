import axios from 'axios';

const Api = axios.create({
	baseURL: `https://neon-blog-mernstack.onrender.com/api`,
	headers: { 'Content-Type': 'application/json' },
	withCredentials: true, // if there is cookies send it with request
});
export default Api;

// frontend domain
export const domainFront = 'http://localhost:3000';
export const domainBack = 'https://neon-blog-mernstack.onrender.com';
