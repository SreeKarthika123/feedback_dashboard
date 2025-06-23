// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function AddEmployee() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleRegister = async () => {
//     const res = await fetch("http://127.0.0.1:8000/register_employee", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${localStorage.getItem("token")}`
//       },
//       body: JSON.stringify({ name, email, password })
//     });

//     const data = await res.json();
//     if (res.ok) {
//       alert(data.msg);
//       navigate("/dashboard");
//     } else {
//       alert(data.detail || "Failed to register");
//     }
//   };

//   return (
//     <div>
//       <h1>Add Employee</h1>
//       <input
//         placeholder="Employee Name"
//         value={name}
//         onChange={e => setName(e.target.value)}
//       /><br/>
//       <input
//         placeholder="Employee Email"
//         value={email}
//         onChange={e => setEmail(e.target.value)}
//       /><br/>
//       <input
//         type="password"
//         placeholder="Employee Password"
//         value={password}
//         onChange={e => setPassword(e.target.value)}
//       /><br/>
//       <button onClick={handleRegister}>Register Employee</button>
//     </div>
//   );
// }




// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function AddEmployee() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleRegister = async () => {
//     const res = await fetch("http://127.0.0.1:8000/register_employee", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${localStorage.getItem("token")}`
//       },
//       body: JSON.stringify({ name, email, password })
//     });

//     const data = await res.json();
//     if (res.ok) {
//       alert(data.msg);
//       navigate("/dashboard");
//     } else {
//       alert(data.detail || "Failed to register");
//     }
//   };

//   const styles = {
//     container: {
//       maxWidth: "400px",
//       margin: "50px auto",
//       padding: "30px",
//       background: "#f9f9f9",
//       borderRadius: "8px",
//       boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//       fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
//     },
//     title: {
//       textAlign: "center",
//       marginBottom: "20px",
//       fontSize: "28px",
//       color: "#333",
//     },
//     input: {
//       width: "100%",
//       padding: "10px",
//       marginBottom: "15px",
//       border: "1px solid #ccc",
//       borderRadius: "6px",
//       fontSize: "16px",
//     },
//     button: {
//       width: "100%",
//       padding: "12px",
//       background: "linear-gradient(to right, #42a5f5, #7e57c2)",
//       color: "#fff",
//       border: "none",
//       borderRadius: "6px",
//       cursor: "pointer",
//       fontSize: "16px",
//       fontWeight: "600",
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h1 style={styles.title}>Add Employee</h1>
//       <input
//         style={styles.input}
//         placeholder="Employee Name"
//         value={name}
//         onChange={e => setName(e.target.value)}
//       />
//       <input
//         style={styles.input}
//         placeholder="Employee Email"
//         value={email}
//         onChange={e => setEmail(e.target.value)}
//       />
//       <input
//         style={styles.input}
//         type="password"
//         placeholder="Employee Password"
//         value={password}
//         onChange={e => setPassword(e.target.value)}
//       />
//       <button style={styles.button} onClick={handleRegister}>Register Employee</button>
//     </div>
//   );
// }



// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import toast, { Toaster } from "react-hot-toast";

// export default function AddEmployee() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleRegister = async () => {
//     const res = await fetch("http://127.0.0.1:8000/register_employee", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//       body: JSON.stringify({ name, email, password }),
//     });

//     const data = await res.json();
//     if (res.ok) {
//       toast.success(`🎉 ${data.msg}`);
//       setTimeout(() => navigate("/dashboard"), 2000);
//     } else {
//       toast.error(data.detail || "Failed to register");
//     }
//   };

