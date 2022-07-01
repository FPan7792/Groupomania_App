// theme.ts

// 1. import `extendTheme` function
import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

// 2. Add your color mode config
const config: ThemeConfig = {
	initialColorMode: "light",
	useSystemColorMode: false,
};

// 3. extend the theme
const theme = extendTheme({
	colors: {
		textes: {
			sombre: "#4E5166",
			white: "whitesmoke",
		},
		elements: {
			rouge: "#FD2D01",
			rose: "#FFD7D7",
			bleu: "#4E5166",
		},
		fond: {
			light: "whitesmoke",
			dark: "rgb(20, 24, 48)",
			elements: "rgb(20, 24, 33)",
		},
		primaire: "#FD2D01",
		secondaire: "#FFD7D7",
		tertiaire: "#4E5166",
		neutre: "whitesmoke",
	},
	config,
});

export default theme;
