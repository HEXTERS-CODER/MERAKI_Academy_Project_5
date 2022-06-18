import { useNavigate } from "react-router-dom";
import { addOrder, setItems, setId } from "../../redux/reducers/order";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./style.css";
import ReactToPrint from "react-to-print";
const ViewTable = () => {
  const componentRef = useRef();
  const dispatch = useDispatch();
  const orderState = useSelector((state) => {
    return {
      order: state.order.order,
      items: state.order.items,
      id: state.order.id,
    };
  });
  const { token, isLoggedIn, users } = useSelector((state) => {
    return {
      token: state.auth.token,
      isLoggedIn: state.auth.isLoggedIn,
      users: state.auth.users,
    };
  });
  const navigate = useNavigate();
  const getOrders = () => {
    axios
      .get(
        `https://bigbites-backend.herokuapp.com/order/users/${orderState.id}`
      )
      .then((result) => {
        console.log(result.data.result);
        dispatch(addOrder(result.data.result));
      })
      .catch((err) => {
        console.log("test", orderState.id);
        console.log(err);
      });
  };
  useEffect(() => {
    getOrders();
    return () => {
      dispatch(addOrder([]));
    };
  }, []);
  return (
    <div className="views">
      {isLoggedIn ? (
        <>
          <div>
            <ReactToPrint
              trigger={() => <button>Print this out!</button>}
              content={() => componentRef.current}
            />

            <table ref={componentRef}>
              {" "}
              <tr>
                <th>order date</th>
                <th>productName</th>
                <th>price</th>
                <th>amount</th>
              </tr>
              {orderState.order.length &&
                orderState.order.map((element, index) => {
                  return (
                    <>
                      {JSON.parse(element.ORDERhisory).map(
                        (elements, indexs) => {
                          return (
                            <tr key={index}>
                              <td>{element.orderdate}</td>
                              <td>{elements.productName} </td>
                              <td> {elements.price}JD</td>
                              <td> {elements.amount}</td>
                            </tr>
                          );
                        }
                      )}
                    </>
                  );
                })}
            </table>
          </div>
        </>
      ) : (
        <div>
          Login first
          <button
            onClick={() => {
              navigate("/login");
            }}
          >
            go to login
          </button>
        </div>
      )}
    </div>
  );
};

export default ViewTable;
