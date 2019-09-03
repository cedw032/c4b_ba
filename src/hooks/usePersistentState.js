import {useState, useEffect, useRef} from 'react';
import debounce from '../utils/debounce';

const usePersistentState  = (key, initialState) => {

	const [state, setState] = useState(initialState);

	useEffect(() => {
		try {
			const previousState = JSON.parse(localStorage.getItem(key))
			if (previousState) setState(previousState);
		} catch (error) {console.error(error)}
	}, []);


	const stateRef = useRef();
	stateRef.current = state;

	const persist = () => {
		localStorage.setItem(key, JSON.stringify(stateRef.current));
	}

	debounce(
		key,
		persist,
		3000
	);

	useEffect(() => {
		return persist;
	}, []);

	return [
		state,
		setState
	];

};

export default usePersistentState;