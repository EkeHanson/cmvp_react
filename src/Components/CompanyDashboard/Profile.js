import React, { useState, useEffect } from "react";
import './Css/Dash.css';
import userImg from './Img/user-img.jpg';
import CopyIcon from './Img/copyicon.svg';
import PhotoEditIcon from './Img/edit_icon.svg';
import AngleDownIcon from './Img/angle-down.svg';
import SERVER_HOSTNAME from '../../config';
import axios from 'axios';

const Profile = () => {
    const [firstName, setFirstName] = useState("Prince");
    const [lastName, setLastName] = useState("Godson");
    const [email, setEmail] = useState("princegodson24@gmail.com");
    const [phone, setPhone] = useState("09037494084");
    const [city, setCity] = useState("");
    const [yearIncorporated, setYearIncorporated] = useState("");
    const [registrationNumber, setRegistrationNumber] = useState("");
    const [nationality, setNationality] = useState("");
    const [staffNumber, setStaffNumber] = useState("");
    const [address, setAddress] = useState("");
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [imgSrc, setImgSrc] = useState(userImg);
    const [copyMessage, setCopyMessage] = useState('Copy portal Url');
    const [isUploadBoxTogglerActive, setIsUploadBoxTogglerActive] = useState(false);
    const [isUploadEnvHidden, setIsUploadEnvHidden] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${SERVER_HOSTNAME}/user/create/1/`);
                const userData = response.data;
                setFirstName(userData.first_name);
                setLastName(userData.last_name);
                setEmail(userData.email);
                setPhone(userData.phone);
                setCity(userData.city);
                setImgSrc(`${SERVER_HOSTNAME}/${userData.image}`); // Adjust as per your endpoint
                // Set other fields as needed
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImgSrc(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic
        console.log({
            firstName,
            lastName,
            email,
            phone,
            city,
            yearIncorporated,
            registrationNumber,
            nationality,
            staffNumber,
            address,
            country,
            state
        });
    };

    const handleCopy = () => {
        const copyText = document.getElementById("portalUrl");
        copyText.select();
        document.execCommand("copy");

        setCopyMessage('Copied!');
        setTimeout(() => setCopyMessage('Copy portal Url'), 2000);
    };

    const toggleUploadEnvVisibility = () => {
        setIsUploadEnvHidden(!isUploadEnvHidden);
        setIsUploadBoxTogglerActive(!isUploadBoxTogglerActive);
    };

    return (
        <div className="profile-Sec">
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
                                    <img src={imgSrc} alt="User" id="img-display" />
                                    <span><img src={PhotoEditIcon} alt="Edit Icon" /></span>
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
                                            <p>Company Name</p>
                                            <input
                                                type="text"
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                            />
                                        </div>
                                        <div className="form-input">
                                            <p>Business type</p>
                                            <input
                                                type="text"
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-input">
                                        <p>Contact Person's First name</p>
                                        <input
                                            type="text"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-input">
                                        <p>Contact Person's Last Name</p>
                                        <input
                                            type="text"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-input">
                                        <p>Contact Person's Telephone</p>
                                        <input
                                            type="text"
                                            placeholder="Enter Company Address"
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-input">
                                        <p>Year Incorporated</p>
                                        <input
                                            type="text"
                                            placeholder="Enter Year Incorporated"
                                            value={yearIncorporated}
                                            onChange={(e) => setYearIncorporated(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-input">
                                        <p>Registration Number</p>
                                        <input
                                            type="text"
                                            placeholder="Enter Registration Number"
                                            value={registrationNumber}
                                            onChange={(e) => setRegistrationNumber(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-input">
                                        <p>Nationality</p>
                                        <input
                                            type="text"
                                            placeholder="Enter Nationality"
                                            value={nationality}
                                            onChange={(e) => setNationality(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-input">
                                        <p>No. of Staff</p>
                                        <input
                                            type="text"
                                            placeholder="Enter Number of Staff"
                                            value={staffNumber}
                                            onChange={(e) => setStaffNumber(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-input">
                                        <p>City Address</p>
                                        <input
                                            type="text"
                                            placeholder="Enter City Address"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-input">
                                        <p>Select Country</p>
                                        <select value={country} onChange={(e) => setCountry(e.target.value)}>
                                            <option value="">Select Country</option>
                                            <option value="Nigeria">Nigeria</option>
                                            <option value="USA">USA</option>
                                            <option value="UK">UK</option>
                                            {/* Add more countries as needed */}
                                        </select>
                                    </div>
                                    <div className="form-input">
                                        <p>Select State</p>
                                        <select value={state} onChange={(e) => setState(e.target.value)}>
                                            <option value="">Select State</option>
                                            <option value="Lagos">Lagos</option>
                                            <option value="California">California</option>
                                            <option value="London">London</option>
                                            {/* Add more states as needed */}
                                        </select>
                                    </div>
                                    <div className="form-input">
                                        <button type="submit" className="profile_submit_btn">Save Profile</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
