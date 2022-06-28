import { Box, Button } from "@chakra-ui/react";

type Props = {
	nomOnglet: "Accueil" | "Mes Posts" | "Likes" | null;
	etat: "Accueil" | "Mes Posts" | "Likes" | null;
	setEtat: React.Dispatch<
		React.SetStateAction<"Accueil" | "Mes Posts" | "Likes" | null>
	>;
};

const OngletsNavigation = (Props: Props) => {
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
export default OngletsNavigation;
