// import React, { useState } from "react";

// export default function ForgotPassword() {
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");

//   const handleForgot = async () => {
//     try {
//       const res = await fetch("http://127.0.0.1:8000/forgot-password", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email }),
//       });

//       const data = await res.json();
//       if (res.ok) {
//         setMessage("Password reset link sent to your email.");
//       } else {
//         setMessage(data.detail || "Failed to send reset link.");
//       }
//     } catch (err) {
//       console.error(err);
//       setMessage("Something went wrong.");
//     }
//   };

//   return (
//     <div style={{ padding: "40px", textAlign: "center" }}>
//       <h2>Forgot Password</h2>
//       <input
//         placeholder="Enter your email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         style={{
//           padding: "10px",
//           width: "300px",
//           marginBottom: "20px",
//           borderRadius: "6px",
//           border: "1px solid #ccc",
//         }}
//       />
//       <br />
//       <button
//         onClick={handleForgot}
//         style={{
//           padding: "10px 20px",
//           border: "none",
//           borderRadius: "6px",
//           background: "#1976d2",
//           color: "#fff",
//           cursor: "pointer",
//         }}
//       >
//         Send Reset Link
//       </button>
//       {message && <p>{message}</p>}
//     </div>
//   );
// }





import React, { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleForgot = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.msg || "Password reset link sent to your email.");
      } else {
        // ✅ Fix: if detail is a list (422), convert to string
        if (Array.isArray(data.detail)) {
          const msg = data.detail
            .map((d) => `${d.msg} (${d.loc.join(" > ")})`)
            .join(", ");
          setMessage(msg);
        } else {
          setMessage(data.detail || "Failed to send reset link.");
        }
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong.");
    }
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h2>Forgot Password</h2>
      <input
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          padding: "10px",
          width: "300px",
          marginBottom: "20px",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />
      <br />
      <button
        onClick={handleForgot}
        style={{
          padding: "10px 20px",
          border: "none",
          borderRadius: "6px",
          background: "#1976d2",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        Send Reset Link
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}
