    // The bell opens the centre; its old menu of switches moved to Settings.
    function toggleNotificationMenu() { if (panel) close(); else open(); }
    mountSettingsPane();
  }

  MV.notify = { init: init, open: open, close: close, syncPerm: syncPerm, renderSettings: function () {
    syncPerm();
    if (typeof window.renderNotificationMenu === 'function') window.renderNotificationMenu();
    else if (typeof renderNotificationMenu === 'function') renderNotificationMenu();
  } };
})();