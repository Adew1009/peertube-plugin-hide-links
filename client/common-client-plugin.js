async function register ({ registerHook, peertubeHelpers }) {
  async function fetchUserQuota () {
    const user = await fetch('/api/v1/users/me', {
      method: 'GET',
      headers: peertubeHelpers.getAuthHeader()
    });
    const userData = await user.json();
    return userData.videoQuota || 0;
  }

  registerHook({
    target: 'filter:left-menu.links.create.result',
    handler: async (result) => {
      const userQuota = await fetchUserQuota();
      if (userQuota === 0) {
        return result.filter(link => !['Channels', 'Videos'].includes(link.key));
      }
      return result;
    }
  });
}

export { register };
