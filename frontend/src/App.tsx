// gestion des css components
import { ChakraProvider } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";

// gestion de la navigation et des pages
import { Routes, Route } from "react-router-dom";

// pages
import Authentification from "./Pages/Authentification";

function App() {
	return (
		<ChakraProvider>
			<Flex bgColor="#F5F5F5" height="100vh" justify="center" align="center">
				<Routes>
					<Route path="/" element={<Authentification />} />
				</Routes>
			</Flex>
		</ChakraProvider>
	);
}

export default App;

// si le useToken est present , on montre l'application sinon seules
// les pages de connexion et de signup sont dispos
