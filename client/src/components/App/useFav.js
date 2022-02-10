export default function useFav({ token }) {
  console.log(token);
  const getFav = ({ token }) => {
    console.log(token);

    fetch(`https://apicodev.deta.dev/me`, {
      headers: {
        "Access-Control-Allow-Origin": "https://apicodev.deta.dev/",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("fetch machin" + res.bookmarks[0].description);
        if (res.bookmarks.length > 0) return res.bookmarks[0].description;
        else return "all";
      })
      .catch((error) => {
        setData([]);
        console.log(
          `API not responding me -> https://apicodev.deta.dev/me\n${error}`
        );
      });
  };

  const setFav = ({ selectedRegion, token }) => {
    fetch("https://apicodev.deta.dev/me/add_bookmark", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "https://apicodev.deta.dev/",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: "fav",
        description: selectedRegion,
      }),
    });
  };

  const deleteFav = ({ token }) => {
    fetch("https://apicodev.deta.dev/me/delete_bookmark", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "https://apicodev.deta.dev/",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: "fav",
      }),
    });
  };

  return {
    setFav,
    getFav,
    deleteFav,
  };
}
