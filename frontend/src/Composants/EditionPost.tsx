import { useState, useLayoutEffect, useRef } from "react";
// composants css
import {
	Button,
	Box,
	Text,
	Input,
	FormLabel,
	Stack,
	Image,
	useColorMode,
} from "@chakra-ui/react";
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
	const { handleSubmit, control } = useForm();
	const onSubmit: SubmitHandler<any> = async (data: any) => {
		const imageDuPost = imageRef.current;

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
		<Box>
			<Link to={"/"}>
				<Button>Retour</Button>
			</Link>
			<Text align="center" fontWeight="bold">
				{id !== "nouveaupost" ? "Edition de post" : "Nouveau post"}
			</Text>

			{post && (
				<form onSubmit={handleSubmit(onSubmit)}>
					<Stack>
						<FormLabel>Titre</FormLabel>
						<Controller
							name="title"
							control={control}
							defaultValue={post !== "nouveaupost" ? post?.title : ""}
							render={({ field }) => (
								<Input type="text" w="xs" {...field} />
							)}
						/>

						<FormLabel>Contenu</FormLabel>
						<Controller
							name="content"
							control={control}
							defaultValue={post !== "nouveaupost" ? post?.content : ""}
							render={({ field }) => (
								<Input type="text" w="2xl" h="xs" {...field} />
							)}
						/>

						<FormLabel>Image</FormLabel>

						{post !== "nouveaupost" && post.is_image && (
							<Image
								src={post.image_url}
								boxSize="100px"
								objectFit="cover"
							></Image>
						)}
						<Input
							type="file"
							accept="accept"
							id="image"
							ref={imageRef}
						/>
					</Stack>
					{id === "nouveaupost" ? (
						<Button type="submit">Publier</Button>
					) : (
						<Button type="submit">Modifier</Button>
					)}
				</form>
			)}
		</Box>
	);
};
export default EditionPost;

// Crreer bouton supprimer la photo en mofifiant is_image
// recup is_image dans le backend et si false on supprile tout simplement l'image et on ne revoie rien
// on supp aussi l'image dans la BDD
