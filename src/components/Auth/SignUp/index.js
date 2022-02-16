import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import CustomButton from '../../../common/CustomButton'
import FormField from '../../../common/FormField'
import './sign-up.scss'
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from '../../../redux-toolkit/user/userSlice';

const SignUp = () => {

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()

    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    return (
        <div className='sign-up'>
            <h2 className='title'>Don't have an account ?</h2>
            <span>Sign up here</span>
            <Formik
                initialValues={{
                    displayName: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                }}

                validate={values => {
                    const errors = {};

                    if (!values.displayName) {
                        errors.displayName = 'Required';
                    } else if (values.displayName.match(/\d+/g)) {
                        errors.displayName = 'Should be a text'
                    }

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

                    if (!values.confirmPassword) {
                        errors.confirmPassword = 'Required';
                    } else if (values.confirmPassword !== values.password) {
                        errors.confirmPassword = 'Not the same';
                    }

                    return errors;
                }}

                onSubmit={async (values, { resetForm }) => {
                    setLoading(true)
                    dispatch(signUp(values)).then(res => {
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
                            setLoading(false)
                        }
                    }).catch(err => console.log(err))
                }}
            >
                <Form className='sign-up-form'>
                    <FormField
                        name="displayName"
                        type="text"
                        label='Name'
                        required
                    />
                    <FormField
                        name="email"
                        type="email"
                        label='Email'
                        required
                    />
                    <FormField
                        name="password"
                        type="password"
                        label='password'
                        required
                    />
                    <FormField
                        name="confirmPassword"
                        type="password"
                        label='Confirm Password'
                        required
                    />
                    <div className='button-wrapper'>
                        <CustomButton
                            type='submit'
                            disabled={loading ? true : false}
                        >Sign Up</CustomButton>
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
        </div>
    );
}

export default SignUp;