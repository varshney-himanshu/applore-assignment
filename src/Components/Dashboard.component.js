import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import firebase from "../firebase";

import { CARD_NUMBER, CVV, EXPIRATION_MONTH, EXPIRATION_YEAR } from "../config";
import {
  getUserInLocalStorage,
  extractDateString,
  generateID,
  isAmountValid,
  isCardValid,
} from "../Utils/utils";

function Dashboard({ logOut }) {
  const [user, setUser] = useState({});
  const [cardNo, setCardNo] = useState("");
  const [cvv, setCvv] = useState("");
  const [expYear, setExpYear] = useState("");
  const [expMonth, setExpMonth] = useState("");
  const [amount, setAmount] = useState("");

  const [recentPayments, setRecentPayments] = useState([]);

  useEffect(() => {
    const user = getUserInLocalStorage();
    setUser(user);

    getAllUsersPayments(user.uid);
  }, []);

  function handleOnCardNoChange(e) {
    setCardNo(e.target.value);
  }
  function handleOnCvvChange(e) {
    setCvv(e.target.value);
  }
  function handleOnExpYearChange(e) {
    setExpYear(e.target.value);
  }
  function handleOnExpMonthChange(e) {
    setExpMonth(e.target.value);
  }
  function handleOnAmountChange(e) {
    setAmount(e.target.value);
  }

  async function handleOnPaymentSubmit(e) {
    e.preventDefault();

    if (amount.length === 0) {
      alert("amount cant be empty");
      return;
    }

    if (!isAmountValid(amount)) {
      alert("invalid amount");
      return;
    }

    if (cardNo.length === 0) {
      alert("Card number cant be empty");
      return;
    }

    if (!isCardValid(cardNo)) {
      alert("invalid card number");
      return;
    }

    if (CARD_NUMBER !== cardNo) {
      alert("incorrect card");
      return;
    }
    if (expMonth.length === 0) {
      alert("expiry month cant be empty");
      return;
    }
    if (EXPIRATION_MONTH !== expMonth) {
      alert("incorrect month");
      return;
    }

    if (expYear.length === 0) {
      alert("expiry year cant be empty");
      return;
    }
    if (EXPIRATION_YEAR !== expYear) {
      alert("incorrect year");
      return;
    }

    if (cvv.length === 0) {
      alert("CVV cant be empty");
      return;
    }
    if (CVV !== cvv) {
      console.log("incorrect cvv");
      return;
    }

    const data = {
      id: generateID(),
      userId: user.uid,
      amount: amount,
      time: Date.now(),
    };
    addPayment(data);
    // getAllUsersPayments();
  }

  function addPayment(data) {
    const db = firebase.firestore();

    db.collection("payments").add(data);
    getAllUsersPayments(user.uid);

    setAmount("");
    setCardNo("");
    setCvv("");
    setExpMonth("");
    setExpYear("");
  }

  function getAllUsersPayments(uid) {
    const db = firebase.firestore();
    db.collection("payments")
      // .orderBy("time", "asc")
      .where("userId", "==", uid)
      .get()
      .then((querySnapshot) => {
        let arr = [];

        querySnapshot.forEach((doc) => {
          arr.push(doc.data());
        });

        arr.sort(function (a, b) {
          return b.time - a.time;
        });
        setRecentPayments(arr);
      });
  }

  return (
    <div>
      <div className="navbar">
        <h6>{user.phoneNumber}</h6>
        <button className="logout" onClick={logOut}>
          Logout
        </button>
      </div>
      <div className="row">
        <div className="col col-12 col-lg-6 left-section">
          <form className="form" onSubmit={handleOnPaymentSubmit}>
            <label>Amount</label>
            <br />
            <input
              className="input-large"
              value={amount}
              onChange={handleOnAmountChange}
              type="text"
            ></input>
            <br />

            <label>Card Number</label>
            <br />
            <input
              className="input-large"
              value={cardNo}
              onChange={handleOnCardNoChange}
              type="text"
            />
            <br />
            <label>Expiry Date</label>
            <br />
            <input
              className="input-exp-month"
              placeholder="MM"
              value={expMonth}
              onChange={handleOnExpMonthChange}
            />
            <input
              className="input-exp-year"
              placeholder="YYYY"
              value={expYear}
              onChange={handleOnExpYearChange}
            />
            <br />

            <label>CVV</label>
            <br />
            <input
              className="input-cvv"
              value={cvv}
              onChange={handleOnCvvChange}
            />
            <br />

            <button className="button">Make Payment</button>
          </form>
        </div>

        <div className="col col-12 col-lg-6 right-section">
          <h4 className="heading-primary">Recent Transactions</h4>
          <div className="transactions">
            {recentPayments.length === 0 && (
              <h6 className="no-recent-transactions">No Recent Transactions</h6>
            )}
            {recentPayments.map((payment) => (
              <div className="transaction-card">
                <div>
                  <span>
                    <strong>AMOUNT</strong>
                  </span>
                  Rs. {payment.amount}
                </div>
                <div>
                  <span>
                    <strong>ID</strong>
                  </span>
                  {payment.id}
                </div>
                <div>
                  <span>
                    <strong>DATE</strong>
                  </span>
                  {extractDateString(payment.time)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
