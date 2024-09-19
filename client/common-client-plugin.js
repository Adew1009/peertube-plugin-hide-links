// This function will be called by PeerTube to register the plugin
async function register({ registerHook, peertubeHelpers }) {
  console.log("Plugin loaded and running");

  // Fetch user quota asynchronously
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

  // Register the left-menu filter hook
  registerHook({
    target: 'filter:left-menu.links.create.result',
    handler: async (menuLinks) => {
      console.log('Left menu links are being filtered...');

      // Fetch the user quota
      const userQuota = await fetchUserQuota();
      console.log('User quota:', userQuota);

      // If the user's upload quota is zero, filter out "Channels" and "Videos" links
      if (userQuota === 0) {
        console.log('Removing Channels and Videos links...');
        return menuLinks.filter(link => link.name !== 'channels' && link.name !== 'videos');
      }

      // Return the unmodified menu links if quota is not zero
      return menuLinks;
    }
  });
}

// Ensure the register function is globally available
if (typeof window !== 'undefined') {
  window.register = register;
}
