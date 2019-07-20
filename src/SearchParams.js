import React, { useState, useEffect } from "react";
import pet, { ANIMALS } from '@frontendmasters/pet';
import Results from './Results';
import useDropdown from './useDropdown';

const SearchParams = function(){
	const [location, setLocation] = useState('Seattle, WA');	
	const [breeds, setBreeds] = useState([]);
	const [animal, AnimalDropdown] = useDropdown('Animal', 'dog', ANIMALS);
	const [breed, BreedDropdown, setBreed] = useDropdown('Breed', '', breeds);
	const [pets, setPets] = useState([]);

	async function requestPets(){
		const { animals } = await pet.animals({
			location,
			breed,
			type: animal
		});

		setPets(animals || []);
		console.log(animals);
		console.log(pets);
	}

	useEffect(() => {
		setBreeds([]);
		setBreed("");

		pet.breeds(animal).then(({ breeds }) => {
			const breedStrings = breeds.map(({ name }) => name);
			setBreeds(breedStrings);
		}, error => console.error);
	}, [animal, setBreed, setBreeds]);

	return (
		<div className='search-params'>
		<h1>{location}</h1>
			<form onSubmit={(e) => {
				e.preventDefault();
				requestPets();
			}}>
				<label htmlFor='location'>
					Location
					<input id='location' value={location} placeholder='location' onChange={e => setLocation(e.target.value)}/>
				</label>
				<AnimalDropdown />
				<BreedDropdown />
				<button>Submit</button>
				<Results pets={pets} />
			</form>
		</div>

	);
};

export default SearchParams;