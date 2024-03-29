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

// composants css
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

	// gestion du theme
	const { colorMode } = useColorMode();
	const couleurDesBoutons = useColorModeValue("primaire", "secondaire");

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
							isAdmin:
								Cookies.get("admin") === "true" ? true : false || null,
						});
					}
				}
			})
			.catch((err) => {
				console.log(err);
				return err;
			})
			.finally(() => {
				// console.log("COOKIE SETTED : " + Cookies.get("token"));
				Cookies.get("token") && Cookies.get("userId")
					? activeNotif(
							"Vous êtes maintenant connecté",
							true,
							colorMode === "light" ? "#4E5166" : "#FFD7D7"
					  )
					: activeNotif(
							"Identifiants incorrects",
							false,
							colorMode === "light" ? "#4E5166" : "#FFD7D7"
					  );
			});
	};

	function changerVoirMDP() {
		setShowPassword((value) => !value);
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<FormLabel
				transform="translateX(2%)"
				fontWeight="bold"
				fontSize={{ base: "xs", md: "md" }}
			>
				Email utilisateur :
			</FormLabel>
			<Input
				size="sm"
				w="100%"
				id="email"
				type="email"
				errorBorderColor="green"
				placeholder="E-mail professionnel"
				isDisabled={isSubmitting}
				required={true}
				focusBorderColor="crimson"
				{...register("email")}
			/>

			<FormLabel
				transform="translateX(2%)"
				marginTop={5}
				fontWeight="bold"
				fontSize={{ base: "xs", md: "md" }}
			>
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
					<Button h="70%" mr="10px" size="xs" onClick={changerVoirMDP}>
						{showPassword ? "Cacher" : "Voir"}
					</Button>
				</InputRightElement>
			</InputGroup>

			<Flex justify="center">
				<Button
					marginTop={10}
					m={{ base: "60px 0 ", md: "" }}
					isDisabled={isSubmitting}
					size="sm"
					w="40%"
					type="submit"
					colorScheme="red"
					bgColor={couleurDesBoutons}
				>
					Se connecter
				</Button>
			</Flex>
		</form>
	);
};

export default Connexion;
