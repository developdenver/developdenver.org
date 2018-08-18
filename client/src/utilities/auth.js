import bcrypt from "bcryptjs";

export async function hashPassword(password) {
	// Prevents server from receiving unencrypted password
	// Server should still hash with unique salts
	return bcrypt.hash(password, process.env.VUE_APP_PASSWORD_SALT);
}
