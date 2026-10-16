import { useState, useEffect } from 'react'
import { Routes, Route, useParams, Link} from 'react-router-dom';
import axios from 'axios';
import supply_item from '../assets/delivery-box-11392.svg'
import supplier from '../assets/truck-1058.svg'


function Categories(){
    const [data, setData] = useState([]);
    const [active, setActive] = useState([])

    const fetchData = async () => {

        try {
            const response = await axios.get('http://localhost:8080/api/categories');
            setData(response.data);
            console.log('Data fetched successfully:', response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    
    useEffect(()=>{
        fetchData()
    },[])

    return(
        <>
        {loading ? (
            <div className="w-full md:w-[75%] mx-auto text-(--text-primary) h-dvh flex justify-center items-center">
                <p>Loading...</p>
            </div>
        ):(
            <div className="text-(--text-primary) ">
                <div className="w-[90%] flex flex-col text-2xl gap-5 mx-auto">
                    <div className="flex flex-row align-middle p-5 border-b border-(--border)">
                        <h2 className="p-5">Categories:</h2>
                        <button type="button">Edit</button>
                        
                    </div>

                    {data.map(category => (
                        <div >
                            <button type="button">Edit</button>
                            <div className="w-full md:w-[90%] flex flex-col mx-auto hover:shadow-lg duration-150 gap-2 p-5 border border-(--border) rounded-2xl">
                                    <label className="text-3xl">
                                        {category.name}
                                    </label>
                                    <label className="text-xl text-(--text-tertiary)">
                                        Category ID: {category.id}
                                    </label>
                                    <label className="text-xl ">
                                        Description: <span className=' font-semibold'>{category.description}</span></label>
                                    
                                </div>

                        </div>
                    ))}
                    
                </div>
            </div>

            )}

        </>
    )
}

function SupplyItemDetails( ){
    const [data, setData] = useState([])
    const { product_id, supplier_id } = useParams(); 
    const [loading, setLoading] = useState(true)
    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/product/supplier/${product_id}/${supplier_id}`);
            setData(response.data);
            // setCategoryFilter(response2.data)
            console.log('Data fetched successfully:', response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    }

    
    useEffect(() => {
        fetchData();
    }, []);
    return(
        <div className="text-(--text-primary) flex flex-col gap-5">
            {loading ? (
                <div className="w-full md:w-[75%] mx-auto text-(--text-primary) h-dvh flex justify-center items-center">
                    <p>Loading...</p>
                </div>
            ):(
                <div className="max-w-full overflow-x-auto lg:w-[90%] mx-auto ">
                    <div>
                        <h2 className="text-2xl pt-7.5">Item data:</h2>
                            <div className=" items-start border-b border-(--border) p-5 ">
                            <div className="w-[95%] mx-auto  flex flex-col gap-5">
                                <h2 className="font-semibold text-4xl">{data[0].name}</h2>
                                <div className="flex gap-5 text-xl">
                                    <label>Id: {data[0].id}</label>
                                    <label>Selling price: ${data[0].price}</label>
                                </div>
                            </div>
                        </div>
                        
                        <h2 className="text-2xl pt-7.5">Supplier data:</h2>
                            <div className="flex flex-col items-start border-b border-(--border) p-5 gap-5 ">
                            <div className="w-[95%] mx-auto flex flex-col gap-5">
                                <h2 className="font-semibold text-4xl">{data[0].title}</h2>
                                <div className="flex flex-col md:flex-row gap-5 text-xl">
                                    <label>Email: {data[0].email}</label>
                                    <label>Phone Number: #{data[0].supplierNumber}</label>
                                    <label>Supplier price: ${data[0].supplier_price}</label>

                                        
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    </div>
            )}
        </div>
    )
    
}

export function SupplyItems(){
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true);
    const [categoryFilter, setCategoryFilter] = useState([])
    const [searchFilter, setSearchFilter] = useState('');

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/product/supplier');
            // const response2 = await axios.get('http://localhost:8080/api/categories');
            setData(response.data);
            // setCategoryFilter(response2.data)
            console.log('Data fetched successfully:', response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);
    
    return ( 
        <>
        {loading ? (
            <div className="w-full md:w-[75%] mx-auto text-(--text-primary) h-dvh flex justify-center items-center">
                <p>Loading...</p>
            </div>
        ):(
            <div className="text-(--text-primary) ">
                <div className="w-[90%] flex flex-col text-2xl gap-5 mx-auto">
                    <h2 className="p-5">Items and Supplies:</h2>
                    {data.map(item => (
                        <Link to={`/admin/supply_items/${item.product_id}/${item.supplier_id}`}>
                            <div className="w-full md:w-[90%] flex flex-col mx-auto hover:shadow-lg duration-150 gap-2 p-5 border border-(--border) rounded-2xl">
                                    <label className="text-3xl">
                                        {item.product_name}
                                    </label>

                                    <label className="text-xl text-(--text-tertiary)">
                                        Product ID: {item.product_id}
                                    </label>
                                    <label className="text-xl text-(--text-secondary)">
                                        {item.supplier_name}
                                    </label>
                                    <label className="text-xl ">
                                        Supplier price: <span className='text-(--accent) font-bold'>${(item.supplier_price / 100).toFixed(2)}</span></label>
                                    
                                </div>

                        </Link>
                    ))}
                    
                </div>
            </div>

            )}

        </>
    )
}

export default function Admin() {
    const [data, setData] = useState([]);
    const [activeNewItem, setActiveNewItem] = useState(false);
    const [activeEditItem, setActiveEditItem] = useState(false);
    
    return(
        <div className="relative w-full min-h-screen">
            <div id="sidebar" className="w-5 md:w-20 h-full absolute bg-(--bg-primary) left-0 flex flex-col align-middle">
                <div className="p-2 ">
                    <Link className="" to="/admin/supply_items">
                        <img src={supply_item} alt="supply item"/>
                        </Link>

                    <img src={supplier} alt="supplier"/>
                    <Link className="border border-transparent bg-(--bg-primary) hover:bg-(--bg-secondary) duration-150" to="/admin/categories">
                        <img src={supply_item} alt="supply item"/>
                    </Link>
                </div>

            </div>
            <div id="content" className="w-full md:w-[calc(100%-5rem)] h-full absolute right-0 bg-(--bg-secondary)">
                <Routes>

                    <Route path="/supply_items" element={<SupplyItems />} />
                    <Route path="/category" element={<Categories />} />
                    
                    <Route path="/supply_items/:product_id/:supplier_id" element={<SupplyItemDetails />} />
                </Routes>
            </div>
        </div>
    )

}


export function Supplier(){
    return(
        <>
        <h2>log</h2>
        </>
    )
}

// export default function Admin(){
//     const [data, setData] = useState([]);
//     const [activeNewItem, setActiveNewItem] = useState(false);
//     const [activeEditItem, setActiveEditItem] = useState(false);
    
//     const fetchData = async () => {

//         try {
//             const response = await axios.get('http://localhost:8080/api/inventory');
//             setData(response.data);
//             console.log('Data fetched successfully:', response.data);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     };

//     useEffect(() => {
//         fetchData();
//     }, []);
    
//     const handleAddNewItem = async (e) => {
//         e.preventDefault();
//         const formData = new FormData(e.target);
//         const newItem = Object.fromEntries(formData.entries());
//         const response = await axios.post(`http://localhost:8080/api/inventory/`, newItem);
//         console.log('Add new item response:', response.data);
        
//         fetchData();
//     };
//     const handleEdit = async (e, id) => {
//         e.preventDefault();
//         const formData = new FormData(e.target);
//         const updatedItem = Object.fromEntries(formData.entries());
//         const response = await axios.put(`http://localhost:8080/api/inventory/${id}`, updatedItem);
//         console.log(`Edit item with ID: ${id}`);
//         setActiveEditItem(0);
//         fetchData();

//     }
//     const handleDelete = async (id) => {
//         console.log(`Delete item with ID: ${id}`);
//         const response = await axios.delete(`http://localhost:8080/api/inventory/${id}`);
//         console.log(`Delete response for item with ID: ${id}`, response.data);
//         fetchData(); 
//     }
//     return (
//     <div className="w-full md:w-[75%] mx-auto min-h-dvh">
//         <div className="flex flex-row justify-between h-35 ">
//             <div className="flex flex-col">
//                 <h1>Admin Panel</h1>
//                 <p>Welcome to the admin panel!</p>

//                 This is where you can manage your inventory, view reports, and perform administrative tasks.
//             </div>
//             <div className="flex flex-col justify-center ">
//                 <button className="bg-blue-500 hover:bg-blue-600 duration-300 text-white px-3 py-1 rounded self-center" onClick={() => setActiveNewItem((prev) => !prev)}>Add New Item</button>
//             </div>
//         </div>
//         <div className="ease-in-out duration-300">
//         </div>
//         {activeNewItem && (
//                 <div className="border p-6 rounded-lg shadow-lg w-full">
//                     <h2 className="text-xl font-bold mb-4">Add New Item</h2>
//                     <form onSubmit={handleAddNewItem}>
//                         <div className="mb-4">
//                             <label className="block mb-2">Name:</label>
//                             <input type="text" name="name" className="w-full md:w-[30%] p-2 border rounded focus:outline-0  " required />
//                         </div>
//                         <div className="mb-4">
//                             <label className="block mb-2">Price:</label>
//                             <input type="number" step="0.01" name="price" className="w-full md:w-[30%] p-2 border rounded focus:outline-0  " required />
//                         </div>
//                         <div className="mb-4">
//                             <label className="block mb-2">Category:</label>
//                             <input type="text" name="category" className="w-full md:w-[30%] p-2 border rounded focus:outline-0  " required />
//                         </div>
//                         <div className="mb-4">
//                             <label className="block mb-2">Quantity:</label>
//                             <input type="number" name="quantity" className="w-full md:w-[30%] p-2 border rounded focus:outline-0  " required />
//                         </div>
//                         <div className="mb-4">
//                             <label className="block mb-2">Description:</label>
//                             <textarea name="description" className="w-full md:w-[30%] p-2 border rounded focus:outline-0  " required />
//                         </div>
//                         <div className="mb-4">
//                             <label className="block mb-2">Image URL:</label>
//                             <input type="text" name="image" className="w-full md:w-[30%] p-2 border rounded focus:outline-0  " required />
//                         </div>
//                         <button type="submit" className="bg-green-500 hover:bg-green-600 duration-300 text-white px-3 py-1 rounded mr-2">
//                             Submit
//                         </button>
//                     </form>
//                 </div>
//         )}

//         {data.map((item) => (
//             <div key={item.id} className="flex flex-row justify-between border-slate-700 border p-4 my-2 rounded-lg shadow-md">
//                 <div className={`flex flex-col  ${activeEditItem === item.id ? 'md:w-[70%]' : 'md:w-[100%]'} transition-all duration-300 ease-in-out`}>
//                     {activeEditItem === item.id && activeEditItem !== 0 ? (
//                         <form onSubmit={(e) => handleEdit(e, item.id)} className="flex flex-col gap-2 w-full">
//                             <div className="flex gap-2 items-center w-full">
//                                 <label className="block mb-2">Name:</label>
//                                 <input type="text" name="name" defaultValue={item.name} className="w-full md:w-[30%] p-2 border rounded focus:outline-0  " required />
//                             </div>
//                             <div className="flex gap-2 items-center ">
//                                 <label className="block mb-2 ">Price:</label>
//                                 <input type="number" name="price" step="0.01" defaultValue={item.price} className="w-[10%] p-2 border rounded focus:outline-0  " required />
//                             </div>
//                             <div className="flex gap-2 items-center ">
//                                 <label className="block mb-2">Category:</label>
//                                 <input type="text" name="category" defaultValue={item.category} className="w-full md:w-[30%] p-2 border rounded focus:outline-0  " required />
//                             </div>
//                             <div className="flex gap-2 items-center ">
//                                 <label className="block mb-2">Quantity:</label>
//                                 <input type="number" name="quantity" defaultValue={item.quantity} className="w-[10%] p-2 border rounded focus:outline-0  " required />
//                             </div>
//                             <div className="flex gap-2 items-center ">
//                                 <label className="block mb-2">Description:</label>
//                                 <textarea name="description" defaultValue={item.description} className="w-full md:w-[30%] p-2 border rounded focus:outline-0  " required />
//                             </div>
//                             <div className="flex gap-2 items-center ">
//                                 <label className="block mb-2">Image URL:</label>
//                                 <input type="text" name="image" defaultValue={item.image} className="w-full md:w-[30%]  p-2 border rounded focus:outline-0  " required />
//                             </div>
//                             <div className="flex gap-2 w-[30%] items-center ">
//                                 <button type="submit" className="bg-green-500 hover:bg-green-600 w-full md:w-[60%]  duration-300 text-white px-3 py-1 rounded mx-auto">
//                                     Update
//                                 </button>
//                             </div>
//                         </form>
//                     ) : (
//                         <>
//                             <h3>ID: {item.id}</h3>
//                             <h2>{item.name}</h2>
//                             <p>Price: ${item.price.toFixed(2)}</p>
//                             <p>Category: {item.category}</p>
//                             <p>Quantity: {item.quantity}</p>
//                             <p>Description: {item.description}</p>
//                         </>
//                     )}
//                 </div>
//                 <div className="flex flex-row gap-2 justify-center">
//                     <img src={item.image} alt={item.name} className="w-16 h-16 self-center object-cover rounded-lg" />
//                     <div className="flex flex-col justify-center">
//                         <button className="bg-blue-500 text-white px-3 duration-300 py-1 rounded hover:bg-blue-600" onClick={() => setActiveEditItem(item.id)}>Edit</button>
//                         <button className="bg-red-500 text-white px-3 duration-300 py-1 rounded hover:bg-red-600 mt-2" onClick={() => handleDelete(item.id)}>Delete</button>
//                     </div>
//                 </div>
//             </div>
//         ))}
//     </div>
//     );
// }