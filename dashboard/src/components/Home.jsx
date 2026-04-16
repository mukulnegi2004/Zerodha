import Dashboard from "./Dashboard";
import TopBar from "./TopBar";
import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
    const [user, setUser] = useState(null);
    useEffect(() => {
      const fetchCurrUser = async () => {
        try {
          const url = `${import.meta.env.VITE_API_URL}/users/me`;
          let resp = await axios.get(url, {
            withCredentials: true
          })
  
          if (!resp.data.user) {
            window.location.href = `${import.meta.env.VITE_HOME_URL}/login`;
          } else {
            setUser(resp.data.user);
          }
        } catch (err) {
          window.location.href = `${import.meta.env.VITE_HOME_URL}/login`;
        }
      }
      fetchCurrUser();
    }, []);

    if (!user) return <p>Loading...</p>;

    return (
        <>
            <TopBar user={user} />
            <Dashboard />
        </>
    )

}


export default Home;