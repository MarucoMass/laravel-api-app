import { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom"
import { AuthContext } from "../Context/AuthContext/AuthContext";


const Layout = () => {

    const navigate = useNavigate();
    const {user, setUser, token, setToken} = useContext(AuthContext);

    const handleLogout = async (e) => {
        e.preventDefault();
         const res = await fetch("/api/logout", {
           method: "POST",
           headers: {
             Authorization: `Bearer ${token}`,
           },
         });
         const data = await res.json();
         console.log(data);

         if (res.ok) 
         {
            setUser(null);
            setToken(null);
            localStorage.removeItem("token");
            navigate("/");
         }
    }

    const navContent = user ? (
      <div className="flex items-center gap-5">
        <p className="text-white">Hola {user.name}</p>
        <form onSubmit={handleLogout}>
            <button className="nav-link">Logout</button>
        </form>
      </div>
    ) : (
      <div className="space-x-6">
        <Link to={"/register"} className="nav-link">
          Register
        </Link>
        <Link to={"/login"} className="nav-link">
          Login
        </Link>
      </div>
    );

  return (
    <>
      <header className="">
        <nav className="r">
          <Link to={"/"} className="nav-link">
            Home
          </Link>
          {navContent}
        </nav>
      </header>

      <main className="py-10">
        <Outlet />
      </main>
    </>
  );
}

export default Layout