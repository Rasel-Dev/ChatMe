import { WithProfileType } from '../types/custom';

export const AppName = 'ChatMe';
export const BASE_URI = import.meta.env.VITE_APP_SERVER_ENDPOINT as string;
export const MEDIA_URI = import.meta.env.VITE_MEDIA_URI as string;
export const AVATER_URI = import.meta.env.VITE_AVATER_URI as string;

export const truncate = (input: string, len: number) =>
	input.length > len ? `${input.substring(0, len).trimEnd()}...` : input;

export const serializeConversations = (data: WithProfileType[]) => {
	let selectedUser: string;
	return data.map((msg: WithProfileType, i: number) => {
		// customize sender message
		if (!!msg?.pop) return msg;

		// const next = data[i + 1];
		//
		if (!selectedUser && msg.userId) {
			selectedUser = msg.userId;
			return { ...msg, widgets: true };
		}

		if (msg.userId && selectedUser && selectedUser !== msg.userId) {
			// if (selectedUser && selectedUser !== msg.userId) {
			selectedUser = msg.userId;
			return { ...msg, widgets: true };
			// }
		}

		// if (!msg?.own) return { ...msg, widgets: true };
		// if (!msg?.own) {
		// 	if (!!next && next?.userId !== msg.userId && !next?.pop)
		// 		return { ...msg, widgets: true };

		// 	if (!!next && !!next?.pop) return { ...msg, widgets: true };

		// 	if (!next) return { ...msg, widgets: true };
		// } else {
		// 	if (!next || (next && !next.own)) return { ...msg, widgets: true };
		// }
		return msg;
	});
};
