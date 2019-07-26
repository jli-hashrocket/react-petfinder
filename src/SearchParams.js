import React, { useState, useEffect, useContext } from "react";
import pet, { ANIMALS } from '@frontendmasters/pet';
import Results from './Results';
import useDropdown from './useDropdown';
import ThemeContext from './ThemeContext';

const SearchParams = function(){
	const [location, setLocation] = useState('Seattle, WA');	
	const [breeds, setBreeds] = useState([]);
	const [animal, AnimalDropdown] = useDropdown('Animal', 'dog', ANIMALS);
	const [breed, BreedDropdown, setBreed] = useDropdown('Breed', '', breeds);
	const [pets, setPets] = useState([]);
	const [theme, setTheme] = useContext(ThemeContext);

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
				<label htmlFor='theme'>
					Theme
					<select
						value={theme}
						onChange={e => setTheme(e.target.value)}
						onBlur={e => setTheme(e.target.value)}>
						<option value="peru">Peru</option>
						<option value="darkblue">Dark blue</option>
						<option value="mediumorchid">Medium Orchid</option>
						<option value="chartreuse">Chartreuse</option>
					</select>
				</label>
				<button style={{ backgroundColor: theme }}>Submit</button>
				<Results pets={pets} />
			</form>
		</div>

	);
};

export default SearchParams;