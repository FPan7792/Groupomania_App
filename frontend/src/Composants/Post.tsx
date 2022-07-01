// composants css & icones
import {
	Box,
	Button,
	Text,
	Image,
	Heading,
	Flex,
	useColorMode,
	useColorModeValue,
} from "@chakra-ui/react";
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

	const { colorMode } = useColorMode();
	const color = useColorModeValue("gray.200", "fond.dark");
	const buttonColor = useColorModeValue("primaire", "secondaire");

	return (
		<Box
			key={post.post_id}
			m={8}
			p={10}
			borderRadius={10}
			shadow="
			0 2px 5px 1px rgba(0,0,0,0.1)"
			// border="1px solid"
			borderColor={colorMode === "light" ? "fond.dark" : "fond.light"}
		>
			<Flex justify="space-between" pos="relative">
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
						{/* {post.createdAt !== post.updatedAt && (
							<Text fontSize="x-small" fontStyle="italic">
								{" "}
								(modifié)
							</Text>
						)} */}
					</Flex>
					<Text
						pos="absolute"
						fontWeight="bold"
						right={2}
						top={2}
						fontSize="xs"
						colorScheme="pink"
					>
						{nombreDeLikes}{" "}
						<FontAwesomeIcon icon={faHeart} color={"#FFD7D7"} />
					</Text>
				</Box>
			</Flex>

			<Flex
				w="100%"
				m="40px 0"
				p={10}
				border=" 1px solid "
				borderColor={color}
				borderRadius="md"
			>
				<Text
					p="10px"
					fontSize="sm"
					m="20px 0"
					mr={10}
					// border="2px solid white"
					borderRadius={10}
					flex={3}
				>
					{" "}
					{post.content}
				</Text>
				{post.is_image && (
					<Image
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
								mr=" 10px"
								size="xs"
								colorScheme="red"
								// bgColor="primaire"
								onClick={async () => {
									await supprimerPost(
										"http://localhost:3003/posts/delete",
										post.post_id
									);
									await refresh((ice) => ice + 1);

									activeNotif(
										"Le post à bien été supprimé ",
										true,
										colorMode === "light" ? "#4E5166" : "#FFD7D7"
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

				<Button
					size="xs"
					pos="absolute"
					right={0}
					bottom={0}
					colorScheme={"pink"}
					bgColor={!aLike ? "none" : "whitesmoke"}
					color={
						colorMode === "dark"
							? "#4E5166"
							: !aLike
							? "whitesmoke"
							: "#4E5166"
					}
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
