<template>
  <section class="call-for-talks">
    <div class="talk-call-to-action">
      <p>Interested in speaking at Develop Denver?</p>
      <router-link class="button" :to="ctaTarget">Register and submit a talk!</router-link>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'CallForTalks',
    computed: {
        ...mapGetters({
            isLoggedIn: 'services/user/isLoggedIn',
        }),
        ctaTarget() {
            if (this.isLoggedIn) return { name: 'submit-talk' };
            return { name: 'register', query: { redirect: 'submit-talk' } };
        },
    },
};
</script>

<style lang="scss">
@import '@/styles/_typography.scss';
@import '@/styles/_sizes.scss';
@import '@/styles/_colors.scss';
@import '@/styles/_general.scss';

.call-for-talks {
}
</style>
