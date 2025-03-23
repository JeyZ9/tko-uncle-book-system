import React, { useEffect, useRef, useState } from "react";
import "../assets/css/shop.css";
import { useParams } from "react-router-dom";
import Navbar from "./../components/Navbar";
import { getAllBookByMenuId } from "../fetch/fetchBook";
import { addToCart, removeFromCart } from "../redux/storre";
import { useDispatch, useSelector } from "react-redux";
import { FaLine } from "react-icons/fa6";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { RiDeleteBin2Line } from "react-icons/ri";

export const Shop = (props) => {
  const { images } = props;
  const dispatch = useDispatch();
  const cartList = useSelector((state) => state.cart);
  const [carts, setCarts] = useState([]);
  const [books, setBooks] = useState([]);
  const { id } = useParams();
  const { type } = useParams();

  useEffect(() => {
    setBooks(getAllBookByMenuId(id));
    setCarts(cartList.products);
  }, [cartList]);

  console.log(carts);
  console.log(cartList.total);

    // const cartRef = useRef();

    const handleExportPDF = () => {
      const doc = new jsPDF();
      // doc.addFileToVFS("Parkinsans-Parkinsans.ttf", sarabunFont);
      // doc.addFont("Parkinsans-normal.ttf", "Parkinsans", "Parkinsans");
      // doc.setFont("Parkinsans");
      // doc.setFontSize(16);
    
      const tableColumn = ["Product", "Quantity", "Price", "Total"];
      
      const tableRows = carts.map((product) => [
        product.name,
        product.quantity,
        `${product.price} baht.`,
        `${product.total} baht.`
      ]);
    
      tableRows.push(["Summary Price", "", "", `${cartList.total} baht.`]);
    
      const currentDate = new Date();
      const formattedDate = `${currentDate.getFullYear()}-${("0" + (currentDate.getDate())).slice(-2)}-${("0" + (currentDate.getMonth() + 1)).slice(-2)}`;

      doc.setFontSize(10)
      doc.text(`Date: ${formattedDate}`, 10, 10);
      doc.text(`Thank you!`, 180, 10);

      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 20,

      });

      doc.save(`cart-summary-${formattedDate}.pdf`);
    };

  return (
    <div className="container">
      <Navbar name={type} />
      <div className="shop-screen">
        <div className="card-container">
          {books.map((book) => (
            <div key={book.id} className="card">
              <div className="box-image">
                <img
                  className="product-image"
                  src={images[`/src/assets/images/${book.imagePath}`]?.default}
                  alt=""
                />
              </div>
              <div className="product-detail">
                  <h2 className="product-name">{book.name}</h2>
                <div className="detail">
                  <p className="product-price">{book.price}฿</p>
                  <button className="product-btn" onClick={() => dispatch(addToCart(book))}>Buy</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-container">
          <div className="cart-title">
            <h1>Cart</h1>
          </div>
          {carts.length > 0 ? (
            <div className="cover-table" >
                <table className="cart-table">
                  <thead>
                      <tr>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Total</th>
                      <th>Action</th>
                      </tr>
                  </thead>
                  <tbody>
                      {carts.map((product) => (
                      <tr key={product.id} className="">
                          <td>{product.name}</td>
                          <td>{product.quantity}</td>
                          <td>{product.price}฿</td>
                          <td>{product.total}฿</td>
                          <td>
                          <button
                              className="remove-btn"
                              onClick={() => dispatch(removeFromCart(product.id))}
                          >
                              <RiDeleteBin2Line className="icon" />
                          </button>
                          </td>
                      </tr>
                      ))}
                      <tr>
                          <td className="total-price">
                              <p>ราคารวม</p>
                          </td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td className="total-price">
                              <p>{cartList.total}฿</p>
                          </td>
                      </tr>
                  </tbody>
                </table>
                <div className="box-table-btn">
                    <button className="export-pdf-btn table-btn" onClick={handleExportPDF}>Export PDF</button>
                    <button onClick={() => window.open("https://lin.ee/Ai6KWm9", "_blank")} className="table-btn addline-btn">
                    <FaLine className="line-icon icon" /> <p>Add Line</p>
                    </button>
                </div>
            </div>
          ) : (
            <div className="box-no-item">
                <p className="no-item">No items in cart.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
