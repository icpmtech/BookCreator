import Button from '../../components/Button';
import Form from '../../components/Form';
import Input from '../../components/Input';
import MyToast from '../../components/MyToast';
import { PStyled } from '../../components/Form/styles';

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';

import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const updateSchema = yup.object({
    newEmail: yup.string().notRequired().nullable().email('Enter a valid email!'),
    newPassword: yup
        .string()
        .notRequired()
        .nullable()
        .min(6, 'The password must have at least 6 characters!'),
    newPasswordConfirmation: yup
        .string()
        .notRequired()
        .nullable()
        .oneOf([yup.ref('newPassword')], 'As senhas devem ser iguais!')
});

export default function UpdateProfile() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const { currentUser, updateEmail, updatePassword } = useAuth();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    function handleUpdate({ newEmail, newPassword, newPasswordConfirmation }) {
        if (!newEmail && !newPassword && !newPasswordConfirmation) {
            MyToast('error', 'Update the password or email!', '#a00000');
            return;
        }

        if (newEmail === currentUser.email) {
            MyToast('error', 'This is already your email!', '#a00000');
            return;
        }

        updateSchema
            .validate({
                newEmail: newEmail || null,
                newPassword: newPassword || null,
                newPasswordConfirmation: newPasswordConfirmation || null
            })
            .then(({ newEmail, newPassword }) => {
                setLoading(true);

                Promise.all([
                    newEmail && updateEmail(newEmail),
                    newPassword && updatePassword(newPassword)
                ])
                    .then(data => {
                        let sucMessage =
                            data[0] === null
                                ? 'Updated password!'
                                : data[1] === null
                                ? 'Updated email!'
                                : 'Data updated successfully!';

                        MyToast('success', sucMessage + 'com sucesso!', '#61dafb');

                        setTimeout(() => {
                            navigate('/');
                        }, 1000);
                    })
                    .catch(err => {
                        console.error(err);

                        let errMessage = '';
                        switch (err.code) {
                            case 'auth/user-token-expired':
                                errMessage =
                                    'Failed to update data correctly.\nPlease log in again and try to update one at a time!';
                                break;

                            case 'auth/requires-recent-login':
                                errMessage =
                                    'This is a sensitive operation and requires a new authentication.\nLog in again!';
                                break;

                            case 'auth/email-already-in-use':
                                errMessage = 'This email is already registered!';
                                break;

                            case 'auth/wrong-password':
                                errMessage = 'Incorrect password!';
                                break;

                            case 'auth/user-not-found':
                                errMessage = 'This email is not registered!';
                                break;

                            default:
                                errMessage = 'Failed to update the data!';
                                break;
                        }
                        MyToast('error', errMessage, '#a00000', 4000);
                    })
                    .finally(() => setLoading(false));
            })
            .catch(err => {
                console.error(err);

                const errMessage = err.message
                    ? err.message
                    : 'Failed to validate the data!';
                MyToast('error', errMessage, '#a00000');
            });
    }

    return (
        <Form submitFunction={handleSubmit(handleUpdate)} formName="Update">
            <PStyled top>Leave blank the fields you don't want to change.</PStyled>
            <Input
                name="New Email"
                id="newEmail"
                registerData={register('newEmail')}
                type="text"
            />
            <Input
                name="New Password"
                id="newPassword"
                registerData={register('newPassword')}
                type="password"
            />
            <Input
                name="Confirm New Password"
                id="newPasswordConfirmation"
                registerData={register('newPasswordConfirmation')}
                type="password"
            />
            <Button title="Update" type="submit" disabled={loading} />
            <PStyled>
                <Link to="/">Cancel</Link>
            </PStyled>
        </Form>
    );
}
