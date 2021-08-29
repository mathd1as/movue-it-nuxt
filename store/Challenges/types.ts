import { MutationTree } from "vuex"


export interface XP {
	current: number;
	start: number;
	end: number;
}

export interface Challenge {
	type: string;
	description: string;
	amount: number;
}

export interface State {
	level: number;
	xp: XP;
	completedChallenges: number;
	currentChallengeIndex: number | null;
	isLevelUpModalOpen: boolean;
	allChallenges: Challenge[]
}

export interface Cookie {
	leval: number;
	xp: XP;
	completedChallenges: number;
}

export interface Getters {
	challengesLength: (state: State) => number;
	currentXpPercentage: (state: State) => number;
	currentChallange: (state: State) => number | null;
}

export enum Mutations {
	SET_CURRENT_CHALLANGE_INDEX = 'SET_CURRENT_CHALLANGE_INDEX',
	SET_IS_LEVEL_UP_MODAL_OPEN = 'SET_IS_LEVEL_UP_MODAL_OPEN',
	COMPLETE_CHALLANGE = 'COMPLETE_CHALLANGE',
	SAVE_COOKIE_DATA = 'SAVE_COOKIE_DATA'
}

export type RootState = ReturnType<() => State>
export interface MutationsInterface extends MutationTree<RootState> {
	[Mutations.SET_CURRENT_CHALLANGE_INDEX](s: State, p: number): void;
	[Mutations.SET_IS_LEVEL_UP_MODAL_OPEN](s: State, p: boolean): void;
	[Mutations.COMPLETE_CHALLANGE](s: State, p: number): void;
	[Mutations.SAVE_COOKIE_DATA](s: State, p: Cookie): void;
}
