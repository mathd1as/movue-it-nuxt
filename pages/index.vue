<template>
	<section class="flex flex-col lg:flex-row flex-1 lg:flex-none lg:mt-16 sm:gap-x-10 md:gap-x-20">
		<div class="flex flex-col w-full lg:w-1/2">
			<Profile />
			<CompletedChallenges />
			<Countdown @completed="getNewChallenge"/>
			<button
				v-if="hasCountdownCompleted"
				disabled
				class="button completed"
			>
				Cycle completed
			</button>

			<button
				v-else-if="isCountdownActive"
				class="button abandon"
				@click="setCountdownState(false)"
			>
				Abandon cycle
			</button>

			<button
				v-else
				class="button start"
				@click="setCountdownState(true)"
			>
				Start a cycle</button>
		</div>
		<Card id="challenge" class="w-full lg:w-1/2" />
	</section>
</template>

<script lang="ts">
import Vue from "vue"
import { mapState, mapMutations, mapGetters } from 'vuex'
import { Mutations as ChallengesMT } from '~/store/Challenges/types'
import { Mutations as CountdownMT } from '~/store/Countdown/types'
import Countdown from '~/components/molecules/Countdown.vue'
import Card from '~/components/organisms/Card.vue'


import CompletedChallenges from '~/components/atoms/CompletedChallenges.vue'
import Profile from '~/components/molecules/Profile.vue'

import {
	scrollToElement,
	getRandomNumber,
	playAudio,
	sendNotification,
} from '~/utils';

interface Head {
	title: string;
}

export default Vue.extend({
	head(): Head {
		return {
			title: 'Home | movue.it',
		}
	},
	components: {
		CompletedChallenges,
		Countdown,
		Profile,
		Card,
	},
	mounted ()  {
		if ('Notification' in window) {
			Notification.requestPermission();
		}
	},
	computed: {
		...mapState('Countdown', {
			hasCountdownCompleted: 'hasCompleted',
			isCountdownActive: 'isActive',
		}),
		...mapGetters('Challenges', ['challengesLength']),
	},
	methods: {
		...mapMutations({
			setCountdownHasCompleted: `Countdown/${CountdownMT.SET_HAS_COMPLETED }`,
			setCountdownHasIsActive: `Countdown/${CountdownMT.SET_IS_ACTIVE }`,
			setCurrentChallengesIndex: `Challenges/${ChallengesMT.SET_CURRENT_CHALLENGE_INDEX }`,
		}),
		setCountdownState (flag: boolean) {
			this.setCountdownHasCompleted(false);
			this.setCountdownHasIsActive(flag);
		},
		getNewChallenge () {
			const index = getRandomNumber(0, this.challengesLength);
			this.setCountdownHasCompleted(true);
			this.setCurrentChallengesIndex(index);

			if (Notification?.permission === 'granted') {
				playAudio('/notification.mp3');
				sendNotification('New Challenge', {
					body: 'A new Challenge has started! Go completed it!',
					icon: '/favicon.png'
				});
			}
			this.$nextTick(() => {
				scrollToElement('#challenge');
			})
		}
	},
});
</script>
