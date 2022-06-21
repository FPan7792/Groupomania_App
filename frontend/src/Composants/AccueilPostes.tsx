// import { useFetch } from "../Hooks/hooks";

// types
import { POST } from "../types";
type Props = {
	posts: POST[];
	userId: string | number | null;
};

// composants css
import { Box, Button, Text } from "@chakra-ui/react";
import Cookies from "js-cookie";

async function supprimerPost(url: string, post_id: number) {
	const formulaireDeSuppression = new FormData();
	formulaireDeSuppression.append("post_id", post_id.toString());

	await fetch(url, {
		method: "POST",
		headers: { Authorization: "Bearer " + Cookies.get("token") },
		body: formulaireDeSuppression,
	})
		.then(async (response) => {
			const resultat = await response.json();
			if (!response.ok) {
				throw new Error(resultat.message);
			} else return resultat;
		})
		.catch((err) => {
			console.log("error", err);
			return err;
		});
}

export const AccueilPostes = (Props: Props) => {
	const { posts, userId } = Props;

	return (
		<Box>
			{posts?.map((post) => {
				return (
					<div key={post.post_id}>
						<p>{post.title}</p>
						<Text fontSize="xs">
							Crée par : Utilisateur {post.owner_id}
						</Text>
						<p> {post.content}</p>
						{userId === post.owner_id && (
							<Button
								size="xs"
								colorScheme="red"
								onClick={() =>
									supprimerPost(
										"http://localhost:3003/posts/delete",
										post.post_id
									)
								}
							>
								Supprimer
							</Button>
						)}
					</div>
				);
			})}
		</Box>
	);
};
export default AccueilPostes;
