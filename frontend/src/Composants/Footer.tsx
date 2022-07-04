import { Text, useColorModeValue, Flex } from "@chakra-ui/react";

export const Footer = () => {
	const color = useColorModeValue("textes.sombre", "neutre");
	const bgColor = useColorModeValue("neutre", "elements.bleu");

	return (
		<Flex justify="center" mt="50px" p={2} w="100%" bgColor={bgColor}>
			<Text fontSize="sm" color={color}>
				Conditions d&apos;utilisation
			</Text>
		</Flex>
	);
};
export default Footer;
