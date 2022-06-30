import { useState, useLayoutEffect, useRef } from "react";
// composants css
import {
	Button,
	Box,
	Input,
	FormLabel,
	Stack,
	Image,
	useColorMode,
	InputGroup,
	InputRightElement,
	Flex,
	Textarea,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faArrowLeft,
	faCircleXmark,
	faFileCircleCheck,
	faFileCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
// types
import { POST } from "../types";

// navigation
import {
	useParams,
	Link,
	useNavigate,
	NavigateFunction,
} from "react-router-dom";
// gestion du formulaire
import { useForm, Controller, SubmitHandler } from "react-hook-form";
// hook requete
import { useFetch } from "../Hooks/hooks";
// auth
import Cookies from "js-cookie";
// notification pop
import { activeNotif } from "../Fonctions";
import { Heading } from "@chakra-ui/react";

// Func REQUETES
async function creerPost(formulaire: POST, image: HTMLInputElement | null) {
	console.log(formulaire);

	const { title, content } = formulaire;
	let creationConfirmation = false;

	const nouveauPost = new FormData();
	title && title !== "" && nouveauPost.append("title", title);
	content && content !== "" && nouveauPost.append("content", content);
	Cookies.get("username") &&
		nouveauPost.append("username", Cookies.get("username") as string);

	if (image && image.files) {
		nouveauPost.append("image", image.files[0]);
	}

	// implémenter la validation avec useform

	await fetch("http://localhost:3003/posts/create", {
		method: "POST",
		headers: { Authorization: "Bearer " + Cookies.get("token") },
		body: nouveauPost,
	})
		.then(async (response) => {
			const resultat = await response.json();
			if (!response.ok) {
				throw new Error(resultat.message);
			} else return resultat;
		})
		.then((confirmation: any) => {
			console.log(confirmation);
			creationConfirmation = true;
		})
		.catch((err) => {
			console.log("error", err);
			return err;
		});

	return creationConfirmation;
}

async function modifierPost(
	formulaire: POST,
	post_id: string,
	image: HTMLInputElement | null
) {
	console.log(formulaire);

	const { title, content } = formulaire;
	let modificationConfirmation = false;

	const nouveauPost = new FormData();
	nouveauPost.append("title", title);
	nouveauPost.append("content", content);
	nouveauPost.append("post_id", post_id);
	Cookies.get("username") &&
		nouveauPost.append("username", Cookies.get("username") as string);

	if (image && image.files && image.files?.length !== 0) {
		nouveauPost.append("image", image.files[0]);
	}

	await fetch("http://localhost:3003/posts/modify", {
		method: "POST",
		headers: { Authorization: "Bearer " + Cookies.get("token") },
		body: nouveauPost,
	})
		.then(async (response) => {
			const resultat = await response.json();
			if (!response.ok) {
				throw new Error(resultat.message);
			} else return resultat;
		})
		.then((confirmation: any) => {
			console.log(confirmation);
			modificationConfirmation = true;
		})
		.catch((err) => {
			console.log("error", err);
			return err;
		});

	return modificationConfirmation;
}

function confirmationOperation(
	operation: boolean,
	message: string,
	navigate: NavigateFunction,
	notyfColor: string
) {
	if (operation) {
		navigate("/");
		activeNotif(message, true, notyfColor);
	} else activeNotif("Un problème est survenue", false, notyfColor);
}

const EditionPost = () => {
	// url params
	const { id } = useParams();

	// navigation
	const navigate = useNavigate();

	const [post, setPost] = useState<POST | null | "nouveaupost">(null);
	const [imageAttendue, setImageAttendue] = useState<any>(null);

	// recup image
	const imageRef = useRef<HTMLInputElement | null>(null);

	// gestion du theme
	const { colorMode } = useColorMode();

	if (id !== "nouveaupost") {
		const { isError, isLoading, isSuccess } = useFetch(
			"http://localhost:3003/posts"
		);

		useLayoutEffect(() => {
			if (
				isSuccess?.datas &&
				id !== undefined &&
				typeof Number(id) === "number"
			) {
				const { datas } = isSuccess;
				for (const Post of datas) {
					Post.post_id === Number(id) && setPost(Post);
				}
			}
		}, [isSuccess]);
	} else
		useLayoutEffect(() => {
			setPost(id);
		}, [post]);

	// gestion de validation formulaire
	const { handleSubmit, control } = useForm<POST>();

	const onSubmit: SubmitHandler<POST> = async (data: POST) => {
		const imageDuPost = imageAttendue ? imageRef.current : null;

		if (id) {
			if (id !== "nouveaupost") {
				const confirmation = await modifierPost(data, id, imageDuPost);

				confirmationOperation(
					confirmation,
					"Le post à été modifié !",
					navigate,
					colorMode === "light" ? "#4E5166" : "#FFD7D7"
				);
			} else {
				const confirmation = await creerPost(data, imageDuPost);
				confirmationOperation(
					confirmation,
					"Nouveau poste créé !",
					navigate,
					colorMode === "light" ? "#4E5166" : "#FFD7D7"
				);
			}
		}
	};

	return (
		<Box
			bgColor={colorMode === "light" ? "#ffffff" : "fond.dark"}
			w="95%"
			borderRadius={"3xl"}
			shadow="lg"
			p={10}
		>
			<Stack spacing={5}>
				<Flex w="100%" align="center" mb={5}>
					<Link to={"/"}>
						<Button colorScheme="red">
							<FontAwesomeIcon icon={faArrowLeft} />
						</Button>
					</Link>
					<Heading as="h1" fontSize="2xl" fontWeight="bold" m="0 auto">
						{id !== "nouveaupost" ? "Edition de post" : "Nouveau post"}
					</Heading>
				</Flex>

				{post && (
					<form onSubmit={handleSubmit(onSubmit)}>
						<Stack spacing={10}>
							<Stack spacing={0}>
								<FormLabel fontSize="md" fontWeight="bold">
									Titre
								</FormLabel>
								<Controller
									name="title"
									control={control}
									defaultValue={
										post !== "nouveaupost" ? post?.title : ""
									}
									render={({ field }) => (
										<Input
											type="text"
											w="xs"
											fontSize="sm"
											required={true}
											{...field}
										/>
									)}
								/>
							</Stack>

							<Stack spacing={0}>
								<FormLabel fontSize="md" fontWeight="bold">
									Contenu
								</FormLabel>
								<Flex align="center">
									<Controller
										name="content"
										control={control}
										defaultValue={
											post !== "nouveaupost" ? post?.content : ""
										}
										render={({ field }) => (
											<Textarea
												flex={2}
												fontSize="sm"
												w="2xl"
												h="xs"
												required={true}
												{...field}
											/>
										)}
									/>
									{post !== "nouveaupost" &&
										post.is_image === true && (
											<Image
												flex={1}
												objectFit="contain"
												h={100}
												src={post.image_url}
												alt={`${post.title}`}
											/>
										)}
								</Flex>
							</Stack>

							<Stack spacing={0}>
								<FormLabel fontSize="md" fontWeight="bold">
									Image
								</FormLabel>
								<InputGroup
									w="30%"
									minW="360px"
									flexShrink={1}
									flexWrap="wrap"
								>
									<Input
										type="file"
										accept=".jpg, .jpeg, .png"
										name="image"
										id="image"
										ref={imageRef}
										border="none"
										onChange={(e) => {
											setImageAttendue(e.target.value);
											console.log(e.target.value);
										}}
									/>

									<InputRightElement>
										<FontAwesomeIcon
											icon={
												!imageAttendue
													? faFileCircleXmark
													: faFileCircleCheck
											}
											color={!imageAttendue ? "red" : "green"}
										/>
										{imageAttendue && (
											<Button
												onClick={() => {
													setImageAttendue(null);
													console.log(imageRef.current?.value);
												}}
											>
												<FontAwesomeIcon
													icon={faCircleXmark}
													color="black"
												/>
											</Button>
										)}
									</InputRightElement>
								</InputGroup>
							</Stack>
						</Stack>

						<Flex justify="center" m={10} mt="100px">
							<Button type="submit" colorScheme="red" w="xs">
								{id === "nouveaupost" ? "Publier" : "Modifier"}
							</Button>
						</Flex>
					</form>
				)}
			</Stack>
		</Box>
	);
};
export default EditionPost;

// Crreer bouton supprimer la photo en mofifiant is_image
// recup is_image dans le backend et si false on supprile tout simplement l'image et on ne revoie rien
// on supp aussi l'image dans la BDD
