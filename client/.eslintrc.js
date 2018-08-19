module.exports = {
	root: true,
	env: {
		node: true,
	},
	"extends": [
		"plugin:vue/essential",
		"@vue/standard",
	],
	rules: {
		"no-console": process.env.NODE_ENV === "production" ? "error" : "off",
		"no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
		indent: ["error", "tab"],
		quotes: ["error", "double"],
		"space-before-function-paren": ["error", "never"],
		"comma-dangle": ["error", "only-multiline"],
		"space-before-blocks": ["error", "always"],
		"semi": ["error", "always"],
		"no-tabs": 0,
	},
	parserOptions: {
		parser: "babel-eslint",
	},
};
