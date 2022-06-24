import { useState, useLayoutEffect } from "react";
// composants css
import { Button, Box, Text, Input, FormLabel, Stack } from "@chakra-ui/react";
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
import { activeNotif } from "../App";

// Func REQUETES
async function creerPost(formulaire: POST) {
	console.log(formulaire);
	const { title, content } = formulaire;

	let creationConfirmation = false;

	const nouveauPost = new FormData();
	nouveauPost.append("title", title);
	nouveauPost.append("content", content);

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

async function modifierPost(formulaire: POST, post_id: string) {
	console.log(formulaire);

	const { title, content } = formulaire;
	let modificationConfirmation = false;

	const nouveauPost = new FormData();
	nouveauPost.append("title", title);
	nouveauPost.append("content", content);
	nouveauPost.append("post_id", post_id);

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
	navigate: NavigateFunction
) {
	if (operation) {
		navigate("/");
		activeNotif(message, true);
	} else activeNotif("Un problème est survenue", false);
}

const EditionPost = () => {
	// url params
	const { id } = useParams();

	// navigation
	const navigate = useNavigate();

	const [post, setPost] = useState<POST | null | "nouveaupost">(null);

	// notifications

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

			console.log("POST", post);
		}, [isSuccess]);
	} else
		useLayoutEffect(() => {
			setPost(id);
		}, [post]);

	// gestion de validation formulaire
	const { handleSubmit, control } = useForm();
	const onSubmit: SubmitHandler<any> = async (data: any) => {
		if (id) {
			if (id !== "nouveaupost") {
				const confirmation = await modifierPost(data, id);

				confirmationOperation(
					confirmation,
					"Le post à été modifié !",
					navigate
				);

				// if (confirmation) {
				// 	navigate("/");
				// 	notyf.success("Le post à été modifié !");
				// } else notyf.error("Un problème est survenue");
			} else {
				const confirmation = await creerPost(data);

				confirmationOperation(
					confirmation,
					"Nouveau poste créé !",
					navigate
				);

				// if (confirmation) {
				// 	navigate("/");
				// 	notyf.success("Nouveau poste créé !");
				// } else notyf.error("Un problème est survenue");
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
							render={({ field }) => <Input w="xs" {...field} />}
						/>

						<FormLabel>Contenu</FormLabel>
						<Controller
							name="content"
							control={control}
							defaultValue={post !== "nouveaupost" ? post?.content : ""}
							render={({ field }) => <Input w="2xl" h="xs" {...field} />}
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
