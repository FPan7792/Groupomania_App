import { Box, Button } from "@chakra-ui/react";

type Props = {
	nomOnglet: "Connexion" | "Inscription";
	etat: "Connexion" | "Inscription";
	setEtat: React.Dispatch<React.SetStateAction<"Connexion" | "Inscription">>;
};

const OngletsAuthentification = (Props: Props) => {
	const { nomOnglet, etat, setEtat } = Props;

	return (
		<Box w="100%">
			{etat === nomOnglet ? (
				<Button
					w="100%"
					transition="ease-in 0.2s "
					colorScheme="red"
					borderBottom="6px solid blue"
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
