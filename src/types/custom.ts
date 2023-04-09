import React from 'react';

export type InputType = React.ChangeEvent<HTMLInputElement>;

export enum STATUS {
	IDLE = 'idle',
	LOADING = 'loading',
	ERROR = 'error',
}
export enum ChatContentType {
	TEXT = 'TXT',
	IMG = 'IMG',
	URI = 'LNK',
}
export interface LabelProfileType {
	threadId: string;
	userId?: string;
	user: { fullname: string; avater?: string };
}
export interface FriendType extends LabelProfileType {
	id: string;
	body: string;
	cType: ChatContentType;
	own?: boolean;
	online?: boolean;
}
export interface SearchFriendType {
	id: string;
	fullname: string;
	avater: string;
}
export interface SearchGroupType {
	id: string;
	subject: string;
	avater: string;
}
export interface MessageType {
	id: number | string;
	content: string;
	c_type: ChatContentType;
	own: boolean;
	at?: string;
	pop?: boolean;
}
export interface MessageContentType {
	body: string;
	id?: string | number;
	cType?: ChatContentType;
	createdAt?: string;
	own?: boolean;
	pop?: boolean;
	threadId?: string;
}
export interface WithProfileType extends MessageContentType {
	onTyping?: boolean;
	widgets?: boolean;
}
export type BioType = {
	name: string;
	avater: string;
	lastRead: string;
	is_online?: boolean;
	is_typing?: boolean;
};
export type UserProfileType = {
	fullname: string;
	username: string;
	email: string;
	avater: string;
	createdAt: string;
};
export type ReturnSocketSubscribeType = {
	userId: string;
	online: boolean;
};
export type SenderType = { temp: number; content: any };
