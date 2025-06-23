// import React, { useState } from "react";

// export default function ResetPassword() {
//   const [token, setToken] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [message, setMessage] = useState("");

//   const handleReset = async () => {
//     try {
//       const res = await fetch("http://127.0.0.1:8000/reset-password", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           token: token,
//           new_password: newPassword
//         }),
//       });

//       const data = await res.json();
//       if (res.ok) {
//         setMessage("Password reset successful!");
//       } else {
//         setMessage(data.detail || "Failed to reset password.");
//       }
//     } catch (err) {
//       console.error(err);
//       setMessage("Something went wrong.");
//     }
//   };

//   return (
//     <div style={{ padding: "40px", textAlign: "center" }}>
//       <h2>Reset Password</h2>
//       <input
//         placeholder="Reset Token"
//         value={token}
//         onChange={(e) => setToken(e.target.value)}
//         style={{ padding: "10px", width: "300px", marginBottom: "20px" }}
//       />
//       <br />
//       <input
//         type="password"
//         placeholder="New Password"
//         value={newPassword}
//         onChange={(e) => setNewPassword(e.target.value)}
//         style={{ padding: "10px", width: "300px", marginBottom: "20px" }}
//       />
//       <br />
//       <button
//         onClick={handleReset}
//         style={{
//           padding: "10px 20px",
//           border: "none",
//           borderRadius: "6px",
//           background: "#1976d2",
//           color: "#fff",
//           cursor: "pointer",
//         }}
//       >
//         Reset Password
//       </button>
//       {message && <p>{message}</p>}
//     </div>
//   );
// }


// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// export default function ResetPassword() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [newPassword, setNewPassword] = useState("");
//   const [message, setMessage] = useState("");

//   // Read token from URL: ?token=...
//   const query = new URLSearchParams(location.search);
//   const token = query.get("token");

//   const handleReset = async () => {
//     try {
//       const res = await fetch("http://127.0.0.1:8000/reset-password", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ token, new_password: newPassword }),
//       });

//       const data = await res.json();
//       if (res.ok) {
//         setMessage("Password has been reset. Redirecting to login...");
//         setTimeout(() => navigate("/login"), 2000);
//       } else {
//         setMessage(data.detail || "Reset failed.");
//       }
//     } catch (err) {
//       console.error(err);
//       setMessage("Something went wrong.");
//     }
//   };

//   return (
//     <div style={{ padding: "40px", textAlign: "center" }}>
//       <h2>Reset Password</h2>
//       {!token && <p>Invalid or missing token.</p>}

//       {token && (
//         <>
//           <input
//             type="password"
//             placeholder="Enter new password"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             style={{
//               padding: "10px",
//               width: "300px",
//               marginBottom: "20px",
//               borderRadius: "6px",
//               border: "1px solid #ccc",
//             }}
//           />
//           <br />
//           <button
//             onClick={handleReset}
//             style={{
//               padding: "10px 20px",
//               border: "none",
//               borderRadius: "6px",
//               background: "#28a745",
//               color: "#fff",
//               cursor: "pointer",
//             }}
//           >
//             Reset Password
//           </button>
//         </>
//       )}
//       {message && <p>{message}</p>}
//     </div>
//   );
// }



// import React, { useState } from "react";
// import { useSearchParams } from "react-router-dom";

// export default function ResetPassword() {
//   const [searchParams] = useSearchParams();
//   const [newPassword, setNewPassword] = useState("");
//   const [message, setMessage] = useState("");

//   const token = searchParams.get("token");

//   const handleReset = async () => {
//     try {
//       const res = await fetch("http://127.0.0.1:8000/reset-password", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ token, new_password: newPassword }),
//       });

//       const data = await res.json();
//       if (res.ok) {
//         setMessage("Password reset successful! You can now login.");
//       } else {
//         setMessage(data.detail || "Failed to reset password.");
//       }
//     } catch (err) {
//       console.error(err);
//       setMessage("Something went wrong.");
//     }
//   };

//   return (
//     <div style={{ padding: "40px", textAlign: "center" }}>
//       <h2>Reset Password</h2>
//       <input
//         type="password"
//         placeholder="Enter new password"
//         value={newPassword}
//         onChange={(e) => setNewPassword(e.target.value)}
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
//         onClick={handleReset}
//         style={{
//           padding: "10px 20px",
//           border: "none",
//           borderRadius: "6px",
//           background: "#28a745",
//           color: "#fff",
//           cursor: "pointer",
//         }}
//       >
//         Reset Password
//       </button>
//       {message && <p>{message}</p>}
//     </div>
//   );
// }




import React, { useState, useEffect } from "react";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");

  // ✅ Get token from URL when component mounts
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get("token");
    if (t) {
      setToken(t);
    } else {
      setMessage("Invalid or missing token");
    }
  }, []);

  // ✅ Submit new password to backend
  const handleReset = async () => {
    if (!newPassword) {
      setMessage("Please enter a new password.");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, new_password: newPassword }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(data.msg || "Password reset successful!");
      } else {
        setMessage(data.detail || "Failed to reset password.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong.");
    }
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h2>Reset Password</h2>
      {message && <p>{message}</p>}
      {!message.includes("successful") && (
        <>
          <input
            placeholder="Enter new password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
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
            onClick={handleReset}
            style={{
              padding: "10px 20px",
              border: "none",
              borderRadius: "6px",
              background: "#1976d2",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Reset Password
          </button>
        </>
      )}
    </div>
  );
}
