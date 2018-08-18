import {snakeCase, } from "change-case";

export function serialize(object) {
	const keys = Object.keys(object);
	return JSON.stringify(keys.reduce((serializedObject, key) => {
		const value = object[key];
		delete object[key];
		serializedObject[snakeCase(key)] = value;
		return serializedObject;
	}, {}));
};
