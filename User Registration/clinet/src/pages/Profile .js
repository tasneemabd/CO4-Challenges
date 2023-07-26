import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";

function Profile() {
    const { name, email } = useParams();

  const navigate = useNavigate();
  const [quote, setQuote] = useState("");
  const [tempQuote, setTempQuote] = useState("");
  const [token, setToken] = useState(""); // Add token state

  async function populateQuota() {
    const req = await fetch("http://localhost:1000/api/quote", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });
    const data = await req.json();
    console.log(data);

    if (data.status === "ok") {
      setQuote(data.quote);
    } else {
      alert(data.error);
    }
  }

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      const user = jwt_decode(storedToken);
      console.log(user);
      if (!user) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        // Set the token state and call populateQuota
        setToken(storedToken);
        populateQuota();
      }
    } else {
      navigate("/login");
    }
  }, [token]); // Call populateQuota when the token state changes

  async function updateQuote(event) {
    event.preventDefault();

    const req = await fetch("http://localhost:1000/api/quote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        quote: tempQuote,
      }),
    });
    const data = await req.json();
    console.log(data);

    if (data.status === "ok") {
      setQuote(tempQuote);
      setTempQuote("");
    } else {
      alert(data.error);
    }
  }

  return (
    <div>
      <h1> Your quote: {quote || "no quote"} </h1>
      <form onSubmit={updateQuote}>
        <input
          type="text"
          placeholder="Quote"
          value={tempQuote}
          onChange={(e) => setTempQuote(e.target.value)}
        />
        <input type="submit" value="Update Quote" />
      </form>
      <h1>Welcome, {name}!</h1>
      <p>Email: {email}</p>
    </div>
  );
}

export default Profile;
