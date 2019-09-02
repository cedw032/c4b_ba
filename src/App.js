import React, {useState} from 'react';

import useSocket from './hooks/useSocket';
import ChatBox from './components/ChatBox'
import LoginBox from './components/LoginBox';

import './App.css';

function App() {

	const [username, setUsername] = useState('');

	const [endClients, setEndClients] = useState([]);
	useSocket({
		endClients: setEndClients,
	});

	if (!username) {
		return (
			<LoginBox onLogin={setUsername}/>
		);
	} 

	return (
		<div className='app'>
			<div className='panel'>
				{endClients.map((endClient, i) => 
					<ChatBox
						key={i}
						username={username}
						endClient={endClient}/>
				)}
			</div>
		</div>
	);
}

export default App;
