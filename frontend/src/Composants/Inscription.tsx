import { FormLabel, Input, Stack, Button } from "@chakra-ui/react";

// types
import { CREATIONUTILISATEUR } from "../types";
type Props = {
	setEtat: React.Dispatch<React.SetStateAction<"Connexion" | "Inscription">>;
};

// gestion fomulaire
import { useForm } from "react-hook-form";

export const Inscription = (Props: Props) => {
	const { register, handleSubmit } = useForm();

	const { setEtat } = Props;

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
			.then((datas: CREATIONUTILISATEUR) => {
				console.log("DATAS", datas);

				if (datas.response === "NOUVEL UTILISATEUR ENREGISTRE") {
					console.log(datas.response);
					setEtat("Connexion");
				}
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
					S&apos;enregistrer
				</Button>
			</Stack>
		</form>
	);
};

export default Inscription;
