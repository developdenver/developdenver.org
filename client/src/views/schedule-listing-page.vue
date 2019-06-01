<template>
  <section class="talk-page">
    <div class="talk-info-wrapper">
      <talk-info :talk="currentTalk"/>
    </div>
    <router-link
      class="edit-talk-link"
      v-if="isCurrentUserTalk"
      :to="{name: 'edit-talk', params: {id: currentTalk.id}}"
    >Edit Talk</router-link>
  </section>
</template>

<script>
import TalkInfo from '@/components/talk-info.vue';

export default {
    components: {
        TalkInfo,
    },
    mounted() {
        this.$store.dispatch('scheduleListings/fetchAll');
    },
    computed: {
        isLoading() {
            return this.$store.getters['services/loading/isLoading'];
        },
        currentUser() {
            return this.$store.getters['services/user/currentProfile'];
        },
        isCurrentUserTalk() {
            return this.currentUser
                ? +this.currentTalk.properties.userId === +this.currentUser.id
                : false;
        },
        currentTalk() {
            return this.$store.getters['scheduleListings/getTalkById'](
                Number(this.$route.params.id),
            );
        },
    },
    methods: {
    },
};
</script>

<style lang="scss">
@import '@/styles/_general.scss';
@import '@/styles/_sizes.scss';
@import '@/styles/_colors.scss';

.talk-page {
}
</style>
