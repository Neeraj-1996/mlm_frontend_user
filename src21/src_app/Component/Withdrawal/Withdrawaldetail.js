import React, { useState, useEffect } from "react";

import axios from 'axios';
import baseUrl from "../Url/Url";



const WithdrawalDetail = () => {
  const [withdrawalData, setWithdrawalData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('tokenId');
      const result = await axios.get(baseUrl + 'withdrawal-paid', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (result.status === 200) {
        setWithdrawalData(result.data.data);
      } else {
        console.log('Error: Unable to fetch data.');
      }
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  const reversedData = withdrawalData.slice().reverse();
  
  const renderItem = (item) => {
    const createdAt = new Date(item.created_at);
    const formattedDate = createdAt.toLocaleDateString();
    const formattedTime = createdAt.toLocaleTimeString();

    return (
      <div 
      style={{ justifyContent: "center", alignItems: "center", width: "99%", backgroundColor: "#1B334D", marginBottom: "2px", borderRadius: 10, flexDirection: "row", marginLeft: "2px",display: 'flex',  }}
       key={item.id}>
        <div style={{ display: "flex", flexDirection: "column" ,width:'100%',marginTop:'5px',marginLeft:"10px"}}>
        <div style={{ display: "flex", flexDirection: "row" ,width:'100%'}}>
          <div style={{ width: "70%" ,display: "flex", flexDirection: "column"  }}>
            <h6 style={{ color: '#fff', fontSize: 14 }}> Address</h6>
            <h6 style={{ color: '#fff', fontSize: 10 }}>{item.withdrawal_address}</h6>
            <h6 style={{ color: "#EC8E22",fontSize: 10 }}>{formattedDate} {formattedTime}</h6>
          </div>
          <div style={{ marginTop: 5, width: "35%" }}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <h6 style={{ color: '#fff', alignSelf: 'center', fontSize: 10, width: '55%' }}>Amount</h6>
              <h6 style={{ color: '#fff', marginLeft: 5, fontSize: 10 }}>{parseFloat(item.withdrawal_amount).toFixed(2)}</h6>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row'}}>
              <h6 style={{ color: '#fff', alignSelf: 'center', fontSize: 10, width: '55%' }}>Fee Charged</h6>
              <h6 style={{ color: '#fff', marginLeft: 5, fontSize: 10 }}>{parseFloat(item.withdrawal_amount * 0.05).toFixed(2)}</h6>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <h6 style={{ color: '#fff', alignSelf: 'center', fontSize: 10, width: '55%' }}>Get Amount</h6>
              <h6 style={{ color: '#fff', marginLeft: 5, fontSize: 10 }}>{parseFloat(item.withdrawal_amount * 0.95).toFixed(2)}</h6>
            </div>
          </div>
        </div>
        <div>

        </div>
        </div>
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <div style={{ marginTop: 10, padding: 10, marginBottom: 50 }}>
        {reversedData.map(renderItem)}
      </div>
    </div>
  );
};

const styles = {
  container: {
    flex: 1,
    marginTop:70
  },
  addressItem: {
    backgroundColor: '#1B334D',
    padding: 8,
    marginBottom: 8,
    borderRadius: 5,
    height: 80,
  },
};

export default WithdrawalDetail;
