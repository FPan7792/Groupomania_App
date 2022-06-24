// types
import { POST } from "../types";
type Props = {
	posts: POST[] | null;
	userId: string | number | null;
	refresh: React.Dispatch<React.SetStateAction<number>>;
};

// composants css
import { Box, Button, Text } from "@chakra-ui/react";

// auth
import Cookies from "js-cookie";

// navigation
import { Link } from "react-router-dom";

// notification pop
import { activeNotif } from "../App";

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
		.then((confirmation: any) => {
			console.log(confirmation);
		})
		.catch((err) => {
			console.log("error", err);
			return err;
		});
}

const AccueilPostes = (Props: Props) => {
	const { posts, userId, refresh } = Props;

	return (
		<Box>
			{posts?.map((post) => {
				return (
					<div key={post.post_id}>
						<p>{post.title}</p>
						<Text fontSize="xs">
							Crée par : Utilisateur {post.owner_id}
						</Text>
						{/* ajouter date de creation  */}

						{/* si creation n'est pas egal a update pour meme post-id*/}
						{/* ajouiter la mention "modifié" */}
						<p> {post.content}</p>
						{
							// USER 1 === ADMIN
							(Number(userId) === post.owner_id ||
								Number(userId) === 1) && (
								<Box>
									<Button
										size="xs"
										colorScheme="red"
										onClick={() => {
											supprimerPost(
												"http://localhost:3003/posts/delete",
												post.post_id
											);

											activeNotif(
												"Le post à bien été supprimé ",
												true
											);

											refresh((ice) => ice + 1);
										}}
									>
										Supprimer
									</Button>

									<Link to={`/post/${post.post_id}`}>
										<Button size="xs" colorScheme="yellow">
											Modifier
										</Button>
									</Link>
								</Box>
							)
						}
					</div>
				);
			})}
		</Box>
	);
};
export default AccueilPostes;

// TRIER LES POSTE PAS ORDRE DE MODIFICATION DU PLUS RECENT AU PLUS ANCIEN
