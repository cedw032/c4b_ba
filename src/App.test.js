import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import provideElevator from './models/elevator';
import {UP, DOWN} from './constants/direction';

const runForTestPeriod = (elevator) => {
	for (let i = 0; i < 10000; ++i) elevator.passTime();
}

const throwIfExpectedDoesNotMatchActual = (expected, actual) => {

	const throwMessage = () => {
		throw `
			${expected} does not match ${actual} 
		`;
	}

	if (expected.length !== actual.length) throwMessage();

	for (let i = 0; i < expected.length; ++i) {
		if (expected[i] !== actual[i]) throwMessage();
	}
}

const testScenario = (passengers, expected) => {

	const elevator = provideElevator(10);		
	const actual = [];

	passengers.forEach(passenger => {
		const direction = passenger.origin < passenger.destination ? UP : DOWN;
		elevator.requestElevator(passenger.origin, direction);
	});

	elevator.on.doorsOpen(floor => {
		actual.push(floor);

		passengers.forEach(passenger => {
			if (passenger.origin === floor && !passenger.collected) {
				passenger.collected = true;
				elevator.addDestination(passenger.destination);
			}
		});
	});

	runForTestPeriod(elevator);
	throwIfExpectedDoesNotMatchActual(expected, actual);
}

test(`Passenger summons lift on the ground floor. Once in chooses to go to level 5.`,
	() => testScenario(
		[
			{origin: 1, destination: 5},
		],
		[1, 5]
	)
);

test(`Passenger summons lift on level 6 to go down. Passenger on level 4 summons 
	the lift to go down. They both choose L1.`,
	() => testScenario(
		[
			{origin: 6, destination: 1},
			{origin: 4, destination: 1},
		],
		[6, 4, 1]
	)
);

test(`Passenger 1 summons lift to go up from L2. Passenger 2 summons lift to go down 
	from L4. Passenger 1 chooses to go to L6. Passenger 2 chooses to go to Ground Floor`,
	() => testScenario(
		[
			{origin: 2, destination: 6},
			{origin: 4, destination: 1},
		],
		[2, 6, 4, 1]
	)
);

test(`Passenger 1 summons lift to go up from Ground. They choose L5. Passenger 2 summons 
	lift to go down from L4. Passenger 3 summons lift to go down from L10. Passengers 2 
	and 3 choose to travel to Ground.`,
	() => testScenario(
		[
			{origin: 1, destination: 5},
			{origin: 4, destination: 1},
			{origin: 10, destination: 1},
		],
		[1, 5, 10, 4, 1]
	)
);


