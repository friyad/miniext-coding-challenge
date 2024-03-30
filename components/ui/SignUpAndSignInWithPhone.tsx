/* eslint-disable @next/next/no-img-element */
import { RecaptchaVerifier } from 'firebase/auth';
import { firebaseAuth } from '@/components/firebase/firebaseAuth';
import { useEffect, useState } from 'react';
import Modal from '@/components/ui/Modal';
import { useRouter } from 'next/navigation';
import ToastBox from '@/components/ui/ToastBox';
import { useAppDispatch } from '@/components/redux/store';
import { showToast } from '@/components/redux/toast/toastSlice';
import Input from '@/components/ui/Input';
import LoadingButton from '@/components/ui/LoadingButton';
import { useAuth, useGetAuth } from '../useAuth';
import { LoadingStateTypes } from '../redux/types';
import {
    signInWithPhone,
    useSignInWithPhoneLoading,
    useVerifySignInWithPhoneLoading,
    verifySignInWithPhone,
} from '../redux/auth/verifyPhoneNumber';

const SignUpAndSignInWithPhone = () => {
    const dispatch = useAppDispatch();
    const auth = useAuth();
    const authInstance = useGetAuth();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [OTPCode, setOTPCode] = useState('');
    const [disableSubmit, setDisableSubmit] = useState(true);
    const [show, setShow] = useState(false);

    const signInLoading = useSignInWithPhoneLoading();
    const verifyLoading = useVerifySignInWithPhoneLoading();

    const [recaptcha, setRecaptcha] = useState<RecaptchaVerifier | null>(null);
    const [recaptchaResolved, setRecaptchaResolved] = useState(false);
    const [verificationId, setVerificationId] = useState('');
    const router = useRouter();

    // Validate Submit Button
    useEffect(() => {
        if (phoneNumber.slice() === '' || phoneNumber.length < 10) {
            setDisableSubmit(true);
        } else {
            setDisableSubmit(false);
        }
    }, [phoneNumber]);

    // Sending OTP and storing id to verify it later
    const handleSendVerification = async () => {
        // this checks if the auth object is loaded
        if (authInstance.type !== LoadingStateTypes.LOADED) return;

        dispatch(
            signInWithPhone({
                phoneNumber,
                authInstance,
                recaptcha,
                recaptchaResolved,
                callback: (result) => {
                    if (result.type === 'error') {
                        setRecaptchaResolved(false);
                        return;
                    }
                    setVerificationId(result.verificationId);
                    setShow(true);
                },
            })
        );
    };

    // Validating the filled OTP by user
    const ValidateOtp = async () => {
        if (authInstance.type !== LoadingStateTypes.LOADED) return;
        dispatch(
            verifySignInWithPhone({
                auth,
                authInstance,
                OTPCode,
                verificationId,
                callback: (result) => {
                    if (result.type === 'error') {
                        return;
                    }
                    // needed to reload auth user
                    router.refresh();
                },
            })
        );
    };


    // generating the recaptcha on page render
    useEffect(() => {
        const captcha = new RecaptchaVerifier(firebaseAuth, 'recaptcha-container', {
            size: 'normal',
            callback: () => {
                setRecaptchaResolved(true);
            },

            'expired-callback': () => {
                setRecaptchaResolved(false);
                dispatch(
                    showToast({
                        message: 'Recaptcha Expired, please verify it again',
                        type: 'info',
                    })
                );
            },
        });

        captcha.render();

        setRecaptcha(captcha);
    }, []);

    return (
        <div className="flex items-center justify-center">
            <div className="w-full">
              <div className="w-full">
                <div className="flex pb-4 gap-4 flex-col">
                    <Input
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="Phone number"
                        type="text"
                        required
                    />
                    <LoadingButton
                        onClick={handleSendVerification}
                        loading={signInLoading}
                        disabled={disableSubmit || signInLoading}
                        loadingText="Sending OTP..."
                    >
                        Send OTP
                    </LoadingButton>
                </div>
                <div id="recaptcha-container" /> 
                    
                   <Modal show={show} setShow={setShow}>
                        <div className="w-fit bg-white py-3 rounded-lg">
                            <h2 className="text-lg font-semibold text-center mb-10">
                                Enter Code to Verify
                            </h2>
                            <div className="px-4 flex items-center gap-4 pb-10">
                                <Input
                                    value={OTPCode}
                                    type="text"
                                    placeholder="Enter your OTP"
                                    onChange={(e) => setOTPCode(e.target.value)}
                                />
                                <LoadingButton
                                    onClick={ValidateOtp}
                                    loading={verifyLoading}
                                    disabled={disableSubmit || verifyLoading}
                                    loadingText="Verifying..."
                                >
                                    Verify
                                </LoadingButton>
                            </div>
                        </div>
                   </Modal>
                </div>
            </div>
            <ToastBox />
        </div>
    );
};

export default SignUpAndSignInWithPhone;
