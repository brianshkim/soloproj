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
    useEffect(() => {
        dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    }, [dispatch]);

    useEffect(()=>{
        dispatch(songActions.getSongs())
    })

    let currentUser = useSelector((state)=>state.session.user)

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
                <div className="navigation1">
                {!!currentUser && {

                }}




                </div>
            </div>

        </main>


    )
}

export default ViewSongs
