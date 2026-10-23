import { useState, useEffect, use } from 'react'
import { Routes, Route, useParams, Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import supply_item from '../assets/delivery-box-11392.svg'
import supplier from '../assets/truck-1058.svg'
import products from '../assets/soap-and-shampoo.svg'
import edit_button from '../assets/beige-pencil.svg'


function Categories(){
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true)
    const [addNew, setAddNew] = useState(false)
    const [activeEditItem, setActiveEditItem] = useState([]);
    const nav = useNavigate()
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/categories');
            console.log('Data fetched successfully:');
            console.log('Data fetched successfully:', response);
            setData(response.data);
            
        } catch (error) {
            console.error('Error fetching data:', error);
        }finally{
            setLoading(false)
        }
    };
    const handleNewItem = async(e) => {
        e.preventDefault();
        const formdata = new FormData(e.target);
        const categoryData = Object.fromEntries(formdata.entries())

        const res = await axios.post("http://localhost:8080/api/categories", categoryData, {withCredentials: true})
        nav(0)
    }

    useEffect(()=>{
        fetchData();
    },[])
    const handleDelete = async (id) => {
        console.log(`Delete item with ID: ${id}`);
        const response = await axios.delete(`http://localhost:8080/api/categories/${id}`);
        console.log(`Delete response for item with ID: ${id}`, response.data);
        nav(0)
    }

    const handleEdit = async (e, id) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const updatedItem = Object.fromEntries(formData.entries());
        const response = await axios.put(`http://localhost:8080/api/categories/${id}`, updatedItem);
        console.log(`Edit item with ID: ${id}`);
        nav(0)
    }

    return(
        <>
        {loading ? (
            <div className="w-full md:w-[75%] mx-auto text-(--text-primary) h-dvh flex justify-center items-center">
                <p>Loading...</p>
            </div>
        ):(
            
            
            <div className="text-(--text-primary) min-h-dvh">
                <div className="w-[95%] md:w-[90%] flex flex-col   gap-5 mx-auto">
                    <div className="flex flex-row justify-between align-middle p-2.5 md:p-5 border-b border-(--border)">
                        <h2 className="p-2.5 md:p-5 text-2xl">Categories:</h2>
                        <button type="button" onClick={() => setAddNew((prev) => !prev)} className="bg-(--bg-primary) hover:bg-(--bg-tertiary) duration-150 rounded-xl px-2  md:text-md">Add New+</button>
                    </div>

                    {addNew && (
                        <div className="w-full md:w-[90%] mx-auto">
                            <h2 className=" underline underline-offset-5  text-3xl h-fit">Make a new account!</h2>
                            <form onSubmit={handleNewItem}>
                            <div className="mb-4 p-2">
                                <label className="block mb-2">Name:</label>
                                <input type="text" name="name" placeholder="pickaxe" className="w-full md:w-[30%] p-2 border rounded focus:outline-0  " required />
                            </div>
                            
                            <div className="mb-4 p-2">
                                <label className="block mb-2">Description:</label>
                                <input type="text" name="description" className="w-full md:w-[30%] p-2 border rounded focus:outline-0  " required />
                            </div>
                            
                            <button type="submit" className="bg-(--accent) hover:bg-(--accent-hover) duration-300 text-white px-3 py-1 rounded mr-2">
                                Submit
                            </button>
                            </form>
                        </div>
                    )}

                    {data.map(category => (
                        <div key={category.id} className="">
                            <div className="w-full md:w-[90%]  flex flex-row justify-between mx-auto hover:shadow-lg duration-150 gap-2 p-5 border border-(--border) rounded-2xl">
                            {activeEditItem === category.id && activeEditItem !== 0 ? (
                                <form onSubmit={(e) => handleEdit(e, category.id)} className="flex flex-col gap-2 w-full">
                                    <div className="flex gap-2 items-center w-full">
                                        <label className="block mb-2">Name:</label>
                                        <input type="text" name="name" defaultValue={category.name} className="w-full md:w-[30%] p-2 border rounded focus:outline-0  " required />
                                    </div>
                                    <div className="flex gap-2 items-center ">
                                        <label className="block mb-2">Description:</label>
                                        <textarea name="description" defaultValue={category.description} className="w-full md:w-[30%] p-2 border rounded focus:outline-0  " required />
                                    </div>
                                    <div className="flex gap-2 w-[30%] items-center ">
                                        <button type="submit" className="bg-(--accent) hover:bg-(--accent-hover) duration-300 text-white px-3 py-1 rounded mr-2">
                                            Update
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <>
                                    <div className="flex flex-col">
                                        <label className="text-3xl">
                                            {category.name}
                                        </label>
                                        <label className="text-xl text-(--text-tertiary)">
                                            Category ID: {category.id}
                                        </label>
                                        <label className="text-xl ">
                                            Description: <span className=' font-semibold'>{category.description}</span>
                                        </label>
                                        
                                    </div>
                                    <div className="flex flex-col justify-between">
                                        <button type="button" onClick={() => setActiveEditItem(category.id)} className="bg-(--bg-primary) px-3 py-1.5 rounded hover:bg-(--bg-tertiary) duration-150 md:text-md">Edit</button>
                                        <button className="bg-red-500 text-white px-3 duration-150 py-1 rounded hover:bg-red-600 mt-2" onClick={() => handleDelete(category.id)}>Delete</button>
                                    </div>
                                </>
                            )
                                }
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
                <div className="w-full md:w-[90%] flex flex-col text-2xl gap-5 mx-auto">
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
        <div className="relative w-full min-h-screen md:min-h-dvh ">
            <div id="sidebar" className="w-5 md:w-20 h-full absolute bg-(--bg-primary) left-0 flex flex-col align-middle">
                <div className="p-2 ">
                    <Link className="" to="/admin/supply_items">
                        <img src={supply_item} alt="supply item"/>
                        </Link>
                    <Link className="border border-transparent bg-(--bg-primary) hover:bg-(--bg-secondary) duration-150" to="/admin/suppliers">
                        <img src={supplier} alt="supplier"/>
                    </Link>
                    <Link className="border border-transparent bg-(--bg-primary) hover:bg-(--bg-secondary) duration-150" to="/admin/categories">
                        <img src={supply_item} alt="supply item"/>
                    </Link>
                    <Link className="border border-transparent bg-(--bg-primary) hover:bg-(--bg-secondary) duration-150" to="/admin/inventory">
                        <img src={products} alt="supply item"/>
                    </Link>

                    
                </div>

            </div>
            <div id="content" className="w-full md:w-[calc(100%-5rem)]  absolute right-0 bg-(--bg-secondary)">
                <Routes>
                    <Route path="/supply_items" element={<SupplyItems />} />
                    <Route path="/categories" element={<Categories />} />                    
                    <Route path="/inventory" element={<Inventory />} /> 
                    <Route path="/inventory/:product_id" element={<ITEM_DETAILS />} />                    

                    <Route path="/suppliers" element={<Supplier />} />                    
                    <Route path="/supply_items/:product_id/:supplier_id" element={<SupplyItemDetails />} />
                </Routes>
            </div>
        </div>
    )

}


export function ITEM_DETAILS() {
    // i had AI assist on this page inparticular. NOTHING is vibecoded, i had AI redecorate some of the page for me
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [supplier, setSupplier] = useState([])
    const [activeEditItem, setActiveEditItem] = useState(false);
    const [activeEditSupplier, setActiveEditSupplier] = useState(null);
    const [activeAddSupplier, setActiveAddSupplier] = useState(false)
    const [addNewSupplier, setAddNewSupplier] = useState(false)
    const nav = useNavigate();
    const { product_id } = useParams();

    const fetchData = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8080/api/product/supplier/details/${product_id}`
            );

            console.log("Data fetched successfully:", response.data[0]);
            setData(response.data[0] ?? null);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchSuppliers = async () => {
        const response = await axios.get(
                `http://localhost:8080/api/supplier`
            );
        setSupplier(response.data)
        
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(
                `http://localhost:8080/api/inventory/${id}`
            );

            console.log("Delete response:", response.data);
            nav(0);
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const handleDeleteSupplier = async (product_id, supplier_id) => {
        try {
            const response = await axios.delete(
                `http://localhost:8080/api/supplier/${product_id}/${supplier_id}`
            );

            console.log("Delete response:", response.data);
            nav(0);
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    

    const addSupplier = async (e, id, insert_or_new) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const updatedItem = Object.fromEntries(formData.entries());
        if (!insert_or_new){
            // this is if its true
            const newSupplier = {name: updatedItem.sup_name, email: updatedItem.sup_email, phone:updatedItem.sup_phone}
            
            try {
                let swag;

                await axios.post(`http://localhost:8080/api/supplier`, newSupplier)
                swag = await axios.get(`http://localhost:8080/api/supplier`)
                swag = swag.data
                
                const filtered_id = swag.filter(array => array.name == updatedItem.sup_name && array.email == updatedItem.sup_email && array.phone == updatedItem.sup_phone)
                const product_supplier = {product_id: id, product_name: data.prod_name, supplier_id: filtered_id[0].id, supplier_name: updatedItem.sup_name, supplier_price: updatedItem.sup_price}
                await axios.post(`http://localhost:8080/api/product/supplier`, product_supplier);
                // console.log("Edit response:", response.data);
                setActiveAddSupplier(false);

                await fetchData();
            } catch (error) {
                console.error("Error updating product:", error);
            }

        } else {
            let swag;
            console.log(
                "SWAG ", updatedItem
            )
            
            swag = await axios.get(`http://localhost:8080/api/supplier/${updatedItem.sup_id}`)
            swag = swag.data[0]
            const product_supplier = {product_id: id, product_name: data.prod_name, supplier_id: updatedItem.sup_id, supplier_name: swag.name, supplier_price: updatedItem.sup_price}
            await axios.post(`http://localhost:8080/api/product/supplier`, product_supplier);

            setActiveAddSupplier(false);

            await fetchData();
            console.log("yeah we goofed up")
        }
    }

    const handleEditSupplier = async (e, id, supplier_id) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const updatedItem = Object.fromEntries(formData.entries());
        const super_updatedItems = {supplier_id: supplier_id, ...updatedItem}

        try {
            const response = await axios.put(
                `http://localhost:8080/api/product/supplier/${id}`,
                super_updatedItems
            );

            console.log("Edit response:", response.data);
            setActiveEditSupplier(null);
            await fetchData();
        } catch (error) {
            console.error("Error updating supplier:", error);
        }
    };


    const handleEdit = async (e, id) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const updatedItem = Object.fromEntries(formData.entries());

        try {
            const response = await axios.put(
                `http://localhost:8080/api/product/supplier/details/${id}`,
                updatedItem
            );

            console.log("Edit response:", response.data);
            setActiveEditItem(false);
            await fetchData();
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    useEffect(() => {
        fetchSuppliers();
        fetchData();
    }, [product_id]);

    if (loading) {
        return (
            <div className="min-h-dvh flex items-center justify-center text-(--text-primary)">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-2 border-(--border) border-t-(--accent) rounded-full animate-spin" />
                    <p className="text-(--text-secondary)">Loading product...</p>
                </div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="min-h-dvh flex flex-col items-center justify-center gap-3 text-(--text-primary)">
                <h2 className="text-2xl font-semibold">Product not found</h2>
                <button
                    type="button"
                    onClick={() => nav("/inventory")}
                    className="text-(--accent) hover:text-(--accent-hover)"
                >
                    Back to inventory
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-dvh text-(--text-primary) py-8 md:py-12">
            <div className="w-full md:w-[85%] max-w-6xl mx-auto flex flex-col gap-6">

                {/* Page heading */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-(--border) pb-6">
                    <div>
                        <button
                            type="button"
                            onClick={() => nav(-1)}
                            className="text-sm text-(--text-tertiary) hover:text-(--accent) duration-150 mb-3"
                        >
                            ← Back to inventory
                        </button>

                        <p className="text-sm text-(--text-tertiary)">
                            Inventory / Product {data.id}
                        </p>

                        <h1 className="text-3xl md:text-4xl font-semibold mt-1">
                            {data.prod_name}
                        </h1>
                    </div>

                    <span className="self-start sm:self-auto text-sm bg-(--accent-muted) text-(--accent) border border-(--border) rounded-full px-3 py-1.5">
                        Product #{data.id}
                    </span>
                </div>

                {activeEditItem ? (
                    /* Edit form */
                    <form
                        onSubmit={(e) => handleEdit(e, data.id)}
                        className="bg-(--bg-secondary) border border-(--border) rounded-2xl p-5 md:p-7 flex flex-col gap-5"
                    >
                        <div>
                            <h2 className="text-2xl font-semibold">Edit Product</h2>
                            <p className="text-sm text-(--text-tertiary) mt-1">
                                Update the product's details below.
                            </p>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="prod_name" className="text-sm text-(--text-secondary)">
                                Product name
                            </label>
                            <input
                                id="prod_name"
                                type="text"
                                name="prod_name"
                                defaultValue={data.prod_name}
                                required
                                className="w-full bg-(--bg-primary) border border-(--border) rounded-xl p-3 focus:outline-none focus:border-(--accent) duration-150"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="description" className="text-sm text-(--text-secondary)">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                defaultValue={data.description ?? ""}
                                rows={4}
                                className="w-full bg-(--bg-primary) border border-(--border) rounded-xl p-3 resize-y focus:outline-none focus:border-(--accent) duration-150"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="prod_price" className="text-sm text-(--text-secondary)">
                                    Selling price
                                </label>
                                <input
                                    id="prod_price"
                                    type="number"
                                    name="prod_price"
                                    defaultValue={data.prod_price}
                                    min="0"
                                    step="0.01"
                                    required
                                    className="w-full bg-(--bg-primary) border border-(--border) rounded-xl p-3 focus:outline-none focus:border-(--accent) duration-150"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="quantity" className="text-sm text-(--text-secondary)">
                                    Quantity in stock
                                </label>
                                <input
                                    id="quantity"
                                    type="number"
                                    name="quantity"
                                    defaultValue={data.quantity ?? 0}
                                    min="0"
                                    step="1"
                                    required
                                    className="w-full bg-(--bg-primary) border border-(--border) rounded-xl p-3 focus:outline-none focus:border-(--accent) duration-150"
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3 pt-3 border-t border-(--border)">
                            <button
                                type="submit"
                                className="bg-(--accent) hover:bg-(--accent-hover) text-white px-5 py-2.5 rounded-xl duration-150"
                            >
                                Save Changes
                            </button>

                            <button
                                type="button"
                                onClick={() => setActiveEditItem(false)}
                                className="border border-(--border) hover:bg-(--bg-tertiary) px-5 py-2.5 rounded-xl duration-150"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                ) : (
                    <>
                        {/* Product information */}
                        <section className="bg-(--bg-secondary) border border-(--border) rounded-2xl overflow-hidden">
                            <div className="flex items-center justify-between gap-3 p-5 md:p-7 border-b border-(--border)">
                                <div>
                                    <h2 className="text-xl md:text-2xl font-semibold">
                                        Product Information
                                    </h2>
                                    <p className="text-sm text-(--text-tertiary) mt-1">
                                        Details and current inventory
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setActiveEditItem(true)}
                                    className="bg-(--bg-tertiary) hover:bg-(--accent-muted) hover:text-(--accent) border border-(--border) px-4 py-2 rounded-xl duration-150">
                                    Edit
                                </button>
                            </div>

                            <div className="p-5 ">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="bg-(--bg-primary) border border-(--border) rounded-xl p-4">
                                        <p className="text-sm text-(--text-tertiary)">
                                            Selling Price
                                        </p>
                                        <p className="text-2xl font-semibold mt-1">
                                            ${Number(data.prod_price).toFixed(2)}
                                        </p>
                                    </div>

                                    <div className="bg-(--bg-primary) border border-(--border) rounded-xl p-4">
                                        <p className="text-sm text-(--text-tertiary)">
                                            Quantity in Stock
                                        </p>
                                        <p className="text-2xl font-semibold mt-1">
                                            {data.quantity ?? 0}
                                            <span className="text-sm font-normal text-(--text-tertiary) ml-2">
                                                units
                                            </span>
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6">
                                    <div>
                                        <p className="text-sm text-(--text-tertiary)">
                                            Category
                                        </p>
                                        <p className="mt-1 text-lg">
                                            {data.cat_name || "Uncategorized"}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-(--text-tertiary)">
                                            Product ID
                                        </p>
                                        <p className="mt-1 text-lg">
                                            {data.id}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-6 pt-5 border-t border-(--border)">
                                    <p className="text-sm text-(--text-tertiary) mb-2">
                                        Description
                                    </p>
                                    <p className="text-(--text-secondary) leading-relaxed whitespace-pre-wrap">
                                        {data.description || "No description provided."}
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Supplier information */}
                        <section className="bg-(--bg-secondary) border border-(--border) rounded-2xl overflow-hidden">
                            <div className="p-5 md:p-7 flex flex-row justify-between border-b border-(--border)">
                                <div className="flex flex-col">
                                    <h2 className="text-xl md:text-2xl font-semibold">
                                        Supplier Information
                                    </h2>
                                    <p className="text-sm text-(--text-tertiary) mt-1">
                                        Supplier associated with this product
                                    </p>
                                </div>
                                <button type="button" onClick={() => setActiveAddSupplier(true)} className="border border-(--border) hover:bg-(--bg-tertiary) px-5 py-2.5 rounded-xl duration-150">
                                    +Add Supplier
                                </button>
                            </div>

                            {activeAddSupplier && (
                                <form onSubmit={(e) => addSupplier(e, data.id, addNewSupplier)}>
                                    <div className="border border-(--border) rounded-xl p-4 md:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                        <div>
                                            
                                            <button type="button" onClick={() => setAddNewSupplier(prev => !prev)} 
                                            className="border border-(--border) hover:bg-(--bg-tertiary) px-5 py-2.5 rounded-xl duration-150">
                                                {addNewSupplier ? "Create New Supplier" : "Choose Existing Supplier"}
                                                </button>
                                            {addNewSupplier ? (
                                                <>
                                                    <p className="text-lg font-semibold  mt-5 mb-3">
                                                        Supplier:
                                                        <select type="text" name="sup_id" className="w-full bg-(--bg-primary) border border-(--border) rounded-xl p-3 focus:outline-none focus:border-(--accent) duration-150" required >
                                                        {supplier.map(sup => (
                                                            <option value={sup.id}>{sup.name}</option>
                                                        ))}
                                                        </select>
                                                    </p>
                                                    <p className="text-sm text-(--text-tertiary) mt-5 mb-3">
                                                        Supplier Cost
                                                        <input type="number" name="sup_price"  className="w-full bg-(--bg-primary) border border-(--border) rounded-xl p-3 focus:outline-none focus:border-(--accent) duration-150"/>
                                                    </p>
                                                </>
                                            ):(
                                                <>
                                                    <p className="text-lg font-semibold  mt-5 mb-3">
                                                        Supplier name:
                                                        <input type="text" name="sup_name" placeholder="Swag inc." className="w-full bg-(--bg-primary) border border-(--border) rounded-xl p-3 focus:outline-none focus:border-(--accent) duration-150"></input>
                                                    </p>
                                                    <p className="text-sm text-(--text-tertiary) mt-5 mb-3">
                                                        Phone number:
                                                    <input type="text" name="sup_phone" placeholder="000-000-0000" className="w-full bg-(--bg-primary) border border-(--border) rounded-xl p-3 focus:outline-none focus:border-(--accent) duration-150"/>
                                                    </p>
                                                    <p className="text-sm text-(--text-tertiary) mt-5 mb-3">
                                                        Email:
                                                    <input type="text" name="sup_email" placeholder="example@gmail.com" className="w-full bg-(--bg-primary) border border-(--border) rounded-xl p-3 focus:outline-none focus:border-(--accent) duration-150"/>
                                                    </p>
                                                    <p className="text-sm text-(--text-tertiary) mt-5 mb-3">
                                                        Supplier Cost
                                                        <input type="number" name="sup_price"  className="w-full bg-(--bg-primary) border border-(--border) rounded-xl p-3 focus:outline-none focus:border-(--accent) duration-150"/>
                                                    </p>
                                                </>
                                            )}
                                            
                                        <button type="submit" class="mt-5 mb-3 bg-(--accent) hover:bg-(--accent-hover) self-end text-white px-5 py-2.5 rounded-xl duration-150">Submit</button>
                                        </div>

                                        
                                    </div>
                                </form>
                            )}

                            <div className="p-5 md:p-7">
                                {data.sup_id == null ? (
                                    <div className="border border-dashed border-(--border) rounded-xl p-6 text-center">
                                        <p className="text-(--text-secondary)">
                                            No supplier linked to this product yet.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="border border-(--border) rounded-xl p-4 md:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                        <div>
                                            <p className="text-lg font-semibold">
                                                {data.sup_name || "Unnamed supplier"}
                                            </p>
                                            <p className="text-sm text-(--text-tertiary) mt-1">
                                                Supplier ID: {data.sup_id}
                                            </p>
                                        </div>

                                        <div className="sm:text-right  flex flex-row">
                                            <div>
                                                <p className="text-sm text-(--text-tertiary) mr-2.5">
                                                    Supplier Cost
                                                </p>

                                                {activeEditSupplier ? (
                                                    <form
                                                        onSubmit={(e) =>
                                                            handleEditSupplier(e, data.id, data.sup_id)
                                                        }
                                                    >
                                                        <input
                                                            type="number"
                                                            name="sup_price"
                                                            defaultValue={data.sup_price ?? ""}
                                                            min="0"
                                                            step="0.01"
                                                            required
                                                            className="w-full bg-(--bg-primary) border border-(--border) rounded-xl p-3"
                                                        />

                                                        <button
                                                            type="submit"
                                                            className="mt-2 bg-(--accent) text-white px-4 py-2 rounded-xl"
                                                        >
                                                            Save
                                                        </button>

                                                        <button
                                                            type="button"
                                                            onClick={() => setActiveEditSupplier(false)}
                                                            className="ml-2 border border-(--border) px-4 py-2 rounded-xl"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </form>
                                                ) : (
                                                    <p className="text-xl font-semibold mt-1 mr-2.5">
                                                        {data.sup_price == null
                                                            ? "Not set"
                                                            : `$${Number(data.sup_price).toFixed(2)}`}
                                                    </p>
                                                )}
                                                
                                                
                                            </div>
                                            
                                            <div className="flex gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => setActiveEditSupplier(true)}
                                                    className="text-sm border border-(--border) rounded-lg px-3 py-2"
                                                >
                                                    Edit Cost
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => handleDeleteSupplier(data.id, data.sup_id)}
                                                    className="text-sm border border-(--error) text-(--error) rounded-lg px-3 py-2"
                                                >
                                                    Delete
                                                </button>
                                            </div>

                                            
                                        </div>
                                        
                                    </div>
                                )}
                            </div>
                        </section>

                        {/* Delete action */}
                        <div className="flex justify-end pt-2">
                            <button
                                type="button"
                                onClick={() => handleDelete(data.id)}
                                className="border border-(--error) text-(--error) hover:bg-(--error) hover:text-white px-4 py-2 rounded-xl duration-150"
                            >
                                Delete Product
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}


export function Inventory(){
    const [data, setData] = useState([])
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true);
    const [addNew, setAddNew] = useState(false)
    const nav = useNavigate()

    const handleNewItem = async(e) => {
        e.preventDefault();
        const formdata = new FormData(e.target);
        const categoryData = Object.fromEntries(formdata.entries())

        const res = await axios.post("http://localhost:8080/api/inventory", categoryData, {withCredentials: true})
        nav(0)
    }

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/product/supplier/details');
            const res2 = await axios.get('http://localhost:8080/api/categories')
            setData(response.data);
            setCategories(res2.data)
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
            <div className="text-(--text-primary) min-h-screen">
                <div className="w-[90%] flex flex-col text-2xl gap-5 mx-auto">
                    <div className="p-5 h-fit flex justify-between border-b border-(--border)">
                        <div>
                            <h2 className="pb-2.5">Inventory:</h2>
                            <p className=" text-(--text-secondary) text-lg">Manage items in the inventory</p>
                        </div>
                        <button type="button" onClick={() => setAddNew((prev) => !prev)} className="bg-(--accent) hover:bg-(--accent-hover) duration-150 rounded-xl px-2  md:text-md">Add New+</button>

                    </div>
                    {addNew && (
                        <div className="w-full md:w-[90%] text-2xl mx-auto">
                            <h2 className=" underline underline-offset-5   h-fit">Upload an item!</h2>
                            <form onSubmit={(e) => handleNewItem(e)}>
                            <div className="flex flex-col max-w-[65%]">
                                <p className="text-lg font-semibold  mt-5 mb-3">
                                    Item name:
                                    <input type="text" name="title" placeholder="lantern" className="w-full bg-(--bg-primary) border border-(--border) rounded-xl p-3 focus:outline-none focus:border-(--accent) duration-150"></input>
                                </p>
                                <div className="flex md:flex-row gap-2.5 ">
                                    <p className="text-sm text-(--text-tertiary) mt-5 mb-3">
                                        Price:
                                    <input type="number" name="price" placeholder="20" className="w-full bg-(--bg-primary) border border-(--border) rounded-xl p-3 focus:outline-none focus:border-(--accent) duration-150"/>
                                    </p>
                                    <p className="text-sm text-(--text-tertiary) mt-5 mb-3">
                                        Quantity:
                                    <input type="number" name="quantity" placeholder="20" className="w-full bg-(--bg-primary) border border-(--border) rounded-xl p-3 focus:outline-none focus:border-(--accent) duration-150"/>
                                    </p>
                                    <p className="text-sm text-(--text-tertiary) flex flex-col mt-5 mb-3">
                                        Category:
                                        <select type="text" name="category_id" className="w-full bg-(--bg-primary) border border-(--border) rounded-xl p-3 focus:outline-none focus:border-(--accent) duration-150" required >
                                                        {categories.map(sup => (
                                                            <option value={sup.id}>{sup.name}</option>
                                                        ))}
                                        </select>
                                    </p>
                                </div>
                                <p className="text-sm text-(--text-tertiary) mt-5 mb-3">
                                    Description:
                                <input type="text" name="description" placeholder="000-000-0000" className="w-full bg-(--bg-primary) border border-(--border) rounded-xl p-3 focus:outline-none focus:border-(--accent) duration-150"/>
                                </p>
                                
                                <p className="text-sm text-(--text-tertiary) mt-5 mb-3">
                                    Image:
                                <input type="text" name="image" value="/server/images/kettle4.jpg" className="w-full bg-(--bg-primary) border border-(--border) rounded-xl p-3 focus:outline-none focus:border-(--accent) duration-150"/>
                                </p>
                                            
                            </div>
                            <div className="flex flex-row gap-2.5">
                                <button type="submit" className="w-fit h-10 bg-(--accent) text-lg hover:bg-(--accent-hover) transition:ease-all duration-150 p-1.5  md:p-2 rounded">
                                    Save Changes
                                </button>
                            </div>
                            </form>
                        </div>
                    )}
                    {data.map(item => (
                        <Link to={`/admin/inventory/${item.id}`}>
                            <div className="w-full md:w-[90%] flex flex-col mx-auto hover:shadow-lg duration-150 gap-2 p-5 border border-(--border) rounded-2xl">
                                    <label className="text-3xl">
                                        {item.title}
                                    </label>
                                    <label className="text-xl text-(--text-tertiary)">
                                        Item ID: {item.id}
                                    </label>
                                    <label className="text-xl text-(--text-secondary)">
                                        Price: $ {(item.price *100 )/100}
                                    </label>
                                    <label className="text-xl ">
                                        Quantity: <span className="italic">{item.quantity}</span>
                                    </label>
                                    
                                </div>

                        </Link>
                    ))}
                    
                </div>
            </div>

            )}

        </>
        )
}

export function Supplier(){
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true);
    const [addNew, setAddNew] = useState(false);
    const [activeEdit, setActiveEdit] = useState(null)
    const nav = useNavigate()

    const handleNewItem = async(e) => {
        e.preventDefault();
        const formdata = new FormData(e.target);
        const categoryData = Object.fromEntries(formdata.entries())

        const res = await axios.post("http://localhost:8080/api/supplier", categoryData, {withCredentials: true})
        nav(0)
    }

    const handleDeleteSupplier = async (supplier_id) => {
        try {
            const response = await axios.delete(
                `http://localhost:8080/api/supplier/${supplier_id}`
            );

            console.log("Delete response:", response.data);
            nav(0);
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };
    
    const handleEditSupplier = async (e, supplier_id) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const updatedItem = Object.fromEntries(formData.entries());
        
        const super_updatedItems = {id: supplier_id, ...updatedItem}

        try {
            const response = await axios.put(`http://localhost:8080/api/supplier/${supplier_id}`,
                super_updatedItems
            );

            console.log("Edit response:", response.data);
            setActiveEdit(null);
            await fetchData();
            nav(0)
        } catch (error) {
            console.error("Error updating supplier:", error);
        }
    };

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/supplier');
            setData(response.data);
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
            <div className="text-(--text-primary) min-h-screen">
                <div className="w-[90%] flex flex-col text-2xl gap-5 mx-auto">
                    <div className="p-5 h-fit flex justify-between border-b border-(--border)">
                        <div>
                            <h2 className="pb-2.5">Suppliers:</h2>
                            <p className=" text-(--text-secondary) text-lg">Manage suppliers and their supplied products</p>
                        </div>
                        <button type="button" onClick={() => setAddNew((prev) => !prev)} className="bg-(--accent) hover:bg-(--accent-hover) duration-150 rounded-xl px-2  md:text-md">Add New+</button>

                    </div>
                    {addNew && (
                        <div className="w-full md:w-[90%] text-2xl mx-auto">
                            <h2 className=" underline underline-offset-5   h-fit">Make a new account!</h2>
                            <form onSubmit={handleNewItem}>
                            <div className="mb-4 p-2">
                                <label className="block mb-2">Name:</label>
                                <input type="text" name="name" placeholder="pickaxe co." className="w-full md:w-[30%] p-2 border rounded focus:outline-0  " required />
                            </div>
                            
                            <div className="mb-4 p-2">
                                <label className="block mb-2">Email:</label>
                                <input type="text" name="email" className="w-full md:w-[30%] p-2 border rounded focus:outline-0  " required />
                            </div>
                            <div className="mb-4 p-2">
                                <label className="block mb-2">Phone:</label>
                                <input type="text" name="phone" className="w-full md:w-[30%] p-2 border rounded focus:outline-0  " required />
                            </div>
                            
                            <button type="submit" className="bg-(--accent) hover:bg-(--accent-hover) duration-300 text-white px-3 py-1 rounded mr-2">
                                Submit
                            </button>
                            </form>
                        </div>
                    )}
                    {data.map(item => (
                        <div className="w-full md:w-[90%] flex flex-row mx-auto hover:shadow-lg justify-between duration-150 gap-2 p-1.5 md:p-5 border border-(--border) rounded-2xl">
                                {activeEdit == item.id ? (
                                    <form onSubmit={(e) => handleEditSupplier(e, item.id)}>
                                        <div className="flex flex-col max-w-[65%]">
                                            <p className="text-lg font-semibold  mt-5 mb-3">
                                                Supplier name:
                                                <input type="text" name="name" placeholder={item.name} className="w-full bg-(--bg-primary) border border-(--border) rounded-xl p-3 focus:outline-none focus:border-(--accent) duration-150"></input>
                                            </p>
                                            <p className="text-sm text-(--text-tertiary) mt-5 mb-3">
                                                Phone number:
                                            <input type="text" name="phone" placeholder="000-000-0000" className="w-full bg-(--bg-primary) border border-(--border) rounded-xl p-3 focus:outline-none focus:border-(--accent) duration-150"/>
                                            </p>
                                            <p className="text-sm text-(--text-tertiary) mt-5 mb-3">
                                                Email:
                                            <input type="text" name="email" placeholder="example@gmail.com" className="w-full bg-(--bg-primary) border border-(--border) rounded-xl p-3 focus:outline-none focus:border-(--accent) duration-150"/>
                                            </p>
                                                        
                                        </div>
                                        <div className="flex flex-row gap-2.5">
                                            <img src={edit_button} alt="edit" onClick={() => setActiveEdit(null)} className="w-fit h-10 bg-(--accent) hover:bg-(--accent-hover) transition:ease-all duration-150 p-1.5  md:p-2 rounded"/>
                                            <button type="submit" className="w-fit h-10 bg-(--accent) text-lg hover:bg-(--accent-hover) transition:ease-all duration-150 p-1.5  md:p-2 rounded">
                                                Save Changes
                                            </button>
                                        </div>
                                    </form>
                                ):(
                                    <>
                                    <div className="flex flex-col max-w-[67%]">

                                        <label className="text-3xl">
                                            {item.name}
                                        </label>
                                        <label className="text-xl text-(--text-tertiary)">
                                            Supplier ID: {item.id}
                                        </label>
                                        <label className="text-xl text-(--text-secondary)">
                                            {item.supplier_name}
                                        </label>
                                        <label className="text-xl ">
                                            Supplier phone number: <span className="italic text-lg">{item.phone}</span>
                                        </label>
                                        <label className="text-xl ">
                                            Supplier Email:  <span className="italic text-lg">{item.email}</span>
                                        </label>
                                    </div>
                                    <div className="flex flex-row gap-2 ">
                                        <img src={edit_button} alt="edit" onClick={() => setActiveEdit(item.id)} className="w-fit h-10 bg-(--accent) hover:bg-(--accent-hover) transition:ease-all duration-150 p-1.5  md:p-2 rounded"/>
                                        <button onClick={() => handleDeleteSupplier(item.id)} className="w-fit text-lg h-10 bg-red-500  hover:bg-(--error) transition:ease-all duration-150 p-1.5 md:p-2 rounded">Delete</button>
                                    </div>
                                    </>
                                )}
                                
                        </div>
                    ))}
                </div>
            </div>

            )}

        </>
        )
}
