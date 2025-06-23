// Notifications.js
// import React, { useEffect, useState } from "react";

// export default function Notifications() {
//   const [notifications, setNotifications] = useState([]);

//   useEffect(() => {
//     const fetchNotifications = async () => {
//       const res = await fetch("http://127.0.0.1:8000/notifications", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       const data = await res.json();
//       setNotifications(data);
//     };
//     fetchNotifications();
//   }, []);

//   const handleMarkAsRead = async (id) => {
//     await fetch(`http://127.0.0.1:8000/notifications/read/${id}`, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//     });
//     setNotifications((prev) =>
//       prev.map((n) => (n.id === id ? { ...n, read: true } : n))
//     );
//   };

//   const unreadCount = notifications.filter((n) => !n.read).length;

//   return (
//     <div style={{ position: "relative" }}>
//       <button>
//         Notifications {unreadCount > 0 && <span>({unreadCount})</span>}
//       </button>
//       <ul
//         style={{
//           position: "absolute",
//           background: "#fff",
//           border: "1px solid #ccc",
//           padding: "10px",
//           width: "250px",
//           listStyle: "none",
//           maxHeight: "200px",
//           overflowY: "auto",
//         }}
//       >
//         {notifications.length === 0 && <li>No notifications</li>}
//         {notifications.map((n) => (
//           <li key={n.id} style={{ marginBottom: "5px" }}>
//             {n.message}{" "}
//             {!n.read && (
//               <button onClick={() => handleMarkAsRead(n.id)}>
//                 Mark as read
//               </button>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      const res = await fetch("http://127.0.0.1:8000/notifications", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      setNotifications(data);
    };
    fetchNotifications();
  }, []);

  const handleMarkAsRead = async (id) => {
    await fetch(`http://127.0.0.1:8000/notifications/read/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div style={{ position: "fixed", top: "20px", right: "20px", zIndex: 999 }}>
      {/* Bell Icon + Badge */}
      <button
        onClick={() => setShowList(!showList)}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: "24px",
          position: "relative",
        }}
      >
        🔔
        {unreadCount > 0 && (
          <span
            style={{
              position: "absolute",
              top: "-5px",
              right: "-5px",
              background: "red",
              color: "white",
              borderRadius: "50%",
              padding: "2px 6px",
              fontSize: "12px",
            }}
          >
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown List */}
      {showList && (
        <ul
          style={{
            position: "absolute",
            top: "40px",
            right: 0,
            background: "#fff",
            border: "1px solid #ccc",
            padding: "10px",
            width: "250px",
            listStyle: "none",
            maxHeight: "200px",
            overflowY: "auto",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            borderRadius: "4px",
          }}
        >
          {notifications.length === 0 && <li>No notifications</li>}
          {notifications.map((n) => (
            <li
              key={n.id}
              style={{
                marginBottom: "8px",
                background: n.read ? "#f9f9f9" : "#eef6ff",
                padding: "5px",
                borderRadius: "4px",
              }}
            >
              {n.message}{" "}
              {!n.read && (
                <button
                  onClick={() => handleMarkAsRead(n.id)}
                  style={{
                    marginLeft: "5px",
                    fontSize: "12px",
                  }}
                >
                  Mark as read
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
