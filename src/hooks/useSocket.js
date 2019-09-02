import {useEffect} from 'react';
import io from 'socket.io-client';

//const socket = io.connect('http://localhost:5000');
const socket = io.connect();

const useSocket = listeners => {
	useEffect(() => {
		Object.entries(listeners).forEach(([name, listener]) => {
			socket.on(name, listener);
		});	

		return () => {
			Object.entries(listeners).forEach(([name, listener]) => {
				socket.removeEventListener(name, listener);
			});	
		};

	}, []);

	return socket;
};

export default useSocket;