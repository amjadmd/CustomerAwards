import { useEffect, useState } from "react";
import { calculateCustomerAward } from "./utilities";
import useFetchData from "./useFetchData";

const CustomerApp = () => {
  const [customerData, setCustomerData] = useState([]);
  const [awards, setAwards] = useState({});
  const { loading, data, error } = useFetchData();
  
  const calculateAwards = (data) => {
    const rewardsData = {};
    data.forEach(({ customer, amount, date }) => {
      const month = new Date(date).toLocaleString("default", { month: "long" });
      const points = calculateCustomerAward(amount);

      if (!rewardsData[customer]) rewardsData[customer] = {};
      if (!rewardsData[customer][month]) rewardsData[customer][month] = 0;

      rewardsData[customer][month] += points;
    });

    return rewardsData;
  };
  console.log(data)
  useEffect(() => {
    if (JSON.parse(JSON.stringify(data, null, 2))?.length > 0) {
      setCustomerData(JSON.parse(JSON.stringify(data, null, 2)));
    }
  }, [data]);

  useEffect(() => {
    if (customerData?.length > 0) {
      setAwards(calculateAwards(customerData));
    }
  }, [customerData]);

  if (loading) return <p>Loading transactions...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Customer Transactions</h1>
      {Object.entries(awards).map(([customer, months]) => (
        <div key={customer}>
          <h2>{customer}</h2>
          {Object.entries(months).map(([month, points]) => (
            <p key={month}>
              {month}: {points} points
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CustomerApp;
