/* eslint-disable no-mixed-spaces-and-tabs */
import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
// TYPES
import { CONNEXIONUTILISATEUR } from "../Types/types";

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
	useColorMode,
	useColorModeValue,
} from "@chakra-ui/react";
// gestion des formulaires
import { useForm } from "react-hook-form";
import { activeNotif } from "../Fonctions/Fonctions";

const Connexion = () => {
	const { setEstConnecte } = useContext(AuthContext);
	const [showPassword, setShowPassword] = useState(false);

	const { colorMode } = useColorMode();
	const buttonColor = useColorModeValue("primaire", "secondaire");

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
					? activeNotif(
							"Vous êtes maintenant connecté",
							true,
							colorMode === "light" ? "#4E5166" : "#FFD7D7"
					  )
					: activeNotif(
							"Un problème est survenue",
							false,
							colorMode === "light" ? "#4E5166" : "#FFD7D7"
					  );
			});
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<FormLabel transform="translateX(2%)" fontWeight="bold">
				Email utilisateur :
			</FormLabel>
			<Input
				size="sm"
				w="100%"
				id="email"
				type="email"
				placeholder="E-mail professionnel"
				isDisabled={isSubmitting}
				required={true}
				focusBorderColor="crimson"
				{...register("email")}
			/>

			<FormLabel transform="translateX(2%)" marginTop={5} fontWeight="bold">
				Mot de passe :
			</FormLabel>

			<InputGroup size="sm">
				<Input
					size="sm"
					w="100%"
					id="password"
					placeholder="Code confidentiel"
					type={showPassword ? "text" : "password"}
					isDisabled={isSubmitting}
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
					isDisabled={isSubmitting}
					size="sm"
					w="40%"
					type="submit"
					colorScheme="red"
					bgColor={buttonColor}
				>
					Se connecter
				</Button>
			</Flex>
		</form>
	);
};

export default Connexion;
