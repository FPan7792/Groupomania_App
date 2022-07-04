import { useState } from "react";

import {
	FormLabel,
	Input,
	Button,
	Flex,
	InputGroup,
	InputRightElement,
	useColorModeValue,
} from "@chakra-ui/react";

// types
import { CREATIONUTILISATEUR } from "../types";
type Props = {
	setEtat: React.Dispatch<React.SetStateAction<"Connexion" | "Inscription">>;
};

type FormInputs = {
	email: string;
	password: string;
};

// gestion fomulaire
import { useForm } from "react-hook-form";

const Inscription = (Props: Props) => {
	const {
		register,
		handleSubmit,
		formState: { isSubmitting },
	} = useForm<FormInputs>();

	const { setEtat } = Props;
	const [showPassword, setShowPassword] = useState(false);

	// gestion du theme
	const buttonColor = useColorModeValue("primaire", "secondaire");

	const onSubmit = async (datas: FormInputs) => {
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
			<FormLabel transform="translateX(2%)" fontWeight="bold">
				Email utilisateur :
			</FormLabel>
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
					colorScheme="red"
					marginTop="10"
					disabled={isSubmitting}
					size="sm"
					w="40%"
					bgColor={buttonColor}
					type="submit"
				>
					S&apos;inscrire
				</Button>
			</Flex>
		</form>
	);
};

export default Inscription;
