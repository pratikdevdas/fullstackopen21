import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";
import { useState } from "react";
import Books from "./Books";

const BookContainer = (props) => {
  const [genre, setGenre] = useState(null);

  const result = useQuery(ALL_BOOKS);
  const resultBasedOnGenre = useQuery(ALL_BOOKS,{
    variables: genre,
    skip: !genre
  });

  if (!props.show) {
    return null;
  }

  const booksBasedOnGenre = resultBasedOnGenre?.data?.allBooks

  const books = result?.data?.allBooks;
  let array = [];
  books.forEach((element) => (array = element.genres.concat(array)));
  const uniq = [...new Set(array)];

  const bookValue = genre ? booksBasedOnGenre : books

  return (
    <div>
      <h2>books</h2>
      {uniq?.map((a,i) => (
        <button key={i} onClick={() => setGenre(a)}>{a}</button>
      ))}
      <div>{genre && <>in genre {genre}</>}</div>
      <Books books={bookValue} genre={genre} />
    </div>
  );
};

export default BookContainer;
