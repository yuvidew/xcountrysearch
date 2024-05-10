import React, { useEffect, useState } from 'react'

const App = () => {
  const [country , setCountry] = useState([])
  const [search , setSearch] = useState('')

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
    .then(res => res.json())
    .then(data => setCountry(data))
    .catch(e => console.error(e))
  } , [])

  const filteredData = country.filter(ele => ele.name.common.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className=''>
      <input 
        type="text" 
        placeholder='Search here..' 
        className=' m-auto block w-[70%] text-[1rem] p-3 mt-[1rem]'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        />

      <div className=' grid grid-cols-6 gap-3'>
        {country.length !==0 ? (
          filteredData.map((ele) => (
            <div 
              key={ele.name.common}
              className='flex items-center justify-center flex-col gap-y-2 mt-[1rem]'
            >
                <img className='h-[70%] w-[80%] object-contain' src={ele.flags.svg}  alt={ele.flags.alt} />
                <p>{ele.name.common}</p>
            </div>
          ))
        ) : (
          <h1 >Loading...</h1>
        )}
      </div>
    </div>
  )
}

export default App