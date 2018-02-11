//TODO: delete unnecessary stuff
var possibleCollectibleColors = {
	blue: {
		points: 1,
		color: "rgba(0, 0, 255, 1)"
	},
	red: {
		points: 2,
		color: "rgba(255, 0, 0, 1)"
	},
	yellow: {
		points: 3,
		color: "rgba(255, 255, 0, 1)"
	},
	purple: {
		points: 4,
		color: "rgba(100, 0, 255, 1)"
	},
	green: {
		points: 5,
		color: "rgba(0, 255, 0, 1)"
	},
	pink: {
		points: 6,
		color: "rgba(255, 51, 204, 1)"
	},	
	black: {
		points: 6,
		color: "rgba(255, 51, 204, 1)"
	},
	gray_red_linear: {
		points: 50,
		type: "advanced",
		color: function(_params) {
			let colorsToAdd = {
				gray: 1,
				red: 0.5,
			};
			_params.type = "linear";
			
			return createMultipleSolidAt(_params, colorsToAdd);
		}
	},
	gray_red_radial: {
		points: 50,
		type: "advanced",
		color: function(_params) {
			let colorsToAdd = {
				gray: 1,
				red: 0.5,
			};
			
			return createMultipleSolidAt(_params, colorsToAdd);
		}
	},
	multipleSolidsExample: {
		points: 50,
		type: "advanced",
		color: function(_params) {
			let colorsToAdd = {
				//needs to be descending numbers for multiple solids
				//because of overlapping circles
				yellow: 1,
				gray: 0.666,
				pink: 0.333,
			};
			
			return createMultipleSolidAt(_params, colorsToAdd);
		}
	},
	gradientExample: {
		points: 50,
		type: "advanced",
		color: function(_params) {
			let colorsToAdd = {
				pink: 0,
				gray: 0.5,
				yellow: 1,
			};
			
			return createGradiantAt(_params, colorsToAdd);
		}
	}
};