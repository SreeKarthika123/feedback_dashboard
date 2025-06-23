// import React, { useState } from "react";

// export default function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

// const handleLogin = async () => {
//   try {
//     const res = await fetch("http://127.0.0.1:8000/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ username, password }),
//     });
//     const data = await res.json();
//     console.log("Login Response:", data);

//     if (res.ok) {
//       localStorage.setItem("token", data.access_token);
//       window.location.href = "/dashboard";
//     } else {
//       alert(data.detail || "Login failed");
//     }
//   } catch (err) {
//     console.error("Error:", err);
//     alert("Something went wrong. Check console.");
//   }
// };


//   return (
//     <div>
//       <h1>Login</h1>
//       <input
//         placeholder="Username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//       /><br/>
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       /><br/>
//       <button onClick={handleLogin}>Login</button>
//     </div>
//   );
// }



// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";

// export default function Login() {
//   const [email, setEmail] = useState("");  // ✅ use email, not username
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     try {
//       const res = await fetch("http://127.0.0.1:8000/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),  // ✅ use email
//       });

//       const data = await res.json();
//       console.log("Login Response:", data);

//       if (res.ok) {
//         localStorage.setItem("token", data.token);
//         localStorage.setItem("role", data.role);
//           // ✅ your backend returns token
//         navigate("/dashboard");
//       } else {
//         alert(data.detail || "Login failed");
//       }
//     } catch (err) {
//       console.error("Error:", err);
//       alert("Something went wrong. Check console.");
//     }
//   };

//   return (
//     <div>
//       <h1>Login</h1>
//       <input
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       /><br/>
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       /><br/>
//       <button onClick={handleLogin}>Login</button>
//       <p>Don’t have an account? <Link to="/signup">Register here</Link></p>
//     </div>
//   );
// }


// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     try {
//       const res = await fetch("http://127.0.0.1:8000/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();
//       console.log("Login Response:", data);

//       if (res.ok) {
//         localStorage.setItem("token", data.token);
//         localStorage.setItem("role", data.role);
//         navigate("/dashboard");
//       } else {
//         alert(data.detail || "Login failed");
//       }
//     } catch (err) {
//       console.error("Error:", err);
//       alert("Something went wrong. Check console.");
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.overlay}>
//         <div style={styles.loginBox}>
//           <h1 style={styles.title}>Login</h1>
//           <input
//             style={styles.input}
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <input
//             type="password"
//             style={styles.input}
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <div style={styles.options}>
//             <label>
//               <input type="checkbox" /> Remember Me
//             </label>
//             <Link to="/forgot" style={styles.forgot}>
//               Forgot Password?
//             </Link>
//           </div>
//           <button style={styles.button} onClick={handleLogin}>
//             Login
//           </button>
//           <p style={styles.registerText}>
//             Don’t have an account?{" "}
//             <Link to="/signup" style={styles.registerLink}>
//               Register
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     background: "linear-gradient(to top, #4b006e, #7a2fcd)",
//     height: "100vh",
//     backgroundImage:
//       "url('https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg?cs=srgb&dl=pexels-pixabay-531880.jpg&fm=jpg')",
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//     position: "relative",
//   },
//   overlay: {
//     backdropFilter: "blur(5px)",
//     background: "rgba(0, 0, 0, 0.5)",
//     height: "100%",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   loginBox: {
//     background: "rgba(255, 255, 255, 0.1)",
//     borderRadius: "15px",
//     padding: "40px",
//     width: "300px",
//     textAlign: "center",
//     backdropFilter: "blur(10px)",
//   },
//   title: {
//     color: "#fff",
//     marginBottom: "30px",
//     fontWeight: "bold",
//     fontSize: "30px",
//   },
//   input: {
//     width: "100%",
//     padding: "10px 15px",
//     margin: "10px 0",
//     border: "none",
//     borderRadius: "30px",
//     outline: "none",
//   },
//   options: {
//     display: "flex",
//     justifyContent: "space-between",
//     color: "#fff",
//     fontSize: "12px",
//     marginBottom: "20px",
//   },
//   forgot: {
//     color: "#fff",
//     textDecoration: "none",
//   },
//   button: {
//     width: "100%",
//     padding: "10px",
//     border: "none",
//     borderRadius: "30px",
//     backgroundColor: "#fff",
//     color: "#4b006e",
//     fontWeight: "bold",
//     cursor: "pointer",
//     marginBottom: "15px",
//   },
//   registerText: {
//     color: "#fff",
//     fontSize: "12px",
//   },
//   registerLink: {
//     color: "#fff",
//     textDecoration: "underline",
//   },
// };



// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     try {
//       // 1️⃣ Attempt login
//       const res = await fetch("http://127.0.0.1:8000/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();
//       console.log("Login response:", data);

//      if (!res.ok) {
//   if (res.status === 403 && data.detail) {
//     alert(data.detail); // shows "Your manager has denied your access."
//   } else {
//     alert(data.detail || "Login failed");
//   }
//   return;
// }


//       // 2️⃣ Store token & role
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("role", data.role);

//       // 3️⃣ Call /me to get user info
//       const meRes = await fetch("http://127.0.0.1:8000/me", {
//         headers: { Authorization: `Bearer ${data.token}` },
//       });
//       const userInfo = await meRes.json();
//       console.log("Me info:", userInfo);

//       // 4️⃣ Decide where to navigate
//       if (data.role === "employee") {
//         if (userInfo.manager_id) {
//           // ✅ Employee ALREADY has manager → go to dashboard
//           navigate("/dashboard");
//         } else {
//           // ⚠️ Employee has NO manager → go to assign-manager
//           navigate("/assign-manager");
//         }
//       } else {
//         // ✅ Manager → go to dashboard
//         navigate("/dashboard");
//       }

//     } catch (err) {
//       console.error("Error:", err);
//       alert("Something went wrong, check console.");
//     }
//   };

//   // ---- Styling (same as your original) ----
//   const styles = {
//     container: {
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       minHeight: "100vh",
//       background: "linear-gradient(to right, #f8f9fa, #e0f7fa)",
//       fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
//     },
//     squareBox: {
//       display: "flex",
//       width: "800px",
//       height: "500px",
//       backgroundColor: "#fff",
//       borderRadius: "16px",
//       boxShadow: "0 12px 30px rgba(0, 0, 0, 0.1)",
//       overflow: "hidden",
//     },
//     imageSide: {
//       width: "50%",
//       backgroundColor: "#f0f0f0",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//     },
//     image: {
//       width: "100%",
//       height: "100%",
//       objectFit: "cover",
//     },
//     formSide: {
//       width: "50%",
//       padding: "40px",
//       display: "flex",
//       flexDirection: "column",
//       justifyContent: "center",
//     },
//     title: {
//       fontSize: "26px",
//       fontWeight: "600",
//       textAlign: "center",
//       marginBottom: "20px",
//       color: "#333",
//     },
//     input: {
//       width: "100%",
//       padding: "10px 12px",
//       marginBottom: "16px",
//       border: "1px solid #ccc",
//       borderRadius: "8px",
//       fontSize: "14px",
//       outline: "none",
//     },
//     options: {
//       display: "flex",
//       justifyContent: "space-between",
//       fontSize: "12px",
//       marginBottom: "20px",
//       color: "#444",
//     },
//     forgot: {
//       color: "#007bff",
//       textDecoration: "none",
//     },
//     button: {
//       width: "100%",
//       padding: "12px",
//       background: "linear-gradient(to right, #42a5f5, #7e57c2)",
//       color: "#fff",
//       fontWeight: "600",
//       border: "none",
//       borderRadius: "8px",
//       cursor: "pointer",
//       fontSize: "16px",
//       transition: "all 0.3s ease-in-out",
//       boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
//     },
//     registerText: {
//       textAlign: "center",
//       fontSize: "14px",
//       marginTop: "16px",
//       color: "#666",
//     },
//     registerLink: {
//       color: "#007bff",
//       textDecoration: "none",
//       fontWeight: "500",
//     },
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.squareBox}>
//         <div style={styles.imageSide}>
//           <img src="/logiii.jpg" alt="Login Visual" style={styles.image} />
//         </div>
//         <div style={styles.formSide}>
//           <h2 style={styles.title}>Welcome Back</h2>

