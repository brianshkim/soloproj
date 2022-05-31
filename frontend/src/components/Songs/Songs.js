import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navlink, Route, useParams, Switch } from 'react-router-dom'
import { getSearch } from "../../store/songs"
import './Songs.css'
import Navigation from "../Navigation";
import SignupFormPage from "../SignupFormPage";
import Search from "../Search"

import * as sessionActions from "../../store/session";
import * as songActions from "../../store/songs";

function ViewSongs() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const [isUser, setIsUser] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const [search, setSearch] = useState('')
    const [searchObj, setSearchObj] = useState([])

    useEffect(() => {
        dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    }, [dispatch]);

    useEffect(() => {
        dispatch(songActions.getSongs())
    }, [dispatch])

    let currentUser = useSelector((state) => state.session.user)


    useEffect(() => {
        if (currentUser !== undefined) {
            setIsUser(true)
        }
        else {
            setIsUser(false)
        }
    }, [currentUser])

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(search)




        const payload = {
            search
        }

        let newsearch = await dispatch(getSearch(payload));
        setSearchObj(newsearch.list.songs)
        setSearch("")

    }

    const pressEnter = e =>{
        if(e.keyCode===13){
            handleSubmit();
        }
    }



    return (
        <app>
            <div className='container'>
                <div id='image-div'>
                    <div className="navigation">
                        <Navigation isLoaded={isLoaded} />
                        {isLoaded && (
                            <Switch>
                                <Route path="/signup">
                                    <SignupFormPage />
                                </Route>
                                <Route path="/" exact>

                                </Route>
                            </Switch>
                        )}
                    </div>
                </div>
                <div className="SearchBarHeader">
                    <span className="SearchBar">
                        <span>
                            <form
                            className="searchinput"
                            onSubmit={handleSubmit}>
                            <input
                                className="headerSearch"
                                placeholder="Search for artists, bands, tracks, podcasts"
                                type="search"
                                value={search}
                                onInput={(e) => setSearch(e.target.value)}

                            />
                            <button className="searchSubmit"><i className="fa-solid fa-file-waveform"></i></button>

                            </form>


                        </span>
                    </span>




                </div>

            </div>




        </app>


    )
}

export default ViewSongs
