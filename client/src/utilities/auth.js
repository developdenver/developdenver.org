import bcrypt from "bcryptjs";

export async function hashPassword(password) {
	// Prevents server from receiving unencrypted password
	// Server should still hash with unique salts
	return bcrypt.hash(password, 8);
}
