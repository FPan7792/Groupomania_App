import { useState } from "react";

// gestion de connexion utilisateur
// context authentification utilisateur
import { AuthContext } from "./Context/AuthContext";
import Cookies from "js-cookie";

// gestion des css components
import { ChakraProvider, Flex } from "@chakra-ui/react";

// gestion de la navigation et des pages
import { Routes, Route } from "react-router-dom";

// pages
import Authentification from "./Pages/Authentification";
import PagePrincipale from "./Pages/PagePrincipale";

function App() {
	const [estConnecte, setEstConnecte] = useState<{
		connexion: boolean;
		token: string | null;
		userId: string | number | null;
	}>({
		connexion: Cookies.get("token") && Cookies.get("userid") ? true : false,
		token: Cookies.get("token") || null,
		userId: Cookies.get("userId") || null,
	});

	const gestionDeConnexion = {
		estConnecte,
		setEstConnecte,
	};

	return (
		<ChakraProvider>
			<AuthContext.Provider value={gestionDeConnexion}>
				<Flex
					bgColor="#F5F5F5"
					height="100vh"
					justify="center"
					align="center"
				>
					{!estConnecte.connexion ? (
						<Routes>
							<Route path="/" element={<Authentification />} />
						</Routes>
					) : (
						<Routes>
							<Route path="/" element={<PagePrincipale />} />
						</Routes>
					)}
				</Flex>
			</AuthContext.Provider>
		</ChakraProvider>
	);
}

export default App;

// si le useToken est present , on montre l'application sinon seules
// les pages de connexion et de signup sont dispos
