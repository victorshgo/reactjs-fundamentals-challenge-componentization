import { useEffect, useState } from "react";

import { SideBar } from "./components/SideBar";
import { Content } from "./components/Content";

import { GenreProps } from "./@types/genre.model";
import { MovieProps } from "./@types/movies.model";

import { api } from "./services/api";

import "./styles/global.scss";

export function App() {
  const [genres, setGenres] = useState<GenreProps[]>([]);
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState<GenreProps>(
    {} as GenreProps
  );

  useEffect(() => {
    api.get<GenreProps[]>("genres").then((response) => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    api
      .get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`)
      .then((response) => {
        setMovies(response.data);
      });

    api.get<GenreProps>(`genres/${selectedGenreId}`).then((response) => {
      setSelectedGenre(response.data);
    });
  }, [selectedGenreId]);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <SideBar
        id={selectedGenreId}
        genres={genres}
        handleClickButton={handleClickButton}
      />
      <Content title={selectedGenre.title} movies={movies} />
    </div>
  );
}
