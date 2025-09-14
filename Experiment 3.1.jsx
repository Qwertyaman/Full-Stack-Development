import React from "react";

const ProductCard = ({ name, price, status }) => {
  return (
    <div style={styles.card}>
      <h3 style={styles.title}>{name}</h3>
      <p>Price: ${price}</p>
      <p>Status: {status}</p>
    </div>
  );
};

const App = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Products List</h2>
      <div style={styles.cardContainer}>
        <ProductCard name="Wireless Mouse" price="25.99" status="In Stock" />
        <ProductCard name="Keyboard" price="45.5" status="Out of Stock" />
        <ProductCard name="Monitor" price="199.99" status="In Stock" />
      </div>
    </div>
  );
};

const styles = {
  container: {
    border: "1px solid black",
    padding: "20px",
    margin: "20px",
    textAlign: "center",
  },
  header: {
    marginBottom: "20px",
  },
  cardContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
  },
  card: {
    border: "1px solid lightgray",
    borderRadius: "8px",
    padding: "15px",
    width: "180px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
  title: {
    fontWeight: "bold",
    marginBottom: "10px",
  },
};

export default App;
