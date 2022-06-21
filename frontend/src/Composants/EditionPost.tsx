// composants css
import {
	Button,
	Box,
	Text,
	Flex,
	Input,
	FormLabel,
	Stack,
} from "@chakra-ui/react";

// gestion du formulaire
import { useForm } from "react-hook-form";

export const EditionPost = () => {
	return (
		<Box>
			<Text align="center">Edition de post</Text>

			<form onSubmit={() => console.log("submit")}>
				<Stack>
					<FormLabel>Titre</FormLabel>
					<Input w="xs" />
					<FormLabel>Contenu</FormLabel>
					<Input w="2xl" h="xs" />
				</Stack>
				<Button>Publier</Button>
				<Button>Modifier</Button>
			</form>
		</Box>
	);
};
export default EditionPost;

// modifier la page suivant le context si creation ou modification
