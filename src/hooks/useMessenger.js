import {useState} from 'react';
import moment from 'moment';
import useSocket from './useSocket';

const useMessenger = (username, peer) => {

	const [log, setLog] = useState([]);

	const addToLog = message => setLog([
		...log, 
		{
			...message,
			at: moment(message.at)
		}
	]);

	console.log('peer', peer);

	const socket = useSocket({
		message: message => console.log('MESSAGE', message) || message.from == peer && addToLog(message),
	});

	const sendMessage = content => {

		addToLog({
			content,
			at: moment().toISOString(),
			from: username,
		});

		socket.emit('message', {
			to: peer,
			content,
		});

	};

	return [log, sendMessage]
};

export default useMessenger;