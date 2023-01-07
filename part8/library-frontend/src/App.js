import { useState, useEffect } from "react";
import { useApolloClient, useSubscription } from "@apollo/client";
import Authors from "./components/Authors";
import BookContainer from "./components/BookContainer";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import Recommend from "./components/Recommend";
import { BOOK_ADDED } from "./queries";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const [notify, setNotify] = useState(null);
  const client = useApolloClient();

  useSubscription(BOOK_ADDED,{ 
    onData: ({data})=>{
      setNotify(`${data.data.bookAdded.title} added` )
        setTimeout(()=>{setNotify(null)},5000)
    }
  })

  useEffect(() => {
    const storedToken= localStorage.getItem('library-user-token')
    if(storedToken){
      setToken(storedToken)
    }
  }, [])
  
  const logout = () => {
    client.resetStore();
    setToken(null);
    localStorage.clear();
    setPage("authors");
  };

  if (!token) {
    return (
      <div>
        <div>
          <button onClick={() => setPage("authors")}>authors</button>
          <button onClick={() => setPage("books")}>books</button>
          <button onClick={() => setPage("login")}>Login</button>
        </div>

        <Authors show={page === "authors"} />
        <BookContainer show={page === "books"} />
        <Login show={page === "login"} setToken={setToken} />
      </div>
    );
  }

  return (
    <div>
      {notify}
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add books</button>
        <button onClick={() => setPage("recommend")}>recommend</button>
        <button onClick={logout}>logout</button>
      </div>

      <Authors show={page === "authors"} />
      <BookContainer show={page === "books"} />
      <NewBook show={page === "add"} />
      <Recommend show={page === "recommend"} />
    </div>
  );
};

export default App;
