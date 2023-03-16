type LoginActionType = {
	type: 'AUTH';
	payload: { id: number; fullname: string; username: string; token: string };
};

export type AppActionType = LoginActionType;
