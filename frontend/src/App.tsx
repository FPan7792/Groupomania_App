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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

// gestion de la navigation et des pages
import { Routes, Route } from "react-router-dom";

// pages
import Authentification from "./Pages/Authentification";
import PagePrincipale from "./Pages/PagePrincipale";
import EditionPost from "./Composants/EditionPost";
import Header from "./Composants/Header";
import Footer from "./Composants/Footer";

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

	// gestion du theme
	const { colorMode, toggleColorMode } = useColorMode();
	const color = useColorModeValue("textes.light", "textes.dark");
	const bgColor = useColorModeValue("fond.light", "fond.dark");
	const couleurIcone = useColorModeValue("elements.bleu", "neutre");
	const couleurIconeFlottante = useColorModeValue("primaire", "neutre");

	console.log(estConnecte);

	return (
		<AuthContext.Provider value={gestionDeConnexion}>
			<Flex
				bgColor={bgColor}
				color={color}
				minH="100vh"
				align={{ base: "center", md: "center" }}
				justifyContent={{
					base: "inherit",
					md: !estConnecte.connexion ? "center" : "none",
				}}
				flexDirection="column"
				pos="relative"
			>
				<Flex
					justify="center"
					mt={2}
					mb={!estConnecte.connexion ? 10 : 0}
					w={!estConnecte.connexion ? "80%" : "95%"}
				>
					<Button
						pos="fixed"
						zIndex={1}
						top={5}
						colorScheme={color}
						size={{ base: "sm", md: "sm" }}
						bgColor={couleurIconeFlottante}
						onClick={() => {
							toggleColorMode();
						}}
					>
						<FontAwesomeIcon
							icon={colorMode === "light" ? faMoon : faSun}
							color={couleurIcone}
						/>
					</Button>
				</Flex>
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
				<Footer />
			</Flex>
		</AuthContext.Provider>
	);
}

export default App;
