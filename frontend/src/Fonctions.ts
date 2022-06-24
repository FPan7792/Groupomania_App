import Cookies from "js-cookie";

// suppression
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
export function activeNotif(message: string, success: boolean) {
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
			// {
			// 	type: "error",
			// 	background: "indianred",
			// 	duration: 2000,
			// 	dismissible: true,
			// },
			// {
			// 	type: "success",
			// 	background: "lightpink",
			// 	duration: 2000,
			// 	dismissible: true,
			// },
		],
	});

	if (success) {
		notyf.success(message);
	} else notyf.error(message);
}
