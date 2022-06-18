import { useState } from "react";

import { Box } from "@chakra-ui/react";

import Inscription from "../Composants/Inscription";
import Connexion from "../Composants/Connexion";
import OngletsAuthentification from "../Composants/OngletsAuthentification";

export const Authentification = () => {
	const [ongletAffiché, setOngletAffiché] = useState<
		"Connexion" | "Inscription"
	>("Connexion");

	return (
		<Box
			w="80%"
			h="80%"
			background="white"
			borderRadius="3xl"
			overflow="hidden"
		>
			<OngletsAuthentification
				nomOnglet="Inscription"
				etat={ongletAffiché}
				setEtat={setOngletAffiché}
			/>
			<OngletsAuthentification
				nomOnglet="Connexion"
				etat={ongletAffiché}
				setEtat={setOngletAffiché}
			/>

			{ongletAffiché === "Inscription" ? <Inscription /> : <Connexion />}
		</Box>
	);
};

export default Authentification;
