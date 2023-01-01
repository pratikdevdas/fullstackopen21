import React from "react";
import { useQuery } from "@apollo/client";
import { USER,ALL_BOOKS } from "../queries";
import Books from "./Books";

const Recommend = (props) => {
  const result = useQuery(USER);
  const resultBook = useQuery(ALL_BOOKS);
  const fav = result.data.me.favoriteGenre;
  const books = resultBook.data.allBooks

  if (!props.show) {
    return null;
  }

  return (<div>
    <h2>recommendations</h2>
    recommended books on your favorite genre <b>{fav}</b>
    <div>
    <Books genre={fav} books={books}/>
    </div>
  </div>)
};

export default Recommend;
