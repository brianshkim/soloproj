import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navlink, Route, useParams, Switch } from 'react-router-dom'
import './Songs.css'
import Navigation from "../Navigation";
import SignupFormPage from "../SignupFormPage";

import * as sessionActions from "../../store/session";
import * as songActions from "../../store/songs";

function ViewSongs() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const [isUser, setIsUser] = useState(false)
    const [showForm, setShowForm] = useState(false)

    useEffect(() => {
        dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    }, [dispatch]);

    useEffect(()=>{
        dispatch(songActions.getSongs())
    }, [dispatch])

    let currentUser = useSelector((state)=>state.session.user)


    useEffect(()=>{
    if(currentUser !== undefined){
        setIsUser(true)
    }
    else{
        setIsUser(false)
    }
},[currentUser])


console.log(currentUser)


    return (
        <main>
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
                <div className="user-home">







                </div>
            </div>

        </main>


    )
}

export default ViewSongs
