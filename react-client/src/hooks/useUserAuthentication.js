import { useSelector } from 'react-redux';

function useUserAuthentication() {
  const { userId } = useSelector(state => state.userLogin);
  let isUserAuthenticated = userId !== null ? true : false;
  return isUserAuthenticated;
}

export default useUserAuthentication;

// Usage
// const isUserAuthenticated = useUserAuthentication();
// if (!isUserAuthenticated) {
//   history.push('/login')
// }
