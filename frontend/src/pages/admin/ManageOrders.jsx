import { useEffect, useState } from "react";
import API from "../../api/axios";
import { getToken } from "../../utils/getToken";

export default function ManageOrders(){

  const [orders,setOrders] = useState([]);
  const [etaInput,setEtaInput] = useState({});

  useEffect(()=>{
    loadOrders();
  },[]);

  const loadOrders = async()=>{
    try{
      const token = await getToken();

      const res = await API.get("/api/orders",{
        headers:{ Authorization:`Bearer ${token}` }
      });

      setOrders(res.data);
    }catch(err){
      console.log(err);
    }
  };

  const setETA = async(id,status)=>{
    try{
      const token = await getToken();

      await API.put(`/api/orders/${id}/status`,
        {
          status,
          etaMinutes:Number(etaInput[id]) || 0
        },
        {
          headers:{ Authorization:`Bearer ${token}` }
        }
      );

      setEtaInput({});
      loadOrders();

    }catch(err){
      console.log(err);
    }
  };

  const remaining = (o)=>{
    if(o.status==="Delivered") return "Delivered";

    if(!o.etaMinutes || !o.etaSetAt) return "Not Set";

    const diff =
      o.etaMinutes*60000 -
      (Date.now() - new Date(o.etaSetAt).getTime());

    if(diff<=0) return "Delivered Soon";

    const m = Math.floor(diff/60000);
    const s = Math.floor((diff%60000)/1000);

    return `${m}m ${s}s`;
  };

  return(

    <div className="max-w-6xl mx-auto px-4 py-6">

      <h2 className="text-2xl font-bold mb-6">📦 Manage Orders</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

        {orders.map(o=>(

          <div key={o._id} className="bg-white p-5 rounded-2xl shadow-md space-y-3">

            <h3 className="font-bold text-lg">
              Order #{o._id.slice(-6)}
            </h3>

            <p className="text-sm">
              Status: <span className="font-semibold">{o.status}</span>
            </p>

            <select
              value={o.status}
              onChange={(e)=>setETA(o._id,e.target.value)}
              className="w-full border p-2 rounded-lg"
            >
              <option>Pending</option>
              <option>Preparing</option>
              <option>Delivered</option>
            </select>

            <p className="text-gray-600 text-sm">
              📍 {o.address}
            </p>

            <p className="text-sm">
              ⏱ Remaining: {remaining(o)}
            </p>

            {o.status!=="Delivered" && (

              <div className="flex gap-2">

                <input
                  type="number"
                  placeholder="ETA (min)"
                  value={etaInput[o._id] || ""}
                  onChange={(e)=>
                    setEtaInput({...etaInput,[o._id]:e.target.value})
                  }
                  className="flex-1 border p-2 rounded-lg"
                />

                <button
                  onClick={()=>setETA(o._id,o.status)}
                  className="bg-green-600 hover:bg-green-700 text-white px-3 rounded-lg"
                >
                  Set
                </button>

              </div>

            )}

            <div className="text-sm text-gray-700 space-y-1">

              {o.items.map((i,idx)=>(
                <div key={idx}>
                  {i.name} × {i.qty} = ₹{i.price * i.qty}
                </div>
              ))}

            </div>

            <h4 className="font-bold text-right">
              Total ₹{o.total}
            </h4>

          </div>

        ))}

      </div>

    </div>

  )
}