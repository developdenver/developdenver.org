<template>
  <section class="talk-page">
    <div class="talk-info-wrapper">
      <talk-info :talk="currentTalk"/>
    </div>
    <!--
		<button
			:class="{voted: voteType === 'Unvote'}"
			:disabled="isLoading"
			v-if="!isCurrentUserTalk && isAttendee"
			@click="updateVote"
			>{{voteType}}
		</button>
    -->
  </section>
</template>

<script>
import TalkInfo from '@/components/talk-info.vue';

export default {
    components: {
        TalkInfo,
    },
    mounted() {
        this.$store.dispatch('talks/fetchTalks');
    },
    computed: {
        isLoading() {
            return this.$store.getters['services/loading/isLoading'];
        },
        /*
		voteType() {
			if (this.$store.getters["talks/votedTalksById"][this.$route.params.id]) {
				return "Unvote";
			} else {
				return "Vote";
			}
		},
		isAttendee() {
			return this.$store.getters["tickets/isAttendee"];
		},
		*/
        currentUser() {
            return this.$store.getters['services/user/currentProfile'];
        },
        isCurrentUserTalk() {
            return this.currentUser
                ? +this.currentTalk.properties.userId === +this.currentUser.id
                : false;
        },
        currentTalk() {
            return this.$store.getters['talks/getTalkById'](
                Number(this.$route.params.id),
            );
        },
    },
    methods: {
        /*
		async updateVote() {
			if (this.voteType === "Vote") {
				await this.$store.dispatch("talks/vote", this.currentTalk);
			} else {
				await this.$store.dispatch("talks/unvote", this.currentTalk);
			}
			await this.$store.dispatch("talks/fetchAllVotes");
		}
		*/
    },
};
</script>

<style lang="scss">
@import '@/styles/_general.scss';
@import '@/styles/_sizes.scss';
@import '@/styles/_colors.scss';

</style>
