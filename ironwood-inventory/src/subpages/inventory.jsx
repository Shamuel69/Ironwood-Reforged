import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { Link,  useParams } from 'react-router-dom';
import search from '../assets/search-icon.svg'
// function InventoryFilter({ onFilterChange }) {
//     const [filter, setFilter] = useState('');

export function InventoryItem() {
    const { id } = useParams();
    const [itemData, setItemData] = useState(null);

    useEffect(() => {
        const fetchItemData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/inventory/${id}`);
                setItemData(response.data);
                console.log(`Data fetched successfully for item with ID: ${id}`, response.data);
            } catch (error) {
                console.error('Error fetching item data:', error);
            }
        };

        fetchItemData();
    }, [id]);
    

    
    return (
        <>
            {itemData && itemData[0] ? (
              <div className="w-full md:w-[75%] mx-auto min-h-screen md:min-h-dvh flex flex-col md:flex-row gap-4 p-4 md:p-0">
                  {/* <button onClick={() => window.history.back()} className=" w-2xl  text-white border-1  px-4 py-2 rounded">
                      {` back `}
                  </button> */}
                  <div className="w-full md:w-[50%]  md:h-dvh bg-black  ">
                    <img src={`http://localhost:8080${itemData[0].image}`} alt={itemData[0].name} className="w-full h-full object-cover" />

                  </div>
                  <div className="w-full md:w-[50%] h-full md:h-dvh flex flex-col justify-between gap-2 ">
                    <div className="flex flex-col gap-5">
                      <h1>{itemData[0].name}</h1>
                      <div className="flex flex-row justify-between">
                        <p className="text-lg font-bold">${itemData[0].price}</p>
                        <p>Quantity: {itemData[0].quantity}</p>
                      </div>
                      <p>{itemData[0].description}</p>

                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="w-full flex flex-row justify-between">
                        <button className="w-[80%] bg-gray-900 duration-300 text-white px-3 py-1 rounded self-center">Buy Now</button>
                        <button className="w-[19%] bg-gray-600 duration-300 text-white px-3 py-1 rounded self-center">{"\u2764"}</button>
                      </div>
                      <button className="w-full bg-gray-800 duration-300 text-white px-3 py-1 rounded self-center">Add to Cart</button>
                    </div>  

                  </div>
                </div>
            ) : (
                <p>Item not found</p>
            )}
        </>
    );
}

export function Inventory() {
  const [inventoryData, setInventoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [searchFilter, setSearchFilter] = useState('');



  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/inventory');
      setInventoryData(response.data);
      console.log('Data fetched successfully:', response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }
  const handleCategoryChange = (e) => {
        let newCategory = e.target.value;
        setCategoryFilter((prev) => {
          if (prev.includes(newCategory)) {
            return prev.filter((item) => item !== newCategory);
          } else {
            return [...prev, newCategory];
          }
        
        });
  }
  // useEffect(() => {
  //   fetchData();
  // }, [categoryFilter]);

  const filteredData = inventoryData.filter((item) => {
    if (categoryFilter.length === 0) {
      return true;
    }
    const matchesCategory = categoryFilter.includes(item.category);
    const matchesSearch = item.name.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesCategory && matchesSearch;
  });
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
        <div className="w-full text-(--text-primary) lg:w-[90%] xl:w-[85%] transition-ease-in-out duration-75 mx-auto min-h-screen md:min-h-dvh">
          <div className="flex flex-row pt-5 items-center p-3 md:p-0">
            <h1 className="text-4xl font-semibold">Inventory</h1>
            <div className="w-[30%] p-2 relative flex flex-row justify-between item-auto border-1-transparent rounded-[sm]">
              {/* <input type="text" placeholder="Search for products, collections, and more" className='w-[85%]' onChange={handleFilterChange} /> */}
              <img src={search} alt="search icon" className="w-fit h-8 ml-2" onClick={() => setActiveFilter(!activeFilter)} />
            </div>
          </div>
          {activeFilter && (
            <div className="w-full md:w-[75%] mx-auto  p-3 md:p-3 border-b-1 mb-4">
              <h3 className="text-xl font-bold mb-2">Filter Inventory</h3>
              <div className="w-full flex flex-row gap-2 items-center ml-2">
                <h3 className="text-sm mb-2">Search: </h3>
                <input type="text" placeholder="Search for products, collections, and more" className='w-full md:w-1/4 border-1 p-1 border-r-transparent border-t-0 rounded-bl-md' onChange={(e) => setSearchFilter(e.target.value)} />
              </div>
              <div>
                <label htmlFor="category-filter" className="block text-lg font-medium py-2">
                  Filter by Category
                </label>
                <div className="flex flex-row gap-2 items-center">
                  <input type="checkbox" id="category-camping" name="category" value="camping" onChange={(e) => handleCategoryChange(e)} />
                  <label htmlFor="category-camping"> Camping</label>
                </div>
                <div className="flex flex-row gap-2 items-center">
                  <input type="checkbox" id="category-cooking" name="category" value="cooking" onChange={(e) => handleCategoryChange(e)} />
                  <label htmlFor="category-cooking"> Cooking</label>
                </div>
                <div className="flex flex-row gap-2 items-center">
                  <input type="checkbox" id="category-lighting" name="category" value="lighting" onChange={(e) => handleCategoryChange(e)} />
                  <label htmlFor="category-lighting"> Lighting</label>
                </div>
                <div className="flex flex-row gap-2 items-center">
                  <input type="checkbox" id="category-utility" name="category" value="utility" onChange={(e) => handleCategoryChange(e)} />
                  <label htmlFor="category-utility"> Utility</label>
                </div>
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mx-auto p-3 md:p-0 gap-5 md:gap-4 ">
            {filteredData.map((item) => (
              <Link to={`/inventory/${item.id}`} key={item.id} className="h-[240px] w-full md:w-[260px] flex flex-col justify-between shadow hover:shadow-2xl rounded transition-shadow duration-300">
                <img src={`http://localhost:8080${item.image}`} alt={item.name} className="w-full  h-[60%] object-cover" />
                <div key={item.id} className="border-1 border-t-0 h-[40%] p-2 flex flex-col justify-between gap-0">
                  <h2 className="overflow-hidden text-ellipsis whitespace-nowrap">{item.name}</h2>
                  <div className="flex flex-col text-sm ">
                    <p>Price: ${item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )
      }
    </>


  )
}