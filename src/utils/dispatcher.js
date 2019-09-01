const provideDispatcher = eventTypes => {

	const listeners = {};

	return eventTypes.reduce((dispatcher, eventType) => {
		listeners[eventType] = [];

		dispatcher.on[eventType] = listener => {
			listeners[eventType].push(listener);

			return () => {
				listeners[eventType] = listeners[eventType].filter(
					current => current !== listener
				);
			};
		};

		dispatcher.dispatch[eventType] = (...params) => {
			listeners[eventType].forEach(listener => listener(...params));
		};

		return dispatcher;

	}, {dispatch: {}, on: {}});

}

export default provideDispatcher;