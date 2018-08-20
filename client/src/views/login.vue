<template>
    <section class="login">
        <h2>Login to Develop Denver</h2>
        <form @submit.prevent="login">
            <label for="email">Email</label>
            <input type="text" id="email" name="email" v-model="email" />
            <label for="password">Password</label>
            <input type="password" id="password" name="password" v-model="password" />
            <input type="submit" value="Login" />
        </form>
        <p v-if="error" class="error">{{error}}</p>
    </section>
</template>

<script>
export default {
	data() {
		return {
			email: "",
			password: "",
			error: "",
		};
	},
	computed: {
		isAttendee(){
			return this.$store.getters["services/user/isAttendee"];
		},
	},
	methods: {
		async login() {
			try {
				await this.$store.dispatch("services/user/login", {
					email: this.email,
					password: this.password,
				});
				this.isAttendee
					? this.$router.push({name: "news"})
					: this.$router.push({name: "tickets"});
			} catch (error) {
				console.error(error.message)
				this.error = "Incorrect username or password.";
			}
		},
	},
};
</script>

<style lang="scss">
@import "@/styles/_sizes.scss";
@import "@/styles/_colors.scss";
@import "@/styles/_typography.scss";

.login {
    margin: $xxxl 0;
    h2 {
        @include tertiary-header-font;
        margin-bottom: $xl;
    }
    input, label {
        display: block;
        width: 100%;
    }
    label {
        @include fieldset-header-font;
    }
    input {
        margin-bottom: $baseline;
    }
    [type="submit"] {
        background-color: $primary-color;
        color: $pure-white;
        border: none;
        padding: $large;
        @include call-to-action-font;
    }
    .error {
        color: $warning;
    }
}
</style>