//           <input
//             style={styles.input}
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />

//           <input
//             type="password"
//             style={styles.input}
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />

//           <div style={styles.options}>
//             <label>
//               <input type="checkbox" /> Remember Me
//             </label>
//             <Link to="/forgot" style={styles.forgot}>
//               Forgot Password?
//             </Link>
//           </div>

//           <button style={styles.button} onClick={handleLogin}>
//             Login
//           </button>

//           <p style={styles.registerText}>
//             Don’t have an account?{" "}
//             <Link to="/signup" style={styles.registerLink}>
//               Register
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }



import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // ✅ for modal
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log("Login response:", data);

      if (!res.ok) {
        if (res.status === 403 && data.detail) {
          setErrorMessage(data.detail); // Show modal with detail
        } else {
          setErrorMessage(data.detail || "Login failed");
        }
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      const meRes = await fetch("http://127.0.0.1:8000/me", {
        headers: { Authorization: `Bearer ${data.token}` },
      });
      const userInfo = await meRes.json();
      console.log("Me info:", userInfo);

      if (data.role === "employee") {
        if (userInfo.manager_id) {
          navigate("/dashboard");
        } else {
          navigate("/assign-manager");
        }
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Error:", err);
      setErrorMessage("Something went wrong, check console.");
    }
  };

  // ✅ Modal styling
  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      background: "linear-gradient(to right, #f8f9fa, #e0f7fa)",
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    },
    squareBox: {
      display: "flex",
      width: "800px",
      height: "500px",
      backgroundColor: "#fff",
      borderRadius: "16px",
      boxShadow: "0 12px 30px rgba(0, 0, 0, 0.1)",
      overflow: "hidden",
    },
    imageSide: {
      width: "50%",
      backgroundColor: "#f0f0f0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    image: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    formSide: {
      width: "50%",
      padding: "40px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    title: {
      fontSize: "26px",
      fontWeight: "600",
      textAlign: "center",
      marginBottom: "20px",
      color: "#333",
    },
    input: {
      width: "100%",
      padding: "10px 12px",
      marginBottom: "16px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      fontSize: "14px",
      outline: "none",
    },
    options: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: "12px",
      marginBottom: "20px",
      color: "#444",
    },
    forgot: {
      color: "#007bff",
      textDecoration: "none",
    },
    button: {
      width: "100%",
      padding: "12px",
      background: "linear-gradient(to right, #42a5f5, #7e57c2)",
      color: "#fff",
      fontWeight: "600",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "16px",
      transition: "all 0.3s ease-in-out",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
    },
    registerText: {
      textAlign: "center",
      fontSize: "14px",
      marginTop: "16px",
      color: "#666",
    },
    registerLink: {
      color: "#007bff",
      textDecoration: "none",
      fontWeight: "500",
    },
    modalBackdrop: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    modalContent: {
      background: "#fff",
      padding: "30px",
      borderRadius: "12px",
      width: "400px",
      boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
      textAlign: "center",
    },
    modalCloseBtn: {
      marginTop: "20px",
      padding: "8px 20px",
      background: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.squareBox}>
        <div style={styles.imageSide}>
          <img src="/logiii.jpg" alt="Login Visual" style={styles.image} />
        </div>
        <div style={styles.formSide}>
          <h2 style={styles.title}>Welcome Back</h2>

          <input
            style={styles.input}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            style={styles.input}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div style={styles.options}>
            <label>
              <input type="checkbox" /> Remember Me
            </label>
            <Link to="/forgot" style={styles.forgot}>
              Forgot Password?
            </Link>
          </div>

          <button style={styles.button} onClick={handleLogin}>
            Login
          </button>

          <p style={styles.registerText}>
            Don’t have an account?{" "}
            <Link to="/signup" style={styles.registerLink}>
              Register
            </Link>
          </p>
        </div>
      </div>

      {errorMessage && (
        <div style={styles.modalBackdrop}>
          <div style={styles.modalContent}>
            <h3>⚠️ Login Issue</h3>
            <p>{errorMessage}</p>
            <button
              style={styles.modalCloseBtn}
              onClick={() => setErrorMessage("")}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
