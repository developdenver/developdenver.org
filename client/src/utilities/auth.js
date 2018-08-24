import bcrypt from "bcryptjs";
const salt = process.env.VUE_APP_CLIENT_SALT;

export async function hashPassword(password) {
	// Prevents server from receiving unencrypted password
	// Server should still hash with unique salts
	return bcrypt.hash(password, salt);
}
