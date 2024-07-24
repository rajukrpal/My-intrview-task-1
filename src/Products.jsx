import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

const Products = () => {
  const [getProduct, setGetProduct] = useState([]);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setGetProduct(storedProducts);
    console.log("getProduct", getProduct);
  }, []);

  return (
    <>
    <div className="p-3">
        <Link to={"/"}>Back to Home</Link>
    </div>
    <div className="p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-1">
    {getProduct.length === 0 ? (
      <p>No products available.</p>
    ) : (
        getProduct.map((product, index) => (
        <div className="flex justify-center" key={index}>
          <Card style={{ width: "18rem" }}>
            <Card.Img className="h-40" variant="top" src={product.image} />
            <Card.Body>
              <Card.Title>Product Name: {product.name}</Card.Title>
              <Card.Text>
                <strong>Price:</strong> ₹ {product.price}
              </Card.Text>
              <Card.Text>
                <strong>GST:</strong> {product.gst} %
              </Card.Text>
              <Card.Text>{product.description}</Card.Text>
            </Card.Body>
          </Card>
        </div>
      ))
    )}
  </div>
  </>
  );
};

export default Products;
