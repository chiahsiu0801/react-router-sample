import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

import List from "../components/List";

const api = 'https://api.unsplash.com/search/photos';
const accessId = 'wancXgzb3dSK3y79Af-5z1D4pDEIZUKxNWvxy8PHAtA';

export default function AlbumSearch() {
	const [search, setSearch] = useState('');
	const [list, setList] = useState([]);
	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		if(search !== null && search !== '') {
			(async () => {
				const response = await axios.get(`${api}?client_id=${accessId}&query=${search}`);
				const { results } = response.data;
				
				setList(results);
			})();
		}
	}, [search]);

	useEffect(() => {
		setSearch(searchParams.get('query'));
	}, [searchParams]);

	return (
		<>
			這是搜尋頁面{search}
			<input type="text" className="form-control" defaultValue={search} onKeyUp={(e) => {
				if(e.code === 'Enter') {
					setSearchParams({query: e.target.value});
				}
			}} />
			<List list={list} />
		</>
	);
}