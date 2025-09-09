export const PATHS = {
    // Static pages
    home: '/',
    about: '/about',
    privacy: '/privacy',
    terms: '/terms',

    // Auth routes
    auth: '/auth',

    // API routes
    userInfoApi: '/api/user/info',
    curriculumApi: '/api/curriculum',

    // User routes
    userDashboard: '/user/dashboard',
    userDetails: '/user/details',

    // Teacher routes
    teacherDashboard: '/teacher/dashboard',
    teacherTestNew: '/teacher/tests/new',
    teacherTest: (id: string) => `/teacher/tests/${id}`,

    // Admin routes
    admin: '/admin',

    // Curriculum routes
    curriculum: '/curriculum',
} as const;

// Type-safe path getter
export const getPath = (path: string): string => {
    return path.startsWith('/') ? path : `/${path}`;
};

// Helper type for dynamic paths
export type DynamicPath = (id: string) => string;

// Type for all static paths
export type StaticPaths = typeof PATHS;
