import React, { useEffect, useState } from 'react'
import Hero from '../Components/Hero/Hero'
import Popular from '../Components/Popular/Popular'
import Offers from '../Components/Offers/Offers'
import NewCollections from '../Components/NewCollections/NewCollections'
import NewsLetter from '../Components/NewsLetter/NewsLetter'
import { backend_url } from '../App'

const Shop = () => {

  const [popular, setPopular] = useState([]);
  const [newcollection, setNewCollection] = useState([]);

  const fetchInfo = () => {
    fetch(`${backend_url}/api/product/popularinProduct`)
      .then((res) => res.json())
      .then((data) => setPopular(data))
    fetch(`${backend_url}/api/product/newcollections`)
      .then((res) => res.json())
      .then((data) => setNewCollection(data))
  }

  useEffect(() => {
    fetchInfo();
  }, [])


  return (
    <div>
      <Hero />
      <Popular data={popular} />
      <Offers />
      <NewCollections data={newcollection} />
      <NewsLetter />
    </div>
  )
}

export default Shop
