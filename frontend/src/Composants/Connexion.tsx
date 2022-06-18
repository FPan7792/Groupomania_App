import { FormControl, Input, Stack, Text, Button } from "@chakra-ui/react";

export const Connexion = () => {
	return (
		<FormControl>
			<Stack>
				<Text>Email</Text>
				<Input size="md" w="md" id="email" type="email" />
				<Text>Password</Text>
				<Input size="md" w="md" id="password" type="password" />
				<Button size="md" w="xs">
					Se connecter
				</Button>
			</Stack>
		</FormControl>
	);
};

export default Connexion;
