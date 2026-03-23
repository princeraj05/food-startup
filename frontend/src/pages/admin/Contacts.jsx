import { useEffect, useState } from "react";
import API from "../../api/axios";
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

      const res = await API.get("/api/admin/contacts",{
        headers:{ Authorization:`Bearer ${token}` }
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
          headers:{ Authorization:`Bearer ${token}` }
        }
      );

      setReplyText(p=>({...p,[id]:""}));
      loadContacts();

    }catch(err){
      console.log(err);
    }
  };

  return(

    <div className="max-w-6xl mx-auto px-4 py-6">

      <h2 className="text-2xl font-bold mb-6">📩 User Contacts</h2>

      {contacts.length===0 && (
        <p className="text-gray-500">No contact messages found</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {contacts.map(c=>(

          <div key={c._id} className="bg-white p-5 rounded-2xl shadow-md space-y-3">

            {/* USER INFO */}
            <div className="flex justify-between items-center">

              <div>
                <p className="font-semibold">{c.name}</p>
                <p className="text-sm text-gray-500">{c.email}</p>
              </div>

              <span className="text-xs text-gray-400">
                {new Date(c.createdAt).toLocaleDateString()}
              </span>

            </div>

            {/* MESSAGE */}
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-xs font-semibold mb-1">User Message</p>
              <p className="text-sm text-gray-700">{c.message}</p>
            </div>

            {/* REPLY */}
            {c.reply ? (

              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-xs font-semibold mb-1">Admin Reply</p>
                <p className="text-sm text-green-700">{c.reply}</p>
              </div>

            ) : (

              <div className="space-y-2">

                <textarea
                  placeholder="Type your reply..."
                  value={replyText[c._id] || ""}
                  onChange={(e)=>
                    setReplyText({...replyText,[c._id]:e.target.value})
                  }
                  className="w-full border p-2 rounded-lg text-sm"
                />

                <button
                  onClick={()=>sendReply(c._id)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm"
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