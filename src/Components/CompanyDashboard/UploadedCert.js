import React, { useState } from "react";
import AngleDownIcon from './Img/angle-down.svg';
import DownloadIcon from './Img/download_icon.svg';
import VerifiedIcon from './Img/verified-badge2.svg';
import ArrowLeft from './Img/arrow-left.svg';
import PhotoIcon from './Img/photo-icon.svg';

export default function UploadedCert() {
    const [isUploadBoxTogglerActive, setIsUploadBoxTogglerActive] = useState(false);
    const [isUploadEnvHidden, setIsUploadEnvHidden] = useState(false);
    const [isCertificateSectionVisible, setIsCertificateSectionVisible] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    const [certificateData, setCertificateData] = useState({
        number: "00321",
        title: "Website development",
        type: "Welding",
        issuedTo: "Prince Godson",
        dateOfIssue: "16th, May 2020",
        issueNumber: "038",
        issuedBy: "Mr. Daniel"
    });

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

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileInput = () => {
        document.getElementById('fileInput').click();
    };

    const handleDragEnter = () => setIsDragging(true);
    const handleDragLeave = () => setIsDragging(false);
    const handleDragOver = (event) => {
        event.preventDefault();
        setIsDragging(true);
    };
    const handleDrop = (event) => {
        event.preventDefault();
        setIsDragging(false);
        const file = event.dataTransfer.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCertificateData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    const [selectedCategory, setSelectedCategory] = useState('');

    const handleChange = (event) => {
        setSelectedCategory(event.target.value);
        // Perform any other actions based on the selected value
    };

    return (
        <div className="Uploaded_Cert_page">
            <section className={`Certificate_Sec ${isCertificateSectionVisible ? 'PopOut_Certificate_Sec' : ''}`}>
                <div className="Certificate_Sec_Main">
                    <div className="site-container">
                        <div className="Top_CC_Mn">
                            <button className="Close_Certificate_Sec" onClick={handleCloseButtonClick}>
                                <img src={ArrowLeft} alt="Arrow Left" />
                            </button>
                        </div>
                        <form className="Main_CC_Mn">
                            <div className="L_CC_Mn">
                                <div className="L_CC_Mn_main">
                                    <h3>Upload certificate</h3>
                                    <div className="Certificate_Form">
                                        <div className="Cert_Form_input">
                                            <input
                                                type="text"
                                                name="number"
                                                value={certificateData.number}
                                                onChange={handleInputChange}
                                                placeholder="Certificate number"
                                            />
                                        </div>
                                        <div className="Cert_Form_input">
                                            <input
                                                type="text"
                                                name="title"
                                                value={certificateData.title}
                                                onChange={handleInputChange}
                                                placeholder="Certificate title"
                                            />
                                        </div>
                                        <div className="Cert_Form_input">
                                            <input
                                                type="text"
                                                name="type"
                                                value={certificateData.type}
                                                onChange={handleInputChange}
                                                placeholder="Type of examination / Event (optional)"
                                            />
                                        </div>
                                        <div className="Cert_Form_input">
                                            <input
                                                type="text"
                                                name="issuedTo"
                                                value={certificateData.issuedTo}
                                                onChange={handleInputChange}
                                                placeholder="Issue to"
                                            />
                                        </div>
                                        <div className="Cert_Form_input">
                                            <input
                                                type="text"
                                                name="dateOfIssue"
                                                value={certificateData.dateOfIssue}
                                                onChange={handleInputChange}
                                                placeholder="Date of issue"
                                            />
                                        </div>
                                        <div className="Cert_Form_input">
                                            <input
                                                type="text"
                                                name="issueNumber"
                                                value={certificateData.issueNumber}
                                                onChange={handleInputChange}
                                                placeholder="Issue number"
                                            />
                                        </div>
                                        <div className="Cert_Form_input">
                                            <input
                                                type="text"
                                                name="issuedBy"
                                                value={certificateData.issuedBy}
                                                onChange={handleInputChange}
                                                placeholder="Issued by"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="R_CC_Mn">
                                <div className="R_CC_Mn_Main">
                                <h4>Upload file (optional)</h4>
                                    <p>
                                        <b>Note:</b> File uploaded won't be displayed on user portal and it’s totally
                                        optional. If you don’t want to upload a file click on the submit button to
                                        continue.
                                    </p>

                                    <div 
                                        className={`Image_Upload_div ${isDragging ? 'dragging' : ''}`} 
                                        onClick={triggerFileInput}
                                        onDrop={handleDrop}
                                        onDragOver={handleDragOver}
                                        onDragEnter={handleDragEnter}
                                        onDragLeave={handleDragLeave}
                                    >
                                        {imagePreview ? (
                                            <img src={imagePreview} alt="Preview" className="uploadedImage" />
                                        ) : (
                                            <>
                                                <img src={PhotoIcon} className="photo_Icon" alt="Photo Icon" />
                                                <span>Drag and drop file (pdf, Jpeg, PNG)</span>
                                            </>
                                        )}
                                    </div>
                                    <input
                                        type="file"
                                        id="fileInput"
                                        style={{ display: 'none' }}
                                        onChange={handleImageUpload}
                                    />

                                    <div className="Submit_Sec">
                                        <button type="submit">Save changes</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            <div className="ToP_Upload_env">
                <h3 
                    className={`Upload_Box_Toggler ${isUploadBoxTogglerActive ? 'Active_Upload_Box_Toggler' : ''}`} 
                    onClick={toggleUploadEnvVisibility}
                >
                    Uploaded Certificates <img src={AngleDownIcon} alt="Angle Down Icon" />
                </h3>
                <div className="Upload_Conunter">
                    <span>90</span>
                    <p><b>Uploaded</b> certificates</p>
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
                                       <button>Download <img src={DownloadIcon} alt="Download Icon" /></button>
                                    </div>
                                </td>
                                <td>
                                    <div className="td_Btns">
                                        <button onClick={handlePreviewButtonClick}>Preview</button>
                                        <button>Delete</button>
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
                                    Not uploaded
                                </td>
                                <td>
                                    <div className="td_Btns">
                                        <button onClick={handlePreviewButtonClick}>Preview</button>
                                        <button>Delete</button>
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
