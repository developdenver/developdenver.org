<template>
  <section class="login">
	<countdown />
    <h2>Login to Develop Denver</h2>
    <form @submit.prevent="login">
      <input
        type="text"
        id="email"
        name="email"
        placeholder="Email"
        v-model="email"
      >
      <input type="password" id="password" name="password" placeholder="Password" v-model="password">
      <input type="submit" value="Login">
    </form>
    <p v-if="error" class="error">{{error}}</p>
	<div class="alternatives">
		<div class="alternative">
		  <router-link :to="{name: 'request-reset'}">Forgot your password?</router-link>
		</div>
		<div class="alternative">
		  <router-link :to="{name: 'register'}">Register</router-link>
		</div>
	</div>
  </section>
</template>

<script>
import Countdown from "@/components/count-down";

export default {
	components: {
		Countdown,
	},
    data() {
        return {
            email: '',
            password: '',
            error: '',
        };
    },
    computed: {
        isAttendee() {
            return this.$store.getters['tickets/isAttendee'];
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
	@include grid;
	@media (max-width: $small-breakpoint) {
		padding: $baseline;
	}
	form, .error, .alternatives {
		@include grid-form;
	}
	.alternative {
		margin-bottom: $baseline;
	}
	input, button {
		width: 100%;
	}
	[type=submit] {
		@include call-to-action;
		padding: 0;
	}
	a:hover {
		color: $accent-color;
	}
	.countdown {
		@include grid-countdown;
		@media (max-width: $small-breakpoint) {
			display: none;
		}
	}
}
</style>
