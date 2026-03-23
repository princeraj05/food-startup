
import { useEffect, useState } from "react";
import API from "../../api/axios";
import { getToken } from "../../utils/getToken";

export default function ManageFoods(){

  const [foods,setFoods] = useState([]);

  const [form,setForm] = useState({
    name:"",
    price:"",
    description:"",
    image:null
  });

  useEffect(()=>{
    loadFoods();
  },[]);

  const loadFoods = async()=>{
    try{
      const res = await API.get("/api/foods");
      setFoods(res.data);
    }catch(err){
      console.log(err);
    }
  };

  const handleChange = (e)=>{
    const {name,value,files} = e.target;

    if(name==="image"){
      setForm({...form,image:files[0]});
    }else{
      setForm({...form,[name]:value});
    }
  };

  const addFood = async(e)=>{
    e.preventDefault();

    if(!form.name || !form.price || !form.description || !form.image){
      alert("All fields required");
      return;
    }

    try{
      const token = await getToken();

      const fd = new FormData();
      fd.append("name",form.name);
      fd.append("price",form.price);
      fd.append("description",form.description);
      fd.append("image",form.image);

      await API.post("/api/foods", fd, {
        headers:{ Authorization:`Bearer ${token}` }
      });

      setForm({
        name:"",
        price:"",
        description:"",
        image:null
      });

      loadFoods();

    }catch(err){
      console.log(err);
    }
  };

  const deleteFood = async(id)=>{
    try{
      const token = await getToken();

      if(!window.confirm("Delete this food?")) return;

      await API.delete(`/api/foods/${id}`,{
        headers:{ Authorization:`Bearer ${token}` }
      });

      loadFoods();

    }catch(err){
      console.log(err);
    }
  };

  return(

    <div className="max-w-6xl mx-auto px-4 py-6">

      <h2 className="text-2xl font-bold mb-6">🍔 Manage Foods</h2>

      {/* ADD FOOD FORM */}
      <form 
        onSubmit={addFood}
        className="bg-white p-6 rounded-2xl shadow-lg mb-8 space-y-4"
      >

        <input
          name="name"
          placeholder="Food name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
        />

        <input
          name="image"
          type="file"
          onChange={handleChange}
          className="w-full"
        />

        <button 
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Add Food
        </button>

      </form>

      {/* FOOD LIST */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {foods.map(f=>(

          <div 
            key={f._id} 
            className="bg-white p-4 rounded-2xl shadow-md hover:shadow-lg transition text-center"
          >

            <img
              src={`${import.meta.env.VITE_API_URL}/uploads/${f.image}`}
              className="w-full h-40 object-cover rounded-lg mb-3"
            />

            <h3 className="font-bold text-lg">{f.name}</h3>

            <p className="text-gray-500 text-sm">{f.description}</p>

            <p className="font-semibold mt-2">₹{f.price}</p>

            <button
              onClick={()=>deleteFood(f._id)}
              className="mt-3 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition"
            >
              Delete
            </button>

          </div>

        ))}

      </div>

    </div>

  )
}