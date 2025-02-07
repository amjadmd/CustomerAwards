import { useState, useEffect } from "react";
import { customerData } from "./customerData"; // Import from external file

const useFetchData = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(customerData, "customerData");
        const values = await customerData;
        console.log(values, "values");
        if (values?.length >= 0) {
          setData(values);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { loading, data, error };
};

export default useFetchData;
