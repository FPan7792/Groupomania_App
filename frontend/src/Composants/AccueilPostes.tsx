// types
import { POST } from "../types";
type Props = {
	posts: POST[] | null;
	userId: string | number | null;
	refresh: React.Dispatch<React.SetStateAction<number>>;
};

// composants css
import { Box, Button, Text, Image } from "@chakra-ui/react";

// navigation
import { Link } from "react-router-dom";

// notification pop
import { activeNotif, likerPost, supprimerPost } from "../Fonctions";

const AccueilPostes = (Props: Props) => {
	const { posts, userId, refresh } = Props;

	return (
		<Box>
			{posts?.map((post) => {
				const dateDeCreation = new Date(post.createdAt.toString())
					.toLocaleString("fr")
					.toString();

				const likesDuPost = JSON.parse(post.usersIds_likes);
				const aLike = likesDuPost.findIndex((id: number) => id === userId);
				const nombreDeLikes = likesDuPost.length;

				return (
					<Box key={post.post_id} border=" black 2px solid" margin={3}>
						<Text fontWeight="bold">{post.title}</Text>
						{post.is_image && (
							<Image
								src={post.image_url}
								boxSize="100px"
								objectFit="cover"
							></Image>
						)}

						<Text fontSize="x-small">
							Crée par : Utilisateur {post.owner_id} le {dateDeCreation}
						</Text>

						{post.createdAt !== post.updatedAt && (
							<Text fontSize="x-small" fontStyle="italic">
								modifié
							</Text>
						)}

						<Text> {post.content}</Text>
						<Text fontSize="xs">
							{nombreDeLikes}{" "}
							{nombreDeLikes > 1
								? "likes"
								: nombreDeLikes > 20
								? " 20+ likes"
								: "like"}
						</Text>

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
