// composants css
import { Box, Button, useColorMode } from "@chakra-ui/react";

type Props = {
	nomOnglet: "Accueil" | "Mes Posts" | "Likes" | null;
	etat: "Accueil" | "Mes Posts" | "Likes" | null;
	setEtat: React.Dispatch<
		React.SetStateAction<"Accueil" | "Mes Posts" | "Likes" | null>
	>;
};

const OngletsNavigation = (Props: Props) => {
	const { nomOnglet, etat, setEtat } = Props;

	const { colorMode } = useColorMode();

	return (
		<Box w="100%">
			{etat === nomOnglet ? (
				<Button
					w="100%"
					h="120%"
					transition="ease-in 0.2s "
					colorScheme={"red"}
					borderBottom="6px solid blue"
					size="md"
					borderBottomColor={
						colorMode === "light" ? "textes.light" : "elements.dark"
					}
					color={colorMode === "light" ? "textes.dark" : "textes.light"}
					onClick={() => setEtat(nomOnglet)}
				>
					{nomOnglet}
				</Button>
			) : (
				<Button w="100%" onClick={() => setEtat(nomOnglet)}>
					{nomOnglet}
				</Button>
			)}
		</Box>
	);
};
export default OngletsNavigation;
