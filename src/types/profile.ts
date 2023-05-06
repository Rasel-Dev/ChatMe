export interface ParsonalProfileType {
	fullname: string;
	username: string;
	email: string;
	avater: string;
	createdAt: string;
	friends: number;
	groups: number;
	friendsHave: FriendsHave[];
	groupsHave: GroupsHave[];
}

export interface FriendsHave {
	userId: string;
	user: User;
}

export interface User {
	fullname: string;
	avater: string;
}

export interface GroupsHave {
	threadId: string;
	thread: Thread;
}

export interface Thread {
	subject: string;
	avater: string;
}
