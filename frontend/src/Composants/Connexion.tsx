import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
// TYPES
import { CONNEXIONUTILISATEUR } from "../types";

type FormInputs = {
	email: string;
	password: string;
};
// gestion authentification
import Cookies from "js-cookie";
// css
import {
	FormLabel,
	Input,
	Button,
	Flex,
	InputGroup,
	InputRightElement,
} from "@chakra-ui/react";
// gestion des formulaires
import { useForm } from "react-hook-form";
import { activeNotif } from "../Fonctions";

const Connexion = () => {
	const { estConnecte, setEstConnecte } = useContext(AuthContext);
	const [showPassword, setShowPassword] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { isSubmitting },
	} = useForm<FormInputs>({
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (datas: FormInputs) => {
		const { email, password } = datas;

		console.log(datas);

		const infosUtilisateur = new FormData();

		infosUtilisateur.append("email", email);
		infosUtilisateur.append("password", password);

		await fetch("http://localhost:3003/auth/login", {
			method: "POST",
			body: infosUtilisateur,
		})
			.then((response) => response.json())
			.then(async (datas: CONNEXIONUTILISATEUR) => {
				const { token, userId, username, is_admin } = datas;

				if (token) {
					Cookies.set("token", token, { expires: 24 });
					Cookies.set("userId", userId.toString(), { expires: 24 });
					Cookies.set("username", username, { expires: 24 });
					Cookies.set("admin", is_admin, { expires: 24 });

					if (Cookies.get("token")) {
						await setEstConnecte({
							connexion: true,
							token: Cookies.get("token") || null,
							userId: Cookies.get("userId") || null,
							username: Cookies.get("username") || null,
							isAdmin: Cookies.get("admin") || null,
						});
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
			<FormLabel transform="translateX(2%)">Email utilisateur :</FormLabel>
			<Input
				size="sm"
				w="100%"
				id="email"
				type="email"
				placeholder="E-mail professionnel"
				disabled={isSubmitting}
				required={true}
				focusBorderColor="crimson"
				{...register("email")}
			/>

			<FormLabel transform="translateX(2%)" marginTop={5}>
				Mot de passe :
			</FormLabel>

			<InputGroup size="sm">
				<Input
					size="sm"
					w="100%"
					id="password"
					placeholder="Code confidentiel"
					type={showPassword ? "text" : "password"}
					disabled={isSubmitting}
					required={true}
					focusBorderColor="crimson"
					{...register("password")}
				/>
				<InputRightElement width="4.5rem">
					<Button
						h="70%"
						mr="10px"
						size="sm"
						onClick={() => setShowPassword((value) => !value)}
					>
						{showPassword ? "Cacher" : "Voir"}
					</Button>
				</InputRightElement>
			</InputGroup>

			<Flex justify="center">
				<Button
					marginTop="10"
					disabled={isSubmitting}
					size="sm"
					w="40%"
					type="submit"
				>
					Se connecter
				</Button>
			</Flex>
			{/* <Text fontSize="xs" textAlign="center" fontStyle="italic" mt={5}>
				Si vous n&apos;avez pas encore de compte, vous pouvez vous inscrire
				<span onClick={() => setEtat("Inscription") } >
				ici

				</span>

			</Text> */}
		</form>
	);
};

export default Connexion;
