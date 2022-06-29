import { useState } from "react";

// gestion de connexion utilisateur
// context authentification utilisateur
import { AuthContext } from "./Context/AuthContext";
import Cookies from "js-cookie";

// gestion des css components & icones
import {
	Button,
	Flex,
	useColorMode,
	useColorModeValue,
} from "@chakra-ui/react";

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

	const { toggleColorMode } = useColorMode();
	const color = useColorModeValue("textes.light", "textes.dark");
	const bgColor = useColorModeValue("fond.light", "rgb(20, 24, 33)");

	return (
		<AuthContext.Provider value={gestionDeConnexion}>
			<Flex
				bgColor={bgColor}
				color={color}
				minH="100vh"
				height="100%"
				align="center"
				justifyContent={!estConnecte.connexion ? "center" : "none"}
				flexDirection="column"
				pos="relative"
			>
				<Button
					onClick={() => {
						toggleColorMode();
					}}
				>
					Toggle
				</Button>
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
	);
}

export default App;
