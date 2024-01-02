
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { useState, useEffect } from 'react'

import { jwtDecode } from 'jwt-decode';

export const Navbar = () => {
  const location = useLocation();

  const navigate = useNavigate();


  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const Logout = () => {
    // Kullanıcı adını al
    const username = user?.result?.name;
  
    // Eğer kullanıcı giriş yapmışsa
    if (username) {
      // localStorage'dan kullanıcı adını silme, favori listesini koru
      localStorage.removeItem(`username`);
      localStorage.removeItem('profile');
    }
    navigate('/signin');
    setUser(null);
    // Diğer çıkış işlemlerini gerçekleştir
    // Örneğin, kullanıcıyı belirli bir sayfaya yönlendirme gibi işlemler
  };
  

  useEffect(() => {

    setUser(JSON.parse(localStorage.getItem('profile')));

  }, [location]);
  useEffect(() => {

    const token = user?.token;

    if (token) {
      const decodedToken = jwtDecode(token);

      console.log(decodedToken);
      console.log(new Date().getTime());

      if (decodedToken.exp * 1000 < new Date().getTime()) Logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));

  }, [location]);

  return (
    <>


      <nav className="navbar navbar-expand-lg p-0 m-0" style={{background:"white"}}>
      <Link to="/" className="navbar-brand" style={{color:"#0a66c2"}}>Sosyal Medya</Link>  
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link disabled" href="#">  <form className="form-inline my-2 my-lg-0">
                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
              </form></Link>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="#"><i className="fas fa-home-lg-alt" style={{color:"gray"}}></i> <span className="sr-only">(current)</span></Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/favori"><i className="fas fa-heart" style={{color:"gray"}}></i></Link>
            </li>
      
          </ul>



          {user?.result?.name? (
            <div style={{ display: 'flex', justifyContent: 'space-around', width: '150px', alignItems: 'center' }}>
              <h5  >{user?.result?.name.charAt(0)}</h5>
           <button type="button" className="btn btn-primary" onClick={Logout} style={{background:"#0a66c2"}}>Çıkış</button>
            </div>
          ) : (
            <button type="button" className="btn btn-primary" to="/signin" >GİRİŞ YAP</button>
          )}

        </div>
      </nav>
    </>


  )
}
