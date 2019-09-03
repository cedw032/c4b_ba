import {useRef} from 'react';
import moment from 'moment';
import useSocket from './useSocket';
import usePersistentState from './usePersistentState';

const useMessenger = (username, peer) => {

	const [log, setLog] = usePersistentState(
		`messenger-log-${username}-${peer}`, 
		[]
	);

	const logRef = useRef();
	logRef.current = log;

	const addToLog = message => setLog([
		...logRef.current, 
		message,
	]);

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