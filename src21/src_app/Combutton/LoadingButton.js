import React from 'react';

const LoadingButton = ({ onClickFunction, buttonText, loading }) => {
    return (
        <>
            {!loading ? (
                <button
                    onClick={onClickFunction}
                    style={{
                        background: 'linear-gradient(90deg, #FF5733, #C70039)',
                        color: "#fff",
                        padding: "10px 0",
                        width: "100%",
                        border: "none",
                        borderRadius: "8px",
                        fontSize: "16px",
                        cursor: "pointer",
                        transition: 'background 0.3s ease',
                        boxShadow: "0px 4px 12px rgba(64, 123, 250, 0.5)",
                    }}
                    onMouseEnter={(e) => e.target.style.background = 'linear-gradient(90deg, #C70039, #FF5733)'}  // Hover effect
                    onMouseLeave={(e) => e.target.style.background = 'linear-gradient(90deg, #FF5733, #C70039)'}  // Revert on hover out
                >
                    {buttonText}
                </button>
            ) : (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: "10px 0",
                    width: "100%",
                    borderRadius: "8px",
                }}>
                    <div className="spinner" style={{
                        border: "3px solid #ccc",
                        borderTop: "3px solid #FF5733",
                        borderRadius: "50%",
                        width: "24px",
                        height: "24px",
                        animation: "spin 1s linear infinite"
                    }}></div>
                </div>
            )}
        </>
    );
};

export default LoadingButton;
