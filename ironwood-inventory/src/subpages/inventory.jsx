import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { Link,  useNavigate,  useParams } from 'react-router-dom';
import search from '../assets/search-icon.svg'
import { ITEM_DETAILS } from './admin';
// function InventoryFilter({ onFilterChange }) {
//     const [filter, setFilter] = useState('');

export function InventoryItem() {
    const { id } = useParams();
    const [itemData, setItemData] = useState(null);
    const nav = useNavigate()
    useEffect(() => {
        const fetchItemData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/inventorypage/${id}`);
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
      <div className="w-full md:w-[90%] xl:w-[85%] mx-auto min-h-screen text-(--text-primary) px-4 pb-10">

        <button type="button" onClick={() => nav(-1)} className="text-sm text-(--text-tertiary) py-4 hover:text-(--accent) transition-colors duration-200">
          ← Back to inventory
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 items-start">

          <div className="relative w-full aspect-square md:aspect-[4/5] overflow-hidden rounded-2xl bg-(--bg-secondary) border border-(--border)">
            <img src={`http://localhost:8080${itemData[0].image}`} alt={itemData[0].title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.03]"/>

            <div className="absolute top-4 left-4 rounded-full border border-(--border) bg-(--bg-primary)/90 backdrop-blur-sm px-3 py-1.5 text-xs tracking-widest uppercase">
              Ironwood Supply
            </div>
          </div>

          <div className="flex flex-col justify-between ">
            <div className="gap-6 md:py-6">
              <div className="flex flex-col gap-3">
                <p className="text-xs uppercase tracking-[0.2em] text-(--text-tertiary)">
                  Outdoor essentials
                </p>

                <h1 className="text-3xl md:text-4xl xl:text-5xl font-semibold tracking-tight leading-tight">
                  {itemData[0].title}
                </h1>

                <div className="flex items-center justify-between gap-4 border-b border-(--border) pb-5">
                  <p className="text-2xl md:text-3xl font-semibold">
                    ${Number(itemData[0].price).toFixed(2)}
                  </p>
                  <span className={`text-sm px-3 py-1.5 rounded-full border ${Number(itemData[0].quantity) > 0 ? "border-(--border) text-(--text-secondary)" : "border-(--error) text-(--error)"}`}> {Number(itemData[0].quantity) > 0 ? "In stock" : "Out of stock"}
                  </span>
                </div>
              </div>

              <div className="flex flex-col py-6 gap-2">
                <h2 className="text-sm font-semibold uppercase tracking-wider">
                  Product details
                </h2>

                <p className="text-(--text-secondary) leading-7 whitespace-pre-line">
                  {itemData[0].description || "No product description available yet."}
                </p>
              </div>

              <div className="border-y border-(--border) py-4 flex justify-between text-sm">
                <span className="text-(--text-tertiary)">Item ID</span>
                <span>{itemData[0].id}</span>
              </div>
            </div>

            <div className="flex flex-col  gap-3 pt-2">
              <button
                type="button"
                disabled={Number(itemData[0].quantity) <= 0}
                className="w-full rounded-xl bg-(--accent) hover:bg-(--accent-hover) text-white font-semibold py-4 px-5 transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Add to Cart
              </button>

              <div className="grid grid-cols-[1fr_auto] gap-3">
                <button type="button" disabled={Number(itemData[0].quantity) <= 0} className="rounded-xl border border-(--border) hover:bg-(--bg-secondary) font-medium py-3 px-5 transition-colors duration-200 disabled:opacity-40" > Buy Now </button>

                <button type="button" aria-label="Add to wishlist" title="Add to wishlist" className="w-12 rounded-xl border border-(--border) hover:border-(--accent) hover:text-(--accent) transition-colors duration-200 flex items-center justify-center text-xl" > ♡ </button>
              </div>
            </div>

            

          </div>
        </div>
      </div>
    ) : (
      <p className="text-(--text-secondary) text-center py-20">
        Item not found
      </p>
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
      const response = await axios.get('http://localhost:8080/api/inventorypage');
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
    const matchesCategory = categoryFilter.length === 0 || categoryFilter.includes(item.category);
    
    const matchesSearch = item.title.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesCategory && matchesSearch;
    // return matchesCategory ;

  });
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <div className="w-full md:w-[75%] mx-auto text-(--text-primary)  h-dvh flex justify-center items-center">
          <p>Loading...</p>
        </div>
      ):(
        <div className="w-full text-(--text-primary) lg:w-[90%] xl:w-[85%] transition-ease-in-out duration-75 mx-auto min-h-screen md:min-h-dvh">
          <div className="flex flex-row p-5 pb-2 pt-8  items-center  ">
            <h1 className="text-4xl font-semibold">Inventory</h1>
            <div className="w-[30%] p-2 relative flex flex-row justify-between item-auto border-1-transparent rounded-[sm]">
              <img src={search} alt="search icon" className="w-fit h-8 ml-2" onClick={() => setActiveFilter(!activeFilter)} />
            </div>
          </div>
          {activeFilter && (
            <div className="w-full md:w-[75%] mx-auto  p-3 md:p-3 border-b mb-4">
              <h3 className="text-xl font-bold mb-2">Filter Inventory</h3>
              <div className="w-full flex flex-row gap-2 items-center ml-2">
                <h3 className="text-sm mb-2">Search: </h3>
                <input type="text" placeholder="Search for products, collections, and more" className='w-full md:w-1/4 border-1 p-1 border-r-transparent border-t-0 rounded-bl-md ' onChange={(e) => setSearchFilter(e.target.value)} />
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
          <div className="pb-5 pt-5">
            <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mx-auto p-3 md:p-0 gap-5 md:gap-4 ">
              {filteredData.map((item) => (
                <Link to={`/inventory/${item.id}`} key={item.id} className="h-[240px] w-full md:w-[260px] flex flex-col justify-between shadow  hover:shadow-2xl rounded transition-shadow duration-300">
                  <img src={`http://localhost:8080${item.image}`} alt={item.name} className="w-full  h-[60%] object-cover" />
                  <div key={item.id} className="border-1 border-(--border) border-t-0 h-[40%] p-2 flex flex-col justify-between gap-0">
                    <h2 className="overflow-hidden text-ellipsis text-lg whitespace-nowrap">{item.title}</h2>
                    <h3 className="text-(--text-secondary) text-sm italic">{item.category}</h3>
                    <div className="flex flex-col text-(--text-secondary) text-sm">
                      <p>Price: ${item.price}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )
      }
    </>


  )
}