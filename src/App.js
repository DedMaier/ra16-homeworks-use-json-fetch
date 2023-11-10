import { useEffect, useState } from "react";

const Data = () => {
  const [data, loading, error] = useJsonFetch("http://localhost:7070/data");
  console.log("data", data, "loading", loading, "error", error);

  return (
    <div className="Data">
      <div className="Result">
        <h2>Компоненты.</h2>
        <p>Загрузка :  {loading && "Loading..."}</p>
        <p>Получение данных : {data.status}</p>
        <p>Ошибки : {error && <span>Error</span>}</p>
      </div>
    </div>
  );
};

function useJsonFetch(url, opts) {
  const [data, setData] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setData("");
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url, opts);
        console.log(response);

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setData(data);
        }
        setLoading(false);
      } catch (e) {
        setError(e);
        setLoading(false);
      }
    };
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [data, loading, error];
}

function App() {
  return (
    <div className="App">
      <Data />
    </div>
  );
}

export default App;
