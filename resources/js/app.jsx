import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { Route, Routes } from "react-router-dom";
import DataAplicant from './Pages/Profile/DataAplicant';
import FormUpdateExperience from './Pages/Profile/Partials/FormUpdateWorkExperience';

// const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

const App = () =>{
    return (
        <>
        <Routes>
            <Route path="profile/show" element={<DataAplicant />} />
            <Route path="/profile/:id" element={<FormUpdateExperience />} />
        </Routes>
        </>
    )
}
createInertiaApp({
    title: (title) => `${title} - TifCareer`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },

});

