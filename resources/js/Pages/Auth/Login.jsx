import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

import '../../../css/style.css';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <>
            <Head title="Log in" />
            <svg className='waves'
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                width="100%"
                height="100%"
                viewBox="0 0 1600 900"
                preserveAspectRatio="xMidYMax slice"
            >
                <defs>
                    <linearGradient id="bg">
                        <stop offset="0%" style={{ stopColor: "rgba(130, 158, 249, 0.06)" }} />
                        <stop offset="50%" style={{ stopColor: "rgba(76, 190, 255, 0.6)" }} />
                        <stop offset="100%" style={{ stopColor: "rgba(115, 209, 72, 0.2)" }} />
                    </linearGradient>
                    <path
                        id="wave"
                        fill="url(#bg)"
                        d="M-363.852,502.589c0,0,236.988-41.997,505.475,0
	s371.981,38.998,575.971,0s293.985-39.278,505.474,5.859s493.475,48.368,716.963-4.995v560.106H-363.852V502.589z"
                    />
                </defs>
                <g>
                    <use xlinkHref="#wave" opacity=".3">
                        <animateTransform
                            attributeName="transform"
                            attributeType="XML"
                            type="translate"
                            dur="10s"
                            calcMode="spline"
                            values="270 230; -334 180; 270 230"
                            keyTimes="0; .5; 1"
                            keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
                            repeatCount="indefinite"
                        />
                    </use>
                    <use xlinkHref="#wave" opacity=".6">
                        <animateTransform
                            attributeName="transform"
                            attributeType="XML"
                            type="translate"
                            dur="8s"
                            calcMode="spline"
                            values="-270 230;243 220;-270 230"
                            keyTimes="0; .6; 1"
                            keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
                            repeatCount="indefinite"
                        />
                    </use>
                    <use xlinkHref="#wave" opacty=".9">
                        <animateTransform
                            attributeName="transform"
                            attributeType="XML"
                            type="translate"
                            dur="6s"
                            calcMode="spline"
                            values="0 230;-140 200;0 230"
                            keyTimes="0; .4; 1"
                            keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
                            repeatCount="indefinite"
                        />
                    </use>
                </g>
            </svg>
            {status && <div className="mb-4 font-medium text-sm text-white">{status}</div>}

            <div className='min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0'>
                <div className='card shadow-lg shadow-black'>
                    <div className="card-body">
                        <div className='flex items-center'>
                            <div className='flex-auto pr-5'>

                                <p className='text-white text-xl'>SELAMAT DATANG DI</p>
                                <p className='text-white text-4xl font-semibold pb-2 tracking-wide'>TIFCAREER</p>
                                <hr />
                                <p className='pt-2 leading-relaxed text-white'>
                                    Lorem ipsum lorem ipsum Lorem ipsum dolor, <br /> sit amet consectetur adipisicing elit. <br />
                                    Hic dolorem dolorum obcaecati eum impedit nostrum.
                                </p>
                            </div>
                            <div>
                                <p className='text-white text-lg text-center pb-2 font-bold'>Login</p>
                                <div className='flex-auto bg-white px-5 py-5 rounded-md'>
                                    <form onSubmit={submit}>
                                        <div>
                                            <InputLabel htmlFor="email" value="Email" className='font-bold' />

                                            <TextInput
                                                id="email"
                                                type="email"
                                                name="email"
                                                value={data.email}
                                                className="mt-1 block w-full bg-violet-50 shadow-black text-black px-2"
                                                autoComplete="username"
                                                isFocused={true}
                                                onChange={handleOnChange}
                                            />

                                            <InputError message={errors.email} className="mt-2" />
                                        </div>

                                        <div className="mt-4">
                                            <InputLabel htmlFor="password" value="Password" className='font-bold' />

                                            <TextInput
                                                id="password"
                                                type="password"
                                                name="password"
                                                value={data.password}
                                                className="mt-1 block w-full bg-violet-50 shadow-black text-black px-2"
                                                autoComplete="current-password"
                                                onChange={handleOnChange}
                                            />

                                            <InputError message={errors.password} className="mt-2" />
                                        </div>

                                        <div className="block mt-4">
                                            <label className="flex items-center">
                                                <Checkbox name="remember" value={data.remember} onChange={handleOnChange} />
                                                <span className="ml-2 text-xs text-gray-600">Remember me</span>
                                            </label>

                                        </div>

                                        <div className="flex items-center justify-center mt-4">
                                            <PrimaryButton className="w-full" disabled={processing}>
                                                <p className='text-center'>Login</p>
                                            </PrimaryButton>

                                        </div>
                                        <div className='text-center pt-3'>
                                            {canResetPassword && (
                                                <Link
                                                    href={route('password.request')}
                                                    className="underline text-xs text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                >
                                                    Forgot your password?
                                                </Link>
                                            )}
                                        </div>
                                    </form>

                                </div>
                                <div className="flex items-center justify-center mt-4">
                                    <Link
                                        href={route('register')}
                                        className="underline text-xs text-black hover:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Don't have account?
                                    </Link>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
