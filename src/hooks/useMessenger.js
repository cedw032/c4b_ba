import {useState} from 'react';
import moment from 'moment';
import useSocket from './useSocket';

const useMessenger = (id, peerId) => {

	const [log, setLog] = useState([]);

	const addToLog = message => setLog([
		...log, 
		{
			...message,
			at: moment(message.at)
		}
	]);

	const socket = useSocket({
		message: message => message.from === peerId && addToLog(message),
	});

	const sendMessage = content => {
		
		const message = {
			from: id,
			content,
			at: moment().toISOString(),
		}

		addToLog(message);
		socket.emit('dispatch', {
			type: 'message',
			to: [peerId],
			payload: message,
		})
	};

	return [log, sendMessage]
};

export default useMessenger;