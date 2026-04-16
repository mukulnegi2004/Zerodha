import { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    const orders = async () => {
      try {
        const url = `${import.meta.env.VITE_API_URL}/orders`;
        let res = await axios.get(url, {
          withCredentials: true
        })
        console.log(res.data);
        setAllOrders(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    orders();
  }, []);
  if (allOrders.length === 0) return (<p> No orders placed yet... </p>)

  return (
    <>
      <h3 className="title">Orders ({allOrders.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Price</th>
              <th>Date</th>
              <th>Time</th>
              <th>Mode</th>
            </tr>
          </thead>

          <tbody>
            {allOrders.map((stock) => {
              const dateObj = new Date(stock.createdAt);

              return (
                <tr key={stock._id}>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.price.toFixed(2)}</td>
                  <td>{dateObj.toLocaleDateString("en-IN")}</td>
                  <td>{dateObj.toLocaleTimeString("en-IN")}</td>
                  <td style={{fontSize: "15px"}}>{stock.mode}</td>
                </tr>
              )
            })}

          </tbody>
        </table>
      </div>
    </>
  );
};

export default Orders;