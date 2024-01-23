import Button from '../../components/ButtonApp';
import Form from '../../components/FormApp';
import Input from '../../components/InputApp';
import MyToast from '../../components/MyToast';
import { PStyled } from '../../components/FormApp/styles';

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const registerSchema = yup
    .object({
        email: yup
            .string()
            .required('All fields are mandatory.!')
            .email('Enter a valid email!'),
        password: yup
            .string()
            .required('All fields are mandatory.!')
            .min(6, 'Password most have more than 6 characters!'),
        passwordConfirmation: yup
            .string()
            .required('All fields are mandatory.!')
            .oneOf([yup.ref('password')], 'The passwords must be the same!')
    })
    .required('All fields are mandatory.s!');

export default function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(registerSchema)
    });
    const { signUp } = useAuth();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSignUp({ email, password }) {
        setLoading(true);

        try {
            await signUp(email, password);

            MyToast('success', 'Account created successfully!', '#61dafb');

            setTimeout(() => {
                navigate('/home-private');
            }, 1000);
        } catch (err) {
            console.error(err);

            const errMessage =
                err.code === 'auth/email-already-in-use'
                    ? 'This email is already registered!'
                    : 'Failed to create the account!';
            MyToast('error', errMessage, '#a00000');
        } finally {
            setLoading(false);
            return;
        }
    }

    useEffect(() => {
        const errMessage = Object.entries(errors)[0]?.[1]?.message;
        if (errMessage) MyToast('error', errMessage, '#a00000');
    }, [errors]);

    return (
        <Form submitFunction={handleSubmit(handleSignUp)} formName="SignUp">
            <Input name="Email" id="email" registerData={register('email')} type="text" />
            <Input
                name="Password"
                id="password"
                registerData={register('password')}
                type="password"
            />
            <Input
                name="Confirm Password"
                id="passwordConfirmation"
                registerData={register('passwordConfirmation')}
                type="password"
            />
            <Button title="Register" type="submit" disabled={loading} />
            <PStyled>
            Already have an account? <Link to="/login"> Log in</Link>.
            </PStyled>
           
        </Form>
        
    );
}
