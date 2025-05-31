// Authorization Check Returning True/False 
// ========================================

export const isAuth = () => {
    const token = localStorage.getItem('token');
    return token !== null;
  };
  