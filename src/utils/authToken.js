const authToken = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('sgp-token')}` },
});

export default authToken;
