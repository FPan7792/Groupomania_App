// gestion des css components
import { ChakraProvider } from "@chakra-ui/react";
import { Flex, Spacer } from "@chakra-ui/react";

// gestion de la navigation et des pages
import { Routes, Route, Link } from "react-router-dom";

function App() {
	return (
		<ChakraProvider>
			<Flex bgColor="#F5F5F5" height="100vh">
				<Routes>
					<h1>Hello World</h1>
				</Routes>
			</Flex>
		</ChakraProvider>
	);
}

export default App;

// si le useToken est present , on montre l'application sinon seules
// les pages de connexion et de signup sont dispos
