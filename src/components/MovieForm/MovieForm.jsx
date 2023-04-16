import React, { useState } from "react";
import MultiSelectDropdown from '../MultiSelectDropdown/MultiSelectDropdown';
import Button from "../Button/Button";
import styles from "./MovieForm.module.scss";

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

		<div className={styles.movieFormWrapper}>
			<div className={styles.movieFormBoxTitle}>{`${formAction} movie`}</div>
			<div className={styles.movieForm}>
				<form onSubmit={handleSubmit}>
				{formAction === 'delete' 
					?	<div className={styles.deleteMovieContent}>
							<div className={styles.deleteMovieBody}>Are you sure you want to delete this movie?</div>
							<div className={styles.deleteMovieFooter}>
								<Button type="submit" className={styles.movieFormSubmitBtn}>Confirm</Button>
							</div>
						</div>
					
					: <div className={styles.movieFormContent}>
							<div className={styles.inputRow}>
								<div className={styles.movieTitle}>
									<label htmlFor="movieTitle" className={styles.ovieFormLabel}>Title</label>
									<input 
										type="text" 
										className={styles.movieTitleInput} 
										name="title" 
										id="movieTitle" 
										value={formState.title}
										onChange={handleInputChange}
									/>
								</div>
								<div className={styles.movieReleaseDate} >
									<label htmlFor="movieReleaseDate" className={styles.movieFormLabel}>Release date</label>
									<input 
										type="date" 
										name="release_date" 
										id="movieReleaseDate" 
										value={formState.release_date}
										onChange={handleInputChange}
									/>
								</div>
							</div>
							<div className={styles.inputRow}>
								<div className="movieUrl">
									<label htmlFor="movieUrl" className={styles.movieFormLabel}>Movie url</label>
									<input 
										type="text" 
										name="poster_path" 
										id="movieUrl" 
										value={formState.poster_path}
										onChange={handleInputChange}
									/>
								</div>
								<div className="movieRating">
									<label htmlFor="movieRating" className={styles.movieFormLabel}>Rating</label>
									<input 
										type="text" 
										name="vote_average" 
										id="movieRating" 
										value={formState.vote_average}
										onChange={handleInputChange} 
									/>
								</div>
							</div>
							<div className={styles.inputRow}>
								<div className={styles.movieGenreSelect}>
									<label htmlFor="movieGenre" className={styles.movieFormLabel}>Genre</label>
									<MultiSelectDropdown 
										options={multiSelectOptions}
										defaultValue={optionSelected}
										handleSelectChange={handleSelectChange}
										isMulti={true}
										className={styles.movieFormOptions}
									/>
								</div>
								<div className={styles.movieRuntime}>
									<label htmlFor="movieRuntime" className={styles.movieFormLabel}>Runtime</label>
									<input 
										type="text" 
										name="runtime" 
										id="movieRuntime" 
										value={formState.runtime}
										onChange={handleInputChange} 				
									/>
								</div>
							</div>
							<div className={`${styles.inputRow} ${styles.textarea}`} >
								<label htmlFor="movieOverview" className={styles.movieFormLabel}>Overview</label>
								<textarea 
									name="overview" 
									id="movieOverview" 
									value={formState.overview}
									onChange={handleInputChange} 
								>
								</textarea>
							</div>
							<div className={styles.formButtonsWrapper}>
								<Button type="button" className={styles.movieFormResetBtn} onClick={resetForm}>Reset</Button>
								<Button type="submit" className={styles.movieFormSubmitBtn}>Submit</Button>
							</div>
						</div>
					}
				</form>
			</div>
		</div>
	)
}

export default MovieForm;