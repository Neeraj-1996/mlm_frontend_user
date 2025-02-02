import React from 'react';
import Header from '../Header/Header';
import { useNavigate } from 'react-router-dom';

const TutorialScreen = () => {
    const navigate = useNavigate();
    const handleBackClick = () => {
        navigate(-1); // Navigates back to the previous page
    };

    return (
        <div style={styles.container}>
            <Header name="Company Profile" onBack={handleBackClick} />

            {/* Card for the Table */}
            <div style={styles.card}>
                <h2>Partner Merchants Table</h2>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>NAME</th>
                            <th style={styles.th}>Balance</th>
                            <th style={styles.th}>COMMISSION</th>
                            <th style={styles.th}>DIRECT REQUIRED</th>
                            {/* <th style={styles.th}>Assignable daily order</th>
                            <th style={styles.th}>Commission rate (%)</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={styles.td}>BEP</td>
                            <td style={styles.td}>100 </td>
                            <td style={styles.td}>2.5%</td>
                            <td style={styles.td}>0</td>
                            {/* <td style={styles.td}>3</td>
                            <td style={styles.td}>9</td> */}
                        </tr>
                        <tr>
                            <td style={styles.td}>ERP</td>
                            <td style={styles.td}>500</td>
                            <td style={styles.td}>3%</td>
                            <td style={styles.td}>3</td>
                            {/* <td style={styles.td}>5</td>
                            <td style={styles.td}>15</td> */}
                        </tr>
                        <tr>
                            <td style={styles.td}>ETHERIUM</td>
                            <td style={styles.td}>1500</td>
                            <td style={styles.td}>3.5%</td>
                            <td style={styles.td}>6</td>
                            {/* <td style={styles.td}>10</td>
                            <td style={styles.td}>20</td> */}
                        </tr>
                        <tr>
                            <td style={styles.td}>SOLANA</td>
                            <td style={styles.td}>5000 </td>
                            <td style={styles.td}>4%</td>
                            <td style={styles.td}>12</td>
                            {/* <td style={styles.td}>15</td>
                            <td style={styles.td}>20</td> */}
                        </tr>
                        <tr>
                            <td style={styles.td}>LITECOIN</td>
                            <td style={styles.td}>10000</td>
                            <td style={styles.td}>5%</td>
                            <td style={styles.td}>20</td>
                            {/* <td style={styles.td}>25</td>
                            <td style={styles.td}>30</td> */}
                        </tr>
                        <tr>
                            <td style={styles.td}>ETHERIUM CLASSIC</td>
                            <td style={styles.td}>20000</td>
                            <td style={styles.td}>6%</td>
                            <td style={styles.td}>50</td>
                            {/* <td style={styles.td}>25</td>
                            <td style={styles.td}>30</td> */}
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Card for the Description */}
            <div style={styles.card}>
                <h2>Vortex Vantures  Overview</h2>
                <p>
                    Vortex Vantures  includes six levels: <strong>BEP</strong>, <strong>ERP</strong>, <strong>ETHERIUM</strong>, 
                    <strong> SOLANA</strong>, <strong> LITECOIN</strong>, and <strong>ETHERIUM CLASSIC</strong>. Each level offers different benefits 
                    in the following areas:
                </p>
                <h3>Valid Direct Downline</h3>
                <p>
                    This refers to the number of valid direct referrals a merchant needs. For example, becoming a Bronze merchant requires no 
                    downline, while a Silver merchant needs 3 valid direct downlines.
                </p>
                <p><i>***Valid downline defined as the account total deposited a minimum of 100 USDT.</i></p>
                
                <h3>Account Balance</h3>
                <p>
                    This indicates the minimum balance a merchant needs to maintain in their account. For example, a Bronze merchant needs 
                    only $1, whereas a Titanium merchant needs $80,000.
                </p>

                <h3>Assignable Daily Order</h3>
                <p>
                    This refers to the number of orders a merchant can assign daily. For instance, a Bronze merchant can assign 5 orders per 
                    day, while a Titanium merchant can assign 30 orders per day.
                </p>

                <h3>Commission Rate</h3>
                <p>
                    This is the percentage of commission a merchant can earn. For example, a Bronze merchant earns a commission rate of 0.77%, 
                    while a Titanium merchant earns 0.93%.
                </p>

                <p>
                    Different levels of partner merchants have various requirements and benefits. The higher the level, the more valid direct 
                    downlines and account balance required. Additionally, higher levels allow for more daily assignable orders and higher commission rates.
                </p>
            </div>
        </div>
    );
};

// Basic styles for cards, table, and container
const styles = {
    container: {
        // padding: '20px',
        textAlign: 'center',
        maxWidth: '100%',
        overflowX: 'auto', // Added to prevent overflow
    },
    card: {
        backgroundColor: '#fff',
        padding: '10px',
        margin: '50px auto',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
        width: '90%',
        textAlign: 'left',
        overflowX: 'auto',
        
    },
    table: {
        width: '100%',
        margin: 'auto',
        borderCollapse: 'collapse',
    },
    th: {
        border: '1px solid #ccc',
        padding: '10px',
        backgroundColor: '#f5f5f5',
    },
    td: {
        border: '1px solid #ccc',
        padding: '10px',
    }
};

export default TutorialScreen;
