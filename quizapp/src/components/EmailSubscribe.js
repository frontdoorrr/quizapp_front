import React, { useState } from "react";
import { useInView } from "react-intersection-observer";
import "./EmailSubscribe.css";

function EmailSubscribe() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const handleSubscribe = () => {
    if (!email.includes("@")) {
      setMessage("Please enter a valid email address.");
      return;
    }
    setMessage("Thank you for subscribing!");
    setEmail(""); // 입력 필드 초기화
  };

  return (
    <div ref={ref} className={`subscribe-container ${inView ? "visible" : "hidden"}`}>
      <h2>Join Our Newsletter</h2>
      <div className="subscribe-form">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleSubscribe}>Subscribe</button>
      </div>
      {message && <p className="subscribe-message">{message}</p>}
    </div>
  );
}

export default EmailSubscribe;
