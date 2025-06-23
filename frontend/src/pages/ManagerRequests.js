// import React, { useEffect, useState } from "react";

// export default function ManagerRequests() {
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchRequests = async () => {
//     setLoading(true);
//     const res = await fetch("http://127.0.0.1:8000/requests", {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//     });
//     const data = await res.json();
//     setRequests(data);
//     setLoading(false);
//   };

//   const approveRequest = async (requestId) => {
//     const res = await fetch(
//       `http://127.0.0.1:8000/requests/${requestId}/approve`,
//       {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       }
//     );

//     const data = await res.json();
//     if (res.ok) {
//       alert(data.msg);
//       // Refresh requests after approval
//       fetchRequests();
//     } else {
//       alert(data.detail || "Failed to approve");
//     }
//   };

//   useEffect(() => {
//     fetchRequests();
//   }, []);

//   const styles = {
//     container: {
//       padding: "40px",
//       fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
//     },
//     title: {
//       textAlign: "center",
//       fontSize: "28px",
//       marginBottom: "30px",
//     },
//     list: {
//       listStyle: "none",
//       paddingLeft: 0,
//     },
//     item: {
//       background: "#fff",
//       margin: "10px 0",
//       padding: "20px",
//       borderRadius: "8px",
//       boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//     },
//     approveBtn: {
//       padding: "8px 16px",
//       background: "#28a745",
//       color: "#fff",
//       border: "none",
//       borderRadius: "6px",
//       cursor: "pointer",
//     },
//   };

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.title}>Pending Employee Requests</h2>
//       {loading ? (
//         <p>Loading...</p>
//       ) : requests.length === 0 ? (
//         <p>No pending requests ✅</p>
//       ) : (
//         <ul style={styles.list}>
//           {requests.map((req) => (
//             <li key={req.id} style={styles.item}>
//               <div>
//                 <strong>{req.employee_name}</strong> ({req.employee_email})
//               </div>
//               <button
//                 style={styles.approveBtn}
//                 onClick={() => approveRequest(req.id)}
//               >
//                 Approve
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";

export default function ManagerRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    setLoading(true);
    const res = await fetch("http://127.0.0.1:8000/requests", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await res.json();
    setRequests(data);
    setLoading(false);
  };

  const approveRequest = async (requestId) => {
    const res = await fetch(
      `http://127.0.0.1:8000/requests/${requestId}/approve`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const data = await res.json();
    if (res.ok) {
      alert(data.msg);
      fetchRequests();
    } else {
      alert(data.detail || "Failed to approve");
    }
  };

  const denyRequest = async (requestId) => {
    const res = await fetch(
      `http://127.0.0.1:8000/requests/${requestId}/deny`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const data = await res.json();
    if (res.ok) {
      alert(data.msg);
      fetchRequests();
    } else {
      alert(data.detail || "Failed to deny");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const styles = {
    container: {
      padding: "40px",
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
      background: "#f0f4f8",
      minHeight: "100vh",
    },
    title: {
      textAlign: "center",
      fontSize: "28px",
      marginBottom: "30px",
      color: "#333",
    },
    list: {
      listStyle: "none",
      paddingLeft: 0,
    },
    item: {
      background: "#fff",
      margin: "10px 0",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 4px 14px rgba(0,0,0,0.06)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    buttonsWrapper: {
      display: "flex",
      gap: "12px",
    },
    approveBtn: {
      padding: "8px 20px",
      background: "#28a745",
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: "600",
      transition: "background 0.2s ease",
    },
    denyBtn: {
      padding: "8px 20px",
      background: "#e74c3c",
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: "600",
      transition: "background 0.2s ease",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Pending Employee Requests</h2>
      {loading ? (
        <p>Loading...</p>
      ) : requests.length === 0 ? (
        <p>No pending requests ✅</p>
      ) : (
        <ul style={styles.list}>
          {requests.map((req) => (
            <li key={req.id} style={styles.item}>
              <div>
                <strong>{req.employee_name}</strong> ({req.employee_email})
              </div>
              <div style={styles.buttonsWrapper}>
                <button
                  style={styles.approveBtn}
                  onClick={() => approveRequest(req.id)}
                >
                  Approve
                </button>
                <button
                  style={styles.denyBtn}
                  onClick={() => denyRequest(req.id)}
                >
                  Deny
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
