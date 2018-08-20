<template>
    <div class="set-password">
        <label for="password">Password</label>
        <input
            ref="password"
            type="password"
            required
            id="password"
            pattern=".{7,}"
            title="At least 7 characters"
            name="password"
            v-model="password"
            @input="updatePassword"
        />
        <label for="confirmPassword">Confirm Password</label>
        <input ref="confirmPassword"
            type="password"
            required
            id="confirmPassword"
            v-model="confirmPassword"
            @input="updatePassword"
        />
    </div>
</template>

<script>
export default {
	data() {
		return {
			password: "",
			confirmPassword: "",
		};
	},
	computed: {
		isValidPassword() {
			return this.password &&
                this.confirmPassword &&
                this.password === this.confirmPassword;
		},
	},
	methods: {
		async updatePassword() {
			this.checkPasswords();
			if (this.isValidPassword) {
				this.$emit("updatePassword", this.password);
			}
		},
		checkPasswords() {
			if (!this.isValidPassword) {
				this.$refs.password.setCustomValidity("Passwords don't match");
				this.$refs.confirmPassword.setCustomValidity("Passwords don't match");
			} else {
				this.$refs.password.setCustomValidity("");
				this.$refs.confirmPassword.setCustomValidity("");
			}
		},
	},
};
</script>
