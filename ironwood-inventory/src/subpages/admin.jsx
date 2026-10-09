import { useState, useEffect } from 'react'
import { Routes, Route} from 'react-router-dom';
import axios from 'axios';

export function Supplier(){
    return(
        
    )
}

export default function Admin(){
    const [data, setData] = useState([]);
    const [activeNewItem, setActiveNewItem] = useState(false);
    const [activeEditItem, setActiveEditItem] = useState(false);
    
    const fetchData = async () => {

        try {
            const response = await axios.get('http://localhost:8080/api/inventory');
            setData(response.data);
            console.log('Data fetched successfully:', response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    
    const handleAddNewItem = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newItem = Object.fromEntries(formData.entries());
        const response = await axios.post(`http://localhost:8080/api/inventory/`, newItem);
        console.log('Add new item response:', response.data);
        
        fetchData();
    };
    const handleEdit = async (e, id) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const updatedItem = Object.fromEntries(formData.entries());
        const response = await axios.put(`http://localhost:8080/api/inventory/${id}`, updatedItem);
        console.log(`Edit item with ID: ${id}`);
        setActiveEditItem(0);
        fetchData();

    }
    const handleDelete = async (id) => {
        console.log(`Delete item with ID: ${id}`);
        const response = await axios.delete(`http://localhost:8080/api/inventory/${id}`);
        console.log(`Delete response for item with ID: ${id}`, response.data);
        fetchData(); 
    }
    return (
    <div className="w-full md:w-[75%] mx-auto h-dvh">
        <div className="flex flex-row justify-between h-35 ">
            <div className="flex flex-col">
                <h1>Admin Panel</h1>
                <p>Welcome to the admin panel!</p>

                This is where you can manage your inventory, view reports, and perform administrative tasks.
            </div>
            <div className="flex flex-col justify-center ">
                <button className="bg-blue-500 hover:bg-blue-600 duration-300 text-white px-3 py-1 rounded self-center" onClick={() => setActiveNewItem((prev) => !prev)}>Add New Item</button>
            </div>
        </div>
        <div className="ease-in-out duration-300">
        </div>
        {activeNewItem && (
                <div className="border p-6 rounded-lg shadow-lg w-full">
                    <h2 className="text-xl font-bold mb-4">Add New Item</h2>
                    <form onSubmit={handleAddNewItem}>
                        <div className="mb-4">
                            <label className="block mb-2">Name:</label>
                            <input type="text" name="name" className="w-full md:w-[30%] p-2 border rounded focus:outline-0  " required />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">Price:</label>
                            <input type="number" step="0.01" name="price" className="w-full md:w-[30%] p-2 border rounded focus:outline-0  " required />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">Category:</label>
                            <input type="text" name="category" className="w-full md:w-[30%] p-2 border rounded focus:outline-0  " required />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">Quantity:</label>
                            <input type="number" name="quantity" className="w-full md:w-[30%] p-2 border rounded focus:outline-0  " required />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">Description:</label>
                            <textarea name="description" className="w-full md:w-[30%] p-2 border rounded focus:outline-0  " required />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">Image URL:</label>
                            <input type="text" name="image" className="w-full md:w-[30%] p-2 border rounded focus:outline-0  " required />
                        </div>
                        <button type="submit" className="bg-green-500 hover:bg-green-600 duration-300 text-white px-3 py-1 rounded mr-2">
                            Submit
                        </button>
                    </form>
                </div>
        )}

        {data.map((item) => (
            <div key={item.id} className="flex flex-row justify-between border-slate-700 border p-4 my-2 rounded-lg shadow-md">
                <div className={`flex flex-col  ${activeEditItem === item.id ? 'md:w-[70%]' : 'md:w-[100%]'} transition-all duration-300 ease-in-out`}>
                    {activeEditItem === item.id && activeEditItem !== 0 ? (
                        <form onSubmit={(e) => handleEdit(e, item.id)} className="flex flex-col gap-2 w-full">
                            <div className="flex gap-2 items-center w-full">
                                <label className="block mb-2">Name:</label>
                                <input type="text" name="name" defaultValue={item.name} className="w-full md:w-[30%] p-2 border rounded focus:outline-0  " required />
                            </div>
                            <div className="flex gap-2 items-center ">
                                <label className="block mb-2 ">Price:</label>
                                <input type="number" name="price" step="0.01" defaultValue={item.price} className="w-[10%] p-2 border rounded focus:outline-0  " required />
                            </div>
                            <div className="flex gap-2 items-center ">
                                <label className="block mb-2">Category:</label>
                                <input type="text" name="category" defaultValue={item.category} className="w-full md:w-[30%] p-2 border rounded focus:outline-0  " required />
                            </div>
                            <div className="flex gap-2 items-center ">
                                <label className="block mb-2">Quantity:</label>
                                <input type="number" name="quantity" defaultValue={item.quantity} className="w-[10%] p-2 border rounded focus:outline-0  " required />
                            </div>
                            <div className="flex gap-2 items-center ">
                                <label className="block mb-2">Description:</label>
                                <textarea name="description" defaultValue={item.description} className="w-full md:w-[30%] p-2 border rounded focus:outline-0  " required />
                            </div>
                            <div className="flex gap-2 items-center ">
                                <label className="block mb-2">Image URL:</label>
                                <input type="text" name="image" defaultValue={item.image} className="w-full md:w-[30%]  p-2 border rounded focus:outline-0  " required />
                            </div>
                            <div className="flex gap-2 w-[30%] items-center ">
                                <button type="submit" className="bg-green-500 hover:bg-green-600 w-full md:w-[60%]  duration-300 text-white px-3 py-1 rounded mx-auto">
                                    Update
                                </button>
                            </div>
                        </form>
                    ) : (
                        <>
                            <h3>ID: {item.id}</h3>
                            <h2>{item.name}</h2>
                            <p>Price: ${item.price.toFixed(2)}</p>
                            <p>Category: {item.category}</p>
                            <p>Quantity: {item.quantity}</p>
                            <p>Description: {item.description}</p>
                        </>
                    )}
                </div>
                <div className="flex flex-row gap-2 justify-center">
                    <img src={item.image} alt={item.name} className="w-16 h-16 self-center object-cover rounded-lg" />
                    <div className="flex flex-col justify-center">
                        <button className="bg-blue-500 text-white px-3 duration-300 py-1 rounded hover:bg-blue-600" onClick={() => setActiveEditItem(item.id)}>Edit</button>
                        <button className="bg-red-500 text-white px-3 duration-300 py-1 rounded hover:bg-red-600 mt-2" onClick={() => handleDelete(item.id)}>Delete</button>
                    </div>
                </div>
            </div>
        ))}
    </div>
    );
}