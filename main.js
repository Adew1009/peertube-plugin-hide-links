async function register({ registerHook }) {
  // Nothing to do on server side for this plugin.
}

async function unregister() {
  return;
}

module.exports = {
  register,
  unregister
};
