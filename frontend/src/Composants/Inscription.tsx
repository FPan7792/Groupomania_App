import { FormControl, Input, Stack, Text, Button } from "@chakra-ui/react";

export const Inscription = () => {
	return (
		<FormControl>
			<Stack>
				<Text>Email</Text>
				<Input size="md" w="md" id="email" type="email" />
				<Text>Password</Text>
				<Input size="md" w="md" id="password" type="password" />
				<Button size="md" w="xs">
					S&apos;enregistrer
				</Button>
			</Stack>
		</FormControl>
	);
};

export default Inscription;
