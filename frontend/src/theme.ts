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
			light: "#4E5166",
			dark: "whitesmoke",
		},
		elements: {
			light: "#FD2D01",
			dark: "#FFD7D7",
		},
		fond: {
			light: "whitesmoke",
			dark: "#4E5166",
		},
	},

	config,
});

export default theme;
