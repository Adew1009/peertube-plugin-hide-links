(function() {
  // This function will be called by PeerTube to register the plugin
  async function register({ registerHook, peertubeHelpers }) {
    console.log("Plugin loaded and running");

    async function fetchUserQuota() {
      try {
        const response = await fetch('/api/v1/users/me', {
          method: 'GET',
          headers: peertubeHelpers.getAuthHeader(),
        });
        const userData = await response.json();
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
      }
    });
  }

  // Attach the register function to the global scope
  if (typeof window !== 'undefined') {
    window.register = register;
  } else if (typeof self !== 'undefined') {
    self.register = register;  // In case of web workers or service workers
  }
})();
