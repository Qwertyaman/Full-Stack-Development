import React, { useState } from "react";

const LibraryManagement = () => {
  // Initial book list
  const [books, setBooks] = useState([
    { title: "1984", author: "George Orwell" },
    { title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
    { title: "To Kill a Mockingbird", author: "Harper Lee" },
  ]);

  const [search, setSearch] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");

  // Add new book
  const addBook = () => {
    if (newTitle.trim() === "" || newAuthor.trim() === "") return;
    setBooks([...books, { title: newTitle, author: newAuthor }]);
    setNewTitle("");
    setNewAuthor("");
  };

  // Remove book
  const removeBook = (index) => {
    setBooks(books.filter((_, i) => i !== index));
  };

  // Filtered books based on search
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <h2>Library Management</h2>

      {/* Search box */}
      <input
        type="text"
        placeholder="Search by title or author"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.input}
      />

      {/* Add book form */}
      <div style={styles.form}>
        <input
          type="text"
          placeholder="New book title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          style={styles.inputSmall}
        />
        <input
          type="text"
          placeholder="New book author"
          value={newAuthor}
          onChange={(e) => setNewAuthor(e.target.value)}
          style={styles.inputSmall}
        />
        <button onClick={addBook} style={styles.button}>
          Add Book
        </button>
      </div>

      {/* Book List */}
      {filteredBooks.map((book, index) => (
        <div key={index} style={styles.bookCard}>
          <strong>{book.title}</strong> by {book.author}
          <button
            style={styles.removeButton}
            onClick={() => removeBook(index)}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

// Simple inline styles
const styles = {
  container: {
    border: "1px solid black",
    padding: "20px",
    margin: "20px",
    width: "400px",
  },
  input: {
    width: "100%",
    padding: "8px",
    marginBottom: "10px",
  },
  inputSmall: {
    padding: "8px",
    marginRight: "5px",
  },
  button: {
    padding: "8px 12px",
    cursor: "pointer",
  },
  form: {
    marginBottom: "15px",
  },
  bookCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px solid lightgray",
    padding: "10px",
    marginBottom: "8px",
    borderRadius: "5px",
  },
  removeButton: {
    background: "#f44336",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default LibraryManagement;