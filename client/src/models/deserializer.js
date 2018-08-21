import { camelCase } from "change-case";

export function deserialize(object) {
	const normalizedObject = typeof object !== "object" ? JSON.parse(object) : object;
	const keys = Object.keys(normalizedObject);
	return keys.reduce((deserializedObject, key) => {
		const value = normalizedObject[key];
		delete normalizedObject[key];
		deserializedObject[camelCase(key)] = value;
		return deserializedObject;
	}, {});
};
