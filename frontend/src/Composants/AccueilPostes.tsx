// types
import { POST } from "../types";
type Props = {
	posts: POST[] | null;
	userId: string | number | null;
	refresh: React.Dispatch<React.SetStateAction<number>>;
};

// composants css
import { Box, Button, Text } from "@chakra-ui/react";

// navigation
import { Link } from "react-router-dom";

// notification pop
import { activeNotif, supprimerPost } from "../Fonctions";

const AccueilPostes = (Props: Props) => {
	const { posts, userId, refresh } = Props;

	return (
		<Box>
			{posts?.map((post) => {
				const dateDeCreation = new Date(post.createdAt.toString())
					.toLocaleString("fr")
					.toString();

				return (
					<Box key={post.post_id} border=" black 2px solid" margin={3}>
						<Text fontWeight="bold">{post.title}</Text>

						<Text fontSize="x-small">
							Crée par :
							<Text fontWeight="bold"> Utilisateur {post.owner_id}</Text>
							le {dateDeCreation}
						</Text>

						{post.createdAt !== post.updatedAt && (
							<Text fontSize="x-small" fontStyle="italic">
								modifié
							</Text>
						)}

						<p> {post.content}</p>
						{
							// USER 1 === ADMIN
							(Number(userId) === post.owner_id ||
								Number(userId) === 1) && (
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

											activeNotif(
												"Le post à bien été supprimé ",
												true
											);
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
					</Box>
				);
			})}
		</Box>
	);
};
export default AccueilPostes;
