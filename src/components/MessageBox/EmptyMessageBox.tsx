import React, { useEffect, useState } from 'react';
import MessageList from './MessageList';
import BodyLayout from '../Layouts/BodyLayout';

const EmptyMessageBox = () => {
	return (
		<BodyLayout>
			<div className='grid place-content-center min-h-screen select-none'>
				<h1 className='text-4xl text-center text-indigo-300 font-bold tracking-wide'>
					ChatMe
				</h1>
				<p className='m-auto w-2/3 mt-5 text-center tracking-wider text-indigo-300'>
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa
					molestiae necessitatibus pariatur perspiciatis quas enim odit
					adipisci, sunt eius iure.
				</p>
			</div>
		</BodyLayout>
	);
};

export default EmptyMessageBox;
