export const ApiUser = {
  BASE_URL: 'http://127.0.0.1:8080/user',
  ENDPOINT: {
    LOGIN: '/login',
    REGISTER: '/register',
    ACCOUNT_INFO: '/account-info',
    UPDATE_INFO: '/update-info',
    UPDATE_PASSWORD: '/update-password',
    LOGOUT: '/logout',
    LOTTERY_REGISTRY: '/lottery-registry',
    LOTTERY_HISTORY: '/lottery-history',
    CURRENT_LOTTERY: '/lottery/current',
    LOTTERY_DETAILS: (id: number) => `/lottery-details/${id}`,
    LOTTERY_RANK: (id: number) => `/lottery-rank/${id}`,
  },
};
