import './App.css';
import loupe from './assets/images/loupe.png';

import axios from 'axios';
import { useEffect, useState } from 'react';

const App = ()=>{
   const [search,setSearch] = useState('');
   const [moviesData,setMoviesData] = useState([]);
  
   const getMoviesData = async ()=>{
     if(search?.length >0){
      try {
        const response = await axios.get(`${process.env.REACT_APP_MOVIES_URL}${search}`);
        setMoviesData(response.data.Search);
         } catch(e) {
           console.log(e)
         }
     }else{
      try {
        const response = await axios.get(`${process.env.REACT_APP_MOVIES_URL}${'best'}`);
        setMoviesData(response.data.Search);
         } catch(e) {
           console.log(e)
         }
     }
   }
    useEffect(()=>{
     const getMovies = async ()=>{
       await getMoviesData();
     }

      getMovies();
   },[])
  const searchMovies =async (e)=>{
     e.preventDefault();
     await getMoviesData();
     
  }
  return <div className='container'>
    <div className='movies-container'>
   <div className='movies-header'>
     <h1>Movies</h1>
     <form onSubmit={searchMovies}>
      <input type={'text'} 
       onChange={(e)=>setSearch(e.target.value)}
      placeholder="Search here.." className='search-input'/>
     <button className='search-btn' type='submit'><img className='search-icon'  src={loupe}/></button>
     </form>
   </div>
   <div className='movies-body'>
   
     {moviesData.length>0?moviesData.map((movie)=>{
     return <div className='movies-card'>
                <div className='movies-title'>
                  <p>{movie.Title}</p>
                  <img className='movie-poster'  src={movie.Poster}/>
                </div>
        </div>
   }):<p>No match Found</p>}
     
   </div>
  </div>
  </div>
}

export default App;