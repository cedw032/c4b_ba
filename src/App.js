import React, {useState} from 'react';

import useSocket from './hooks/useSocket';
import PeerDisplay from './components/PeerDisplay'

import './App.css';

import debounce from './utils/debounce';

function App() {

	const [id, setId] = useState(-1);
	const [peers, setPeers] = useState([]);
	const [username, setUsername] = useState('');

	const socket = useSocket({
		id: setId,
		peers: setPeers,
	});

	const onUsernameChange = ({target: {value}}) => {
		setUsername(value);
		debounce(
			'emit username', 
			() => socket.emit('username', value), 
			1000
		);
	}

	const thisPeer = peers.find(peer => peer.id === id);
	const otherPeers = peers.filter(peer => peer.id !== id);

	return (
		<div className='app'>
			<div className='panel'>
				username: 
				<input 
					value={username}
					onChange={onUsernameChange}/>
			</div>
			{otherPeers.map(peer => 
				<PeerDisplay
					key={peer.id}
					self={thisPeer}
					peer={peer}/>
			)}
		</div>
	);
}

export default App;
