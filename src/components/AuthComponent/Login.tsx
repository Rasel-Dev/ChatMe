import React from 'react';

export interface LoginProp {
	username: string;
	password: string;
}

const Login = ({ username, password }: LoginProp) => {
	return <div>Login</div>;
};

export default Login;
