import { useMemo, useState } from "react";

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
import EditionPost from "./Composants/EditionPost";

function App() {
	const isAdmin = useMemo;

	const [estConnecte, setEstConnecte] = useState<{
		connexion: boolean;
		token: string | null;
		userId: string | number | null;
		username: string | null;
		isAdmin: boolean | null;
	}>({
		connexion: Cookies.get("token") && Cookies.get("userId") ? true : false,
		token: Cookies.get("token") || null,
		userId: Cookies.get("userId") || null,
		username: Cookies.get("username") || null,
		isAdmin: Cookies.get("admin") === "true" ? true : false || null,
	});

	const gestionDeConnexion = {
		estConnecte,
		setEstConnecte,
	};

	console.log(estConnecte);

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
							<Route path="/post/:id" element={<EditionPost />} />
						</Routes>
					)}
				</Flex>
			</AuthContext.Provider>
		</ChakraProvider>
	);
}

export default App;
