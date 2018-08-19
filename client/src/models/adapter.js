const pluralize = require("pluralize");
const apiUrl = process.env.VUE_APP_API_URL;

export function buildUrl(modelName, id) {
	let url = `${apiUrl}/${pluralize(modelName)}`;
	return id ? `${url}/${id}` : url;
}

export function buildRequest(url, method, body) {
	let options = {
		method,
		accepts: "application/json",
	};
	options = ["POST", "PUT"].includes(method)
		? options.body = body
		: options;
	options = ["POST", "PUT"].includes(method)
		? options["Content-Type"] = "application/json"
		: options;
	return fetch(url, options)
		.then(response => response.json())
		.then(response => response.data);
}
