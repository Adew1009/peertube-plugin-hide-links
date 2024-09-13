export async function filterLeftMenuLinksCreateResult({ result }) {
  // Access the current user from the Vuex store
  const user = this.store.state.user;

  if (
    user &&
    user.quota &&
    user.quota.videoQuota &&
    typeof user.quota.videoQuota.max === 'number' &&
    user.quota.videoQuota.max === 0
  ) {
    // Define the links to hide
    const linksToHide = ['/my-library/channels', '/my-library/videos'];

    // Filter out the specified links
    result.links = result.links.filter(link => !linksToHide.includes(link.href));
  }

  return { result };
}
