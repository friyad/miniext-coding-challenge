import { useCallback, useEffect, useState } from 'react';
import { isEmail } from 'validator';
import SignUpAndSignInWithPhone from '@/components/ui/SignUpAndSignInWithPhone';
import Input from '@/components/ui/Input';
import { useAppDispatch } from '@/components/redux/store';
import LoadingButton from '@/components/ui/LoadingButton';
import LoginWithGoogleButton from '@/components/ui/LoginWithGoogleButton';
import { loginWithEmail, useIsLoginWithEmailLoading } from '@/components/redux/auth/loginWithEmail';
import ToastBox from '@/components/ui/ToastBox';
import Link from 'next/link';

const signup = () => {
    const dispatch = useAppDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [disableSubmit, setDisableSubmit] = useState(true);
    const isLoading = useIsLoginWithEmailLoading();

    useEffect(() => {
        if (isEmail(email) && password.length >= 6) {
            setDisableSubmit(false);
        } else {
            setDisableSubmit(true);
        }
    }, [email, password]);

    // Signup with email and password and redirecting to home page
    const signUpWithEmail = useCallback(async () => {
        // verify the user email before signup
        dispatch(
            loginWithEmail({
                type: 'sign-up',
                email,
                password,
            })
        );

        /* if (credentials.user.emailVerified === false) {
                await sendEmailVerification(credentials.user);

                dispatch(
                    showToast({
                        message: 'Verification Email has been sent to your Email',
                        type: 'success',
                    })
                );
            } */

        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [email, password, dispatch]);

    return (
        <div className="flex items-center justify-center min-h-full px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <img
                        className="w-auto h-12 mx-auto"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                        alt="Workflow"
                    />
                    <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
                        Create a new account
                    </h2>
                </div>

                <div className="px-4 flex p-4 pb-10 gap-4 flex-col shadow-lg">
                    <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        name="email"
                        type="text"
                    />
                    <Input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        name="password"
                        type="password"
                    />
                    <LoadingButton
                        onClick={signUpWithEmail}
                        disabled={disableSubmit}
                        loading={isLoading}
                    >
                        Sign Up
                    </LoadingButton>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-2 text-gray-500">Or login with</span>
                        </div>
                    </div>
                    <SignUpAndSignInWithPhone />
                    
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-2 text-gray-500">Or sign up with</span>
                        </div>
                    </div>
                    <div className="mt-2 grid grid-cols-1 gap-3">
                        <LoginWithGoogleButton />
                    </div>

                      <div className="mt-6">
                            <div className="flex justify-center">
                                <div className="relative flex justify-center text-sm">
                                    <div className="font-small text-black-400">
                                        Already have an account?
                                    </div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <Link
                                        href="/login"
                                        // onClick={() => setshowRegistration(true)}
                                        className="ml-2 cursor-pointer font-medium text-violet-600 hover:text-violet-400"
                                    >
                                        Log In
                                    </Link>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
            <ToastBox />
        </div>
    );
};

export default signup;