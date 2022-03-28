import React from "react";
import "./App.css";
import Header from "./components/Header";

import firebase from "./firebase";

import Assignments from "./components/Assignments";

function App() {
  React.useEffect(() => {
    const msg = firebase.messaging();
    if(msg){

      msg
        .requestPermission()
        .then(() => {
          return msg.getToken();
        })
        .then((data) => {
          console.info("TOKEN", data);
  
          if(Notification.permission == 'granted'){
            saveToken(data);
          }
          
        });
    }
  });

  const saveToken = (token) => {
    fetch("/fcm/clients/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fcm_token: token }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <div className="App">
      <Header />
      <main>
        <section className="main-container">
          <Assignments></Assignments>
        </section>
      </main>
    </div>
  );
}

export default App;
