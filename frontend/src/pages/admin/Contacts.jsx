import { useEffect, useState } from "react";
import API from "../../api/axios"; // ✅ NEW
import { getToken } from "../../utils/getToken";

export default function Contacts(){

  const [contacts,setContacts] = useState([]);
  const [replyText,setReplyText] = useState({});

  useEffect(()=>{
    loadContacts();
  },[]);

  const loadContacts = async()=>{
    try{
      const token = await getToken();

      const res = await API.get("/api/admin/contacts", {
        headers: { Authorization: `Bearer ${token}` }
      });

      setContacts(res.data);

    }catch(err){
      console.log(err);
    }
  };

  const sendReply = async(id)=>{
    try{
      const token = await getToken();

      await API.post(`/api/admin/contacts/${id}/reply`,
        { reply: replyText[id] },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setReplyText(p=>({...p,[id]:""}));
      loadContacts();

    }catch(err){
      console.log(err);
    }
  };

  return(

    <div style={page}>

      <h2 style={title}>📩 User Contacts</h2>

      {contacts.length===0 && (
        <p style={empty}>No contact messages found</p>
      )}

      <div style={grid}>

        {contacts.map(c=>(

          <div key={c._id} style={card}>

            <div style={userRow}>
              <div>
                <p style={name}>{c.name}</p>
                <p style={email}>{c.email}</p>
              </div>

              <span style={date}>
                {new Date(c.createdAt).toLocaleDateString()}
              </span>
            </div>

            <div style={messageBox}>
              <p style={label}>User Message</p>
              <p style={message}>{c.message}</p>
            </div>

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
                  onChange={(e)=>
                    setReplyText({...replyText,[c._id]:e.target.value})
                  }
                />

                <button
                  style={btn}
                  onClick={()=>sendReply(c._id)}
                >
                  Send Reply
                </button>

              </div>

            )}

          </div>

        ))}

      </div>

    </div>

  )
}