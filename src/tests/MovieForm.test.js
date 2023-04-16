import React from 'react';
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react';
import MovieForm from '../components/MovieForm';

describe('App MovieForm', () => {

	const objInitialForm = {
		formData: {
				id: 321612,
				title: "Beauty and the Beast",
				tagline: "Be our guest.",
				vote_average: 6.8,
				vote_count: 7861,
				release_date: "2017-03-16",
				poster_path: "https://image.tmdb.org/t/p/w500/tWqifoYuwLETmmasnGHO7xBjEtt.jpg",
				overview: "A live-action adaptation of Disney's version of the classic tale of a cursed prince and a beautiful young woman who helps him break the spell.",
				budget: 160000000,
				revenue: 1263521126,
				genres: [
						"Family",
						"Fantasy",
						"Romance"
				],
				runtime: 129
		},
		onSubmit: jest.fn(),
		handleSubmit: jest.fn(),
		handleCloseModal: jest.fn(),
		formAction: 'editMovie'
	}

	it("should render the component with the default values", () => {

			render(<MovieForm {...objInitialForm}/>);
			const { formData } = objInitialForm; 
			const { title, vote_average } = formData;
			const movieTitle = screen.getByDisplayValue(title)
			const movieRating = screen.getByDisplayValue(vote_average)

			expect(movieTitle).toBeInTheDocument();
			expect(movieRating).toBeInTheDocument();
	});

  it('passing correct data when submit the form', () => {

			render(<MovieForm {...objInitialForm}/>);

			const { formData, handleSubmit } = objInitialForm; 
			const { title } = formData;
			const submitBtn = screen.getByRole('button', { name: /submit/i })

			fireEvent.click(submitBtn);

			expect(handleSubmit).toBeCalledWith(
				expect.objectContaining({
					title: title
				})
			);  
  });
});