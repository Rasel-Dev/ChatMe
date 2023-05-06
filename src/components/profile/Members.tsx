import React, { useState } from 'react';
import { FiMinusSquare, FiMoreVertical, FiSquare, FiX } from 'react-icons/fi';
import { Participant } from '../../app/services/types';
import { InputType } from '../../types/custom';
import UserAvater from '../UserAvater';
import WidgetButton from '../buttons/WidgetButton';

type MemberType = {
	userId: string;
	fullname: string;
	avater: string;
	onHandler: () => void;
	onSelectParticipant: (e: InputType) => void;
	badge?: 'Admin' | 'Mod' | 'Member';
	lastRead?: string;
	activeMenu?: boolean;
	checked?: boolean;
	editable?: boolean;
};

type PropType = {
	friends: Participant[];
	editable?: boolean;
};

const MemberLabel: React.FC<MemberType> = ({
	userId,
	fullname,
	avater,
	badge = 'Member',
	lastRead = '',
	activeMenu = false,
	checked = false,
	editable = false,
	onHandler,
	onSelectParticipant,
}) => {
	// console.log('editable :', editable);
	return (
		<div className='flex items-center gap-2 px-5 py-2 hover:bg-indigo-100 transition-colors'>
			{!editable ? null : (
				<label
					htmlFor={userId}
					className='flex items-center gap-3 cursor-pointer'
				>
					<input
						type='checkbox'
						value={userId}
						id={userId}
						className='hidden'
						onChange={onSelectParticipant}
						checked={checked}
						disabled={badge !== 'Member'}
					/>
					{!checked ? (
						<FiSquare
							className={`w-5 h-5 stroke-1 ${
								badge === 'Member' ? 'text-slate-400' : 'text-slate-300'
							}`}
						/>
					) : (
						<FiMinusSquare className='w-5 h-5 stroke-1 text-red-500' />
					)}
				</label>
			)}

			<div className='relative flex-shrink-0 w-8 h-8 md:w-10 md:h-10 border border-indigo-200 rounded-full'>
				{badge === 'Member' ? null : (
					<span className='absolute -top-1.5 left-6 font-medium tracking-wide text-white rounded-full px-1 text-[9px] bg-indigo-700'>
						Admin
					</span>
				)}
				<UserAvater avater={avater} />
			</div>
			<h3 className='flex-1 flex-shrink-0 font-medium tracking-wide text-slate-600'>
				{fullname}
			</h3>
			<p className='text-slate-400 text-[10px] capitalize'>{lastRead}</p>
			{badge === 'Admin' || !editable ? null : (
				<WidgetButton title='Change Privilege' onClick={onHandler}>
					{activeMenu ? (
						<FiX className='w-4 h-4 stroke-2 text-gray-600' />
					) : (
						<FiMoreVertical className='w-4 h-4 stroke-2 text-gray-600' />
					)}
				</WidgetButton>
			)}
		</div>
	);
};

const Members: React.FC<PropType> = ({ friends, editable = false }) => {
	const [activeMenu, setActiveMenu] = useState<string>();
	const [participants, setParticipants] = useState<string[]>([]);

	const onActiveMenu = (userId: string) => {
		setActiveMenu((prev) => (prev === userId ? '' : userId));
	};

	const onSelectParticipant = (e: InputType) => {
		const p = [...participants];
		const index = p.findIndex((id) => id === e.target.value);

		if (index !== -1) {
			p.splice(index, 1);
		} else {
			p.push(e.target.value);
		}

		setParticipants(p);
	};

	return (
		<div className='mt-5'>
			{/* <div className='mb-2 px-5 font-bold text-xs uppercase text-indigo-400'>
				members
			</div> */}
			<div className='px-5 mb-2 flex items-center justify-between gap-2'>
				<div className='font-bold text-xs uppercase text-indigo-400'>
					members
				</div>
				{!participants.length ? (
					<button
						type='button'
						className='px-2 py-1 text-[11px] bg-green-200 text-green-500 rounded-md shadow-md'
					>
						Add Member
					</button>
				) : (
					<div className='flex items-center gap-2'>
						<p className='text-slate-500 text-[10px] tracking-wide'>
							{participants.length} member
							{participants.length > 1 ? 's' : null} selected
						</p>
						<button
							type='button'
							className='px-2 py-1 text-[11px] bg-red-200 text-red-500 rounded-md shadow-md'
						>
							Kick Out
						</button>
					</div>
				)}
			</div>
			<div className='flex flex-col'>
				{friends
					.filter((f) => f.pType === 'ADMIN')
					.map((user) => (
						<MemberLabel
							key={user.userId}
							userId={user.userId}
							fullname={user.user.fullname}
							avater={user.user.avater}
							badge='Admin'
							lastRead={user.lastRead}
							activeMenu={activeMenu === user.userId}
							checked={participants.includes(user.userId)}
							onHandler={() => onActiveMenu(user.userId)}
							onSelectParticipant={onSelectParticipant}
						/>
					))}
				{friends
					.filter((f) => f.pType === 'MOD')
					.map((user) => (
						<MemberLabel
							key={user.userId}
							userId={user.userId}
							fullname={user.user.fullname}
							avater={user.user.avater}
							badge='Mod'
							lastRead={user.lastRead}
							activeMenu={activeMenu === user.userId}
							checked={participants.includes(user.userId)}
							onHandler={() => onActiveMenu(user.userId)}
							onSelectParticipant={onSelectParticipant}
							editable={editable}
						/>
					))}
				{friends
					.filter((f) => f.pType === 'USER')
					.map((user) => (
						<MemberLabel
							key={user.userId}
							userId={user.userId}
							fullname={user.user.fullname}
							avater={user.user.avater}
							lastRead={user.lastRead}
							activeMenu={activeMenu === user.userId}
							checked={participants.includes(user.userId)}
							onHandler={() => onActiveMenu(user.userId)}
							onSelectParticipant={onSelectParticipant}
							editable={editable}
						/>
					))}
			</div>
		</div>
	);
};

export default Members;
