import create, { SetState } from 'zustand';

interface UserState {
  isLoggedIn: boolean;
  logIn: () => void;
  logOut: () => void;
}

const useUserStore = create<UserState>(
  (set: SetState<UserState>) => ({
    isLoggedIn: false,
    logIn: () => set({ isLoggedIn: true }),
    logOut: () => set({ isLoggedIn: false }),
  }),
);

export default useUserStore;

function initializeUser() {
  const accessToken = localStorage.getItem(
    'accessToken',
  );
  accessToken
    ? useUserStore.getState().logIn()
    : useUserStore.getState().logOut();
}

initializeUser();
