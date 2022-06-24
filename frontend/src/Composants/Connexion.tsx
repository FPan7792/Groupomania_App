import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

// TYPES
import { CONNEXIONUTILISATEUR } from "../types";

// gestion authentification
import Cookies from "js-cookie";

// css
import { FormLabel, Input, Stack, Button } from "@chakra-ui/react";

// gestion des formulaires
import { useForm } from "react-hook-form";
import { activeNotif } from "../Fonctions";

const Connexion = () => {
	const { estConnecte, setEstConnecte } = useContext(AuthContext);

	const { register, handleSubmit } = useForm();

	const onSubmit = async (datas: any) => {
		console.log(datas);

		const { email, password } = datas;
		const infosUtilisateur = new FormData();

		infosUtilisateur.append("email", email);
		infosUtilisateur.append("password", password);
		await fetch("http://localhost:3003/auth/login", {
			method: "POST",
			body: infosUtilisateur,
		})
			.then((response) => response.json())
			.then(async (datas: CONNEXIONUTILISATEUR) => {
				console.log("DATAS", datas);
				const { token, userId } = datas;
				if (token) {
					Cookies.set("token", token, { expires: 24 });
					Cookies.set("userId", userId.toString(), { expires: 24 });

					if (Cookies.get("token")) {
						console.log("TOKEN", Cookies.get("token"));
						console.log("ID", Cookies.get("userId"));

						setEstConnecte({
							connexion: true,
							token: Cookies.get("token") || null,
							userId: Cookies.get("userId") || null,
						});

						// console.log(estConnecte);
					}
				}
			})
			.catch((err) => {
				console.log(err);
				return err;
			})
			.finally(() => {
				console.log("COOKIE SETTED : " + Cookies.get("token"));
				Cookies.get("token") && Cookies.get("userId")
					? activeNotif("Vous êtes maintenant connecté", true)
					: activeNotif("Un problème est survenue", false);
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
