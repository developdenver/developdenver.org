<template>
  <section class="register">
    <h2>Register</h2>
    <edit-profile
      buttonLabel="Register"
      :isNewProfile="true"
      :profile="profile"
      @updateProfile="updateProfile"
    />
  </section>
</template>

<script>
import EditProfile from '../components/edit-profile';
import Profile from '../models/profile';

export default {
    data() {
        return {
            profile: new Profile({}),
        };
    },
    components: {
        EditProfile,
    },
    methods: {
        async updateProfile(profile) {
            await this.$store.dispatch('profiles/createProfile', profile);
            const next = this.$route.query.redirect || { name: 'tickets' };
            this.$router.push(next);
        },
    },
};
</script>

<style lang="scss">
@import '@/styles/_sizes.scss';
@import '@/styles/_typography.scss';

.register {
    display: flex;
    flex-flow: column nowrap;
    flex-grow: 1;
    max-width: $max-line-length;
    margin-bottom: $large;
    padding: $baseline;
    h2 {
        @include tertiary-header-font;
        margin-bottom: $baseline;
    }
}
</style>
