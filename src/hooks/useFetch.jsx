import { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null);

  const [config, setConfig] = useState(null);
  const [method, setMethod] = useState(null);
  const [callFetch, setCallFetch] = useState(null);
  const [itemId, setItemId] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);

  const httpConfig = (product, method, itemId) => {
    if (method === "POST") {
      setConfig({
        method,
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(product),
      });

      setMethod(method);
    } else if (method === "DELETE") {
      setConfig({
        method,
        headers: {
          "Content-type": "application/json",
        },
      });
      setMethod(method);
      setItemId(itemId);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const res = await fetch(url);

        const data = await res.json();

        setData(data);
      } catch (error) {
        console.log(error.message);

        setError("Ops, algo deu errado");
      }
      setLoading(false);
    };

    fetchData();
  }, [url, callFetch]);

  useEffect(() => {
    const httpRequest = async () => {
      if (method === "POST") {
        setLoading(true);
        let fetchOptions = [url, config];

        const res = await fetch(...fetchOptions);

        const json = await res.json();

        setCallFetch(json);
        setLoading(false);
      } else if (method === "DELETE") {
        setLoading(true);

        let deleteUrl = `${url}/${itemId}`;

        let fetchOptions = [deleteUrl, config];

        const res = await fetch(...fetchOptions);

        const json = await res.json();
        setCallFetch(json);
        setLoading(false);
      }
    };

    httpRequest();
  }, [config, method, url, itemId]);

  return { data, httpConfig, loading, error };
};
