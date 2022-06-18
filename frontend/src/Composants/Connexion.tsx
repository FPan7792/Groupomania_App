import { FormLabel, Input, Stack, Button } from "@chakra-ui/react";

import { useForm } from "react-hook-form";

export const Connexion = () => {
	const { register, handleSubmit } = useForm();
	const onSubmit = async (datas: any) => {
		console.log(datas);

		const { email, password } = datas;
		const infosUtilisateur = new FormData();

		infosUtilisateur.append("email", email);
		infosUtilisateur.append("password", password);
		await fetch("http://localhost:3003/auth/signup", {
			method: "POST",
			body: infosUtilisateur,
		})
			.then((response) => response.json())
			.then((datas) => {
				console.log("DATAS", datas);
			})
			.catch((err) => {
				console.log(err);
				return err;
			});
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Stack>
				<FormLabel>Email</FormLabel>
				<Input
					size="md"
					w="md"
					id="email"
					type="email"
					{...register("email")}
				/>
				<FormLabel>Password</FormLabel>
				<Input
					size="md"
					w="md"
					id="password"
					type="password"
					{...register("password")}
				/>
				<Button size="md" w="xs" type="submit">
					Se connecter
				</Button>
			</Stack>
		</form>
	);
};

export default Connexion;
