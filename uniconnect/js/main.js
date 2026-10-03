/* =========================================================
   UniConnect Student Portal — Prototype front-end logic
   ---------------------------------------------------------
   This is a CLICK-THROUGH PROTOTYPE for a UX assignment.
   There is NO real backend, database, authentication service
   or payment gateway here — everything below is mock data and
   in-memory / URL-based state so the three pages (login,
   register, dashboard) can be demoed end-to-end in a browser.

   Deliberate scope decisions (documented so you can justify or
   change them later):
   - No localStorage/sessionStorage/cookies are used, so nothing
     persists between page loads except what is passed through
     the URL query string (e.g. ?name=...&course=...). If you
     wire this up to a real backend later, replace the
     "DEMO DATA" and "mockLogin/mockRegister" sections with real
     API calls and swap the query-string hand-off for a proper
     session (cookie / JWT / server session).
   - Passwords are validated for FORMAT only (never sent, stored,
     or checked against a real database).
   - Card details on the register page are validated for FORMAT
     only and are never transmitted anywhere — see the notice on
     that form.
   ========================================================= */

(function () {
  "use strict";

  /* =========================================================
     1. TRANSLATIONS (multilingual accessibility requirement)
     Add a language by adding a new key to TRANSLATIONS and a
     matching <option> in each page's #lang-select.
     ========================================================= */
  const TRANSLATIONS = {
    en: {
      brand_name: "UniConnect",
      nav_login: "Login",
      nav_register: "Register",
      nav_dashboard: "Dashboard",
      nav_courses: "Courses",
      nav_grades: "Grades",
      nav_announcements: "Announcements",
      nav_logout: "Log out",
      a11y_contrast: "High contrast",
      a11y_lang_label: "Language",

      login_title: "Welcome back",
      login_subtitle: "Sign in to access your courses, grades and announcements.",
      label_student_id: "Student ID or email",
      label_password: "Password",
      remember_me: "Keep me signed in on this device",
      forgot_password: "Forgotten your password?",
      btn_login: "Sign in",
      no_account: "Don't have an account?",
      create_one: "Create one",
      security_check_title: "Account recovery",
      label_security_answer: "Answer to your security question",
      btn_verify: "Verify and reset password",

      register_title: "Create your student account",
      register_subtitle: "Takes about five minutes. Fields marked * are required.",
      section_personal: "1 · Personal details",
      label_full_name: "Full legal name",
      section_contact: "2 · Contact details",
      label_email: "Email address",
      label_phone: "Phone number",
      label_address: "Mailing address",
      section_course: "3 · Course enrolment",
      label_course: "Course",
      section_account: "4 · Set up your password",
      label_confirm_password: "Confirm password",
      password_rule_hint: "At least 8 characters, including one number and one symbol (e.g. Course#2027).",
      section_security: "5 · Security questions (for account recovery)",
      label_security_q1: "Security question 1",
      label_security_a1: "Answer",
      label_security_q2: "Security question 2",
      label_security_a2: "Answer",
      section_payment: "6 · Joining fee — $10.00 AUD",
      payment_note: "This is a UX prototype only: no payment is actually processed and card details are never stored or transmitted anywhere. Please do not enter real card information.",
      label_card_name: "Name on card",
      label_card_number: "Card number",
      label_card_expiry: "Expiry (MM/YY)",
      label_card_cvv: "CVV",
      section_consent: "7 · Consent & preferences",
      consent_policy: "I have read and agree to UniConnect's <a href=\"#\" target=\"_blank\" rel=\"noopener\">Data Usage & Privacy Policy</a> and <a href=\"#\" target=\"_blank\" rel=\"noopener\">Terms of Enrolment</a>.",
      consent_marketing: "Email me about events, assignment deadlines and new courses (optional — you can change this anytime in Settings).",
      btn_create_account: "Create account & pay $10 joining fee",
      have_account: "Already registered?",
      sign_in: "Sign in",

      welcome_back: "Welcome back",
      badge_progress: "courses completed",
      search_placeholder: "Search courses, grades or announcements…",
      filter_all: "All",
      filter_courses: "Courses",
      filter_grades: "Grades",
      filter_announcements: "Announcements",
      courses_title: "My Courses",
      grades_title: "Grades",
      announcements_title: "Announcements",
      badge_title: "Digital Achievement Badge",
      badge_desc: "Complete 5 courses to unlock your UniConnect digital badge, shareable on LinkedIn and your student profile."
    },

    hi: {
      brand_name: "यूनीकनेक्ट",
      nav_login: "लॉगिन",
      nav_register: "रजिस्टर करें",
      nav_dashboard: "डैशबोर्ड",
      nav_courses: "कोर्स",
      nav_grades: "ग्रेड",
      nav_announcements: "घोषणाएँ",
      nav_logout: "लॉग आउट",
      a11y_contrast: "उच्च कंट्रास्ट",
      a11y_lang_label: "भाषा",

      login_title: "वापसी पर स्वागत है",
      login_subtitle: "अपने कोर्स, ग्रेड और घोषणाएँ देखने के लिए साइन इन करें।",
      label_student_id: "छात्र आईडी या ईमेल",
      label_password: "पासवर्ड",
      remember_me: "इस डिवाइस पर मुझे साइन इन रखें",
      forgot_password: "पासवर्ड भूल गए?",
      btn_login: "साइन इन करें",
      no_account: "खाता नहीं है?",
      create_one: "नया खाता बनाएं",
      security_check_title: "खाता पुनर्प्राप्ति",
      label_security_answer: "आपके सुरक्षा प्रश्न का उत्तर",
      btn_verify: "सत्यापित करें और पासवर्ड रीसेट करें",

      register_title: "अपना छात्र खाता बनाएं",
      register_subtitle: "लगभग पाँच मिनट लगेंगे। * चिह्नित फ़ील्ड आवश्यक हैं।",
      section_personal: "1 · व्यक्तिगत विवरण",
      label_full_name: "पूरा कानूनी नाम",
      section_contact: "2 · संपर्क विवरण",
      label_email: "ईमेल पता",
      label_phone: "फ़ोन नंबर",
      label_address: "डाक पता",
      section_course: "3 · कोर्स में नामांकन",
      label_course: "कोर्स",
      section_account: "4 · अपना पासवर्ड सेट करें",
      label_confirm_password: "पासवर्ड की पुष्टि करें",
      password_rule_hint: "कम से कम 8 अक्षर, जिसमें एक अंक और एक चिह्न शामिल हो (उदा. Course#2027)।",
      section_security: "5 · सुरक्षा प्रश्न (खाता पुनर्प्राप्ति हेतु)",
      label_security_q1: "सुरक्षा प्रश्न 1",
      label_security_a1: "उत्तर",
      label_security_q2: "सुरक्षा प्रश्न 2",
      label_security_a2: "उत्तर",
      section_payment: "6 · सदस्यता शुल्क — $10.00 AUD",
      payment_note: "यह केवल एक यूएक्स प्रोटोटाइप है: कोई वास्तविक भुगतान संसाधित नहीं होता और कार्ड विवरण कभी संग्रहीत या प्रसारित नहीं किए जाते। कृपया वास्तविक कार्ड जानकारी दर्ज न करें।",
      label_card_name: "कार्ड पर नाम",
      label_card_number: "कार्ड नंबर",
      label_card_expiry: "समाप्ति (MM/YY)",
      label_card_cvv: "सीवीवी",
      section_consent: "7 · सहमति और प्राथमिकताएँ",
      consent_policy: "मैंने यूनीकनेक्ट की <a href=\"#\" target=\"_blank\" rel=\"noopener\">डेटा उपयोग एवं गोपनीयता नीति</a> और <a href=\"#\" target=\"_blank\" rel=\"noopener\">नामांकन शर्तें</a> पढ़ ली हैं और सहमत हूँ।",
      consent_marketing: "मुझे कार्यक्रमों, असाइनमेंट की समय-सीमा और नए कोर्स के बारे में ईमेल करें (वैकल्पिक — आप इसे सेटिंग्स में कभी भी बदल सकते हैं)।",
      btn_create_account: "खाता बनाएं और $10 शुल्क भुगतान करें",
      have_account: "पहले से पंजीकृत हैं?",
      sign_in: "साइन इन करें",

      welcome_back: "वापसी पर स्वागत है",
      badge_progress: "कोर्स पूर्ण",
      search_placeholder: "कोर्स, ग्रेड या घोषणाएँ खोजें…",
      filter_all: "सभी",
      filter_courses: "कोर्स",
      filter_grades: "ग्रेड",
      filter_announcements: "घोषणाएँ",
      courses_title: "मेरे कोर्स",
      grades_title: "ग्रेड",
      announcements_title: "घोषणाएँ",
      badge_title: "डिजिटल उपलब्धि बैज",
      badge_desc: "अपना यूनीकनेक्ट डिजिटल बैज अनलॉक करने के लिए 5 कोर्स पूरे करें, जिसे LinkedIn और अपनी छात्र प्रोफ़ाइल पर साझा किया जा सकता है।"
    },

    zh: {
      brand_name: "UniConnect 校园通",
      nav_login: "登录",
      nav_register: "注册",
      nav_dashboard: "仪表盘",
      nav_courses: "课程",
      nav_grades: "成绩",
      nav_announcements: "公告",
      nav_logout: "退出登录",
      a11y_contrast: "高对比度",
      a11y_lang_label: "语言",

      login_title: "欢迎回来",
      login_subtitle: "登录以查看您的课程、成绩和公告。",
      label_student_id: "学号或电子邮箱",
      label_password: "密码",
      remember_me: "在此设备上保持登录",
      forgot_password: "忘记密码？",
      btn_login: "登录",
      no_account: "还没有账户？",
      create_one: "立即注册",
      security_check_title: "账户找回",
      label_security_answer: "安全问题的答案",
      btn_verify: "验证并重置密码",

      register_title: "创建您的学生账户",
      register_subtitle: "大约需要五分钟。带 * 的字段为必填项。",
      section_personal: "1 · 个人信息",
      label_full_name: "法定全名",
      section_contact: "2 · 联系方式",
      label_email: "电子邮箱",
      label_phone: "电话号码",
      label_address: "通讯地址",
      section_course: "3 · 课程注册",
      label_course: "课程",
      section_account: "4 · 设置密码",
      label_confirm_password: "确认密码",
      password_rule_hint: "至少8个字符，包含一个数字和一个符号（例如 Course#2027）。",
      section_security: "5 · 安全问题（用于账户找回）",
      label_security_q1: "安全问题 1",
      label_security_a1: "答案",
      label_security_q2: "安全问题 2",
      label_security_a2: "答案",
      section_payment: "6 · 入学费 — $10.00 澳元",
      payment_note: "这仅是一个用户体验原型：不会进行真实付款，卡片信息也不会被存储或传输。请勿输入真实卡片信息。",
      label_card_name: "持卡人姓名",
      label_card_number: "卡号",
      label_card_expiry: "有效期 (MM/YY)",
      label_card_cvv: "安全码 CVV",
      section_consent: "7 · 同意与偏好设置",
      consent_policy: "我已阅读并同意 UniConnect 的<a href=\"#\" target=\"_blank\" rel=\"noopener\">数据使用与隐私政策</a>及<a href=\"#\" target=\"_blank\" rel=\"noopener\">入学条款</a>。",
      consent_marketing: "向我发送有关活动、作业截止日期和新课程的电子邮件（可选——您可以随时在设置中更改）。",
      btn_create_account: "创建账户并支付 $10 入学费",
      have_account: "已经注册？",
      sign_in: "登录",

      welcome_back: "欢迎回来",
      badge_progress: "门课程已完成",
      search_placeholder: "搜索课程、成绩或公告…",
      filter_all: "全部",
      filter_courses: "课程",
      filter_grades: "成绩",
      filter_announcements: "公告",
      courses_title: "我的课程",
      grades_title: "成绩",
      announcements_title: "公告",
      badge_title: "数字成就徽章",
      badge_desc: "完成5门课程即可解锁您的 UniConnect 数字徽章，可分享至 LinkedIn 和学生档案。"
    }
  };

  let currentLang = "en";

  function applyTranslations(lang) {
    currentLang = TRANSLATIONS[lang] ? lang : "en";
    const dict = TRANSLATIONS[currentLang];

    document.documentElement.lang = currentLang;

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      const key = el.getAttribute("data-i18n");
      if (dict[key] !== undefined) {
        // A few strings intentionally carry inline markup (links/bold),
        // so we set innerHTML for those and textContent for the rest.
        if (/[<>]/.test(dict[key])) {
          el.innerHTML = dict[key];
        } else {
          el.textContent = dict[key];
        }
      }
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      const key = el.getAttribute("data-i18n-placeholder");
      if (dict[key] !== undefined) {
        el.setAttribute("placeholder", dict[key]);
      }
    });

    // Re-render dynamic dashboard content (badge counter, list labels)
    // if the dashboard has already built its lists.
    if (typeof window.__uniconnectRefreshDashboardText === "function") {
      window.__uniconnectRefreshDashboardText();
    }
  }

  /* =========================================================
     2. ACCESSIBILITY TOOLBAR (shared by every page)
     ========================================================= */
  function initAccessibilityToolbar() {
    const root = document.documentElement;
    let scale = 1;

    const incBtn = document.getElementById("font-increase");
    const decBtn = document.getElementById("font-decrease");
    const contrastBtn = document.getElementById("contrast-toggle");
    const langSelect = document.getElementById("lang-select");

    if (incBtn) {
      incBtn.addEventListener("click", function () {
        scale = Math.min(1.4, +(scale + 0.1).toFixed(2));
        root.style.setProperty("--font-scale", scale);
      });
    }

    if (decBtn) {
      decBtn.addEventListener("click", function () {
        scale = Math.max(0.85, +(scale - 0.1).toFixed(2));
        root.style.setProperty("--font-scale", scale);
      });
    }

    if (contrastBtn) {
      contrastBtn.addEventListener("click", function () {
        const isOn = root.getAttribute("data-contrast") === "on";
        if (isOn) {
          root.removeAttribute("data-contrast");
        } else {
          root.setAttribute("data-contrast", "on");
        }
        contrastBtn.setAttribute("aria-pressed", String(!isOn));
      });
    }

    if (langSelect) {
      langSelect.addEventListener("change", function () {
        applyTranslations(langSelect.value);
      });
    }
  }

  /* =========================================================
     3. SMALL VALIDATION HELPERS
     ========================================================= */
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const PHONE_RE = /^[0-9+()\-\s]{7,}$/;
  const STUDENT_ID_RE = /^UC\d{4,}$/i;
  // Password rule from the brief: 8+ chars, at least one number, one symbol.
  const PASSWORD_RE = /^(?=.*[0-9])(?=.*[!@#$%^&*()_\-+={}[\]:;"'<>,.?/~`|\\]).{8,}$/;

  function setFieldError(fieldId, hasError) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    field.classList.toggle("has-error", hasError);
    field.classList.toggle("is-valid", !hasError);
  }

  function showAlert(elId, type, message) {
    const el = document.getElementById(elId);
    if (!el) return;
    el.className = "alert is-visible alert-" + type;
    el.textContent = message;
    el.setAttribute("role", type === "error" ? "alert" : "status");
    el.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function hideAlert(elId) {
    const el = document.getElementById(elId);
    if (!el) return;
    el.className = "alert";
  }

  /* =========================================================
     4. LOGIN PAGE
     ========================================================= */
  // Demo-only account directory. Replace with a real API call.
  const DEMO_ACCOUNTS = {
    "uc2026001": { password: "demo#2027", name: "Alex Nguyen", course: "Bachelor of Information Technology" },
    "demo@uniconnect.edu": { password: "demo#2027", name: "Alex Nguyen", course: "Bachelor of Information Technology" }
  };

  function initLoginPage() {
    const form = document.getElementById("login-form");
    if (!form) return;

    // If we just arrived from a successful registration, prefill + greet.
    const params = new URLSearchParams(window.location.search);
    if (params.get("registered") === "1") {
      const idField = document.getElementById("student-id");
      if (idField && params.get("id")) idField.value = params.get("id");
      showAlert("form-alert", "success",
        "Account created! Sign in with the password you just chose to continue.");
      // Remember the just-registered display name/course for this browser tab only.
      window.__justRegistered = {
        id: (params.get("id") || "").toLowerCase(),
        name: params.get("name") || "New Student",
        course: params.get("course") || "Bachelor of Information Technology"
      };
    }

    const idField = document.getElementById("student-id");
    const pwField = document.getElementById("password");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      hideAlert("form-alert");

      const idVal = idField.value.trim();
      const pwVal = pwField.value;

      const idOk = idVal.length > 0;
      const pwOk = pwVal.length > 0;
      setFieldError("field-student-id", !idOk);
      setFieldError("field-password", !pwOk);
      if (!idOk || !pwOk) {
        showAlert("form-alert", "error", "Please enter both your student ID/email and password.");
        return;
      }

      const key = idVal.toLowerCase();
      const justReg = window.__justRegistered;
      let account = DEMO_ACCOUNTS[key];

      // Accept the account that was just registered in this session, with any
      // non-empty password (we never stored the real one — no backend here).
      if (!account && justReg && justReg.id === key) {
        account = { password: null, name: justReg.name, course: justReg.course };
      }

      if (!account) {
        showAlert("form-alert", "error",
          "We couldn't find that account. Try the demo login (UC2026001 / demo#2027) or register first.");
        setFieldError("field-student-id", true);
        return;
      }

      if (account.password && account.password !== pwVal.toLowerCase()) {
        showAlert("form-alert", "error", "Incorrect password. Please try again.");
        setFieldError("field-password", true);
        return;
      }

      // "Log in": hand off display info to the dashboard via the URL only.
      const dest = "dashboard.html?name=" + encodeURIComponent(account.name) +
        "&course=" + encodeURIComponent(account.course);
      showAlert("form-alert", "success", "Signed in! Redirecting to your dashboard…");
      window.setTimeout(function () { window.location.href = dest; }, 700);
    });

    // Forgot password -> reveal the security-question recovery panel.
    const forgotLink = document.getElementById("forgot-password-link");
    const recoveryPanel = document.getElementById("recovery-panel");
    if (forgotLink && recoveryPanel) {
      forgotLink.addEventListener("click", function (e) {
        e.preventDefault();
        recoveryPanel.hidden = !recoveryPanel.hidden;
        if (!recoveryPanel.hidden) {
          document.getElementById("recovery-id").focus();
        }
      });
    }

    const recoveryForm = document.getElementById("recovery-form");
    if (recoveryForm) {
      recoveryForm.addEventListener("submit", function (e) {
        e.preventDefault();
        showAlert("form-alert", "info",
          "If those details match our records, password-reset instructions have been emailed to you.");
        recoveryForm.reset();
      });
    }
  }

  /* =========================================================
     5. REGISTER PAGE
     ========================================================= */
  function initRegisterPage() {
    const form = document.getElementById("register-form");
    if (!form) return;

    const passwordField = document.getElementById("password");
    const confirmField = document.getElementById("confirm-password");
    const strengthBar = document.getElementById("password-strength-bar");

    // --- live password strength meter ---
    function updateStrength() {
      const val = passwordField.value;
      let score = 0;
      if (val.length >= 8) score++;
      if (/[0-9]/.test(val)) score++;
      if (/[^A-Za-z0-9]/.test(val)) score++;
      if (/[a-z]/.test(val) && /[A-Z]/.test(val)) score++;

      const pct = (score / 4) * 100;
      strengthBar.style.width = pct + "%";
      strengthBar.style.background =
        score <= 1 ? "var(--color-error)" :
        score === 2 ? "#e0a300" :
        score === 3 ? "#4c9a2a" : "var(--color-success)";
    }
    if (passwordField) passwordField.addEventListener("input", updateStrength);

    // --- show/hide password toggle ---
    const toggleBtn = document.getElementById("toggle-password-visibility");
    if (toggleBtn) {
      toggleBtn.addEventListener("click", function () {
        const show = toggleBtn.getAttribute("aria-pressed") !== "true";
        [passwordField, confirmField].forEach(function (f) {
          if (f) f.type = show ? "text" : "password";
        });
        toggleBtn.setAttribute("aria-pressed", String(show));
        toggleBtn.textContent = show ? "Hide passwords" : "Show passwords";
      });
    }

    // --- card number auto-formatting: "1234 5678 9012 3456" ---
    const cardNumberField = document.getElementById("card-number");
    if (cardNumberField) {
      cardNumberField.addEventListener("input", function () {
        const digits = cardNumberField.value.replace(/\D/g, "").slice(0, 16);
        cardNumberField.value = digits.replace(/(.{4})/g, "$1 ").trim();
      });
    }

    // --- expiry auto-formatting: "MM/YY" ---
    const expiryField = document.getElementById("card-expiry");
    if (expiryField) {
      expiryField.addEventListener("input", function () {
        let digits = expiryField.value.replace(/\D/g, "").slice(0, 4);
        if (digits.length >= 3) digits = digits.slice(0, 2) + "/" + digits.slice(2);
        expiryField.value = digits;
      });
    }

    // --- validation rules, one entry per field ---
    function validators() {
      const q1 = document.getElementById("security-q1").value;
      const q2 = document.getElementById("security-q2").value;
      const [expMonth, expYear] = (expiryField.value || "").split("/");
      let expiryValid = false;
      if (expMonth && expYear && +expMonth >= 1 && +expMonth <= 12) {
        const now = new Date();
        const expDate = new Date(2000 + (+expYear), (+expMonth));
        expiryValid = expDate > now;
      }

      return [
        { field: "full-name", ok: document.getElementById("full-name").value.trim().length > 1 },
        { field: "student-id", ok: STUDENT_ID_RE.test(document.getElementById("student-id").value.trim()) },
        { field: "dob", ok: document.getElementById("dob").value.trim().length > 0 },
        { field: "email", ok: EMAIL_RE.test(document.getElementById("email").value.trim()) },
        { field: "phone", ok: PHONE_RE.test(document.getElementById("phone").value.trim()) },
        { field: "address", ok: document.getElementById("address").value.trim().length > 4 },
        { field: "course", ok: document.getElementById("course").value !== "" },
        { field: "intake", ok: document.getElementById("intake").value !== "" },
        { field: "password", ok: PASSWORD_RE.test(passwordField.value) },
        { field: "confirm-password", ok: confirmField.value === passwordField.value && confirmField.value !== "" },
        { field: "security-q1", ok: q1 !== "" },
        { field: "security-a1", ok: document.getElementById("security-a1").value.trim().length > 0 },
        { field: "security-q2", ok: q2 !== "" && q2 !== q1 },
        { field: "security-a2", ok: document.getElementById("security-a2").value.trim().length > 0 },
        { field: "card-name", ok: document.getElementById("card-name").value.trim().length > 1 },
        { field: "card-number", ok: cardNumberField.value.replace(/\s/g, "").length === 16 },
        { field: "card-expiry", ok: expiryValid },
        { field: "card-cvv", ok: /^[0-9]{3,4}$/.test(document.getElementById("card-cvv").value.trim()) },
        { field: "consent-policy", ok: document.getElementById("consent-policy").checked }
      ];
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      hideAlert("form-alert");

      const results = validators();
      let firstInvalid = null;
      results.forEach(function (r) {
        setFieldError("field-" + r.field, !r.ok);
        if (!r.ok && !firstInvalid) firstInvalid = r.field;
      });

      if (firstInvalid) {
        showAlert("form-alert", "error", "Please fix the highlighted fields before continuing.");
        const el = document.getElementById(firstInvalid) || document.getElementById("field-" + firstInvalid);
        if (el) el.focus({ preventScroll: false });
        return;
      }

      const name = document.getElementById("full-name").value.trim();
      const studentId = document.getElementById("student-id").value.trim();
      const course = document.getElementById("course").selectedOptions[0].text;

      showAlert("form-alert", "success",
        "Account created and $10 joining fee 'paid' (demo only). Redirecting you to sign in…");

      window.setTimeout(function () {
        const dest = "index.html?registered=1" +
          "&id=" + encodeURIComponent(studentId) +
          "&name=" + encodeURIComponent(name) +
          "&course=" + encodeURIComponent(course);
        window.location.href = dest;
      }, 900);
    });
  }

  /* =========================================================
     6. DASHBOARD PAGE
     ========================================================= */
  const DEMO_COURSES = [
    { code: "ICT101", name: "Introduction to Programming", status: "completed" },
    { code: "ICT150", name: "Web Development Fundamentals", status: "completed" },
    { code: "ICT211", name: "User Experience Design", status: "completed" },
    { code: "ICT220", name: "Database Systems", status: "in-progress" },
    { code: "ICT305", name: "Cloud Computing", status: "in-progress" },
    { code: "ICT330", name: "Cybersecurity Fundamentals", status: "not-started" }
  ];

  const DEMO_GRADES = [
    { code: "ICT101", name: "Introduction to Programming", grade: "HD (High Distinction)" },
    { code: "ICT150", name: "Web Development Fundamentals", grade: "D (Distinction)" },
    { code: "ICT211", name: "User Experience Design", grade: "In progress" }
  ];

  const DEMO_ANNOUNCEMENTS = [
    { title: "Assignment 2 (ICT211) submission window open", date: "2026-09-18", body: "Submit Part A and B together via the Canvas shell before the Week 11 deadline." },
    { title: "Campus Wi-Fi maintenance", date: "2026-09-20", body: "Expect brief outages on Saturday night while network upgrades are carried out." },
    { title: "New elective: Applied Machine Learning", date: "2026-09-15", body: "Enrolments for Term 1, 2027 open next Monday. Limited places available." },
    { title: "Library extended hours for exam period", date: "2026-09-10", body: "The main library will be open 24/7 from Week 12 through the exam period." }
  ];

  const BADGE_TARGET = 5;

  function courseStatusLabel(status) {
    if (status === "completed") return { text: "Completed", cls: "grade-pill" };
    if (status === "in-progress") return { text: "In progress", cls: "grade-pill" };
    return { text: "Not started", cls: "grade-pill" };
  }

  function renderDashboardLists(filterText, filterCategory) {
    filterText = (filterText || "").toLowerCase();
    filterCategory = filterCategory || "all";

    // ----- Courses -----
    const coursesList = document.getElementById("courses-list");
    if (coursesList) {
      coursesList.innerHTML = "";
      const showCourses = filterCategory === "all" || filterCategory === "courses";
      const filtered = DEMO_COURSES.filter(function (c) {
        return !filterText || (c.name + " " + c.code).toLowerCase().includes(filterText);
      });

      if (!showCourses || filtered.length === 0) {
        coursesList.innerHTML = '<li class="empty-state">No matching courses.</li>';
      } else {
        filtered.forEach(function (c) {
          const status = courseStatusLabel(c.status);
          const li = document.createElement("li");
          li.innerHTML =
            '<div class="item-title">' + c.code + ' — ' + c.name + '</div>' +
            '<div class="item-meta">' +
            '<span class="' + status.cls + '">' + status.text + '</span>' +
            (c.status === "in-progress"
              ? ' &nbsp;<button type="button" class="btn btn-secondary" data-mark-complete="' + c.code + '" style="padding:0.2rem 0.6rem;font-size:0.78rem;margin-left:0.4rem;">Mark complete (demo)</button>'
              : '') +
            '</div>';
          coursesList.appendChild(li);
        });
      }
    }

    // ----- Grades -----
    const gradesList = document.getElementById("grades-list");
    if (gradesList) {
      gradesList.innerHTML = "";
      const showGrades = filterCategory === "all" || filterCategory === "grades";
      const filtered = DEMO_GRADES.filter(function (g) {
        return !filterText || (g.name + " " + g.code).toLowerCase().includes(filterText);
      });

      if (!showGrades || filtered.length === 0) {
        gradesList.innerHTML = '<li class="empty-state">No matching grades.</li>';
      } else {
        filtered.forEach(function (g) {
          const li = document.createElement("li");
          li.innerHTML =
            '<div class="item-title">' + g.code + ' — ' + g.name + '</div>' +
            '<div class="item-meta"><span class="grade-pill">' + g.grade + '</span></div>';
          gradesList.appendChild(li);
        });
      }
    }

    // ----- Announcements -----
    const annList = document.getElementById("announcements-list");
    if (annList) {
      annList.innerHTML = "";
      const showAnn = filterCategory === "all" || filterCategory === "announcements";
      const filtered = DEMO_ANNOUNCEMENTS.filter(function (a) {
        return !filterText || (a.title + " " + a.body).toLowerCase().includes(filterText);
      });

      if (!showAnn || filtered.length === 0) {
        annList.innerHTML = '<li class="empty-state">No matching announcements.</li>';
      } else {
        filtered.forEach(function (a) {
          const li = document.createElement("li");
          li.innerHTML =
            '<div class="item-title">' + a.title + '</div>' +
            '<div class="item-meta">' + a.date + '</div>' +
            '<p class="mt-0" style="margin-top:0.35rem;">' + a.body + '</p>';
          annList.appendChild(li);
        });
      }
    }

    // Re-attach "mark complete" demo handlers each render.
    document.querySelectorAll("[data-mark-complete]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const code = btn.getAttribute("data-mark-complete");
        const course = DEMO_COURSES.find(function (c) { return c.code === code; });
        if (course) course.status = "completed";
        renderDashboardLists(
          document.getElementById("dashboard-search").value,
          document.getElementById("search-filter").value
        );
        updateBadgeProgress();
      });
    });
  }

  function updateBadgeProgress() {
    const completed = DEMO_COURSES.filter(function (c) { return c.status === "completed"; }).length;
    const pct = Math.min(100, Math.round((completed / BADGE_TARGET) * 100));

    const bar = document.getElementById("badge-progress-bar");
    const pillText = document.getElementById("badge-progress-text");
    const statusText = document.getElementById("badge-status-text");
    const claimBtn = document.getElementById("badge-claim-btn");

    if (bar) bar.style.width = pct + "%";
    if (pillText) {
      const label = TRANSLATIONS[currentLang].badge_progress || "courses completed";
      pillText.textContent = completed + " / " + BADGE_TARGET + " " + label;
    }

    if (completed >= BADGE_TARGET) {
      if (statusText) statusText.textContent = "All done — your digital badge is ready to claim!";
      if (claimBtn) {
        claimBtn.disabled = false;
        claimBtn.textContent = "Claim your digital badge";
        claimBtn.classList.remove("btn-secondary");
        claimBtn.classList.add("btn-primary");
      }
    } else {
      const remaining = BADGE_TARGET - completed;
      if (statusText) {
        statusText.textContent = completed + " of " + BADGE_TARGET + " courses completed — " +
          remaining + (remaining === 1 ? " to go!" : " to go!");
      }
      if (claimBtn) {
        claimBtn.disabled = true;
        claimBtn.textContent = "Badge locked";
      }
    }
  }

  function initDashboardPage() {
    const coursesList = document.getElementById("courses-list");
    if (!coursesList) return; // not the dashboard page

    const params = new URLSearchParams(window.location.search);
    const name = params.get("name") || "Alex Nguyen";
    const course = params.get("course") || "Bachelor of Information Technology";

    const welcomeName = document.getElementById("welcome-name");
    const welcomeCourse = document.getElementById("welcome-course");
    if (welcomeName) welcomeName.textContent = (TRANSLATIONS[currentLang].welcome_back || "Welcome back") + ", " + name;
    if (welcomeCourse) welcomeCourse.textContent = course + " · Full-time";

    if (params.get("registered") === "1") {
      showAlert("dashboard-alert", "success", "Welcome to UniConnect, " + name + "! Your account is ready.");
    }

    // Let the language switcher keep the welcome banner name in sync.
    window.__uniconnectRefreshDashboardText = function () {
      if (welcomeName) welcomeName.textContent = (TRANSLATIONS[currentLang].welcome_back || "Welcome back") + ", " + name;
      updateBadgeProgress();
    };

    renderDashboardLists("", "all");
    updateBadgeProgress();

    const searchForm = document.getElementById("search-form");
    const searchInput = document.getElementById("dashboard-search");
    const searchFilter = document.getElementById("search-filter");

    function runSearch() {
      renderDashboardLists(searchInput.value, searchFilter.value);
    }

    if (searchForm) {
      searchForm.addEventListener("submit", function (e) {
        e.preventDefault();
        runSearch();
      });
    }
    if (searchInput) searchInput.addEventListener("input", runSearch);
    if (searchFilter) searchFilter.addEventListener("change", runSearch);
  }

  /* =========================================================
     7. BOOTSTRAP
     ========================================================= */
  document.addEventListener("DOMContentLoaded", function () {
    initAccessibilityToolbar();
    initLoginPage();
    initRegisterPage();
    initDashboardPage();
    applyTranslations("en");
  });
})();
