import React, { useState, useEffect } from "react";
import './App.css';
import Dialog from './components/Dialog/Dialog';
import MovieForm from './components/MovieForm/MovieForm';
import MovieListPage from './components/MovieListPage/MovieListPage';

function App() {

  const [movies, setMovies] = useState([]);
  const [movieDetailsOnSubimt, setMovieDetailsOnSubmit] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [searchBy, setSearchBy] = useState('title');
  const [sortSelected, setSortSelected] = useState("release_date");
  const [modalOpen, setModalVisibility] = useState(false);
  const [formAction, setFormAction] = useState(false);
  const [formData, setFormData] = useState(false);
  const moviesUrl = `http://localhost:4000/movies?search=${searchQuery}&searchBy=${searchBy}&sortBy=${sortSelected}&sortOrder=asc`;

  const genresAll = [
    "All", 
    "Drama", 
    "Romance", 
    "Animation", 
    "Advaneture",
    "Family", 
    "Comedy",
    "Fantasy",
    "Science Fiction",
    "Action"
  ];

  useEffect(() => {
    
    fetch(moviesUrl)
      .then((response) => response.json())
        .then((res) => {
          setMovies(res.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
  }, [sortSelected, searchQuery, searchBy]);
 
  const handleSearch = (searchQuery) => {
    setSearchQuery(searchQuery);
    setSearchBy('title');
  }

  const handleSortSelection = (sortBy) => {
    setSortSelected(sortBy);
  }

  const handleCloseModal = () => {
    setModalVisibility(false);
    setFormAction(false);
  }
  
  const handleSubmit = (formData, action) => {
    // console.log(formData)
    setMovieDetailsOnSubmit(formData);
  }

  const showDialogMovieForm  = (action, movie) => {
    setModalVisibility(true);
    setFormAction(action);
    setFormData(movie);
  }

  const showMoviesByGenre = (selectedGenre) => {
    if(selectedGenre === "All"){
      setSearchQuery('');
    }
    else{
      setSearchQuery(selectedGenre);
      setSearchBy('genres');
    }
  }

  return (
    <div className="App">
      <MovieListPage 
        showDialogMovieForm={showDialogMovieForm}
        genresUnique={genresAll}
        sortSelected={sortSelected}
        handleSortSelection={handleSortSelection}
        movies={movies}
        handleSearch={handleSearch}
        showMoviesByGenre={showMoviesByGenre}
      />
      <Dialog handleCloseModal={handleCloseModal} modalOpen={modalOpen} >
        {formAction &&
          <MovieForm 
            genres={genresAll} 
            handleSubmit={handleSubmit} 
            formData={formData} 
            handleCloseModal={handleCloseModal}
            formAction={formAction}
          />
        }
      </Dialog>
    </div>
  );
}

export default App;
