"use client"

import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useState } from 'react'
import { MovieData } from '../context/MovieContext';

function Page() {

  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const context = useContext(MovieData);

  if (!context) {
    throw new Error("moviesData context is not available");
  }

  const { data: movies, loading } = context;

  console.log('movies', movies);


     const handleFilter = (e) => {
       const search = e.target.value.toLowerCase();
       setSearchTerm(search); 
       console.log(search);

    
       const filtered = movies?.filter(
         (item) =>
           item.title.toLowerCase().startsWith(search) 
       );

       console.log("filtered-fxn", filtered);
       setFilteredData(filtered);
     };

    //  console.log("filteredData", filteredData);
 

  return (
    <div className="flex flex-col min-h-full  w-full">
      {loading && <p>Loading...</p>}

      {}

      <div className=" bg-gray-500 p-4 flex items-center justify-center fixed w-full z-10">
        <input
          type="text"
          placeholder="Search for movies by titles..."
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
          className="p-2 rounded-md w-[40%] "
        />
        <button onClick={handleFilter}>submit</button>
      </div>

      
          
      <div className=" grid grid-cols-3 grid-rows-5 p-8 gap-x-4 gap-y-8 mt-8 z-0">
        {filteredData.length > 0 ? (
           
        filteredData.map((m, _) => (
          <Link href={`/movies/${m.id}`} key={m.id} className="bg-[gray] mt-[5rem] flex flex-col space-y-2 rounded-md text-white ">
            <div className="w-full h-[10rem] sm:h-[15rem] md:h-[20rem] bg-black relative">
              <Image fill alt={m.title} src={`https://image.tmdb.org/t/p/w500${m.poster_path}`} className='rounded-t-md object-cover'/>
            </div>
          <div className="flex flex-col gap-2 text-sm">
            <p>Title: {m.title}</p>
            <p>Release date: {m.release_date}</p>
            <p>Ratings: {m.vote_average}</p>
          </div>
          
        </Link>
        ))
       ) : (
          <div className='text-white absolute top-[50%] left-[50%]  -translate-x-[50%]'>Type in the movie title to search for movies</div>
        )}

      
        
        
       
      </div>

    </div>
  );
}

export default Page