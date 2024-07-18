import React, { useState, useEffect } from "react";
import AngleDownIcon from './Img/angle-down.svg';
import axios from 'axios';
import SERVER_HOSTNAME from '../../config';

const LogonInfo = () => {
    const [isUploadBoxTogglerActive, setIsUploadBoxTogglerActive] = useState(false);
    const [isUploadEnvHidden, setIsUploadEnvHidden] = useState(false);
    const [logonData, setLogonData] = useState([]);
    const [userIp, setUserIp] = useState("");
    const [currentTime, setCurrentTime] = useState(new Date());
    const [timeDifference, setTimeDifference] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch logon data
                const logonResponse = await axios.get(`${SERVER_HOSTNAME}/user/create/1/`);
                const data = logonResponse.data;

                const currentDate = new Date().toLocaleDateString();

                if (Array.isArray(data)) {
                    const updatedData = data.map(logon => ({
                        ...logon,
                        date: currentDate,
                    }));
                    setLogonData(updatedData);
                } else {
                    setLogonData([{
                        ...data,
                        date: currentDate,
                    }]);
                }
            } catch (error) {
                console.error("Error fetching logon data:", error);
            }

            try {
                // Fetch user IP address
                const ipResponse = await axios.get('https://api.ipify.org?format=json');
                setUserIp(ipResponse.data.ip); // Update userIp state with fetched IP
            } catch (error) {
                console.error("Error fetching user IP address:", error);
            }
        };

        fetchData(); // Initial fetch

        const interval = setInterval(() => {
            setCurrentTime(new Date()); // Update current time every second
        }, 1000);

        return () => {
            clearInterval(interval); // Clear interval on component unmount
        };
    }, []);

    useEffect(() => {
        const calculateTimeDifference = () => {
            if (logonData.length > 0) {
                const loginTime = new Date(logonData[0].last_login);
                const difference = currentTime.getTime() - loginTime.getTime();
                const hoursDifference = Math.floor(difference / (1000 * 60 * 60));
                const minutesDifference = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

                if (hoursDifference === 0) {
                    setTimeDifference(`${minutesDifference} minute${minutesDifference !== 1 ? 's' : ''}`);
                } else {
                    setTimeDifference(`${hoursDifference} hour${hoursDifference !== 1 ? 's' : ''} ${minutesDifference} minute${minutesDifference !== 1 ? 's' : ''}`);
                }
            }
        };

        calculateTimeDifference(); // Initial calculation

        const minuteInterval = setInterval(() => {
            calculateTimeDifference(); // Update time difference every minute
        }, 60000);

        return () => {
            clearInterval(minuteInterval); // Clear interval on component unmount
        };
    }, [logonData, currentTime]);

    const formatLoginTime = (isoDate) => {
        if (!isoDate) return "";
        const date = new Date(isoDate);
        return date.toLocaleTimeString(); // Format ISO date to readable time format
    };

    const toggleUploadEnvVisibility = () => {
        setIsUploadEnvHidden(!isUploadEnvHidden);
        setIsUploadBoxTogglerActive(!isUploadBoxTogglerActive);
    };

    return (
        <div className="Uploaded_Cert_page">
            <div className="ToP_Upload_env">
                <h3 
                    className={`Upload_Box_Toggler ${isUploadBoxTogglerActive ? 'Active_Upload_Box_Toggler' : ''}`} 
                    onClick={toggleUploadEnvVisibility}
                >
                    Logon information<img src={AngleDownIcon} alt="Angle Down Icon" />
                </h3>
                <div className="Upload_Conunter">
                    <span>02</span>
                    <p><b>User</b> logon details</p>
                </div>
            </div>

            <div className={`Upload_env_main ${isUploadEnvHidden ? 'Hide_Envi_Box' : ''}`}>
                <div className="Table_Sec">
                    <table className="Upload_Table">
                        <thead>
                            <tr>
                                <th>S/N</th>
                                <th>IP</th>
                                <th>Date</th>
                                <th>Login time</th>
                                <th>Current time</th>
                                <th>Estimated time on portal</th>
                                <th>Uploaded files</th>
                                <th>Deleted files</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logonData.map((logon, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{userIp}</td> {/* Display userIp here */}
                                    <td>{logon.date}</td>
                                    <td>{logonData.length > 0 ? formatLoginTime(logonData[0].last_login) : ""}</td>
                                    <td>{currentTime.toLocaleTimeString()}</td>
                                    <td>{timeDifference}</td>
                                    <td>{logon.num_uploaded_files}</td>
                                    <td>{logon.num_deleted_files}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default LogonInfo;
