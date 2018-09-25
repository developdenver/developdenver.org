const manifestJSON = require("./public/manifest.json");

module.exports = {
	pwa: {
		themeColor: manifestJSON.theme_color,
		name: manifestJSON.short_name,
		msTileColor: manifestJSON.background_color,
		workboxPluginMode: "GenerateSW",
		workboxOptions: {
			urlPattern: "/*/",
			handler: "networkFirst",
		},
	},
};
