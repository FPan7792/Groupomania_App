import { useState, useLayoutEffect } from "react";
// composants css
import { Button, Box, Text, Input, FormLabel, Stack } from "@chakra-ui/react";
// types
import { POST } from "../types";
// navigation
import { useParams, Link, useNavigate } from "react-router-dom";
// gestion du formulaire
import { useForm, Controller, SubmitHandler } from "react-hook-form";
// hook requete
import { useFetch } from "../Hooks/hooks";
// auth
import Cookies from "js-cookie";
// notification pop
import { Notyf } from "notyf";

// Func REQUETES
async function creerPost(formulaire: POST) {
	console.log("vcreer");

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

function modifierPost(formulaire: POST) {
	console.log("modifpost");

	console.log(formulaire);

	const notyf = new Notyf();
	notyf.success("Le post à été modifié !");
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
		// console.log("DATAS", data);
		const notyf = new Notyf();

		if (id !== "nouveaupost") {
			modifierPost(data);
		} else {
			const confirmation = await creerPost(data);
			confirmation && navigate("/");
			notyf.success("Nouveau poste créé !");
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
