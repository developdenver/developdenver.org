<template>
  <section class="call-to-registration">
    <div class="call-to-action">
      <span
        class="slogan"
      >We're back for 2 days of talks, workshops, and celebrations in RiNo on August 15th and 16th!</span>
      <router-link class="button" :to="{ name: joinUsLink }">Join Us</router-link>
    </div>
  </section>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    computed: {
        ...mapGetters({
            isLoggedIn: 'services/user/isLoggedIn',
        }),
        joinUsLink() {
            return this.isLoggedIn ? 'tickets' : 'register';
        },
    },
};
</script>

<style scoped lang="scss">
@import '@/styles/_typography.scss';
@import '@/styles/_general.scss';
@import '@/styles/_sizes.scss';

.call-to-registration {
	.button {
		@include call-to-action;
	}
	.slogan {
		@include primary-header-font;
	}
}
</style>
