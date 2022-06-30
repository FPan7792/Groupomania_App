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
					// h="120%"
					h={9}
					bgSize="sm"
					transition="ease-in 0.2s "
					colorScheme={"red"}
					borderBottom="5px solid"
					size="sm"
					borderBottomColor={
						colorMode === "light" ? "textes.light" : "elements.dark"
					}
					color={colorMode === "light" ? "textes.dark" : "textes.light"}
					onClick={() => setEtat(nomOnglet)}
				>
					{nomOnglet}
				</Button>
			) : (
				<Button
					w="100%"
					h={8}
					size="sm"
					opacity={0.7}
					onClick={() => setEtat(nomOnglet)}
				>
					{nomOnglet}
				</Button>
			)}
		</Box>
	);
};
export default OngletsNavigation;
