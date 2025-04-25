import { useState, useEffect } from "react";
import supabase from "../supabaseClient";

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      if (user) fetchFavorites(user.id);
    });
  }, []);

  const fetchFavorites = async (userId) => {
    const { data, error } = await supabase
      .from("favorites")
      .select("coin_id")
      .eq("user_id", userId);

    if (error) console.error(error);
    else setFavorites(data.map((fav) => fav.coin_id));
  };

  if (!user) return <div>Please Login!</div>;

  return (
    <div>
      <h2>Your Favorites</h2>
      {favorites.map((coinId, index) => (
        <p key={index}>⭐ {coinId}</p>
      ))}
    </div>
  );
}

export default Favorites;
