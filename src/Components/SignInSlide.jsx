import React, { useState } from 'react';
import { signInWithPopup, RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth, provider } from '../config/firebaseAuth';
import { addUserData } from '../utils/authSlice';
import { useDispatch } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import { Link } from 'react-router-dom';

function SignInSlide({ showSignIn, onClose }) {
    const dispatch = useDispatch();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [verificationId, setVerificationId] = useState(null);
    const [showOtpInput, setShowOtpInput] = useState(false);

    // Function to set up Recaptcha
    const setUpRecaptcha = () => {
        if (!window.recaptchaVerifier) { // Ensure this is called only once
            window.recaptchaVerifier = new RecaptchaVerifier(
                auth,
                'recaptcha-container',
                {
                    size: 'invisible',
                    callback: (response) => {
                        console.log('Recaptcha verified');
                    },
                },
            );
        }
    };

    // Handle Phone Auth - Request OTP
    const handlePhoneAuth = async () => {
        setUpRecaptcha();
        const appVerifier = window.recaptchaVerifier;

        try {
            const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
            setVerificationId(confirmationResult.verificationId);
            setShowOtpInput(true);
        } catch (error) {
            console.error('Error during phone sign-in:', error);
        }
    };

    // Verify OTP
    const verifyOtp = async () => {
        if (!verificationId) return;

        try {
            const credential = PhoneAuthProvider.credential(verificationId, otp);
            const result = await signInWithCredential(auth, credential);
            const userData = {
                name: result.user.displayName || 'Phone User',
                phoneNumber: result.user.phoneNumber,
            };

            dispatch(addUserData(userData));
            onClose(); // Close the sliding div on successful login
        } catch (error) {
            console.error('Error verifying OTP:', error);
        }
    };

    // Handle Google Auth
    async function handleAuth() {
        try {
            let data = await signInWithPopup(auth, provider);
            const userData = {
                name: data.user.displayName,
                photo: data.user.photoURL,
            };

            dispatch(addUserData(userData));
            onClose(); // Close the sliding div on successful login
        } catch (error) {
            console.error("Error during sign-in:", error);
        }
    }

    return (
        <div 
            className={`shadow-2xl fixed top-0 right-0 h-full w-[90%] xl:w-[34%] bg-white transition-transform duration-500 ease-in-out z-50 ${
                showSignIn ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
            <div className='p-4'>
                <button 
                    className='text-black font-bold text-lg' 
                    onClick={onClose} // Close the sliding div
                >
                    <div className='ml-[30px] mt-4'>
                        <RxCross2 size={20} color='gray' />
                    </div>
                </button>

                <div className='mt-4'>
                    <h1 className='text-[28px] font-medium mb-1 leading-[36px] ml-[30px]'>Login</h1>
                    <p className='text-[14px] font-light leading-[17px] ml-[30px]'> or <Link className='text-[#FF5200]'>create an account</Link></p>
                    
                    <div className='ml-[30px] w-[360px] pt-14'>
                        {!showOtpInput ? (
                            <>
                                <input 
                                    type='tel' 
                                    placeholder='Phone number' 
                                    className='w-full h-[72px] border border-[#D4D5D9] pl-6 text-[16px]' 
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                                <div className='pt-6'>
                                    <button 
                                        className='w-full h-[50px] bg-[#FF5200] text-white font-semibold text-[14px] leading-[50px]'
                                        onClick={handlePhoneAuth}
                                    >
                                        REQUEST OTP
                                    </button>
                                    <p className='text-[11px] text-[#686B78] pt-1'>
                                        By clicking on Login, I accept the <Link className='font-medium text-black'>Terms & Conditions </Link> & <Link className='font-medium text-black'>Privacy Policy</Link>
                                    </p>
                                </div>
                            </>
                        ) : (
                            <>
                                <input 
                                    type='text' 
                                    placeholder='Enter OTP' 
                                    className='w-full h-[72px] border border-[#D4D5D9] pl-6 text-[16px]'
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                />
                                <div className='pt-6'>
                                    <button 
                                        className='w-full h-[50px] bg-[#FF5200] text-white font-semibold text-[14px] leading-[50px]'
                                        onClick={verifyOtp}
                                    >
                                        VERIFY OTP
                                    </button>
                                </div>
                            </>
                        )}

                        <div id="recaptcha-container"></div>

                        <div className='py-10 justify-center flex '>
                            <h2 className='text-gray-500 text-[14px]'>---------- or ----------</h2>
                        </div>

                        <button 
                            className=' border bg-[#FF5200] text-white font-semibold text-[14px] leading-[50px] w-full h-[50px]' 
                            onClick={handleAuth}
                        >
                            GOOGLE LOGIN
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignInSlide;
