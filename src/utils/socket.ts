import { io } from 'socket.io-client';
import { ORIGIN } from './axios';

const socketInstance = io(ORIGIN, {
	path: '/chatme',
	transports: ['websocket'],
	withCredentials: true,
	reconnectionAttempts: 5,
	reconnectionDelay: 5000,
	autoConnect: false,
	query: { _t: localStorage.getItem('_token') },
});

export default socketInstance;
