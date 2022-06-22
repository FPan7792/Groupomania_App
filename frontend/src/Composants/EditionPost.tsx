import { useState, useEffect } from "react";
// composants css
import { Button, Box, Text, Input, FormLabel, Stack } from "@chakra-ui/react";
// types
import { POST } from "../types";
// navigation
import { useParams } from "react-router-dom";
// gestion du formulaire
import { useForm, Controller } from "react-hook-form";
// hook requete
import { useFetch } from "../Hooks/hooks";

// Func REQUETES
function creerPost() {
	console.log("newpost");
}

function modifierPost() {
	console.log("modifpost");
}

const EditionPost = () => {
	const { id } = useParams();

	const [post, setPost] = useState<POST | null | "nouveaupost">(null);

	if (id !== "nouveaupost") {
		const { isError, isLoading, isSuccess } = useFetch(
			"http://localhost:3003/posts"
		);

		useEffect(() => {
			isSuccess?.datas &&
				id !== undefined &&
				typeof Number(id) === "number" &&
				setPost(isSuccess.datas[Number(id)]);

			console.log("POST", post);
		}, [isSuccess]);
	} else
		useEffect(() => {
			setPost(id);
		}, [post]);

	const { handleSubmit, control } = useForm();
	const onSubmit = (data: any) => console.log(data);

	return (
		<Box>
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
