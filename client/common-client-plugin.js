async function register ({ registerHook, peertubeHelpers }) {
  console.log("Plugin loaded and running");

  async function fetchUserQuota () {
    try {
      const user = await fetch('/api/v1/users/me', {
        method: 'GET',
        headers: peertubeHelpers.getAuthHeader()
      });
      const userData = await user.json();
      console.log('User data fetched:', userData);
      return userData.videoQuota || 0;
    } catch (error) {
      console.error('Error fetching user quota:', error);
      return 0;
    }
  }

  registerHook({
    target: 'filter:left-menu.links.create.result',
    handler: async (result) => {
      console.log('Left menu links are being filtered...');
      const userQuota = await fetchUserQuota();
      console.log('User quota:', userQuota);
      if (userQuota === 0) {
        console.log('Removing Channels and Videos links...');
        return result.filter(link => !['Channels', 'Videos'].includes(link.key));
      }
      return result;
    },
    priority: 10
  });
}

export { register };
