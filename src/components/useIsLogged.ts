import useUserStore from '../store/userStore';

const useIsLoggedIn = () => {
  const isLoggedIn = useUserStore(
    (state) => state.isLoggedIn,
  );
  return isLoggedIn;
};

export default useIsLoggedIn;
