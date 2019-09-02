import React, {useState} from 'react';
import cx from 'classnames';
import useMessenger from '../hooks/useMessenger';

const ChatBox = ({username, endClient}) => {

	const [log, sendMessage] = useMessenger(username, endClient);

	const [input, setInput] = useState('');

	const getMessageClassname = (message) => cx(
		'message',
		message.from === username && 'self',
		message.from !== username && 'peer',
	);

	return (
		<div className='panel'>
			<div>
			username: {username}
			</div>
			<div className='panel message-box'>
				{log.map(message => 
					<div className={getMessageClassname(message)}>
						<span>{message.at.format('h:mma')} - </span>
						<span>{message.from}: </span>
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

export default ChatBox;