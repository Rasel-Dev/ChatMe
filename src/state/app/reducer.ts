import dayjs from 'dayjs';
import { ChatContentType } from '../../types/custom';
import { serializeConversations, truncate } from '../../utils';
import { initialAppState } from './AppStateProvider';
import { AppActionType, initialStateType } from './types';
import { v4 as uuid } from 'uuid';

export default function appReducer(
	state: initialStateType,
	action: AppActionType
): initialStateType {
	switch (action.type) {
		case 'AUTH': {
			return { ...state, ...action.payload };
		}
		case 'INIT_FRIEND': {
			return {
				...state,
				userAvater: action.payload?.avater || '',
				requested: action.payload?.requested || 0,
				friends: action.payload?.friends || [],
			};
		}
		case 'TOGGLE_LIST': {
			return {
				...state,
				isListMenuOpen: !state.isListMenuOpen,
			};
		}
		case 'USER_ACTIVITY': {
			const friendsClone = [...state.friends];
			action.payload?.forEach((user) => {
				const index = friendsClone.findIndex((u) => u.userId === user.userId);
				if (index !== -1) friendsClone[index].online = user.online;
			});
			return {
				...state,
				friends: friendsClone,
			};
		}
		case 'USER_ONLINE': {
			const friendsClone = [...state.friends];
			const index = friendsClone.findIndex((u) => u.userId === action.payload);
			if (index !== -1) friendsClone[index].online = true;
			return {
				...state,
				friends: friendsClone,
			};
		}
		case 'USER_OFFLINE': {
			const friendsClone = [...state.friends];
			const index = friendsClone.findIndex((u) => u.userId === action.payload);
			if (index !== -1) friendsClone[index].online = false;
			return {
				...state,
				friends: friendsClone,
			};
		}
		case 'INIT_REQUEST_FRIEND': {
			return {
				...state,
				requests: action.payload || [],
			};
		}
		case 'ON_SEARCH_FRIEND': {
			return { ...state, onSearch: action.payload };
		}
		case 'INIT_SEARCH_FRIEND': {
			return {
				...state,
				search: {
					peoples: action.payload?.peoples || [],
					groups: action.payload?.groups || [],
				},
			};
		}
		case 'INIT_CHAT': {
			return {
				...state,
				chat: {
					...state.chat,
					activeRoom: action.payload.threadId,
					bio: action.payload?.bio,
					conversations: serializeConversations(action.payload?.conversations),
				},
			};
		}
		case 'APPEND_LABEL_MESSAGE': {
			let friends = [...state.friends];

			// for friends label data
			const friendIdx = friends.findIndex(
				(x) => x.threadId === action.payload?.threadId
			);
			if (friendIdx !== -1) {
				const friendsClone = { ...friends[friendIdx] };
				const cType = action.payload?.cType || ChatContentType.TEXT;
				friendsClone.id = action.payload.id + '';
				friendsClone.cType = cType;
				friendsClone.body =
					cType === ChatContentType.TEXT
						? truncate(action.payload.body, 16)
						: action.payload.body;
				friendsClone.own = action.payload.own;
				friends.splice(friendIdx, 1);
				return { ...state, friends: [friendsClone, ...friends] };
			}
		}
		case 'REMOVE_LABEL_AND_MESSAGE': {
			const st = { ...state };
			const friends = [...st.friends];
			// for friends label data
			const friendIdx = friends.findIndex((x) => x.id === action.payload?.id);
			console.log('friendIdx :', friendIdx, action.payload?.id, friends);
			if (friendIdx !== -1) {
				friends[friendIdx].cType = ChatContentType.TEXT;
				friends[friendIdx].body = 'Message removed';
				st.friends = friends;
			}
			if (state.chat.activeRoom) {
				const chats = [...state.chat.conversations];
				const chatIdx = chats.findIndex((x) => x.id === action.payload?.id);
				if (chatIdx !== -1) {
					chats.splice(chatIdx, 1);
					st.chat.conversations = [...chats];
				}
			}
			return st;
		}
		case 'APPEND_MESSAGE': {
			const conversations = [...state.chat.conversations];
			const loadIds = [...state.chat.loadIds];
			const body = { ...action.payload };
			console.log('body :', body);
			delete body?.threadId;
			if (state.chat.activeRoom === action.payload?.threadId) {
				const convLen = conversations.length;
				// if the conversation is already in the conversation list
				if (!!convLen) {
					// delete action.payload?.threadId;
					const lastConv = conversations[convLen - 1];
					if (
						dayjs(lastConv.createdAt).format('YYYY-MM-DD') !==
						dayjs(Date.now()).format('YYYY-MM-DD')
					) {
						conversations.push(
							{
								id: uuid(),
								body: dayjs(Date.now()).format('YYYY-MM-DD HH:mm A'),
								cType: ChatContentType.TEXT,
								pop: true,
								own: false,
							},
							{ ...body, widgets: true }
						);
					} else {
						conversations.push({ ...body, widgets: true });
					}

					if (!lastConv?.pop && lastConv?.own === action.payload?.own) {
						conversations[convLen - 1].widgets = false;
					}
				} else {
					// delete action.payload?.threadId;
					conversations.push({ ...body, widgets: true });
				}

				if (typeof action.payload?.id === 'number') {
					loadIds.push(action.payload?.id);
				}
			}
			return {
				...state,
				chat: { ...state.chat, conversations, loadIds },
			};
		}
		case 'APPEAR_MESSAGE_SUCCESS': {
			const conversations = [...state.chat.conversations];
			const indexPoint = conversations.findIndex(
				(conv) => conv.id === action.payload.temp
			);
			if (indexPoint !== -1)
				conversations[indexPoint].id = action.payload.replace;
			return { ...state, chat: { ...state.chat, conversations } };
		}
		case 'REMOVE_MESSAGE': {
			const clone = [...state.chat.conversations];
			const index = clone.findIndex((c) => c.id === action.payload.id);
			if (index !== -1 && state.chat.activeRoom) {
				if (action.payload.body) {
					clone[index].body = action.payload.body;
					//remove with friend label message
					if (index === clone.length - 1) {
						const fClone = [...state.friends];
						const fIndex = fClone.findIndex(
							(f) => f.threadId === state.chat.activeRoom
						);

						if (fIndex !== -1) {
							fClone[fIndex].body = 'removed';
							return {
								...state,
								friends: fClone,
								chat: {
									...state.chat,
									conversations: clone,
								},
							};
						}
						return {
							...state,
							chat: {
								...state.chat,
								conversations: clone,
							},
						};
					}
					//remove withrout friend label message
					return {
						...state,
						chat: {
							...state.chat,
							conversations: clone,
						},
					};
				}
				clone.splice(index, 0);
				return {
					...state,
					chat: {
						...state.chat,
						conversations: clone,
					},
				};
			}
			return state;
		}
		case 'CLEAN_CHAT_WINDOW': {
			return {
				...state,
				chat: initialAppState.chat,
			};
		}
		default:
			return state;
	}
}
