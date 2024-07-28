import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Profile() {
  const { order_id } = useParams();
  const [status, setStatus] = useState("");
  useEffect(() => {
    const CheckStatus = async () => {
      try {
        const res = await axios.get(
          `https://n-shop-0pqs.onrender.com/api/interaction/payment/status/${order_id}`
        );
        console.log(res.data.order_status);
        setStatus(res.data.order_status);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    CheckStatus();
  }, [order_id]);

  if (status) {
    return (
      <div>
        {status === "PAID" || status === "ACTIVE" ? "Sucess" : "FAilaure"}
        <div>profile {order_id}</div>
      </div>
    );
  }
  return <div>profile {order_id}</div>;
}
