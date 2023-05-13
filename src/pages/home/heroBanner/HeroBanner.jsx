import React, { useEffect, useState } from 'react';
import "./style.scss"
import { useNavigate } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';
import { useSelector } from 'react-redux';
import Img from '../../../components/lazyLoadingImage/img';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';


function HeroBanner(props) {
    const [background,setBackground] = useState("")
    const [query,setQuery] = useState("")
    const navigate = useNavigate()
    const {url} = useSelector(state => state.home)
    const {data,loading,error} = useFetch("/movie/upcoming")

    useEffect(()=>{
        const bg = url.backdrop + data?.results[Math.floor(Math.random() * 20)]?.backdrop_path
        setBackground(bg)
    },[data])

    const searchQueryHandler = (event) => {
        event.preventDefault()
        if(query.length > 0){
            navigate(`/search/${query}`)
        }
    }
    return (
        <div className='heroBanner'>

            {!loading && <div className="backdrop-img">
                <img src={background+""} alt="" />
            </div>}

            <div className="opacity-layer"></div>

            <ContentWrapper>
                <div className="heroBannerContent">
                    <span className="title">Welcome</span>
                    <span className="subTitle">Millions of movies, TV shows and people to discover. Explore now</span>
                    <form className="searchInput" onSubmit={searchQueryHandler}>
                        <input type="text" onChange={(e)=>{setQuery(e.target.value)}}
                        placeholder='Search for a movie or tv show...' />
                        <button type='submit'>Search</button>
                    </form>
                </div>
            </ContentWrapper>
        </div>
    );
}

export default HeroBanner;