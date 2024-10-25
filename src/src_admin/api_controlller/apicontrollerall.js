import axios from 'axios';
// import baseUrl from './url';
import baseUrl from '../screen/url';
import baseWallet from '../screen/urlWallet';

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
