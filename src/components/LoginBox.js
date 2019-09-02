import React, {useState, useRef} from 'react';
import useSocket from '../hooks/useSocket';
import Button from './Button'

const LoginBox = ({onLogin}) => {

	const [error, setError] = useState();
	const [credentials, setCredentials] = useState({
		username: '',
		password: '',
	});

	const credentialsRef = useRef();
	credentialsRef.current = credentials;

	const socket = useSocket({
		login: (error) => {
			if (!error) { 
				const credentials = credentialsRef.current;
				onLogin(credentials.username);	
				return;
			}

			setError(error);
		}
	});

	const {
		username,
		password,
	} = credentials;

	return (
		<div className='panel'>
			{error &&
				<span className='error'>{error}</span>
			}
			<div className='row'>
				<span>username</span>
				<input 
					value={username} 
					onChange={e => setCredentials({
						username: e.target.value,
						password,
					})}/>
			</div>
			<div className='row'>
				<span>password</span>
				<input 
					value={password} 
					onChange={e => setCredentials({
						username,
						password: e.target.value,
					})}/>
			</div>
			<Button 
				children='Login'
				onClick={() => {
					socket.emit(
						'login',
						{username, password}
					);
				}}/>
		</div>
	); 
}

export default LoginBox;