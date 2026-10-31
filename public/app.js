// ==========================================
// WORKERS MANAGER LOGIC
// ==========================================

function toggleMainMenu() {
    const menu = document.getElementById('main-menu');
    const overlay = document.getElementById('main-menu-overlay');
    const btn = document.getElementById('btn-hamburger');
    if (!menu || !overlay || !btn) return;
    
    if (menu.classList.contains('hidden')) {
        const rect = btn.getBoundingClientRect();
        // Remove default fixed classes
        menu.classList.remove('top-12', 'right-4');
        menu.style.top = (rect.bottom + 10) + 'px';
        menu.style.left = rect.left + 'px';
        
        menu.classList.remove('hidden');
        overlay.classList.remove('hidden');
    } else {
        menu.classList.add('hidden');
        overlay.classList.add('hidden');
    }
}

// ==========================================
// NOTIFICATION MANAGER
// ==========================================

window.notificationSettings = {
    scanFinished: true,
    delayFinished: true,
    pingFinished: true,
    v2rayStarted: true,
    sniStarted: true,
    fixedIpFinished: true
};

function initNotificationManager() {
    const saved = localStorage.getItem('notificationSettings');
    if (saved) {
        try {
            window.notificationSettings = { ...window.notificationSettings, ...JSON.parse(saved) };
        } catch (e) {}
    }
    renderNotificationMenu();
    updateNotificationIndicator();
}

function saveNotificationSettings() {
    localStorage.setItem('notificationSettings', JSON.stringify(window.notificationSettings));
    updateNotificationIndicator();
}

function updateNotificationIndicator() {
    const perm = Notification.permission;
    const indicator = document.getElementById('notif-indicator');
    if (indicator) {
        if (perm === 'granted') {
            indicator.style.display = 'block';
            indicator.style.background = 'var(--mv-green)'; // green
            indicator.style.boxShadow = '0 0 4px var(--mv-green)';
        } else if (perm === 'denied') {
            indicator.style.display = 'block';
            indicator.style.background = 'var(--mv-red)'; // red
            indicator.style.boxShadow = '0 0 4px var(--mv-red)';
        } else {
            indicator.style.display = 'none';
        }
    }
}

function toggleNotificationMenu() {
    const menu = document.getElementById('notification-menu');
    const overlay = document.getElementById('notification-menu-overlay');
    if (menu.classList.contains('hidden')) {
        menu.classList.remove('hidden');
        overlay.classList.remove('hidden');
        renderNotificationMenu();
    } else {
        menu.classList.add('hidden');
        overlay.classList.add('hidden');
    }
}

function requestNotificationPermission() {
    if (!("Notification" in window)) {
        uiAlert({
            title: 'نوتیفیکیشن پشتیبانی نمی‌شود',
            message: 'سیستم‌عامل شما از نوتیفیکیشن دسکتاپ پشتیبانی نمی‌کند.',
            tone: 'warn',
        });
        return;
    }
    Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {
            triggerNotification('test', 'دسترسی داده شد!', 'نوتیفیکیشن‌ها با موفقیت فعال شدند.', true);
        }
        updateNotificationIndicator();
    });
}
