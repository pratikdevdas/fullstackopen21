import React from "react";

const Books = ({ books, genre }) => {
  const filteredValue = genre
    ? books.filter((a) => a.genres.includes(genre))
    : books;
  return (
    <div>
      {" "}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredValue?.map((a,i) => (
        <tr key={i}>
          <td>{a.title}</td>
          <td>{a.author.name}</td>
          <td>{a.published}</td>
        </tr>
      ))}
        </tbody>
      </table>
      
    </div>
  );
};

export default Books;
