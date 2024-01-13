import Button from '../../components/Button';
import Form from '../../components/FormApp';
import Input from '../../components/InputApp';
import MyToast from '../../components/MyToast';
import { PStyled } from '../../components/FormApp/styles';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const ForgotPasswordSchema = yup
    .object({
        email: yup
            .string()
            .required('All fields are mandatory.')
            .email('Enter a valid email!')
    })
    .required('All fields are mandatory.');

export default function ForgotPassword() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(ForgotPasswordSchema)
    });
    const { resetPassword } = useAuth();
    const [loading, setLoading] = useState(false);

    async function handleResetPassword({ email }) {
        setLoading(true);

        try {
            await resetPassword(email);

            MyToast(
                'success',
                'Instructions were sent by email!\n Remember to check your spam folder!',
                '#61dafb',
                3400
            );
        } catch (err) {
            console.error(err);

            const errMessage =
                err.code === 'auth/user-not-found'
                    ? 'This email is not registered!'
                    : 'Failed to reset password!';
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
        <Form submitFunction={handleSubmit(handleResetPassword)} formName="Senha">
            <Input name="Email" id="email" registerData={register('email')} type="text" />
            <Button title="Reset" type="submit" disabled={loading} />
            <PStyled>
                Make <Link to="/login">Log in</Link>.
            </PStyled>
        </Form>
    );
}
