// import { useFetch } from "../Hooks/hooks";

// types
import { POST } from "../types";
type Props = {
	posts: POST[];
	userId: string | number | null;
	setEtat: React.Dispatch<
		React.SetStateAction<"Accueil" | "Mes Posts" | "Likes" | "Edition">
	>;
};

// composants css
import { Box, Button, Text } from "@chakra-ui/react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

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

//  a creer et untiliser dans la page d'édition de post
async function modifierPost(url: string, post_id: number) {
	// const formulaireDeModification = new FormData();
	// formulaireDeModification.append("post_id", post_id.toString());
	// await fetch(url, {
	// 	method: "POST",
	// 	headers: { Authorization: "Bearer " + Cookies.get("token") },
	// 	body: formulaireDeModification,
	// })
	// 	.then(async (response) => {
	// 		const resultat = await response.json();
	// 		if (!response.ok) {
	// 			throw new Error(resultat.message);
	// 		} else return resultat;
	// 	})
	// 	.catch((err) => {
	// 		console.log("error", err);
	// 		return err;
	// 	});
}

const AccueilPostes = (Props: Props) => {
	const { posts, userId, setEtat } = Props;

	const navigate = useNavigate();

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
							// userId === post.owner_id ||
							// 	(userId === 1 && (
							<Box>
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
								<Button
									size="xs"
									colorScheme="yellow"
									onClick={() => {
										console.log("modifier");
										// setEtat((etat) => "Edition");
										navigate(`/post/${post.post_id - 1}`);

										// attends de set un etat défini dans la page parent et
										// affiche l'onglet d'édition de page
										// mene vers la page d'édition de post et import les
										// infos du post choisi
									}}
								>
									Modifier
								</Button>
							</Box>
							// ))
						}
					</div>
				);
			})}
		</Box>
	);
};
export default AccueilPostes;

// TRIER LES POSTE PAS ORDRE DE MODIFICATION DU PLUS RECENT AU PLUS ANCIEN
