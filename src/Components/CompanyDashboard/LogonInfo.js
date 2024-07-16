import React, { useState } from "react";
import AngleDownIcon from './Img/angle-down.svg';

export default function LogonInfo() {

    const [isUploadBoxTogglerActive, setIsUploadBoxTogglerActive] = useState(false);
    const [isUploadEnvHidden, setIsUploadEnvHidden] = useState(false);
    const [isCertificateSectionVisible, setIsCertificateSectionVisible] = useState(false);


    const toggleUploadEnvVisibility = () => {
        setIsUploadEnvHidden(!isUploadEnvHidden);
        setIsUploadBoxTogglerActive(!isUploadBoxTogglerActive);
    };

    const handleCloseButtonClick = () => {
        setIsCertificateSectionVisible(false);
    };

    const handlePreviewButtonClick = () => {
        setIsCertificateSectionVisible(true);
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
                                <th>Logout time</th>
                                <th>Estimated time on portal</th>
                                <th>Uploaded files</th>
                                <th>Deleted files</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr key="1">
                                <td>1</td>
                                <td>192.158.1.38</td>
                                <td>16 may, 2023</td>
                                <td>8:0 AM</td>
                                <td>12:00 PM</td>
                                <td>4hr 10mins 30sec</td>
                                <td>10</td>
                                <td>2</td>
                                
                              
                            </tr>


                          
                          

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
