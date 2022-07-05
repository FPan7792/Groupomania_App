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
import {
	faHeart,
	faPenToSquare,
	faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
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
	const couleurDuTexte = useColorModeValue("textes.sombre", "textes.white");
	const couleurDuCoeur = useColorModeValue("elements.bleu", "neutre");

	return (
		<Box
			key={post.post_id}
			m="20px auto"
			w="90%"
			p={5}
			borderRadius={10}
			color={couleurDuTexte}
			shadow={{ base: "xs", md: "0 2px 5px 1px rgba(0,0,0,0.1)" }}
		>
			<Flex justify="space-between" pos="relative">
				<Box>
					<Heading as="h2" size={{ base: "sm", md: "md" }} mb={2}>
						{post.title}
					</Heading>

					<Flex justify="center">
						<Text
							fontSize={{ base: "xx-small", md: "x-small" }}
							fontWeight="bold"
						>
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
				m={{ base: "30px 0 10px", md: "40px 0" }}
				p={{ base: "0", md: 10 }}
				border={{ base: "none", md: " 1px solid " }}
				borderColor={color}
				borderRadius="md"
				flexDir={{ base: "column-reverse", md: "row" }}
			>
				<Text
					p="10px"
					fontSize={{ base: "xs", md: "sm" }}
					w={{ base: "auto", md: 40, lg: "auto" }}
					minW="200px"
					m="20px 0"
					mr={10}
					borderRadius={10}
					flex={3}
					shadow={{ base: "none", md: "none" }}
				>
					{post.content}
				</Text>
				{post.is_image && (
					<Image
						borderRadius="lg"
						shadow="xs"
						mr={5}
						src={post.image_url}
						// boxSize="100px"
						objectFit="contain"
						flex={1}
						boxSize={{ base: "150px", md: "200px" }}
					></Image>
				)}
			</Flex>

			<Flex
				m="4px 0"
				justify={{
					base:
						Number(userId) === post.owner_id || isAdmin === true
							? "space-between"
							: "flex-end",
					md:
						Number(userId) === post.owner_id || isAdmin === true
							? "space-between"
							: "flex-end",
				}}
				h="30px"
			>
				{
					// USER 1 === ADMIN
					(Number(userId) === post.owner_id || isAdmin === true) && (
						<Box>
							<Button
								display={{ base: "none", md: "initial" }}
								mr=" 10px"
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
										true,
										colorMode === "light" ? "#4E5166" : "#FFD7D7"
									);
								}}
							>
								Supprimer
							</Button>

							<Button
								mr=" 10px"
								size="xs"
								colorScheme="red"
								display={{ base: "initial", md: "none" }}
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
								<FontAwesomeIcon icon={faTrashCan} />
							</Button>

							<Link to={`/post/${post.post_id}`}>
								<Button
									size="xs"
									colorScheme="yellow"
									display={{ base: "none", md: "initial" }}
								>
									Modifier
								</Button>
								<Button
									size="xs"
									colorScheme="yellow"
									display={{ base: "initial", md: "none" }}
								>
									<FontAwesomeIcon icon={faPenToSquare} />
								</Button>
							</Link>
						</Box>
					)
				}

				<Button
					size="xs"
					// pos="absolute"
					// right={0}
					// bottom={1.5}
					display={{ base: "none", md: "initial" }}
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
				<Button
					size="xs"
					display={{ base: "initial", md: "none" }}
					borderColor={color}
					variant="outline"
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
					<FontAwesomeIcon
						icon={faHeart}
						color={!aLike ? "#FD2D01" : couleurDuCoeur}
					/>
				</Button>
			</Flex>
		</Box>
	);
};
export default Post;
