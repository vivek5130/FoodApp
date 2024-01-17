import { Link } from "react-router-dom";
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from "../hooks/useLogout";

const Navbar = () => {
    const {user} = useAuthContext()
  let data  = null
  if(user){

    data = user.data
  }
    const {logout} = useLogout()
    const handleClick = ()=>{
        console.log("Log out")
        logout()
    }
    return (  
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Food <span>Plan</span></h1>
                </Link>
                <nav>

          {data && (<div>
            <span>{data.email}</span>
            <button  onClick={handleClick}> 
              Log Out
            </button>
          </div>
          )}
          {!data && (<div>
            <Link to = "/login"><button>Login</button></Link>
            <Link to = "/signup"><button>Signup</button></Link>
          </div>
          )}
        </nav>
            </div>
        </header>
    );
}
 
export default Navbar;