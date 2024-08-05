import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { jsPDF } from "jspdf";
import payment from "../assets/payment.png";

export default function Profile() {
  const { order_id } = useParams();
  const [order, setOrder] = useState("");

  useEffect(() => {
    const CheckStatus = async () => {
      try {
        const res = await axios.get(
          `https://n-shop-0pqs.onrender.com/api/interaction/payment/status/${order_id}`
        );
        console.log(res.data.order_status);
        setOrder(res.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    CheckStatus();
  }, [order_id]);

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Payment Receipt", 20, 10);
    doc.text(`Order ID: ${order_id}`, 20, 20);
    doc.text(`Status: ${order.order_status}`, 20, 30);
    doc.text(`User Email: ${order.customer_details.customer_email}`, 20, 40);
    doc.text(`User Number: ${order.customer_details.customer_phone}`, 20, 50);
    doc.text(`Amount: ${order.order_amount}`, 20, 60);
    doc.text(`Date: ${order.date}`, 20, 70);
    doc.save(`receipt_${order_id}.pdf`);
  };

  if (order.order_status) {
    return (
      <div>
        {order.order_status === "PAID" || order.order_status === "ACTIVE"
          ? "Success"
          : "Failure"}
        <div className=" flex items-center justify-center flex-col">
          Your Payment Is Sucessifull {order_id}
          <img className="w-[300px]" src={payment} alt="" srcSet="" />
          {/* <Lottie options={defaultOptions} height={300} width={300} /> */}
        </div>
        <button onClick={generatePDF}>Download Receipt</button>
      </div>
    );
  }
  return <div>Profile {order_id}</div>;
}
