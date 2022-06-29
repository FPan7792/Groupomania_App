import { Box, Button, useColorMode } from "@chakra-ui/react";

type Props = {
	nomOnglet: "Connexion" | "Inscription";
	etat: "Connexion" | "Inscription";
	setEtat: React.Dispatch<React.SetStateAction<"Connexion" | "Inscription">>;
};

const OngletsAuthentification = (Props: Props) => {
	const { nomOnglet, etat, setEtat } = Props;

	const { colorMode } = useColorMode();

	return (
		<Box w="100%">
			{etat === nomOnglet ? (
				<Button
					w="100%"
					transition="ease-in 0.2s "
					colorScheme={colorMode === "light" ? "red" : "elements.dark"}
					borderBottom="6px solid "
					borderBottomColor={
						colorMode === "light" ? "textes.light" : "elements.dark"
					}
					color={colorMode === "light" ? "textes.light" : "elements.dark"}
					size="md"
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
export default OngletsAuthentification;
