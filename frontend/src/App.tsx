import { useState } from "react";

// gestion de connexion utilisateur
// context authentification utilisateur
import { AuthContext } from "./Context/AuthContext";
import Cookies from "js-cookie";

// gestion des css components & icones
import { ChakraProvider, Flex } from "@chakra-ui/react";

// gestion de la navigation et des pages
import { Routes, Route } from "react-router-dom";

// pages
import Authentification from "./Pages/Authentification";
import PagePrincipale from "./Pages/PagePrincipale";
import EditionPost from "./Composants/EditionPost";
import Header from "./Composants/Header";

function App() {
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

	return (
		<ChakraProvider>
			<AuthContext.Provider value={gestionDeConnexion}>
				<Flex
					bgColor="#F5F5F5"
					height="100%"
					align="center"
					justifyContent={!estConnecte.connexion ? "center" : "none"}
					flexDirection="column"
					pos="relative"
				>
					{estConnecte.connexion && (
						<Header setEstConnecte={setEstConnecte} />
					)}
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
