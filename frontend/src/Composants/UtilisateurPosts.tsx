import { useState, useLayoutEffect } from "react";
// types
import { POST } from "../types";
type Props = {
	posts: POST[] | null;
	userId: string | number | null;
	refresh: React.Dispatch<React.SetStateAction<number>>;
	etat: "Accueil" | "Mes Posts" | "Likes" | null;
	isAdmin: boolean | null;
};
// composants css
import { Button, Box } from "@chakra-ui/react";
// navigation
import { Link } from "react-router-dom";
// composants
import Post from "./Post";

export const UtilisateurPosts = (Props: Props) => {
	const { posts, userId, refresh, etat, isAdmin } = Props;
	const [mesPosts, setMesPosts] = useState<POST[]>([]);

	useLayoutEffect(() => {
		const nouveauTableau: POST[] = [];

		if (posts) {
			for (const Post of posts) {
				Post.owner_id === Number(userId) && nouveauTableau.push(Post);
			}
		}

		setMesPosts(nouveauTableau);
	}, [posts, etat]);

	return (
		<Box>
			{mesPosts &&
				mesPosts.map((post) => {
					return (
						<Post
							key={post.post_id}
							isAdmin={isAdmin}
							userId={userId}
							refresh={refresh}
							post={post}
						/>
					);
				})}
			<Link to={"/post/nouveaupost"}>
				<Button>Nouvelle publication</Button>
			</Link>
		</Box>
	);
};
export default UtilisateurPosts;
