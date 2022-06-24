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
// import { activeNotif, supprimerPost } from "../Fonctions";

export const UtilisateurPosts = (Props: Props) => {
	const { posts, userId, etat } = Props;
	const [mesPosts, setMesPosts] = useState<POST[]>([]);

	useLayoutEffect(() => {
		const nouveauTableau: POST[] = [];

		if (posts) {
			for (const Post of posts) {
				const likesDuPost = JSON.parse(Post.usersIds_likes);
				const aLike = likesDuPost.find((id: number) => id === userId);

				aLike && nouveauTableau.push(Post);
			}
		}

		setMesPosts(nouveauTableau);
	}, [posts, etat]);

	console.log("MP", mesPosts);
	return (
		<Box>
			{mesPosts &&
				mesPosts.map((post) => {
					return (
						<Box key={post.post_id} border=" black 2px solid" margin={3}>
							<Text fontWeight="bold">{post.title}</Text>
							<Text>{post.content}</Text>
						</Box>
					);
				})}
		</Box>
	);
};
export default UtilisateurPosts;

// Creer composant defaut pour le design ?
