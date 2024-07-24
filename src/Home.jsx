import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

const Home = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [gst, setGst] = useState("");
  const [description, setDescription] = useState("");
  const [products, setProducts] = useState([]); // all product aaye ga 
  const [editMode, setEditMode] = useState(false);
  const [editProduct, setEditProduct] = useState(null); 
  const [error,setError] = useState({
    image:"",
    name: "",
    price: "",
    gst: "",
    description: "",
  })


  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(storedProducts);

    // ------QUESTION-----
    // if(0.4+0.1+0.5-0.3 === 0.7){
    //   console.log("true")
    // }else{
    //   console.log("false")
    // }
    // console.log("3" + "3" - 3)
    // console.log("13" + "3" + "20")
    // console.log(+33 + "30")
    // console.log("33" + 30)
    // console.log(+33 - "30")
    // console.log("33" - 30)

  }, []);

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

   

    const newProduct = {
      id: editMode ? editProduct.id : new Date().getTime(),
      image: image || (editMode ? editProduct.image : null),
      name: name,
      price: price,
      gst: gst,
      description: description,
    };


    let formIsValid = true;
    const newErrors = {
      image:null,
      name: "",
      price: "",
      gst: "",
      description: "",
    };

    if (image === null) {
      newErrors.image = "Product Image is required";
      formIsValid = false;
    }

    if (name.trim() === "") {
      newErrors.name = "Product Name is required";
      formIsValid = false;
    }

    if (price.trim() === "") {
      newErrors.price = "Price is required";
      formIsValid = false;
    }

    if (gst.trim() === "") {
      newErrors.gst = "GST is required";
      formIsValid = false;
    }

    if (description.trim() === "") {
      newErrors.description = "Description is required";
      formIsValid = false;
    }

    if (!formIsValid) {
      setError(newErrors);
      return;
    }

    if (editMode) {
      const updatedProducts = products.map((product) =>
        product.id === editProduct.id ? newProduct : product
      );
      setProducts(updatedProducts);
      localStorage.setItem("products", JSON.stringify(updatedProducts));
    } else {
      const updatedProducts = [...products, newProduct];
      setProducts(updatedProducts);
      localStorage.setItem("products", JSON.stringify(updatedProducts));
    }

    setImage(null);
    setName("");
    setPrice("");
    setGst("");
    setDescription("");
    setEditMode(false);
    setEditProduct(null);
    setError({
      image:"",
      name: "",
      price: "",
      gst: "",
      description: "",
    })
  };


  const handelEdit = (product) => {
    setEditProduct(product);
    setEditMode(true);
    setImage(product.image);
    setName(product.name);
    setPrice(product.price);
    setGst(product.gst);
    setDescription(product.description);
  };


  const handelDelete = (productToDelete) => {
    
    const updatedProducts = products.filter((product) => product.id !== productToDelete.id);

    setProducts(updatedProducts); // Update state to reflect deletion

    localStorage.setItem("products", JSON.stringify(updatedProducts));

  };
  


  return (
    <>
      <div className="p-3">
        <center>
          <h4 className="uppercase">Product Ditail</h4>
        </center>
        <div className="flex justify-end ">
          <button className="bg-gray-300 p-2 text-center rounded-md uppercase ">
          <Link className="no-underline" to={"/products"}>Product Route</Link> 
          </button>
        </div>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} md="4">
              <Form.Label className="uppercase">Product Image</Form.Label>
              <Form.Control type="file" onChange={handleImageChange} />
              <span className="text-red-500">{error.image}</span>
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Form.Label className="uppercase">Product Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Product Name"
              />
               <span className="text-red-500">{error.name}</span>
            </Form.Group>
           
            <Form.Group as={Col} md="4">
              <Form.Label className="uppercase">Price</Form.Label>
              <Form.Control
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
              />
              <span className="text-red-500">{error.price}</span>
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Form.Label className="uppercase">GST</Form.Label>
              <Form.Control
                type="number"
                placeholder="GST"
                value={gst}
                onChange={(e) => setGst(e.target.value)}
              />
              <span className="text-red-500">{error.gst}</span>
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Form.Label className="uppercase">Description</Form.Label>
              <Form.Control
                type="text"
                value={description}
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
              />
              <span className="text-red-500">{error.description}</span>
            </Form.Group>
          </Row>
          <Button className="uppercase" type="submit">Submit form</Button>
        </Form>
      </div>
      <div className="p-3">
        <center className="py-3">
          <h4 className="uppercase">Product List</h4>
        </center>
        <div className="h-[55vh] border border-black overflow-scroll rounded-md">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Product Image</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>GST</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td>{index +=1}</td>
                <td>
                  <img className="h-10" src={product.image} alt="" />
                </td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.gst} %</td>
                <td>{product.description}</td>
                <td>
                  <div className="flex gap-2">
                  <button className="bg-blue-200 p-1 rounded-md" onClick={() => handelEdit(product)}>Edit</button>
                  <button onClick={() => handelDelete(product)} className="bg-red-300 p-1 rounded-md">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        </div>
      </div>
    </>
  );
};

export default Home;
