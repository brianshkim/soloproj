import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import { demouser } from '../../store/session';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import SignupModal from '../SignupFormPage';


function Navigation({ isLoaded }){
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user);
  const onclickdemo = (e) =>{
    dispatch(demouser())
  }

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
      <ProfileButton user={sessionUser} />

       </>
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <SignupModal />
        <button class="demouser" id="splashpagebuttons"onClick={onclickdemo}>Demo User</button>
      </>
    );
  }

  return (

      <div className='nav1'>
        {isLoaded && sessionLinks}
        {sessionUser && <NavLink exact to="/home">Home</NavLink>}





      </div>

  );
}

export default Navigation;
