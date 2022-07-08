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
	Flex,
	Textarea,
	Heading,
	useColorModeValue,
	InputLeftElement,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faArrowLeft,
	faCircleXmark,
	faFileCircleCheck,
	faFileCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
// types
import { POST } from "../Types/types";

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
import { activeNotif } from "../Fonctions/Fonctions";

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

async function supprimerLaPhoto(post: POST) {
	let modificationConfirmation = false;

	const nouveauPost = new FormData();
	nouveauPost.append("post_id", post.post_id.toString());
	nouveauPost.append("process", "process_deleteImage");

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

	console.log(modificationConfirmation);

	return modificationConfirmation;
}

const EditionPost = () => {
	// url params
	const { id } = useParams();

	// navigation
	const navigate = useNavigate();

	const [post, setPost] = useState<POST | null | "nouveaupost">(null);
	const [imageAttendue, setImageAttendue] = useState<any>(null);
	const [showImage, setShowImage] = useState<boolean>(true);

	// recup image
	const imageRef = useRef<HTMLInputElement | null>(null);

	// gestion du theme
	const { colorMode } = useColorMode();
	const buttonColor = useColorModeValue("primaire", "secondaire");
	const notifColor = useColorModeValue("#4E5166", "#FFD7D7");
	const couleurDuTexte = useColorModeValue("textes.sombre", "textes.white");

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
			console.log(post);
		}, [post]);

	// gestion de validation formulaire
	const {
		handleSubmit,
		control,
		formState: { isSubmitting },
	} = useForm<POST>();

	const onSubmit: SubmitHandler<POST> = async (data: POST) => {
		const imageDuPost = imageAttendue ? imageRef.current : null;

		if (id) {
			if (id !== "nouveaupost") {
				const confirmation = await modifierPost(data, id, imageDuPost);

				confirmationOperation(
					confirmation,
					"Le post à été modifié !",
					navigate,
					notifColor
				);
			} else {
				const confirmation = await creerPost(data, imageDuPost);
				confirmationOperation(
					confirmation,
					"Nouveau poste créé !",
					navigate,
					notifColor
				);
			}
		}
	};

	return (
		<Box
			bgColor={colorMode === "light" ? "#fdfdfd" : "fond.dark"}
			w={{ base: "90%", md: "95%" }}
			color={couleurDuTexte}
			borderRadius={{ base: "xl", md: "3xl" }}
			shadow="xs"
			p={{ base: 3, md: 10 }}
		>
			<Stack spacing={5}>
				<Flex w="100%" align="center" mb={5}>
					<Link to={"/"}>
						<Button
							colorScheme="red"
							color={buttonColor}
							variant="outline"
							isDisabled={isSubmitting}
							size={{ base: "xs", md: "md" }}
						>
							<FontAwesomeIcon icon={faArrowLeft} />
						</Button>
					</Link>
					<Heading
						as="h1"
						fontSize={{ base: "xl", md: "2xl" }}
						fontWeight="bold"
						m="0 auto"
					>
						{id !== "nouveaupost" ? "Edition de post" : "Nouveau post"}
					</Heading>
				</Flex>

				{post && (
					<form onSubmit={handleSubmit(onSubmit)}>
						<Stack spacing={10}>
							<Stack spacing={0}>
								<FormLabel
									fontSize={{ base: "sm", md: "md" }}
									fontWeight="bold"
								>
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
											size={{ base: "sm", md: "md" }}
											w={{ base: "80%", md: "xs" }}
											fontSize={{ base: "xs", md: "sm" }}
											required={true}
											isDisabled={isSubmitting}
											{...field}
										/>
									)}
								/>
							</Stack>

							<Stack spacing={0}>
								<FormLabel
									fontSize={{ base: "sm", md: "md" }}
									fontWeight="bold"
								>
									Contenu
								</FormLabel>
								<Flex
									flexDir={{ base: "column", md: "row" }}
									align="center"
									// border="black solid 2px"
								>
									<Controller
										name="content"
										control={control}
										defaultValue={
											post !== "nouveaupost" ? post?.content : ""
										}
										render={({ field }) => (
											<Textarea
												flex={{ md: 3 }}
												mr={{ base: 0, md: 2 }}
												fontSize={{ base: "xs", md: "sm" }}
												// w="2xl"
												w={{ base: "100%", md: "2xl" }}
												h={{ base: "200px", md: "xs" }}
												required={true}
												isDisabled={isSubmitting}
												{...field}
											/>
										)}
									/>
									{post !== "nouveaupost" &&
										post.is_image === true &&
										showImage && (
											<Flex
												flexDir="column"
												align="center"
												justify={{
													base: "flex-start",
													md: "center",
												}}
												flex={{ md: 1 }}
												h={{ base: "100%", md: "md" }}
												w="100%"
												mt={{ base: "5", md: "0" }}
											>
												<Image
													w="80%"
													shadow={{ base: "sm", md: "none" }}
													p={{ base: 5, md: "0" }}
													objectFit="contain"
													src={post.image_url}
													alt={`${post.title}`}
												/>
												<Button
													colorScheme="red"
													color={buttonColor}
													variant="outline"
													size="xs"
													mt={{ base: 2, md: 5 }}
													w="50%"
													isDisabled={isSubmitting}
													onClick={async () => {
														const suppression =
															await supprimerLaPhoto(post);
														suppression && setShowImage(false);
														activeNotif(
															"La photo à bien été supprimée",
															true,
															notifColor
														);
													}}
												>
													Supprimer l&apos;image
												</Button>
											</Flex>
										)}
								</Flex>
							</Stack>

							<Stack spacing={0}>
								<FormLabel
									fontSize={{ base: "sm", md: "md" }}
									fontWeight="bold"
								>
									Image
								</FormLabel>
								<InputGroup
									// w="30%"
									size={{ base: "sm", md: "md" }}
									flexShrink={1}
									flexWrap="wrap"
								>
									<InputLeftElement left={-2} top={2}>
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
									</InputLeftElement>
									<Input
										type="file"
										accept=".jpg, .jpeg, .png"
										name="image"
										id="image"
										ref={imageRef}
										border="none"
										isDisabled={isSubmitting}
										onChange={(e) => {
											setImageAttendue(e.target.value);
											console.log(e.target.value);
										}}
									/>
								</InputGroup>
							</Stack>
						</Stack>

						<Flex
							justify="center"
							m={10}
							// mt="100px"
							mt={{ base: 10, md: "100px" }}
						>
							<Button
								type="submit"
								colorScheme="red"
								bgColor={buttonColor}
								w="xs"
								size={{ base: "xs", md: "md" }}
								isLoading={isSubmitting}
								loadingText={
									id === "nouveaupost"
										? "Création ..."
										: "Modifications ..."
								}
							>
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
