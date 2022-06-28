// types
import { POST } from "../types";
type Props = {
	posts: POST[] | null;
	userId: string | number | null;
	refresh: React.Dispatch<React.SetStateAction<number>>;
	isAdmin: boolean | null;
};

// composants css & icones
import { Box } from "@chakra-ui/react";
import Post from "./Post";

const AccueilPostes = (Props: Props) => {
	const { posts, userId, refresh, isAdmin } = Props;

	return (
		<Box>
			{posts?.map((post) => {
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
export default AccueilPostes;
