import React from 'react';

export type InputType = React.ChangeEvent<HTMLInputElement>;
export enum ChatContentType {
	TEXT = 'text',
	IMG = 'img',
	URI = 'uri',
}

export interface MessageType {
	id: number | string;
	content: string;
	c_type: ChatContentType;
	own: boolean;
	at?: string;
	pop?: string;
}
