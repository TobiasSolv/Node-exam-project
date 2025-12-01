import { redirect } from '@sveltejs/kit';

export const actions = {
    default: async ({ cookies }) => {
        cookies.delete('session_id', { path: '/' });
        throw redirect(302, '/login_form');
    }
};

export const load = ({ locals }) => {
    if (!locals.user) {
        throw redirect(302, '/login_form');
    }

    return {
        user: locals.user
    };
};