//   const styles = {
//     page: {
//       minHeight: "100vh",
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       background: "linear-gradient(to right, #f8f9fa, #e0f7fa)",
//       fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
//     },
//     container: {
//       maxWidth: "400px",
//       width: "100%",
//       padding: "40px",
//       background: "rgba(255, 255, 255, 0.15)",
//       borderRadius: "16px",
//       boxShadow: "0 8px 32px rgba(31, 38, 135, 0.2)",
//       backdropFilter: "blur(10px)",
//       border: "1px solid rgba(255, 255, 255, 0.3)",
//     },
//     title: {
//       textAlign: "center",
//       marginBottom: "25px",
//       fontSize: "32px",
//       color: "#333",
//       fontWeight: "700",
//     },
//     input: {
//       width: "100%",
//       padding: "12px",
//       marginBottom: "20px",
//       border: "1px solid #ccc",
//       borderRadius: "8px",
//       fontSize: "16px",
//       background: "rgba(255, 255, 255, 0.8)",
//       outline: "none",
//     },
//     button: {
//       width: "100%",
//       padding: "14px",
//       background: "linear-gradient(to right, #42a5f5, #7e57c2)",
//       color: "#fff",
//       border: "none",
//       borderRadius: "10px",
//       cursor: "pointer",
//       fontSize: "18px",
//       fontWeight: "600",
//       transition: "all 0.3s ease",
//     },
//   };

//   return (
//     <>
//       <Toaster position="top-center" />
//       <div style={styles.page}>
//         <div style={styles.container}>
//           <h1 style={styles.title}>➕ Add Employee</h1>
//           <input
//             style={styles.input}
//             placeholder="Employee Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//           <input
//             style={styles.input}
//             placeholder="Employee Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <input
//             style={styles.input}
//             type="password"
//             placeholder="Employee Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <button
//             style={styles.button}
//             onClick={handleRegister}
//             onMouseEnter={(e) => (e.target.style.transform = "scale(1.03)")}
//             onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
//           >
//             Register Employee 🚀
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

export default function AddEmployee() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const navigate = useNavigate();
  const { width, height } = useWindowSize();

  const handleRegister = async () => {
    const res = await fetch("http://127.0.0.1:8000/register_employee", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      toast.success(`🎉 ${data.msg}`);
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
        navigate("/dashboard");
      }, 3000); // Confetti for 3 sec
    } else {
      toast.error(data.detail || "Failed to register");
    }
  };

  const styles = {
    page: {
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(to right, #f8f9fa, #e0f7fa)",
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
      overflow: "hidden",
    },
    container: {
      maxWidth: "400px",
      width: "100%",
      padding: "40px",
      background: "rgba(255, 255, 255, 0.15)",
      borderRadius: "16px",
      boxShadow: "0 8px 32px rgba(31, 38, 135, 0.2)",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(255, 255, 255, 0.3)",
      zIndex: 2, // Keep on top of confetti
    },
    title: {
      textAlign: "center",
      marginBottom: "25px",
      fontSize: "32px",
      color: "#333",
      fontWeight: "700",
    },
    input: {
      width: "100%",
      padding: "12px",
      marginBottom: "20px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      fontSize: "16px",
      background: "rgba(255, 255, 255, 0.8)",
      outline: "none",
    },
    button: {
      width: "100%",
      padding: "14px",
      background: "linear-gradient(to right, #42a5f5, #7e57c2)",
      color: "#fff",
      border: "none",
      borderRadius: "10px",
      cursor: "pointer",
      fontSize: "18px",
      fontWeight: "600",
      transition: "all 0.3s ease",
    },
  };

  return (
    <>
      <Toaster position="top-center" />
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={400}
          gravity={0.3}
          wind={0.01}
          recycle={false} // Play once!
        />
      )}
      <div style={styles.page}>
        <div style={styles.container}>
          <h1 style={styles.title}>➕ Add Employee</h1>
          <input
            style={styles.input}
            placeholder="Employee Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            style={styles.input}
            placeholder="Employee Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            style={styles.input}
            type="password"
            placeholder="Employee Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            style={styles.button}
            onClick={handleRegister}
            onMouseEnter={(e) => (e.target.style.transform = "scale(1.03)")}
            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          >
            Register Employee 🎊
          </button>
        </div>
      </div>
    </>
  );
}
