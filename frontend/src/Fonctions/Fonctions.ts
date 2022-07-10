import Cookies from "js-cookie";

// CREATION du POST
export async function creerPost(
	formulaire: POST,
	image: HTMLInputElement | null
) {
	console.log(formulaire);

	const { title, content } = formulaire;
	let creationConfirmation = false;

	const nouveauPost = new FormData();
	title && title !== "" && nouveauPost.append("title", title);
	content && content !== "" && nouveauPost.append("content", content);
	Cookies.get("username") &&
		nouveauPost.append("username", Cookies.get("username") as string);

	if (image && image.files) {
		nouveauPost.append("image", image.files[0]);
	}

	// implémenter la validation avec useform
	await fetch("http://localhost:3003/posts/create", {
		method: "POST",
		headers: { Authorization: "Bearer " + Cookies.get("token") },
		body: nouveauPost,
	})
		.then(async (response) => {
			const resultat = await response.json();
			if (!response.ok) {
				throw new Error(resultat.message);
			} else return resultat;
		})
		.then((confirmation: any) => {
			console.log(confirmation);
			creationConfirmation = true;
		})
		.catch((err) => {
			console.log("error", err);
			return err;
		});

	return creationConfirmation;
}

// MODIFICATION du POST
export async function modifierPost(
	formulaire: POST,
	post_id: string,
	image: HTMLInputElement | null
) {
	console.log(formulaire);

	const { title, content } = formulaire;
	let modificationConfirmation = false;

	const nouveauPost = new FormData();
	nouveauPost.append("title", title);
	nouveauPost.append("content", content);
	nouveauPost.append("post_id", post_id);
	Cookies.get("username") &&
		nouveauPost.append("username", Cookies.get("username") as string);

	if (image && image.files && image.files?.length !== 0) {
		nouveauPost.append("image", image.files[0]);
	}

	await fetch("http://localhost:3003/posts/modify", {
		method: "POST",
		headers: { Authorization: "Bearer " + Cookies.get("token") },
		body: nouveauPost,
	})
		.then(async (response) => {
			const resultat = await response.json();
			if (!response.ok) {
				throw new Error(resultat.message);
			} else return resultat;
		})
		.then((confirmation: any) => {
			console.log(confirmation);
			modificationConfirmation = true;
		})
		.catch((err) => {
			console.log("error", err);
			return err;
		});

	return modificationConfirmation;
}

// suppression DE LA PHOTO
export async function supprimerLaPhoto(post: POST) {
	let modificationConfirmation = false;

	const nouveauPost = new FormData();
	nouveauPost.append("post_id", post.post_id.toString());
	nouveauPost.append("process", "process_deleteImage");

	await fetch("http://localhost:3003/posts/modify", {
		method: "POST",
		headers: { Authorization: "Bearer " + Cookies.get("token") },
		body: nouveauPost,
	})
		.then(async (response) => {
			const resultat = await response.json();
			if (!response.ok) {
				throw new Error(resultat.message);
			} else return resultat;
		})
		.then((confirmation: any) => {
			console.log(confirmation);
			modificationConfirmation = true;
		})
		.catch((err) => {
			console.log("error", err);
			return err;
		});

	console.log(modificationConfirmation);

	return modificationConfirmation;
}

// suppression DU POST
export async function supprimerPost(url: string, post_id: number) {
	const formulaireDeSuppression = new FormData();
	formulaireDeSuppression.append("post_id", post_id.toString());

	await fetch(url, {
		method: "POST",
		headers: { Authorization: "Bearer " + Cookies.get("token") },
		body: formulaireDeSuppression,
	})
		.then(async (response) => {
			const resultat = await response.json();
			if (!response.ok) {
				throw new Error(resultat.message);
			} else return resultat;
		})
		.then((confirmation: any) => {
			console.log(confirmation);
		})
		.catch((err) => {
			console.log("error", err);
			return err;
		});
}

// notification UX
import { Notyf } from "notyf";
import { POST } from "../Types/types";
export function activeNotif(message: string, success: boolean, color: string) {
	const notyf = new Notyf({
		duration: 4000,
		position: {
			x: "right",
			y: "bottom",
		},
		types: [
			// {
			// 	type: "warning",
			// 	background: "orange",
			// 	icon: {
			// 		className: "material-icons",
			// 		tagName: "i",
			// 		text: "warning",
			// 	},
			// },
			{
				type: "error",
				background: color,
				duration: 2000,
				dismissible: true,
			},
			{
				type: "success",
				background: color,
				duration: 2000,
				dismissible: true,
			},
		],
	});

	if (success) {
		notyf.success(message);
	} else notyf.error(message);
}

// like / dislike
export async function likerPost(nouveauLikes: number[], post_id: number) {
	const formulaire = new FormData();
	formulaire.append("usersIds_likes", JSON.stringify(nouveauLikes));
	formulaire.append("post_id", post_id.toString());

	await fetch("http://localhost:3003/posts/like", {
		method: "POST",
		headers: { Authorization: "Bearer " + Cookies.get("token") },
		body: formulaire,
	})
		.then(async (response) => {
			const resultat = await response.json();
			if (!response.ok) {
				throw new Error(resultat.message);
			} else return resultat;
		})
		.then((confirmation: any) => {
			console.log(confirmation);
		})
		.catch((err) => {
			console.log("error", err);
			return err;
		});
}
