import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const history = useHistory();
  const { email } = JSON.parse(localStorage.getItem('user'));
  return (
    <div>
      <Header />
      <p data-testid="profile-email">{email}</p>
      <button
        data-testid="profile-done-btn"
        type="button"
        onClick={ () => { history.push('./done-recipes'); } }
      >
        Done Recipes
      </button>
      <button
        data-testid="profile-favorite-btn"
        type="button"
        onClick={ () => { history.push('./favorite-recipes'); } }
      >
        Favorite Recipes
      </button>
      <button
        data-testid="profile-logout-btn"
        type="button"
        onClick={ () => {
          history.push('./');
          localStorage.clear();
        } }
      >
        Logout
      </button>
      <Footer />
    </div>
  );
}

export default Profile;
