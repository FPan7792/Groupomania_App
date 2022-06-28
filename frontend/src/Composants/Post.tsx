// composants css & icones
import { Box, Button, Text, Image, Heading, Flex } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
// types
import { POST } from "../types";
type Props = {
	post: POST;
	userId?: string | number | null;
	refresh: React.Dispatch<React.SetStateAction<number>>;
	isAdmin?: boolean | null;
};
// navigation
import { Link } from "react-router-dom";
// notification pop
import { activeNotif, likerPost, supprimerPost } from "../Fonctions";

export const Post = (Props: Props) => {
	const { post, isAdmin, refresh, userId } = Props;

	const dateDeCreation = new Date(post?.createdAt.toString())
		.toLocaleString("fr")
		.toString();

	const likesDuPost = JSON.parse(post?.usersIds_likes);
	const aLike = likesDuPost.findIndex((id: number) => id === userId);
	const nombreDeLikes = likesDuPost.length;

	return (
		<Box
			key={post.post_id}
			// border=" black 1px solid"
			m={3}
			p={3}
			borderRadius={10}
			boxShadow="md"
		>
			<Flex justify="space-between">
				<Box>
					<Heading as="h2" size="md" mb={2}>
						{post.title}
					</Heading>

					<Flex justify="center">
						<Text fontSize="x-small" fontWeight="bold">
							<Text as="u" fontWeight="normal">
								Publié par
							</Text>
							: {post.owner_name}{" "}
							<Text as="u" fontWeight="normal">
								le
							</Text>
							: {dateDeCreation}
						</Text>
						{post.createdAt !== post.updatedAt && (
							<Text fontSize="x-small" fontStyle="italic">
								{" "}
								(modifié)
							</Text>
						)}
					</Flex>
					<Text fontSize="xs" colorScheme="pink">
						{nombreDeLikes}{" "}
						<FontAwesomeIcon icon={faHeart} color="lightpink" />
					</Text>
				</Box>
			</Flex>

			<Flex w="100%" m="40px 0 " p={10} shadow="xs">
				<Text
					p="10px"
					fontSize="sm"
					m="20px 0"
					mr={10}
					borderRadius={10}
					flex={3}
				>
					{" "}
					{post.content}
				</Text>
				{post.is_image && (
					<Image
						// border="solid 2px black"
						borderRadius="lg"
						shadow="xs"
						mr={5}
						src={post.image_url}
						boxSize="200px"
						objectFit="contain"
						flex={1}
					></Image>
				)}
			</Flex>

			<Flex m="4px 0" pos="relative" h="30px">
				{
					// USER 1 === ADMIN
					(Number(userId) === post.owner_id || isAdmin === true) && (
						<Box>
							<Button
								m="0 10px"
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
					)
				}

				<Button
					size="xs"
					pos="absolute"
					right="10px"
					bottom={0}
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
			</Flex>
		</Box>
	);
};
export default Post;
