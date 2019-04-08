<template>
  <section class="login">
    <h2>Login to Develop Denver</h2>
    <form @submit.prevent="login">
      <label for="email">Email</label>
      <input
        type="text"
        id="email"
        name="email"
        placeholder="hello@developdenver.org"
        v-model="email"
      >
      <label for="password">Password</label>
      <input type="password" id="password" name="password" v-model="password">
      <input type="submit" value="Login">
    </form>
    <p v-if="error" class="error">{{error}}</p>
    <div class="alternatives">
      <router-link :to="{name: 'request-reset'}">Forgot your password?</router-link>
    </div>
    <div class="alternatives">
      <router-link :to="{name: 'register'}">Register</router-link>
    </div>
  </section>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: '',
            error: '',
        };
    },
    computed: {
        isAttendee() {
            return this.$store.getters['services/user/isAttendee'];
        },
    },
    methods: {
        async login() {
            await this.$store
                .dispatch('services/user/login', {
                    email: this.email,
                    password: this.password,
                })
                .then(() => {
                    const next =
                        this.$route.query.redirect ||
                        (this.isAttendee
                            ? { name: 'news' }
                            : { name: 'tickets' });
                    this.$router.push(next);
                })
                .catch(error => {
                    console.error(error.message);
                    this.error = 'Incorrect username or password.';
                });
        },
    },
};
</script>

<style lang="scss">
@import '@/styles/_sizes.scss';
@import '@/styles/_colors.scss';
@import '@/styles/_typography.scss';
@import '@/styles/_general.scss';

.login {
    padding: $baseline;
    margin: $xl 0 $xxxl 0;
    h2 {
        @include tertiary-header-font;
        margin-bottom: $xl;
    }
    input,
    label {
        display: block;
        width: 100%;
    }
    label {
        @include fieldset-header-font;
    }
    input {
        margin-bottom: $baseline;
    }
    [type='submit'] {
        @include call-to-action-button;
    }
    .error {
        color: $warning;
    }
    .alternatives {
        margin-bottom: $large;
    }
}
</style>
