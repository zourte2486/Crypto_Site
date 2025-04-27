import { useState, useEffect, useContext } from "react";
import supabase from "../supabaseClient";
import { CoinContext } from "../Context/CoinContext";

function Favorites() {
  const { allCoins, currency } = useContext(CoinContext);
  const [favorites, setFavorites] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserAndFavorites = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const { data, error } = await supabase
          .from("favorites")
          .select("coin_id")
          .eq("user_id", user.id);

        if (error) console.error(error);
        else setFavorites(data.map((fav) => fav.coin_id));
      }

      setIsLoading(false);
    };

    fetchUserAndFavorites();
  }, []);

  if (isLoading || allCoins.length === 0) return <div>Loading...</div>;
  if (!user) return <div>Please login to view your favorites!</div>;

  const favoriteCoins = allCoins.filter((coin) => favorites.includes(coin.id));

  return (
    <div className="favorites-page">
      <h2>Your Favorites</h2>
      {favoriteCoins.length === 0 ? (
        <p>No favorites yet!</p>
      ) : (
        favoriteCoins.map((coin) => (
          <div key={coin.id} className="favorite-coin">
            <img src={coin.image} alt={coin.name} width="30" />
            <span style={{ marginLeft: "10px" }}>
              {coin.name} ({coin.symbol.toUpperCase()})
            </span>
            <span style={{ marginLeft: "auto" }}>
              {currency.symbol}{coin.current_price.toLocaleString()}
            </span>
          </div>
        ))
      )}
    </div>
  );
}

export default Favorites;
