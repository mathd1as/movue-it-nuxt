import { state as originalState, getters, mutations } from './index';
import { Mutations } from './types';

describe('Store:Countdown:index', () => {
	let state;

	beforeEach(() => {
		state = {
			time: 600,
			isActive: false,
			hasCompleted: false,
		};
	});

	describe('State', () => {
		it('shold have an initial state', () => {
			expect(originalState()).toMatchObject({
				time: 25 * 60,
				isActive: false,
				hasCompleted: false
			});
		});
	});

	describe('Getters', () => {
		it ('minutes', () => {
			const minutes = getters.minutes(state);

			expect(minutes).toBe(10);
		});

		it ('seconds', () => {
			const seconds = getters.seconds(state);

			expect(seconds).toBe(0);
		});

		it ('Mutations', () => {
			const seconds = getters.seconds(state);

			expect(seconds).toBe(0);
		});
	});
});

