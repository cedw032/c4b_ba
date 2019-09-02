import {useState, useRef} from 'react';
import moment from 'moment';
import useSocket from './useSocket';

const useMessenger = (username, peer) => {

	const [log, setLog] = useState([]);
	const logRef = useRef();
	logRef.current = log;

	const addToLog = message => setLog([
		...logRef.current, 
		{
			...message,
			at: moment(message.at)
		}
	]);

	console.log('peer', peer);

	const socket = useSocket({
		message: message => (message.from == peer && addToLog(message)),
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