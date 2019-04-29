<template>
  <footer class="app-footer">
    <nav>
      <ul>
        <li>
          <router-link :to="{name: 'code-of-conduct'}">Code Of Conduct</router-link>
        </li>
        <li>
          <router-link :to="{name: 'privacy-policy'}">Privacy Policy</router-link>
        </li>
        <li>
          <a href="mailto:hello@developdenver.org">Contact</a>
        </li>
      </ul>
      <ul>
        <li>
          <a href="https://twitter.com/dvlpdnvr">Twitter</a>
        </li>
        <li>
          <a href="https://www.instagram.com/dvlpdnvr/">Instagram</a>
        </li>
        <li>
          <a href="https://www.youtube.com/channel/dvlpdnvr">YouTube</a>
        </li>
      </ul>
    </nav>
    <div class="devetry-plug">
      Website maintained by
      <a href="https://devetry.com/">Devetry</a>.
      We simplify the complex world of software.
    </div>
  </footer>
</template>

<script>
export default {
    computed: {
        isLoggedIn() {
            return this.$store.getters['services/user/isLoggedIn'];
        },
        isAttendee() {
            return this.$store.getters['tickets/isAttendee'];
        },
    },
};
</script>

<style lang="scss">
@import '@/styles/_typography.scss';
@import '@/styles/_sizes.scss';
@import '@/styles/_colors.scss';

.app-footer {
}
</style>
