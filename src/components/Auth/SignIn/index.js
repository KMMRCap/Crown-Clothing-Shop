import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import CustomButton from '../../../common/CustomButton';
import FormField from '../../../common/FormField';
import './sign-in.scss'
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInWithEmail, signInWithGoogle } from '../../../redux-toolkit/user/userSlice';

const SignIn = () => {

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()

    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const handleGoogleSignIn = () => {
        setLoading(true)
        dispatch(signInWithGoogle()).then(res => {
            if (user.currentUser?.id) {
                setTimeout(() => {
                    navigate('/')
                }, 1000)
            }
            else {
                toast.error(user.error?.message, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setLoading(false)
            }
        }).catch(err => console.log(err))
    }

    return (
        <div className='sign-in'>
            <h2>Already have an account ?</h2>
            <span>Sign in with your email and password</span>
            <Formik
                initialValues={{
                    email: '',
                    password: ''
                }}

                validate={values => {
                    const errors = {};

                    if (!values.email) {
                        errors.email = 'Required';
                    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                        errors.email = 'Wrong Email';
                    }

                    if (!values.password) {
                        errors.password = 'Required';
                    } else if (values.password.length < 6) {
                        errors.password = 'Min : 6';
                    }

                    return errors;
                }}

                onSubmit={(values, { resetForm }) => {
                    setLoading(true)
                    dispatch(signInWithEmail(values)).then(res => {
                        if (user.currentUser?.id) {
                            resetForm()
                            setTimeout(() => {
                                navigate('/')
                            }, 1000)
                        }
                        else {
                            toast.error(user.error?.message, {
                                position: "top-right",
                                autoClose: 2000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });
                        }
                        setLoading(false)
                    }).catch(err => console.log(err))
                }}
            >
                <Form>
                    <FormField
                        name="email"
                        type="email"
                        label='Email'
                        required
                    />
                    <FormField
                        name="password"
                        type="password"
                        label='Password'
                        required
                    />
                    <div className='button-wrapper'>
                        <CustomButton
                            type='submit'
                            disabled={loading ? true : false}
                        >
                            Sign In
                        </CustomButton>
                        <CustomButton
                            type='button'
                            onClick={handleGoogleSignIn}
                            googleSignIn
                            disabled={loading ? true : false}
                        >
                            Sign In With Google
                        </CustomButton>
                    </div>
                </Form>
            </Formik>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div >
    );
}

export default SignIn;