import { snakeCase } from "change-case";

export function serialize() {
	const keys = Object.keys(this.properties);
	return JSON.stringify(keys.reduce((serializedObject, key) => {
		const value = this.properties[key];
		// Why delete the properties? What if the create/update fails?
		// delete this.properties[key];
		serializedObject[snakeCase(key)] = value;
		return serializedObject;
	}, {}));
};
