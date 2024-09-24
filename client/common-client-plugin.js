// Function Purpose
// The main purpose of this function is to register a custom hook that modifies the left menu links in PeerTube. Specifically, it removes certain links if the user has reached their video quota limit.
async function register ({ registerHook, peertubeHelpers }) {
  console.log("Plugin loaded and running");
// This line logs a message indicating that the plugin has been loaded and is running.
  
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
  // This function fetches the user's video quota from the PeerTube API.
  // This function attempts to fetch the user's data from the PeerTube API. It uses authentication headers provided by peertubeHelpers. If successful, it returns the user's video quota. If there's an error, it logs the error and returns 0.

  registerHook({
    target: 'filter:left-menu.links.create.result',

    handler: async (result) => {
      //     This handler function is called whenever the left menu links are being filtered. It does the following:
  // Logs a message indicating that link filtering is occurring.
  // Fetches the user's quota using the fetchUserQuota function.
  // If the quota is 0 (indicating the user has reached their limit), it removes the "Channels" and "Videos" links from the result.
  // Otherwise, it returns the original result unchanged.
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

// This registers a custom hook that modifies the left menu links based on the user's quota status.

export { register };
