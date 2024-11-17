export const isAuthenticated = () => {
    return localStorage.getItem('token');
  };
  
  export const logout = (navigate) => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  