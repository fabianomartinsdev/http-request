import { useState } from "react";

import { useFetch } from "./hooks/useFetch";

import "./App.css";

const url = "http://localhost:3000/products";

function App() {
  // 1 - resgate de dados
  const { data: items, httpConfig } = useFetch(url);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  // 2 - add de produtos
  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = {
      name,
      price,
    };

    httpConfig(product, "POST");

    setName("");
    setPrice("");
  };

  return (
    <>
      <h1>Lista de Produtos</h1>

      <ul>
        {items &&
          items.map((product) => {
            return (
              <div key={product.id}>
                <li>
                  {product.name} - R$: {product.price}
                </li>
              </div>
            );
          })}
      </ul>
      <div className="add-product">
        <form onSubmit={handleSubmit}>
          <label htmlFor="">
            Produto:
            <input
              type="text"
              value={name}
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label htmlFor="">
            Preço:
            <input
              type="number"
              value={price}
              name="price"
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          <input type="submit" value="Criar" />
        </form>
      </div>
    </>
  );
}

export default App;
