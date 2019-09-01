import React, {useState} from 'react';
import cx from 'classnames';
import useMessenger from '../hooks/useMessenger';

const PeerDisplay = ({self, peer}) => {

	const [log, sendMessage] = useMessenger(self.id, peer.id);

	const [input, setInput] = useState('');

	const getMessageClassname = message => cx(
		'message',
		message.from === self.id && 'self',
		message.from === peer.id && 'peer',
	);

	const getUsername = message => message.from === self.id
		? self.username
		: peer.username;

	return (
		<div className='panel'>
			<div>
			username: {peer.username}
			</div>
			<div className='panel message-box'>
				{log.map(message => 
					<div className={getMessageClassname(message)}>
						<span>{message.at.format('h:mma')} - </span>
						<span>{getUsername(message)}: </span>
						<span>{message.content}</span>
					</div>
				)}
				<input 
					value={input} 
					onChange={e => setInput(e.target.value)}
					onKeyDown={e => {
						if (e.key === 'Enter') {
							sendMessage(input);
							setInput('');
						}
					}}/>
			</div>
		</div>

		
	);
}

export default PeerDisplay;