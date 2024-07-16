import React, { useState } from "react";
import AngleDownIcon from './Img/angle-down.svg';
import RestoreIcon from './Img/restore_icon.svg';
import VerifiedIcon from './Img/verified-badge2.svg';
import TrashIcon from './Img/trash.svg';

export default function DeletedUploadedCert() {

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


    
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleChange = (event) => {
        setSelectedCategory(event.target.value);
        // Perform any other actions based on the selected value
    };


    return (
        <div className="Uploaded_Cert_page">
           

            <div className="ToP_Upload_env">
                <h3 
                    className={`Upload_Box_Toggler ${isUploadBoxTogglerActive ? 'Active_Upload_Box_Toggler' : ''}`} 
                    onClick={toggleUploadEnvVisibility}
                >
                    Deleted Certificates <img src={AngleDownIcon} alt="Angle Down Icon" />
                </h3>
                <div className="Upload_Conunter">
                    <span>02</span>
                    <p><b>Deleted</b> certificates</p>
                </div>
            </div>

            <div className={`Upload_env_main ${isUploadEnvHidden ? 'Hide_Envi_Box' : ''}`}>

            <div className="Cert_Carti_Sel_Sec">
                        <h3>Training certificate</h3>
                        <div className="Cart_select_Sec">
                        <select value={selectedCategory} onChange={handleChange}>
                            <option value="">Select certificate category</option>
                            <option value="training">Training certificate</option>
                            <option value="inspection">Inspection certificate</option>
                        </select>
                    </div>
                    </div>

                <div className="Table_Sec">
                    <table className="Upload_Table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Certificate number</th>
                                <th>Certificate title</th>
                                <th>Type of Examination / Event</th>
                                <th>Issued to</th>
                                <th>Date of issue</th>
                                <th>Issue number</th>
                                <th>Issued by</th>
                                <th>Status</th>
                                <th>Uploaded Downloaded / E-copy </th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr key="1">
                                <td><span className="serial_Number_span">TR 0001</span></td>
                                <td>00321</td>
                                <td>Website development</td>
                                <td>Welding</td>
                                <td>Prince Godson</td>
                                <td>16th, May 2020</td>
                                <td>038</td>
                                <td>Mr. Daniel</td>
                                <td>
                                    <span className="Status_Respn"><img src={VerifiedIcon} alt="Verified Icon" /> Verified</span>
                                </td>
                                <td>
                                    <div className="Uploaded_Cert_Div">
                                       <button className="deleted_LAbel">Deleted <img src={TrashIcon} alt="Trash Icon" /></button>
                                    </div>
                                </td>
                                <td>
                                    <div className="td_Btns">
                                        <button className="restore_btn">Restore <img src={RestoreIcon}></img></button>
                                        <button>Remove</button>
                                    </div>
                                </td>
                            </tr>


                            <tr key="2">
                            <td><span className="serial_Number_span">TR 0002</span></td>
                                <td>00321</td>
                                <td>Website development</td>
                                <td>Welding</td>
                                <td>Prince Godson</td>
                                <td>16th, May 2020</td>
                                <td>038</td>
                                <td>Mr. Daniel</td>
                                <td>
                                    <span className="Status_Respn"><img src={VerifiedIcon} alt="Verified Icon" /> Verified</span>
                                </td>
                                <td>
                                    <div className="Uploaded_Cert_Div">
                                       <button className="deleted_LAbel">Deleted <img src={TrashIcon} alt="Trash Icon" /></button>
                                    </div>
                                </td>
                                <td>
                                    <div className="td_Btns">
                                        <button className="restore_btn">Restore <img src={RestoreIcon}></img></button>
                                        <button>Remove</button>
                                    </div>
                                </td>
                            </tr>


                          

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
