import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';

const useAxios = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const requestIntercept = axios.interceptors.request.use(
			(config: any) => {
				if (!config.headers.Authorization) {
					config.headers.Authorization = `${localStorage.getItem('_token')}`;
				}
				return config;
			},
			(error: any) => Promise.reject(error)
		);

		const responseIntercept = axios.interceptors.response.use(
			(response: any) => response,
			async (error: {
				message: string;
				config: any;
				response: { status: any; data: any };
			}) => {
				if (error.message !== 'canceled') {
					const prevRequest = error?.config;
					const { status, data } = error.response;
					if (status === 403 && !prevRequest?.sent) {
						localStorage.clear();
						navigate('/login');
					}
					if (status === 401) {
						localStorage.clear();
						navigate('/login');
					}
					if (status === 429) {
						localStorage.clear();
						navigate('/login');
						return Promise.reject();
					}
					if (status === 503) {
						localStorage.clear();
						navigate('/login');
						// window.location.reload();
						return Promise.reject();
					}
					if (!error?.response) {
						alert('No server response!');
						return Promise.reject();
						// localStorage.removeItem('access_token');
						// window.location.reload();
					}
					// console.log(error?.response?.status, '-request-error-');
					return Promise.reject(error);
				}

				return null;
			}
		);

		return () => {
			axios.interceptors.request.eject(requestIntercept);
			axios.interceptors.response.eject(responseIntercept);
		};
	}, []);

	return axios;
};

export default useAxios;
