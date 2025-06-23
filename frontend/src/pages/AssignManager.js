// import React, { useEffect, useState } from "react";

// export default function AssignManager() {
//   const [managers, setManagers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch all managers
//   useEffect(() => {
//     const fetchManagers = async () => {
//       try {
//         const res = await fetch("http://127.0.0.1:8000/managers", {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });
//         const data = await res.json();
//         setManagers(data);
//       } catch (err) {
//         console.error("Failed to fetch managers", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchManagers();
//   }, []);

//   // Send request to selected manager
//   const sendRequest = async (managerId) => {
//     try {
//       const res = await fetch("http://127.0.0.1:8000/assign-request", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ manager_id: managerId }),
//       });
//       const data = await res.json();
//       alert(data.msg || "Request sent!");
//     } catch (err) {
//       alert("Failed to send request");
//     }
//   };

//   const styles = {
//     container: {
//       maxWidth: "600px",
//       margin: "40px auto",
//       padding: "20px",
//       background: "#fff",
//       borderRadius: "8px",
//       boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//       fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
//     },
//     title: {
//       fontSize: "28px",
//       textAlign: "center",
//       marginBottom: "20px",
//       color: "#333",
//     },
//     managerCard: {
//       padding: "15px",
//       border: "1px solid #ddd",
//       borderRadius: "6px",
//       marginBottom: "15px",
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//     },
//     button: {
//       padding: "8px 14px",
//       background: "linear-gradient(to right, #42a5f5, #7e57c2)",
//       color: "#fff",
//       border: "none",
//       borderRadius: "6px",
//       cursor: "pointer",
//       fontWeight: "500",
//     },
//   };

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.title}>Select a Manager</h2>
//       {loading ? (
//         <p>Loading managers...</p>
//       ) : managers.length === 0 ? (
//         <p>No managers found.</p>
//       ) : (
//         managers.map((manager) => (
//           <div key={manager.id} style={styles.managerCard}>
//             <div>
//               <strong>{manager.name}</strong> <br />
//               {manager.email}
//             </div>
//             <button
//               style={styles.button}
//               onClick={() => sendRequest(manager.id)}
//             >
//               Request
//             </button>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }



// import React, { useEffect, useState } from "react";

// export default function AssignManager() {
//   const [managers, setManagers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch all managers
//   useEffect(() => {
//     const fetchManagers = async () => {
//       try {
//         const res = await fetch("http://127.0.0.1:8000/managers", {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });
//         const data = await res.json();
//         setManagers(data);
//       } catch (err) {
//         console.error("Failed to fetch managers", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchManagers();
//   }, []);

//   // ✅ Corrected: use managerId parameter & get token properly
//   const sendRequest = async (managerId) => {
//     const token = localStorage.getItem("token");
//     try {
//       const res = await fetch(
//         `http://127.0.0.1:8000/assign-request?manager_id=${managerId}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       const data = await res.json();
//       alert(data.msg || "Request sent!");
//     } catch (err) {
//       alert("Failed to send request");
//     }
//   };

//   const styles = {
//     container: {
//       maxWidth: "600px",
//       margin: "40px auto",
//       padding: "20px",
//       background: "#fff",
//       borderRadius: "8px",
//       boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//       fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
//     },
//     title: {
//       fontSize: "28px",
//       textAlign: "center",
//       marginBottom: "20px",
//       color: "#333",
//     },
//     managerCard: {
//       padding: "15px",
//       border: "1px solid #ddd",
//       borderRadius: "6px",
//       marginBottom: "15px",
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//     },
//     button: {
//       padding: "8px 14px",
//       background: "linear-gradient(to right, #42a5f5, #7e57c2)",
//       color: "#fff",
//       border: "none",
//       borderRadius: "6px",
//       cursor: "pointer",
//       fontWeight: "500",
//     },
//   };

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.title}>Select a Manager</h2>
//       {loading ? (
//         <p>Loading managers...</p>
//       ) : managers.length === 0 ? (
//         <p>No managers found.</p>
//       ) : (
//         managers.map((manager) => (
//           <div key={manager.id} style={styles.managerCard}>
//             <div>
//               <strong>{manager.name}</strong> <br />
//               {manager.email}
//             </div>
//             <button
//               style={styles.button}
//               onClick={() => sendRequest(manager.id)}
//             >
//               Request
//             </button>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";

export default function AssignManager() {
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [accessDenied, setAccessDenied] = useState(false);

  // Fetch all managers — but first check role
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "employee") {
      // Not employee → no access
      setAccessDenied(true);
      setLoading(false);
      return;
    }

    const fetchManagers = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/managers", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        setManagers(data);
      } catch (err) {
        console.error("Failed to fetch managers", err);
      } finally {
        setLoading(false);
      }
    };

    fetchManagers();
  }, []);

  const sendRequest = async (managerId) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/assign-request?manager_id=${managerId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      alert(data.msg || "Request sent!");
    } catch (err) {
      alert("Failed to send request");
    }
  };

  const styles = {
    container: {
      maxWidth: "600px",
      margin: "40px auto",
      padding: "20px",
      background: "#fff",
      borderRadius: "8px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    },
    title: {
      fontSize: "28px",
      textAlign: "center",
      marginBottom: "20px",
      color: "#333",
    },
    managerCard: {
      padding: "15px",
      border: "1px solid #ddd",
      borderRadius: "6px",
      marginBottom: "15px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    button: {
      padding: "8px 14px",
      background: "linear-gradient(to right, #42a5f5, #7e57c2)",
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: "500",
    },
    denied: {
      textAlign: "center",
      marginTop: "50px",
      fontSize: "22px",
      color: "red",
    },
  };

  if (accessDenied) {
    return <h2 style={styles.denied}>🚫 Access Denied</h2>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Select a Manager</h2>
      {loading ? (
        <p>Loading managers...</p>
      ) : managers.length === 0 ? (
        <p>No managers found.</p>
      ) : (
        managers.map((manager) => (
          <div key={manager.id} style={styles.managerCard}>
            <div>
              <strong>{manager.name}</strong> <br />
              {manager.email}
            </div>
            <button
              style={styles.button}
              onClick={() => sendRequest(manager.id)}
            >
              Request
            </button>
          </div>
        ))
      )}
    </div>
  );
}
