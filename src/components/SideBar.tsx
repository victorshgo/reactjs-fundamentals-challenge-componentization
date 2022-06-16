import { Button } from "./Button";

import { GenreResponseProps } from "../@types/genre.model";

import "../styles/sidebar.scss";

interface SideBarProps {
  id: number;
  genres: GenreResponseProps[];
  handleClickButton: Function;
}

export function SideBar({ id, genres, handleClickButton }: SideBarProps) {
  return (
    <nav className="sidebar">
      <span>
        Watch<p>Me</p>
      </span>

      <div className="buttons-container">
        {genres.map((genre) => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={id === genre.id}
          />
        ))}
      </div>
    </nav>
  );
}
