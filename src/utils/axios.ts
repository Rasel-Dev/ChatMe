import axios from 'axios';

export const ORIGIN = `http://localhost:8000/`;

export default axios.create({
	baseURL: `${ORIGIN}v1`,
	headers: {
		'Content-type': 'application/json',
	},
	withCredentials: true,
});
