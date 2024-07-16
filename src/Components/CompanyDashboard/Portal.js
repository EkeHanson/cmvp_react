import React, { useState } from "react";
import './Css/Dash.css';

import CopyIcon from './Img/copyicon.svg';
import AngleDownIcon from './Img/angle-down.svg';
import ArrowRightLit from './Img/arrow-right-lit.svg';
import DropArrow1 from './Img/droparrow1.svg';
import DropArrow2 from './Img/droparrow2.svg';
import ArrowLeft from './Img/arrow-left.svg';
import PhotoIcon from './Img/photo-icon.svg';

export default function PortalPage() {
    const [copyMessage, setCopyMessage] = useState('Copy verification Url');
    const [imagePreview, setImagePreview] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isCertificateSectionVisible, setIsCertificateSectionVisible] = useState(false);
    const [isUploadEnvHidden, setIsUploadEnvHidden] = useState(false);
    const [isUploadBoxTogglerActive, setIsUploadBoxTogglerActive] = useState(false);
    const [isAddCertCartiVisible, setIsAddCertCartiVisible] = useState(false); // State for visibility of Add_Cert_Carti
    const [categoryName, setCategoryName] = useState('');

    const handleCopy = () => {
        const copyText = document.getElementById("portalUrl");
        copyText.select();
        document.execCommand("copy");

        // Temporarily change the text to "Copied!"
        setCopyMessage('Copied!');
        setTimeout(() => setCopyMessage('Copy portal Url'), 2000); // Revert back after 2 seconds
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

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDragEnter = () => {
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const triggerFileInput = () => {
        document.getElementById('fileInput').click();
    };

    const handleUploadButtonClick = () => {
        setIsCertificateSectionVisible(true);
    };

    const handleCloseButtonClick = () => {
        setIsCertificateSectionVisible(false);
    };

    const toggleUploadEnvVisibility = () => {
        setIsUploadEnvHidden(!isUploadEnvHidden);
        setIsUploadBoxTogglerActive(!isUploadBoxTogglerActive);
    };

    const handleChange = (event) => {
        setCategoryName(event.target.value);
        // Perform any other actions based on the selected value
    };

    const showAddCertCarti = () => {
        setIsAddCertCartiVisible(true);
    };

    const hideAddCertCarti = () => {
        setIsAddCertCartiVisible(false);
        setCategoryName(''); // Clear the input field value
    };

    return (
        <div className="PortalPage">
            <section className={`Certificate_Sec ${isCertificateSectionVisible ? 'PopOut_Certificate_Sec' : ''}`}>
                <div className={`Add_Cert_Carti ${isAddCertCartiVisible ? 'Active_Add_Cert_Carti' : ''}`}>
                    <div className="site-container">
                        <div className="Add_Cert_Carti_box">
                            <div className="Add_CCt_Input">
                                <input
                                    type="text"
                                    name=""
                                    placeholder="Enter cartegory name"
                                    value={categoryName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="Add_CCt_btns">
                                <button className="Add_Cert_Certegory" onClick={showAddCertCarti}>
                                    Add cartegory
                                </button>
                                <button className="Close_Cert_Certegory" onClick={hideAddCertCarti}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="Certificate_Sec_Main">
                    <div className="site-container">
                        <div className="Top_CC_Mn">
                            <button className="Close_Certificate_Sec" onClick={handleCloseButtonClick}>
                                <img src={ArrowLeft} alt="Arrow Left"></img>
                            </button>
                        </div>
                        <form className="Main_CC_Mn">
                            <div className="L_CC_Mn">
                                <div className="L_CC_Mn_main">
                                    <h3>Upload certificate</h3>
                                    <div className="Certificate_Form">
                                        <div className="Cert_Form_input Cert_Form_input_Selct">
                                            <select value={categoryName} onChange={handleChange}>
                                                <option value="">Select certificate category</option>
                                                <option value="training">Training certificate</option>
                                                <option value="inspection">Inspection certificate</option>
                                            </select>
                                            <div className="Add_Cart_Btn" onClick={showAddCertCarti}>
                                                Add cartegory
                                            </div>
                                        </div>
                                        <div className="Cert_Form_input">
                                            <input type="text" name="" placeholder="Certificate number"></input>
                                        </div>
                                        <div className="Cert_Form_input">
                                            <input type="text" name="" placeholder="Certificate title"></input>
                                        </div>
                                        <div className="Cert_Form_input">
                                            <input
                                                type="text"
                                                name=""
                                                placeholder="Type of examination / Event (optional)"
                                            ></input>
                                        </div>
                                        <div className="Cert_Form_input">
                                            <input type="text" name="" placeholder="Issue to"></input>
                                        </div>
                                        <div className="Cert_Form_input">
                                            <input type="text" name="" placeholder="Date of issue"></input>
                                        </div>
                                        <div className="Cert_Form_input">
                                            <input type="text" name="" placeholder="Issue number"></input>
                                        </div>
                                        <div className="Cert_Form_input">
                                            <input type="text" name="" placeholder="Issued by"></input>
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
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="uploadedImage"
                                            />
                                        ) : (
                                            <>
                                                <img
                                                    src={PhotoIcon}
                                                    className="photo_Icon"
                                                    alt="Photo Icon"
                                                />
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
                                        <button type="submit">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            <div className="Copy_Url_Sec">
                <div className="Copy_Url_box" onClick={handleCopy}>
                    <div className="Copy_Url_box_Main">
                        <h3>{copyMessage}</h3>
                        <input
                            id="portalUrl"
                            type="text"
                            value="https://cmvp.net/cenglobalservices"
                            readOnly
                        />
                    </div>
                    <button className="Copy_Url_Btn">
                        <img src={CopyIcon} alt="Copy Icon" />
                    </button>
                </div>
            </div>

            <div className="Main_Port_Sec">
                <div className="site-container">
                    <div className="Port_into">
                        <h4>Hi 👋 ABC Company</h4>
                        <h2>Welcome to your CMVP Portal</h2>
                        <p>
                            This portal enables you to verify all your certificates just by uploading them.
                        </p>
                    </div>

                    <div className="ToP_Upload_env">
                        <h3
                            className={`Upload_Box_Toggler ${
                                isUploadBoxTogglerActive ? 'Active_Upload_Box_Toggler' : ''
                            }`}
                            onClick={toggleUploadEnvVisibility}
                        >
                            Upload <img src={AngleDownIcon} alt="Angle Down Icon" />
                        </h3>
                        <div className="Upload_Conunter">
                            <span>0%</span>
                            <p>
                                You can only upload <b>50</b> certificates a day
                            </p>
                        </div>
                    </div>

                    <div className={`Upload_env_main ${isUploadEnvHidden ? 'Hide_Envi_Box' : ''}`}>
                        <button className="CertUpload_Btn" onClick={handleUploadButtonClick}>
                            Upload Certificate <img src={ArrowRightLit} alt="Arrow Right" />
                        </button>

                        <div className="Upload_env_main_Foot">
                            <p>
                                20 uploaded <img src={DropArrow1} alt="Drop Arrow 1" />
                            </p>
                            <p>
                                5 deleted <img src={DropArrow2} alt="Drop Arrow 2" />
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
