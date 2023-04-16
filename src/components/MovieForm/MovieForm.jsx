import React, { useState } from "react";
import MultiSelectDropdown from '../MultiSelectDropdown/MultiSelectDropdown';
import Button from "../Button/Button";
import './MovieForm.css';

const MovieForm = (props) => {
	
	const multiSelectOptions = [
		{ value: "Drama", label: "Drama" },
		{ value: "Romance", label: "Romance" },
		{ value: "Animation", label: "Animation" },
		{ value: "Adventure", label: "Adventure" },
		{ value: "Family", label: "Family" },
		{ value: "Comedy", label: "Comedy" },
		{ value: "Fantasy", label: "Fantasy" },
		{ value: "Science Fiction", label: "Science Fiction" },
		{ value: "Action", label: "Action" }
	];

	const onEditSelectedOptions = props.formData.genres;
	const arrSetGenres = [];

	// set existing genres if any into correct object format for multi-select options
	onEditSelectedOptions?.map((genre) => {
		arrSetGenres.push({value: `${genre}`, label: `${genre}`});
	});

	const [optionSelected, setOptionSelected] = useState(arrSetGenres);
	const [formState, setFormState] = useState(props.formData)
	const { formAction } = props;

	const handleSelectChange = (genres) => {
		setOptionSelected(genres);
	}

	const handleInputChange = (evt) => {
		const value = evt.target.value;
		setFormState({
			...formState,
			[evt.target.name]: value
		});
	}

	const handleSubmit = (event) => {

		event.preventDefault();

		const formDataSubmit = Object.fromEntries(new FormData(event.target));

		if(formAction === 'delete'){
			props.handleSubmit(formState.id,'delete');
			props.handleCloseModal();
		}
		else{
			const arrOptionSelected = [];
			// convert selected options back to simple array
			if(optionSelected.length > 1){
				optionSelected?.map((genre) => {
					arrOptionSelected.push(genre.value);
				});
			}
			
			formDataSubmit.genres = arrOptionSelected;	

			props.handleSubmit(formDataSubmit);
			props.handleCloseModal();
		}
	}

	const resetForm = () => {

		setFormState({
			title: "",
			poster_path: "",
			vote_average: "",
			release_date: "",
			runtime: "",
			overview: "",
		});
		
		setOptionSelected([])
	}

	return (

		<div className="movieFormWrapper">
			<div className="movieFormBoxTitle">{`${formAction} movie`}</div>
			<div className="movieForm">
				<form onSubmit={handleSubmit}>
				{formAction === 'delete' 
					?	<div className="deleteMovieContent">
							<div className="deleteMovieBody">Are you sure you want to delete this movie?</div>
							<div className="deleteMovieFooter">
								<Button type="submit" className="movieFormSubmitBtn">Confirm</Button>
							</div>
						</div>
					
					: <div className="movieFormContent">
							<div className="inputRow">
								<div className="movieTitle">
									<label htmlFor="movieTitle" className="movieFormLabel">Title</label>
									<input 
										type="text" 
										className="movieTitleInput" 
										name="title" 
										id="movieTitle" 
										value={formState.title}
										onChange={handleInputChange}
									/>
								</div>
								<div className="movieReleaseDate" >
									<label htmlFor="movieReleaseDate" className="movieFormLabel">Release date</label>
									<input 
										type="date" 
										name="release_date" 
										id="movieReleaseDate" 
										value={formState.release_date}
										onChange={handleInputChange}
									/>
								</div>
							</div>
							<div className="inputRow">
								<div className="movieUrl">
									<label htmlFor="movieUrl" className="movieFormLabel">Movie url</label>
									<input 
										type="text" 
										name="poster_path" 
										id="movieUrl" 
										value={formState.poster_path}
										onChange={handleInputChange}
									/>
								</div>
								<div className="movieRating">
									<label htmlFor="movieRating" className="movieFormLabel">Rating</label>
									<input 
										type="text" 
										name="vote_average" 
										id="movieRating" 
										value={formState.vote_average}
										onChange={handleInputChange} 
									/>
								</div>
							</div>
							<div className="inputRow">
								<div className="movieGenreSelect">
									<label htmlFor="movieGenre" className="movieFormLabel">Genre</label>
									<MultiSelectDropdown 
										options={multiSelectOptions}
										defaultValue={optionSelected}
										handleSelectChange={handleSelectChange}
										isMulti={true}
										className="movieFormOptions"
									/>
								</div>
								<div className="movieRuntime">
									<label htmlFor="movieRuntime" className="movieFormLabel">Runtime</label>
									<input 
										type="text" 
										name="runtime" 
										id="movieRuntime" 
										value={formState.runtime}
										onChange={handleInputChange} 				
									/>
								</div>
							</div>
							<div className="inputRow textarea" >
								<label htmlFor="movieOverview" className="movieFormLabel">Overview</label>
								<textarea 
									name="overview" 
									id="movieOverview" 
									value={formState.overview}
									onChange={handleInputChange} 
								>
								</textarea>
							</div>
							<div className="formButtonsWrapper">
								<Button type="button" className="movieFormResetBtn" onClick={resetForm}>Reset</Button>
								<Button type="submit" className="movieFormSubmitBtn">Submit</Button>
							</div>
						</div>
					}
				</form>
			</div>
		</div>
	)
}

export default MovieForm;