import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import AppStateProvider from './state/app/AppStateProvider';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<BrowserRouter>
			<AppStateProvider>
				<App />
			</AppStateProvider>
		</BrowserRouter>
	</React.StrictMode>
);
