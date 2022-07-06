import { useState, useLayoutEffect } from "react";
// types
import { POST } from "../Types/types";
type Props = {
	posts: POST[] | null;
	userId: string | number | null;
	refresh: React.Dispatch<React.SetStateAction<number>>;
	etat: "Accueil" | "Mes Posts" | "Likes" | null;
	isAdmin: boolean | null;
};
// composants css
import { Button, Box, Flex, useColorModeValue } from "@chakra-ui/react";
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

	const color = useColorModeValue("primaire", "secondaire");

	return (
		<Box>
			<Link to={"/post/nouveaupost"}>
				<Flex justify="center" m="50px 10px">
					<Button
						size={{ base: "xs", md: "md" }}
						w={{ base: "60%", md: "30%" }}
						colorScheme="primaire"
						variant="outline"
						color={color}
					>
						Nouvelle publication
					</Button>
				</Flex>
			</Link>

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
		</Box>
	);
};
export default UtilisateurPosts;
