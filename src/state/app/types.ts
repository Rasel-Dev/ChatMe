type LoginActionType = {
	type: 'AUTH';
	payload: { id: number; fullname: string; username: string; token: string };
};

export type AppActionType = LoginActionType;

// Handler types
export type CB = (
	error?: { [index: string]: string } | null,
	data?: unknown
) => void;
