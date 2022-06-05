import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import { demouser } from '../../store/session';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import SignupModal from '../SignupFormPage';


function Navigation({ isLoaded }) {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user);
  const onclickdemo = (e) => {
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
        <button class="demouser" id="splashpagebuttons" onClick={onclickdemo}>Demo User</button>
      </>
    );
  }

  return (
    <div>



      <div className='nav1'>
      <a className="github" href="https://github.com/brianshkim/soloproj"><i class="fa-brands fa-github fa-2xl"></i></a>
      <a className="github" href="https://www.linkedin.com/in/brian-kim-2217ba125/"><i class="fa-brands fa-linkedin fa-2xl"></i></a>

        {isLoaded && sessionLinks}






      </div>
    </div>

  );
}

export default Navigation;
