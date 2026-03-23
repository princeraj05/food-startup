import { useEffect, useState } from "react";
import API from "../../api/axios"; // ✅ NEW
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
        headers:{
          Authorization:`Bearer ${token}`
        }
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
        headers:{
          Authorization:`Bearer ${token}`
        }
      });

      loadFoods();

    }catch(err){
      console.log(err);
    }
  };

  return(

    <div style={page}>

      <h2 style={title}>🍔 Manage Foods</h2>

      {/* ADD FOOD FORM */}

      <form style={formBox} onSubmit={addFood}>

        <input
          style={input}
          name="name"
          placeholder="Food name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          style={input}
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
        />

        <textarea
          style={textarea}
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />

        <input
          style={file}
          name="image"
          type="file"
          onChange={handleChange}
        />

        <button style={btn} type="submit">
          Add Food
        </button>

      </form>

      {/* FOOD LIST */}

      <div style={grid}>

        {foods.map(f=>(

          <div key={f._id} style={card}>

            {/* ✅ IMAGE FIX */}
            <img
              src={`${import.meta.env.VITE_API_URL}/uploads/${f.image}`}
              style={image}
            />

            <h3>{f.name}</h3>

            <p style={desc}>{f.description}</p>

            <p style={price}>₹{f.price}</p>

            <button
              style={deleteBtn}
              onClick={()=>deleteFood(f._id)}
            >
              Delete
            </button>

          </div>

        ))}

      </div>

    </div>

  )
}