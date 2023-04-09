import { WithProfileType } from '../types/custom';

export const AppName = 'ChatMe';

export const truncate = (input: string, len: number) =>
	input.length > len ? `${input.substring(0, len).trimEnd()}...` : input;

export const serializeConversations = (data: WithProfileType[]) =>
	data.map((msg: WithProfileType, i: number) => {
		// customize sender message
		if (!!msg?.pop) return msg;

		const next = data[i + 1];
		//
		if (!msg?.own) {
			if (!!next && !!next?.own && !next?.pop) return { ...msg, widgets: true };

			if (!!next && !!next?.pop) return { ...msg, widgets: true };

			if (!next) return { ...msg, widgets: true };
		} else {
			if (!next || (next && !next.own)) return { ...msg, widgets: true };
		}
		return msg;
	});
