// ================= FRONTEND =================
// src/pages/admin/Contacts.jsx
// (PROFESSIONAL UI + INLINE STYLES)

import { useEffect, useState } from "react";
import { getToken } from "../../utils/getToken";

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [replyText, setReplyText] = useState({});

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    const token = await getToken();
    const res = await fetch("https://food-startup-1.onrender.com/api/admin/contacts", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setContacts(data);
  };

  const sendReply = async (id) => {
    const token = await getToken();
    await fetch(`https://food-startup-1.onrender.com/api/admin/contacts/${id}/reply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ reply: replyText[id] }),
    });

    setReplyText((p) => ({ ...p, [id]: "" }));
    loadContacts();
  };

  return (
    <div style={page}>
      <h2 style={title}>📩 User Contacts</h2>

      {contacts.length === 0 && (
        <p style={empty}>No contact messages found</p>
      )}

      {contacts.map((c) => (
        <div key={c._id} style={card}>
          {/* USER INFO */}
          <div style={userRow}>
            <div>
              <p style={name}>{c.name}</p>
              <p style={email}>{c.email}</p>
            </div>
            <span style={date}>
              {new Date(c.createdAt).toLocaleDateString()}
            </span>
          </div>

          {/* MESSAGE */}
          <div style={messageBox}>
            <p style={label}>User Message</p>
            <p style={message}>{c.message}</p>
          </div>

          {/* REPLY */}
          {c.reply ? (
            <div style={replyBox}>
              <p style={label}>Admin Reply</p>
              <p style={reply}>{c.reply}</p>
            </div>
          ) : (
            <div style={replyArea}>
              <textarea
                style={textarea}
                placeholder="Type your reply..."
                value={replyText[c._id] || ""}
                onChange={(e) =>
                  setReplyText({ ...replyText, [c._id]: e.target.value })
                }
              />
              <button style={btn} onClick={() => sendReply(c._id)}>
                Send Reply
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ================= STYLES ================= */

const page = {
  maxWidth: 900,
};

const title = {
  marginBottom: 24,
  fontSize: 22,
  fontWeight: 800,
  color: "#0f172a",
};

const empty = {
  color: "#64748b",
};

const card = {
  background: "#ffffff",
  borderRadius: 18,
  padding: 20,
  marginBottom: 20,
  boxShadow:
    "rgba(0,0,0,0.12) 0px 10px 25px, rgba(0,0,0,0.06) 0px 5px 10px",
};

const userRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 14,
};

const name = {
  fontSize: 16,
  fontWeight: 700,
  color: "#020617",
};

const email = {
  fontSize: 14,
  color: "#64748b",
};

const date = {
  fontSize: 12,
  color: "#94a3b8",
};

const messageBox = {
  background: "#f8fafc",
  padding: 14,
  borderRadius: 12,
  marginBottom: 14,
};

const message = {
  fontSize: 14,
  color: "#0f172a",
};

const replyBox = {
  background: "#ecfdf5",
  padding: 14,
  borderRadius: 12,
  border: "1px solid #86efac",
};

const reply = {
  fontSize: 14,
  color: "#065f46",
};

const label = {
  fontSize: 12,
  fontWeight: 700,
  marginBottom: 6,
  color: "#475569",
};

const replyArea = {
  display: "flex",
  flexDirection: "column",
  gap: 10,
};

const textarea = {
  width: "100%",
  minHeight: 80,
  padding: 12,
  borderRadius: 12,
  border: "1px solid #cbd5e1",
  fontSize: 14,
  resize: "vertical",
};

const btn = {
  alignSelf: "flex-end",
  padding: "10px 18px",
  borderRadius: 12,
  border: "none",
  cursor: "pointer",
  fontWeight: 700,
  background: "linear-gradient(135deg,#22c55e,#16a34a)",
  color: "#ffffff",
};
