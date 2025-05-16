import React ,{useContext} from 'react';
import {Link,useNavigate} from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar=()=>{
    const {user,logout}=useContext(AuthContext);
    const navigate=useNavigate();

    const handleLogout=()=>{
        logout();
        navigate('/login');
    };
    
    return (
        <nav>
            <Link to="/">Home</Link>
            {user? (
                <>
                  <Link to ='/myblogs'>My Blogs</Link>
                  <button onClick={handleLogout}>Logout</button>
                </>
            ):(
            <>
               <Link to='/login'>Login</Link>
               <Link to ='/register'>Register</Link>
            </>
            )}
        </nav>
    );
};

export default Navbar;
