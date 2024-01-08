import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const api = 'https://api.unsplash.com/photos';
const accessId = 'wancXgzb3dSK3y79Af-5z1D4pDEIZUKxNWvxy8PHAtA';

export default function AlbumPhoto() {
	const { id } = useParams();

	const [photo, setPhoto] = useState({});

	useEffect(() => {
		(async () => {
			const response = await axios.get(`${api}/${id}?client_id=${accessId}`);

			setPhoto(response.data);
		})()
	}, [id, photo]);

	const navigate = useNavigate();

	return (
		<>
			<button type="button" className="btn btn-outline-primary" onClick={() => {
				navigate(-1);
			}}>回到上一頁</button>
			這是單張圖片 {id}
			<p>{photo.description}</p>
			<img src={photo?.urls?.regular} className="img-fluid" alt="" />
		</>
	);
}