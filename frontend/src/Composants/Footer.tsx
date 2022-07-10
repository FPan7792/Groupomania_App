// composants css
import { Text, useColorModeValue, Flex } from "@chakra-ui/react";

export const Footer = () => {
	// gestion du theme
	const color = useColorModeValue("textes.sombre", "neutre");
	const bgColor = useColorModeValue("neutre", "elements.bleu");

	return (
		<Flex
			bottom={0}
			justify="center"
			mt={{ base: "100px", md: "50px" }}
			p={4}
			w="100%"
			bgColor={bgColor}
		>
			<Text fontSize="sm" color={color} fontWeight="bold">
				Conditions générales d&apos;utilisation
			</Text>
		</Flex>
	);
};
export default Footer;
