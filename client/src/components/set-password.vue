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
            @blur="checkPasswords"
            @change="updatePassword"
        />
        <label for="confirmPassword">Confirm Password</label>
        <input ref="confirmPassword"
            type="password"
            required
            id="confirmPassword"
            v-model="confirmPassword"
            @blur="checkPasswords"
            @change="updatePassword"
        />
    </div>
</template>

<script>
import { hashPassword } from "../utilities/auth";

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
			if (this.isValidPassword) {
				this.$store.dispatch("services/loading/pushLoading");
				const hashedPassword = await this.hashPassword(this.password);
				this.$emit("updatePassword", hashedPassword);
				this.$store.dispatch("services/loading/popLoading");
			}
		},
		hashPassword,
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
