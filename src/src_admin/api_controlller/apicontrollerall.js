import axios from 'axios';
import baseUrl from '../screen/url';
import baseWallet from '../screen/urlWallet';
import grabUrlapp from '../../src_app/Component/Url/graburl';
import baseUrlapp from '../../src_app/Component/Url/Urlapp';
const getAccessToken = () => {
  return localStorage.getItem('accessTokenAdmin');
};



export const fetchPlans = async () => {
  const accessToken = getAccessToken();
  const response = await axios.get(`${baseUrl}getPlanRecords`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.data.data;
};

export const addPlan = async (formData) => {
  const accessToken = getAccessToken();
  await axios.post(`${baseUrl}addPlan`, formData, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

export const updatePlan = async (formData) => {
  const accessToken = getAccessToken();
  await axios.post(`${baseUrl}updatePlan`, formData, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

export const deletePlan = async (id) => {
  const accessToken = getAccessToken();
  await axios.delete(`${baseUrl}deletePlan`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    data: { plan_id: id },
  });
};

// Event Management APIs
export const fetchEvents = async () => {
    const accessToken = getAccessToken();
    const response = await axios.get(`${baseUrl}getEventRecords`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data.data;
  };
  
  export const addEvent = async (formData) => {
    const accessToken = getAccessToken();
    await axios.post(`${baseUrl}addEvent`, formData, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  };
  
  export const updateEvent = async (formData) => {
    const accessToken = getAccessToken();
    await axios.post(`${baseUrl}updateEvent`, formData, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  };
  
  export const deleteEvent = async (id) => {
    console.log("id",id);
    const accessToken = getAccessToken();
    await axios.delete(`${baseUrl}deleteEvent`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      data: { event_id: id },
    });
  };
  
  export const fetchWithdrawal = async () => {
    const accessToken = getAccessToken();
    const response = await axios.get(`${baseUrl}withdrawalrequests`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data.data;
  };

  export const fetchTransactions = async () => {
    const accessToken = getAccessToken();
    const response = await axios.get(`${baseWallet}allWalletTransaction`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data.data;
  };

  export const fetchUsers = async () => {
    const accessToken = getAccessToken();
    const response = await axios.get(`${baseUrl}getUserRecords`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data.data;
  };
  export const fetchOrderAsPerUser = async (userId) => {
    const accessToken = getAccessToken();
    const response = await axios.post(`${grabUrlapp}grabProductsUser?user_id=${userId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  };

  export const deleteUser = async (id) => {
    
    const accessToken = getAccessToken();
    const response = await axios.delete(`${baseUrl}deleteUser/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data.data;
  };

  export const handleAddBalance = async (userId, amount, onSuccess) => {
    const accessToken = getAccessToken();
    try {
      const response = await axios.post(
        `${baseWallet}depositAmountAdmin?userId=${userId}`,
        { deposit_amount: amount },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response.data.statusCode === 200) {
        console.log("Amount added successfully:", response.data.message);
        if (onSuccess) onSuccess(); // Call the onSuccess callback if provided
      } else {
        console.error("Failed to add balance:", response.data.message);
      }
    } catch (error) {
      console.error("Error while adding balance:", error);
    }
  };

  export const handleEditUser = async (mobileNo, newPassword, onSuccess) => {
    const accessToken = getAccessToken();
    try {
      const response = await axios.post(
        `${baseUrlapp}changePassword`,
        { mobileNo: mobileNo, 
          newPassword: newPassword},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response.data.statusCode === 200) {
        console.log("Amount added successfully:", response.data.message);
        if (onSuccess) onSuccess(); // Call the onSuccess callback if provided
      } else {
        console.error("Failed to add balance:", response.data.message);
      }
    } catch (error) {
      console.error("Error while adding balance:", error);
    }
  };

