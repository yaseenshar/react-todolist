
import './App.css';

import Header from './Header';
import SearchItem from './SearchItem';
import AddItem from './AddItem';
import Content from './Content';
import Footer from './Footer';

import apiRequest from './apiRequest';

import SquareProj from './SquareProj/SquareProj';

import { useState, useEffect } from 'react';


function App() {

  const API_URL = 'http://localhost:3500/items';

  const [items, setItems] = useState(JSON.parse(localStorage.getItem('shoppingList')) || []);

  const [newItem, setNewItem] = useState([]);
  const [search, setSearch] = useState('');

  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if(!response.ok) {
          throw Error('Error while fetching items');
        }
        const listItems = await response.json();
        setItems(listItems);
        setErrorMsg(null);
      } catch (error) {
        setErrorMsg(error.message)
      } finally {
        setIsLoading(false);
      }
    }

    setTimeout(() => fetchItems(), 2000);
    
  },[]);

  const addItem = async (item) => {
    const id = items && items.length ? items[items.length - 1 ].id + 1 : 1;
    const newItem = {id, checked: false, itemName: item};
    const listItems = [ ...items, newItem];
    setItems(listItems);

    const postOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newItem)
    }

    const result = await apiRequest(API_URL, postOptions);
    if (result) setErrorMsg(result);
  }

  const handleCheck = async (id) => {
    const listItems = items.map( (item) => id === item.id ? { ...item, checked: !item.checked} : item);
    setItems(listItems);

    const myItem = listItems.filter((item) => item.id === id);
    const updateOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ checked: myItem[0].checked })
    };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, updateOptions);
    if (result) setErrorMsg(result);
  }

  const handleDelete = async (id) => {
    const listItems = items.filter( (item) => id !== item.id);    
    setItems(listItems);

    const deleteOptions = { method: 'DELETE' };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, deleteOptions);
    if (result) setErrorMsg(result);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem);
    setNewItem('');
  }

  return (
    <div className="App">
      <Header title='Items List' />
      <AddItem newItem={newItem} setNewItem={setNewItem} handleSubmit={handleSubmit} />
      <SearchItem search={search} setSearch={setSearch} />
      <main>
        { isLoading && <p>Loading Items...</p> }
        { errorMsg && <p style={{ color: "red" }}>{`Error: ${errorMsg}`}</p> }
        {
          !errorMsg && !isLoading && <Content items={items && items.filter(item =>((item.itemName).toLowerCase()).includes(search.toLowerCase()))} setItems={setItems} handleCheck={handleCheck} handleDelete={handleDelete} />
        }
      </main>
      
      <SquareProj />
      <Footer length={items.length}/>
    </div>
  );
}

export default App;
