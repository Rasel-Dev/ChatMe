import { ChatContentType, NotifyStatus } from '../../types/custom';

export interface ProfileResponse {
	fullname: string;
	avater: string;
	photos: string[];
}

export interface GroupProfileResponse extends ProfileResponse {
	participants: Participant[];
}

export interface Participant {
	userId: string;
	lastRead: string;
	pType: ParticipantType;
	user: User;
}

export type ParticipantType = 'ADMIN' | 'MOD' | 'USER';

export interface ChatResponse {
	id: string;
	avater: string;
	friends: Friend[];
	notifications: Notification[];
	requested: number;
}

export interface Friend {
	threadId: string;
	user: User;
	id: string;
	body: string;
	cType: ChatContentType;
	senderAvater: string;
	timestamp: string;
	own: boolean;
	userId?: string;
	muted?: boolean;
}

export interface User {
	fullname: string;
	avater: string;
	group?: boolean;
}

export interface Notification {
	id: string;
	avater: string;
	title: string;
	subject: string;
	nType: NotifyStatus;
	read: boolean;
	createdAt: string;
}
