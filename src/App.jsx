
import { useEffect, useState } from 'react'


function App() {
  const [countries, setCountries] = useState([]);
  const [searchCountry, setSearchCountry] = useState("");

  const getCountries = async () => {
    try {
      const data = await fetch("https://restcountries.com/v3.1/all");
      const dataJson = await data.json();
      setCountries(dataJson);
    } catch (err) {
      console.error("Failed to fetch Countries: ", err);
    }
  }

  useEffect(() => {
    getCountries();
  }, [searchCountry])

  const filterCountry = countries.filter((country) => country.name.common.toLowerCase().includes(searchCountry.toLowerCase()));

  return (
    <>
    <div className='app'>
        <input
            className=' m-auto block w-[70%] text-[1rem] p-3 mt-[1rem]'
            type="text" 
            placeholder='Search here..' 
            value={searchCountry}
            onChange={(e) => setSearchCountry(e.target.value)}
        />
        <div className='grid grid-cols-6 gap-3'>
            {filterCountry && filterCountry.map((country) => (
              <div key={country.cca3} className='countryCard'>
                <img className='flex items-center justify-center flex-col gap-y-2 mt-[1rem]' src={country.flags.png} alt="flags" />
                <h2>{country.name.common}</h2>
              </div>
            ))}
        </div>
      </div>
    </>
  )
}

export default App