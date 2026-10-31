(function () {
  const map = {
    'راهنما': '帮助',
    'درباره ما': '关于',
    'درباره': '关于',
    'تنظیمات': '设置',
    'تنظیمات اسکن': '扫描设置',
    'نوتیفیکیشن': '通知',
    'تنظیمات نوتیفیکیشن': '通知设置',
    'حساب کلادفلر': 'Cloudflare 账户',
    'منابع حساب': '账户资源',
    'شبکه': '网络',
    'نمایش': '显示',
    'صفحه نمایش': '显示',
    'مصرف': '流量',
    'سیستم': '系统',
    'دیاگ اینترنت': '网络诊断',
    'اسکن': '扫描',
    'تاریخچه اسکن‌ها': '扫描历史',
    'لیست تغییرات': '更新日志',
    'بستن منو': '关闭菜单',
    'دسترسی ویندوز': 'Windows 权限',
    'انتخاب آیپی ثابت': '选择固定 IP',
    'پاک‌سازی عمیق DNS': '深度 DNS 清理',
    'دسترسی': '权限',
    'تست سرعت': '速度测试',
    'گزارش خطا': '错误报告',
    'سازگاری': '兼容性',
    'ترمینال اسکنر': '扫描终端',
    'حالت روشن': '亮色模式',
    'حالت تاریک': '深色模式',
    'اتصال سریع': '快速连接',
    'آمادهٔ اتصال': '准备连接',
    'متصل': '已连接',
    'قطع': '已断开',
    'در حال اتصال': '正在连接',
    'در حال قطع': '正在断开',
    'کپی': '复制',
    'افزودن اکانت': '添加账户',
    'حذف اکانت': '删除账户',
    'گزارش': '日志',
    'غیرفعال': '禁用',
    'فعال': '启用',
    'ذخیره': '保存',
    'افزودن': '添加',
    'حذف': '删除',
    'انصراف': '取消',
    'پروکسی': '代理',
    'تونل': '隧道',
    'کلودفلر': 'Cloudflare',
    'ورکر': 'Worker',
    'کانفیگ': '配置',
    'سرور': '服务器',
    'پورت': '端口',
    'آدرس': '地址',
    'تأخیر': '延迟',
    'حساب': '账户',
    'شبکه': '网络',
    'گذرواژه': '密码',
    'نام': '名称',
    'دستگاه': '设备',
    'حالت': '模式',
    'پیکربندی': '配置',
    'پایان': '结束',
    'دریافت': '获取',
    'به‌روزرسانی': '更新',
    'اتصال': '连接',
    'باشد': '启用',
    'نویسنده': '作者',
    'نسخه': '版本',
    'پرسش': '查询',
    'جست‌وجو': '搜索',
    'فیلتر': '筛选',
    'نتیجه': '结果',
    'پیش‌فرض': '默认',
    'خطا': '错误',
    'اخطار': '警告',
    'موفق': '成功',
    'در حال بارگذاری': '正在加载',
    'در حال بررسی': '正在检查',
    'در حال دریافت': '正在获取',
    'در حال اتصال': '正在连接',
    'منتظر': '等待',
    'غیرفعال کردن': '禁用',
    'فعالسازی': '启用',
    'در حال اجرا': '运行中',
    'در حال پردازش': '处理中',
    'خروجی': '输出',
    'تایید': '确认',
    'بازگشت': '返回',
    'بعدی': '下一项',
    'قبلی': '上一项',
    'بخش قبلی': '上一部分',
    'بخش بعدی': '下一部分',
    'کپی تب فعلی': '复制当前标签',
    'تب جدید': '新建标签',
    'تنظیمات اسکن': '扫描设置',
    'تاریخچه اسکن‌ها': '扫描历史',
    'تست سرعت': '速度测试',
    'ترمینال اسکنر': '扫描终端',
    'توازن شبکه': '网络平衡',
    'نوار بالا': '顶部栏'
  };

  function localizeTextNode(node) {
    if (!node || node.nodeType !== 3) return;
    let text = node.textContent || '';
    let replaced = false;
    for (const [from, to] of Object.entries(map)) {
      if (text.includes(from)) {
        text = text.replaceAll(from, to);
        replaced = true;
      }
    }
    if (replaced) node.textContent = text;
  }

  function traverse(root) {
    if (!root) return;
    if (root.nodeType === 3) {
      localizeTextNode(root);
      return;
    }
    const children = root.childNodes || [];
    for (const child of children) traverse(child);

    if (root instanceof HTMLElement) {
      if (root.getAttribute('dir') === 'rtl') root.setAttribute('dir', 'ltr');
      if (root.getAttribute('lang') === 'fa') root.setAttribute('lang', 'zh-CN');
      ['placeholder', 'title', 'aria-label', 'value'].forEach((attr) => {
        const value = root.getAttribute(attr);
        if (!value) return;
        let translated = value;
        for (const [from, to] of Object.entries(map)) {
          if (translated.includes(from)) translated = translated.replaceAll(from, to);
        }
        if (translated !== value) root.setAttribute(attr, translated);
      });
    }
  }

  function init() {
    document.documentElement.lang = 'zh-CN';
    document.documentElement.dir = 'ltr';
    document.body.style.direction = 'ltr';
    document.body.style.textAlign = 'left';
    document.querySelectorAll('[dir="rtl"]').forEach((el) => el.setAttribute('dir', 'ltr'));
    traverse(document.body);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }

  const observer = new MutationObserver((records) => {
    for (const record of records) {
      for (const node of record.addedNodes || []) {
        traverse(node);
      }
    }
  });

  observer.observe(document.body || document.documentElement, { childList: true, subtree: true });
})();
