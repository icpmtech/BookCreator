import Button from '../../components/Button';
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

const loginSchema = yup
    .object({
        email: yup
            .string()
            .required('Required!')
            .email('Digite um email válido!'),
        password: yup
            .string()
            .required('Required!')
            .min(6, 'The password need 6 characters!')
    })
    .required('All rows are manadatories!');

export default function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(loginSchema)
    });
    const { logIn } = useAuth();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleLogIn({ email, password }) {
        setLoading(true);

        try {
            await logIn(email, password);

            MyToast('success', 'Sign In With Success!', '#61dafb');

            setTimeout(() => {
                navigate('/home-private');
            }, 1000);
        } catch (err) {
            console.error(err);

            let errMessage = '';
            switch (err.code) {
                case 'auth/wrong-password':
                    errMessage = 'Wrong Password!';
                    break;

                case 'auth/user-not-found':
                    errMessage = 'User Not Found!';
                    break;

                default:
                    errMessage = 'Error in Sign In!';
                    break;
            }
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
        <Form submitFunction={handleSubmit(handleLogIn)} formName="SignIn">
            <Input name="Email" id="email" registerData={register('email')} type="text" />
            <Input
                name="Password"
                id="password"
                registerData={register('password')}
                type="password"
            />
            <Button title="LogIn" type="submit" disabled={loading} />
            <br></br>
            <Link to="/forgot-password">Forgot Password?</Link>
            <PStyled>
                Need an account? <Link to="/register">Make your Register</Link>.
            </PStyled>
        </Form>
    );
}
