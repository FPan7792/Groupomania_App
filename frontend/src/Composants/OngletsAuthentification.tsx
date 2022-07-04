import { Box, Button, useColorMode, useColorModeValue } from "@chakra-ui/react";

type Props = {
	nomOnglet: "Connexion" | "Inscription";
	etat: "Connexion" | "Inscription";
	setEtat: React.Dispatch<React.SetStateAction<"Connexion" | "Inscription">>;
};

const OngletsAuthentification = (Props: Props) => {
	const { nomOnglet, etat, setEtat } = Props;

	// gestion du theme
	const couleurDesElements = useColorModeValue("primaire", "secondaire");
	const couleurBordureBas = useColorModeValue("elements.bleu", "whitesmoke");
	const couleurDuTexte = useColorModeValue("textes.white", "textes.sombre");

	return (
		<Box w="100%">
			{etat === nomOnglet ? (
				<Button
					w="100%"
					transition="ease-in 0.2s "
					h="120%"
					fontSize="lg"
					colorScheme="red"
					bgColor={couleurDesElements}
					borderBottom="5px solid "
					borderBottomColor={couleurBordureBas}
					color={couleurDuTexte}
					shadow="md"
					fontWeight="bold"
					onClick={() => setEtat(nomOnglet)}
				>
					{nomOnglet}
				</Button>
			) : (
				<Button
					w="100%"
					opacity={0.7}
					shadow="md"
					size="sm"
					fontWeight="bold"
					onClick={() => setEtat(nomOnglet)}
				>
					{nomOnglet}
				</Button>
			)}
		</Box>
	);
};
export default OngletsAuthentification;
