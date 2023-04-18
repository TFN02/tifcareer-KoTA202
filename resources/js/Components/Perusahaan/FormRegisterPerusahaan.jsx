import { useEffect } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm } from '@inertiajs/react';

const FormRegisterPerusahaan = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        npwp: '',
        password: '',
        password_confirmation: '',
        role: 'perusahaan',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <form onSubmit={submit}>
            <div>
                <InputLabel htmlFor="name" value="Company Name" className='font-bold' />

                <TextInput
                    id="name"
                    name="name"
                    value={data.name}
                    className="mt-1 block w-full bg-violet-50 shadow-black text-black  px-2"
                    autoComplete="name"
                    isFocused={true}
                    onChange={handleOnChange}
                    required
                />

                <InputError message={errors.name} className="mt-2" />
            </div>

            <div className="mt-4">
                <InputLabel htmlFor="email" value="Email Company" className='font-bold' />

                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full bg-violet-50 shadow-black text-black  px-2"
                    autoComplete="username"
                    onChange={handleOnChange}
                    required
                />

                <InputError message={errors.email} className="mt-2" />
            </div>

            <div className="mt-4">
                <InputLabel htmlFor="npwp" value="NPWP" className='font-bold' />

                <TextInput
                    id="npwp"
                    type="number"
                    name="npwp"
                    value={data.npwp}
                    className="mt-1 block w-full bg-violet-50 shadow-black text-black  px-2"
                    autoComplete="npwp"
                    onChange={handleOnChange}
                    required
                />
                

                <InputError message={errors.npwp} className="mt-2" />
            </div>

            <div className="mt-4">
                <InputLabel htmlFor="password" value="Password" className='font-bold' />

                <TextInput
                    id="password"
                    type="password"
                    name="password"
                    value={data.password}
                    className="mt-1 block w-full bg-violet-50 shadow-black text-black  px-2"
                    autoComplete="new-password"
                    onChange={handleOnChange}

                    required
                />

                <InputError message={errors.password} className="mt-2" />
            </div>

            <div className="mt-4">
                <InputLabel htmlFor="password_confirmation" value="Confirm Password" className='font-bold' />

                <TextInput
                    id="password_confirmation"
                    type="password"
                    name="password_confirmation"
                    value={data.password_confirmation}
                    className="mt-1 block w-full bg-violet-50 shadow-black text-black  px-2"
                    autoComplete="new-password"
                    onChange={handleOnChange}
                    required
                />

                <InputError message={errors.password_confirmation} className="mt-2" />
            </div>

            <div className="flex items-center justify-end mt-4">
                <Link
                    href={route('login')}
                    className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Already registered?
                </Link>

                <PrimaryButton className="ml-4" disabled={processing}>
                    Register
                </PrimaryButton>
            </div>
        </form>
    )
}
export default FormRegisterPerusahaan