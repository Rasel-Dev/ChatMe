import React from 'react';

export type InputType = React.ChangeEvent<HTMLInputElement>;
export type ClickType = React.MouseEventHandler<HTMLInputElement>;

export interface Register extends Login {
	fullname: string;
	email: string;
	avater?: File;
}

export interface Login {
	username: string;
	password: string;
}

export enum STATUS {
	IDLE = 'idle',
	LOADING = 'loading',
	ERROR = 'error',
}
export enum NotifyStatus {
	FRIEND = 'FRIEND',
	GROUP = 'GROUP',
	STORY = 'STORY',
}
export type NotificationType = {
	id: string;
	title: string;
	avater: string;
	subject: string;
	nType: NotifyStatus;
	read: boolean;
	createdAt: string;
};
export enum ChatContentType {
	TEXT = 'TXT',
	IMG = 'IMG',
	URI = 'LNK',
}
export interface LabelProfileType {
	threadId: string;
	user: { fullname: string; avater?: string; group?: boolean };
	userId?: string;
	typing?: boolean;
	timestamp: string;
}
export interface FriendType extends LabelProfileType {
	id: string;
	body: string;
	cType: ChatContentType;
	// timestamp: string;
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
export enum ReactStatusType {
	LOVE = 'love',
	LIKE = 'like',
	UNLIKE = 'unlike',
	SAD = 'sad',
}
export type ReactType = {
	userId: string;
	cReact: ReactStatusType;
};
export type ReceiveReactType = {
	messageId: string;
	userId: string;
	react: string;
};
export interface MessageContentType {
	body: string;
	id: string | number;
	cType?: ChatContentType;
	createdAt?: string;
	own?: boolean;
	pop?: boolean;
	threadId?: string;
	userId?: string;
}
export interface WithProfileType extends MessageContentType {
	onTyping?: boolean;
	widgets?: boolean;
	React?: ReactType[];
}
export type ParticipantType = {
	id: string;
	fullname: string;
	avater: string;
};
export type BioType = {
	name: string;
	avater: string;
	lastRead: string;
	participant?: string;
	is_online?: boolean;
	is_typing?: boolean;
};
export type ReturnSocketSubscribeType = {
	userId: string;
	online: boolean;
};
export type SenderType = { temp: number; content: any };
export type TypingType = {
	threadId: string;
	userId: string;
	isTyping: boolean;
};
export type ReactorMessageType = {
	avater: string;
	fullname: string;
	body: string;
	cType: ChatContentType;
	createdAt: string;
	own: boolean;
};

export type ReqFriendsType = {
	threadId: string;
	userId: string;
	action: 'accept' | 'cancel';
};
