import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Edit from './Pages/Profile/Edit';
import UpdateProfileInformationForm from './Pages/Profile/Partials/UpdateProfileInformationForm';

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';
<Router>
<Routes>
<Route exact path="/profile" component={Edit} />
<Route exact path="/profile/:id/edit" component={UpdateProfileInformationForm} />
</Routes>
</Router>
createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
