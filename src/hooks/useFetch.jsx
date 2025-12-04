import { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null);

  const [config, setConfig] = useState(null);
  const [method, setMethod] = useState(null);
  const [callFetch, setCallFetch] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const res = await fetch(url);

      const data = await res.json();

      setData(data);
      setLoading(false);
    };

    fetchData();
  }, [url, callFetch]);

  useEffect(() => {
    const httpRequest = async () => {
      if (method === "POST") {
        let fetchOptions = [url, config];

        const res = await fetch(...fetchOptions);

        const json = await res.json();

        console.log(json);

        setCallFetch(json);
      }
    };

    httpRequest();
  }, [config, method, url]);

  const httpConfig = (product, method) => {
    if (method === "POST") {
      setConfig({
        method: "POST", //could use just "method, because POST is sent from app.jsx httpConfig function "
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(product),
      });

      setMethod(method);
    }
  };

  return { data, httpConfig, loading };
};
