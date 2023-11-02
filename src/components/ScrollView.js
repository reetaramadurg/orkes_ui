import { useEffect, useState } from "react";
import "./ScrollView.css";
export default function ScrollView() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    getList();
  }, []);
  const getList = async () => {
    setIsLoading(true);
    setError(null);

    // const url =
    //   "https://englishapi.pinkvilla.com/app-api/v1/photo-gallery-feed-page/page/1";
    //this url is throwing cors errors, so using another mock url to get almost similar JSON mentioned in the problem statement.

    await fetch("https://dummyjson.com/products?page=${page}")
      .then((res) => res.json())
      .then((json) => {
        setProducts(json.products);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });

    setProducts((prevItems) => [...prevItems, ...products]);
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading]);
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isLoading
    ) {
      return;
    }
    getList();
  };

  return (
    <div className="container">
      <h1>Product List</h1>
      {products.map((product) => (
        <div className="product">
          <img
            src={product.thumbnail}
            className="imageTile"
            alt="product image"
          />
          <div>
            <h2 key={product.id}>{product.title}</h2>
            <div>{product.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
