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
import EditionPost from "./Composants/EditionPost";

// notification UX
import { Notyf } from "notyf";
export function activeNotif(message: string, success: boolean) {
	const notyf = new Notyf({
		duration: 4000,
		position: {
			x: "right",
			y: "bottom",
		},
		types: [
			// {
			// 	type: "warning",
			// 	background: "orange",
			// 	icon: {
			// 		className: "material-icons",
			// 		tagName: "i",
			// 		text: "warning",
			// 	},
			// },
			// {
			// 	type: "error",
			// 	background: "indianred",
			// 	duration: 2000,
			// 	dismissible: true,
			// },
			// {
			// 	type: "success",
			// 	background: "lightpink",
			// 	duration: 2000,
			// 	dismissible: true,
			// },
		],
	});

	if (success) {
		notyf.success(message);
	} else notyf.error(message);
}

function App() {
	const [estConnecte, setEstConnecte] = useState<{
		connexion: boolean;
		token: string | null;
		userId: string | number | null;
	}>({
		connexion: Cookies.get("token") && Cookies.get("userId") ? true : false,
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
							<Route path="/post/:id" element={<EditionPost />} />
						</Routes>
					)}
				</Flex>
			</AuthContext.Provider>
		</ChakraProvider>
	);
}

export default App;
