import React, { useState, useEffect } from "react";
import './Css/Dash.css';
import userImg from './Img/user-img.jpg';
import CopyIcon from './Img/copyicon.svg';
import PhotoEditIcon from './Img/edit_icon.svg';
import AngleDownIcon from './Img/angle-down.svg';
import SERVER_HOSTNAME from '../../config';

export default function Profile() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [city, setCity] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [imgSrc, setImgSrc] = useState(userImg);
    const [file, setFile] = useState(null); // Store the selected file
    const [copyMessage, setCopyMessage] = useState('Copy verification Url');
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const [flashMessage, setFlashMessage] = useState({ text: "", type: "" }); // Flash message state

    // Fetch user data when the component mounts
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`${SERVER_HOSTNAME}/user/create/1/`); // Adjust the endpoint as needed
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const userData = await response.json();
                setFirstName(userData.firstName);
                setLastName(userData.lastName);
                setEmail(userData.email);
                setPhone(userData.phone);
                setCity(userData.city);
                setImgSrc(`${SERVER_HOSTNAME}/${userData.image}`); // Set the full image URL
                // Set other fields as needed
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImgSrc(e.target.result);
            };
            reader.readAsDataURL(selectedFile);
            setFile(selectedFile); // Save the file to state
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true); // Start loading

        const updatedData = new FormData();
        updatedData.append('firstName', firstName);
        updatedData.append('lastName', lastName);
        updatedData.append('email', email);
        updatedData.append('phone', phone);
        updatedData.append('city', city);
        updatedData.append('oldPassword', oldPassword);
        updatedData.append('newPassword', newPassword);
        
        if (file) {
            updatedData.append('image', file); // Append the file
        }

        try {
            const response = await fetch(`${SERVER_HOSTNAME}/user/create/1/`, {
                method: 'PATCH',
                body: updatedData,
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            // console.log('Profile updated successfully:', result);
            
            // Set success flash message
            setFlashMessage({ text: 'Profile updated successfully', type: 'success' });

        } catch (error) {
            console.error('Error updating profile:', error);
            // Set error flash message
            setFlashMessage({ text: 'Error updating profile. Please try again.', type: 'error' });

        } finally {
            setIsLoading(false); // Stop loading
        }
    };

    const handleCopy = () => {
        const copyText = document.getElementById("portalUrl");
        copyText.select();
        document.execCommand("copy");

        setCopyMessage('Copied!');
        setTimeout(() => setCopyMessage('Copy portal Url'), 2000);
    };

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

    // Function to clear flash message after a timeout
    useEffect(() => {
        if (flashMessage.text !== '') {
            const timeout = setTimeout(() => {
                setFlashMessage({ text: '', type: '' });
            }, 5000); // Adjust timeout as needed (5 seconds here)
            return () => clearTimeout(timeout);
        }
    }, [flashMessage]);

    return (
        <div className="profile-Sec">
            {/* Flash message */}
            {flashMessage.text && (
                <div className={`flash-message ${flashMessage.type}`}>
                    {flashMessage.text}
                </div>
            )}

            <div className="ToP_Upload_env">
                <h3
                    className={`Upload_Box_Toggler ${isUploadBoxTogglerActive ? 'Active_Upload_Box_Toggler' : ''}`}
                    onClick={toggleUploadEnvVisibility}
                >
                    Portal profile<img src={AngleDownIcon} alt="Angle Down Icon" />
                </h3>
                <div className="Upload_Conunter">
                    <span>50%</span>
                    <p><b>Portal</b> usage</p>
                </div>
            </div>

            <div className={`Upload_env_main ${isUploadEnvHidden ? 'Hide_Envi_Box' : ''}`}>
                <div className="OnglS_sec">
                    <div className="top-dash">
                        <div className="top-dash-1">
                            <div className="top-dash-1-main">
                                <input type="file" id="file-upload" onChange={handleFileChange} style={{ display: 'none' }} />
                                <label htmlFor="file-upload" className="user-img">
                                    <img src={imgSrc} alt="User111222" id="img-display" />
                                    <span><img src={PhotoEditIcon}></img></span>
                                </label>
                                <div className="user-details">
                                    <h4>Company ABC Portal Profile</h4>
                                    <div className="Copy_Url_Sec">
                                        <div className="Copy_Url_box" onClick={handleCopy}>
                                            <div className="Copy_Url_box_Main">
                                                <h3>{copyMessage}</h3>
                                                <input id="portalUrl" type="text" value="https://cmvp.net/cenglobalservices" readOnly />
                                            </div>
                                            <button className="Copy_Url_Btn">
                                                <img src={CopyIcon} alt="Copy Icon" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="top-dash-2">
                            <div className="top-dash-2-main top-dash-2-main-1 active-top-dash-2-main">
                                <div className="form-header">
                                    <h3>Portal profile Settings</h3>
                                </div>
                                <form className="site-form" onSubmit={handleSubmit}>
                                    <div className="d-grid">
                                        <div className="form-input">
                                            <p>First Name</p>
                                            <input
                                                type="text"
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                            />
                                        </div>
                                        <div className="form-input">
                                            <p>Last Name</p>
                                            <input
                                                type="text"
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-input">
                                        <p>Email Address</p>
                                        <input
                                            type="text"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-input">
                                        <p>Phone Number</p>
                                        <input
                                            type="text"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-input">
                                        <p>City</p>
                                        <input
                                            type="text"
                                            placeholder="Enter your city"
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                        />
                                    </div>
                                    {/* <div className="form-input">
                                        <h3>Password reset</h3>
                                    </div>
                                    <div className="form-input">
                                        <p>Old Password</p>
                                        <input
                                            type="password"
                                            placeholder="Enter old password"
                                            value={oldPassword}
                                            onChange={(e) => setOldPassword(e.target.value)}
                                        />
                                    </div> */}
                                    {/* <div className="form-input">
                                        <p>New Password</p>
                                        <input
                                            type="password"
                                            placeholder="Enter new password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                        />
                                    </div> */}
                                    <div className="form-input">
                                        <button type="submit" className="profile_submit_btn">
                                            {isLoading ? 'Updating...' : 'Save Profile'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
