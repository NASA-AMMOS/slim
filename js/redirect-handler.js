// To handle the specific hash/anchor
(function() {
  if (window.location.hash === '#detect-secrets' && 
      window.location.pathname === '/slim/continuous-testing/starter-kits') {
    window.location.href = '/slim/docs/guides/software-lifecycle/security/secrets-detection/';
  }
})();