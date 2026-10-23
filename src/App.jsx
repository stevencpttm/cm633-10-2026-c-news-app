import { useState, useEffect } from "react";

function App() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    // componentDidMount

    fetchPosts();
  }, []);

  useEffect(() => {
    setFilteredPosts(posts);
  }, [posts]);

  useEffect(() => {
    const newPosts = [...posts].filter((post) => {
      return post.title.toLowerCase().includes(query.toLowerCase());
    });

    setFilteredPosts(newPosts);
  }, [query]);

  const fetchPosts = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();

    setPosts(data);
  };

  return (
    <div>
      <h1>Post List</h1>
      <hr />
      <input
        type="text"
        style={{
          width: "100%",
          backgroundColor: "yellow",
          padding: 12,
          fontSize: 32,
        }}
        placeholder="Your keyword..."
        value={query}
        onInput={(e) => {
          setQuery(e.target.value);
        }}
      />
      <hr />

      {filteredPosts.map((post) => {
        return (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <hr />
          </div>
        );
      })}
    </div>
  );
}

export default App;
