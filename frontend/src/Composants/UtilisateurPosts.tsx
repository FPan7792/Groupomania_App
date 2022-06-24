import { useState, useLayoutEffect } from "react";

// types
import { POST } from "../types";
type Props = {
	posts: POST[] | null;
	userId: string | number | null;
	refresh: React.Dispatch<React.SetStateAction<number>>;
	etat: "Accueil" | "Mes Posts" | "Likes" | null;
};

// composants css
import { Button, Box, Text } from "@chakra-ui/react";

// navigation
import { Link } from "react-router-dom";
import { activeNotif, likerPost, supprimerPost } from "../Fonctions";

export const UtilisateurPosts = (Props: Props) => {
	const { posts, userId, refresh, etat } = Props;
	const [mesPosts, setMesPosts] = useState<POST[]>([]);

	useLayoutEffect(() => {
		const nouveauTableau: POST[] = [];

		if (posts) {
			for (const Post of posts) {
				Post.owner_id === Number(userId) && nouveauTableau.push(Post);
			}
		}

		setMesPosts(nouveauTableau);

		console.log(mesPosts);
	}, [posts, etat]);

	return (
		<Box>
			{mesPosts &&
				mesPosts.map((post) => {
					const dateDeCreation = new Date(post.createdAt.toString())
						.toLocaleString("fr")
						.toString();

					const likesDuPost = JSON.parse(post.usersIds_likes);
					const aLike = likesDuPost.findIndex(
						(id: number) => id === userId
					);
					const nombreDeLikes = likesDuPost.length;

					return (
						<Box key={post.post_id} border=" black 2px solid" margin={3}>
							<Text fontWeight="bold">{post.title}</Text>
							<Text>{post.content}</Text>

							<Button
								size="xs"
								colorScheme={aLike !== -1 ? "pink" : "gray"}
								onClick={async () => {
									if (aLike !== -1) {
										likesDuPost.splice(aLike, 1);
									} else {
										likesDuPost.push(userId);
									}
									await likerPost(likesDuPost, post.post_id);
									refresh((prevState) => prevState + 1);
								}}
							>
								{aLike !== -1 ? "Disliker" : "Liker"}
							</Button>
							<Box>
								<Button
									size="xs"
									colorScheme="red"
									onClick={async () => {
										await supprimerPost(
											"http://localhost:3003/posts/delete",
											post.post_id
										);
										await refresh((ice) => ice + 1);

										activeNotif("Le post à bien été supprimé ", true);
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
						</Box>
					);
				})}
			<Link to={"/post/nouveaupost"}>
				<Button>Nouvelle publication</Button>
			</Link>
		</Box>
	);
};
export default UtilisateurPosts;
