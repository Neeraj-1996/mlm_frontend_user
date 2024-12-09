import api from './api';
import baseUrlapp from '../Url/Urlapp';
import baseWallet from '../../../src_admin/screen/urlWallet';
import grabUrlapp from '../Url/graburl';
import axios from 'axios';
const userId = localStorage.getItem("userId");
const mobileNo = localStorage.getItem("mobileNo");
// import baseWallet from '../../../src_admin/screen/urlWallet';

// Fetch user level data
export const fetchUserLevel = async () => {
  try {
    const response = await api.get(`${baseUrlapp}getUserLevel?userId=${userId}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching user level:", error);
    throw error;
  }
};

// Fetch plan records for user
export const fetchPlanRecords = async () => {
  try {
    const response = await api.get(`${baseUrlapp}getPlanRecordsUser`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching plan records:", error);
    throw error;
  }
};

// Fetch unread notification count
export const fetchNotificationCount = async () => {
  try {
    const response = await api.get(`${baseUrlapp}getUnreadNotificationCount`);
    return response.data.data.unreadCount;
  } catch (error) {
    console.error("Error fetching notification count:", error);
    throw error;
  }
};

// Fetch unread message count for user
export const fetchUnreadMessageCount = async () => {
  try {
    const response = await axios.get(`${baseUrlapp}getUserUnreadMessageCount?userId=${userId}`);
    return response.data.data.unreadCount;
  } catch (error) {
    console.error("Error fetching unread messages:", error);
    throw error;
  }
};

// Fetch user's balance
export const fetchUserBalance = async () => {
  try {
    const response = await api.get(`${baseWallet}balanceUser?userId=${userId}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching user balance:", error);
    throw error;
  }
};

// Fetch user order details
export const fetchUserOrders = async () => {
  try {
    const response = await api.post(`${grabUrlapp}grabProductsUser?user_id=${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user orders:", error);
    throw error;
  }
};

export const fetchNotificationData = async () => {
    try {
      const response = await api.get(`${baseUrlapp}getAllNotifications`);

      return response.data.data;
    } catch (error) {
      console.error("Error fetching user orders:", error);
      throw error;
    }
  };

// Function to fetch user withdrawal requests
export const fetchUserWithdrawal = async () => {
  try {
    // Get mobile number from localStorage
    const mobileNo = localStorage.getItem("mobileNo");
    const response = await api.post(`${baseUrlapp}getwithdrawalrequest`, {
      mobile: mobileNo
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching user balance:", error);
    throw error;
  }
};

