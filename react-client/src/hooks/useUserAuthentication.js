import { useSelector } from 'react-redux';

function useUserAuthentication() {
  const { userId } = useSelector(state => state.userLogin);
  let isUserAuthenticated = null;
  if (userId !== null) {
    isUserAuthenticated = true;
  } else {
    isUserAuthenticated = false;
  }
  return isUserAuthenticated;
}

export default useUserAuthentication;

// Usage
// const isUserAuthenticated = useUserAuthentication();
// if (!isUserAuthenticated) {
//   history.push('/login')
// }
