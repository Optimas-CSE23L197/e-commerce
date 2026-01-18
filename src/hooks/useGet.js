import { useEffect, useState } from "react";
import { Toast } from "../utils/toast.js";
import { axiosClient } from "../api/axiosClient";

export default function useGet(url, autoFetch = true) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(autoFetch);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    console.log(url);
    if (!url) {
      Toast.error("Url not found");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axiosClient.get(url); // already data
      setData(response);
    } catch (err) {
      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) fetchData();
  }, [url]);

  return { data, loading, error, refetch: fetchData };
}
