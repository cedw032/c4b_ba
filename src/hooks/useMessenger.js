import {useState} from 'react';
import moment from 'moment';
import useSocket from './useSocket';

const useMessenger = (username, to) => {

	const [log, setLog] = useState([]);

	const addToLog = message => setLog([
		...log, 
		{
			at: moment(message.at),
			...message,
		}
	]);

	const socket = useSocket({
		message: message => message.from === to && addToLog(message),
	});

	const sendMessage = content => {

		addToLog({
			content,
			at: moment(),
			from: username,
		});

		socket.emit('message', {
			to,
			content,
		});

	};

	return [log, sendMessage]
};

export default useMessenger;