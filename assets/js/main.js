/**
 * NexTattva — Main Interactive Engine (Indian Statutory & Regulatory Edition)
 * Handling Navigation, Modals, Indian Tax/Audit ROI Calculator, and Consultation Triggers
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Header Effect
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // 2. Mobile Drawer Navigation
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerClose = document.getElementById('drawerClose');
  const drawerOverlay = document.getElementById('drawerOverlay');

  function openDrawer() {
    mobileDrawer?.classList.add('open');
    if (drawerOverlay) {
      drawerOverlay.classList.add('active');
    }
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer?.classList.remove('open');
    if (drawerOverlay) {
      drawerOverlay.classList.remove('active');
    }
    document.body.style.overflow = '';
  }

  mobileToggle?.addEventListener('click', openDrawer);
  drawerClose?.addEventListener('click', closeDrawer);
  drawerOverlay?.addEventListener('click', closeDrawer);

  // Close drawer on link click
  document.querySelectorAll('.mobile-drawer-link').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // 3. Indian Statutory Service Data & Modal System
  const serviceData = {
    'bookkeeping': {
      title: 'Accounting, Bookkeeping & MCA Compliance',
      badge: 'Companies Act 2013 & Ind AS Compliant',
      desc: 'Schedule III compliant accounting, day-to-day general ledger management, monthly closing by Day 4, and statutory ROC filing readiness for Indian entities.',
      deliverables: [
        'Schedule III compliant Balance Sheet, Profit & Loss, and Cash Flow preparation',
        'Daily/weekly bank, cash, and payment gateway (Razorpay/Cashfree/Stripe) reconciliations',
        'Fixed asset register maintenance with Companies Act vs. Income Tax Act depreciation schedules',
        'Period-end accruals, prepaid expense amortisation, and sub-ledger tie-outs',
        'Direct coordination with statutory auditors for year-end audit clearance',
        'Preparation of MCA annual return documentation (Forms AOC-4 and MGT-7 support)'
      ],
      tools: ['Tally Prime', 'Zoho Books', 'Oracle NetSuite', 'SAP Business One', 'QuickBooks India']
    },
    'payroll': {
      title: 'Payroll Processing & Statutory Labour Laws',
      badge: 'EPFO, ESIC, PT & Gratuity Governance',
      desc: '100% compliant monthly payroll computation, electronic challan returns (ECR), salary disbursement, and employee statutory benefits administration.',
      deliverables: [
        'Monthly CTC salary computation with employee/employer PF, ESIC & PT deductions',
        'Monthly electronic challan cum return (ECR) generation and EPFO/ESIC portal filing',
        'State-wise Professional Tax (PT) calculations & annual returns (Gujarat, MH, KA, etc.)',
        'Full & Final (F&F) settlements, leave encashment, and Payment of Gratuity Act 1972 calculations',
        'Quarterly TDS on salary (Form 24Q) filing and annual Form 16 Part A & B generation',
        'Automated password-protected digital payslip delivery and investment proof verification'
      ],
      tools: ['GreytHR', 'Keka', 'Zoho Payroll', 'RazorpayX Payroll', 'Tally Prime']
    },
    'ar': {
      title: 'GST Invoicing & Accounts Receivable (AR)',
      badge: 'e-Invoicing (IRN) & Cash Flow Acceleration',
      desc: 'Automated GST-compliant tax invoicing, mandatory IRN/QR code generation, GSTR-1 synchronization, and debtor aging management under Indian laws.',
      deliverables: [
        'NIC e-Invoicing portal integration for automated IRN and signed QR code generation',
        'Real-time e-Way Bill generation for consignments exceeding statutory thresholds',
        'Debtor aging analysis, credit limit enforcement, and structured collection follow-ups',
        'Monthly reconciliation of sales register with GSTR-1 and GSTR-3B outwards supplies',
        'Debit/Credit note documentation under Section 34 of the CGST Act',
        'Customer ledger tie-outs, balance confirmation certificates, and payment gateway reconciliations'
      ],
      tools: ['ClearTax', 'Masters India', 'Zoho Invoice', 'Tally Prime', 'RazorpayX']
    },
    'ap': {
      title: 'Accounts Payable (AP) & MSME Governance',
      badge: 'Section 43B(h) & GSTR-2B ITC Protection',
      desc: 'End-to-end procure-to-pay controls, 3-way matching, GSTR-2B Input Tax Credit (ITC) verification, and strict MSME 45-day payment tracking.',
      deliverables: [
        '3-way matching of Purchase Order (PO), Material Inward/GRN, and Vendor Tax Invoice',
        'Udyam registration validation and strict Section 43B(h) 45-day MSME payment tracking to prevent tax disallowances',
        'Monthly GSTR-2B vs. Purchase Register ITC reconciliation before vendor disbursement',
        'TDS deduction at source under Sections 194C, 194J, 194I, and 194Q prior to payment',
        'Scheduled batch disbursements via NEFT, RTGS, and host-to-host bank integrations',
        'Vendor ledger reconciliations and annual balance confirmation certificates'
      ],
      tools: ['Tally Prime', 'Zoho Books', 'SAP S/4HANA', 'RazorpayX Vendor Payments', 'ClearTax']
    },
    'vcfo': {
      title: 'Virtual CFO & Strategic Financial Management',
      badge: 'CMA Data, Bank Limits & Growth Modeling',
      desc: 'Senior financial leadership for growth-stage Indian companies, bank loan CMA data, rolling cash-flow forecasting, and investor reporting.',
      deliverables: [
        'CMA (Credit Monitoring Arrangement) data preparation for working capital / cash credit (CC) limits',
        '13-week rolling cash-flow forecasts and capital budgeting models',
        'Monthly executive MIS reporting, unit-economics analysis, and EBITDA tracking',
        'Board meeting decks, investor reporting packs, and cap table management',
        'Cost optimization, contribution margin analysis, and pricing strategies',
        'Coordination for valuation, financial due diligence, and startup DPIIT recognitions'
      ],
      tools: ['Power BI', 'Zoho Analytics', 'Fathom', 'Custom CMA Financial Models']
    },
    'controls': {
      title: 'Internal Financial Controls (IFC) & Audit Readiness',
      badge: 'Companies Act Sec 134(5)(e) & CARO 2020',
      desc: 'Designing and testing robust Internal Financial Controls over Financial Reporting (ICFR), fraud prevention frameworks, and statutory pre-audit readiness.',
      deliverables: [
        'Design and documentation of Internal Financial Controls (IFC) Risk & Control Matrices (RCM)',
        'Segregation of duties (SoD) frameworks across procurement, treasury, and accounting',
        'CARO 2020 (Companies Auditor Report Order) pre-audit verification and compliance checklists',
        'Standard Operating Procedures (SOPs) and delegation of financial powers (DOFP) matrices',
        'Physical inventory verification protocols and fixed asset tagging reconciliations',
        'Tax Audit Section 44AB Form 3CD documentation and statutory audit liaison'
      ],
      tools: ['Risk & Control Matrices', 'Process Flow Blueprints', 'Audit Checklists']
    },
    'erp': {
      title: 'ERP & Enterprise Applications (India Localization)',
      badge: 'GSTN, e-Invoicing & Banking Integration',
      desc: 'Independent, vendor-neutral implementation, customization, and API integration across Tally Prime, Zoho Books, SAP, and NetSuite with complete Indian statutory localization.',
      deliverables: [
        'Vendor-neutral ERP selection and total cost of ownership (TCO) evaluation',
        'Statutory localization: GST e-Invoicing API, e-Way Bill automation, and TDS deduction rules',
        'Role-Based Access Control (RBAC) and approval hierarchies adhering to internal controls',
        'API integration connecting ERP with CRM, Indian banking (ICICI, HDFC, Axis H2H), and eCommerce portals',
        'Legacy data migration, chart of accounts restructuring, and opening balance reconciliations',
        'Post-go-live hypercare, end-user training, and ongoing platform governance'
      ],
      tools: ['Tally Prime', 'Zoho One / Books', 'SAP S/4HANA', 'Oracle NetSuite India', 'Microsoft Dynamics 365']
    }
  };

  const serviceModal = document.getElementById('serviceModal');
  const modalClose = document.getElementById('modalClose');
  const modalTitle = document.getElementById('modalTitle');
  const modalBadge = document.getElementById('modalBadge');
  const modalDesc = document.getElementById('modalDesc');
  const modalDeliverables = document.getElementById('modalDeliverables');
  const modalTools = document.getElementById('modalTools');

  function openServiceModal(serviceKey) {
    const data = serviceData[serviceKey];
    if (!data || !serviceModal) return;

    if (modalTitle) modalTitle.textContent = data.title;
    if (modalBadge) modalBadge.textContent = data.badge;
    if (modalDesc) modalDesc.textContent = data.desc;

    if (modalDeliverables) {
      modalDeliverables.innerHTML = data.deliverables.map(item => `
        <li style="display:flex;align-items:flex-start;gap:0.6rem;margin-bottom:0.75rem;font-size:0.9rem;color:#334155;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f4b41a" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;margin-top:2px;">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>${item}</span>
        </li>
      `).join('');
    }

    if (modalTools) {
      modalTools.innerHTML = data.tools.map(tool => `
        <span style="display:inline-block;padding:0.25rem 0.65rem;background:#e9f1f7;color:#143d59;border-radius:4px;font-size:0.8rem;font-weight:600;">
          ${tool}
        </span>
      `).join('');
    }

    serviceModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeServiceModal() {
    serviceModal?.classList.remove('active');
    document.body.style.overflow = '';
  }

  modalClose?.addEventListener('click', closeServiceModal);
  serviceModal?.addEventListener('click', (e) => {
    if (e.target === serviceModal) closeServiceModal();
  });

  // Attach click to all service trigger buttons
  document.querySelectorAll('[data-service]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceKey = btn.getAttribute('data-service');
      if (serviceKey) openServiceModal(serviceKey);
    });
  });

  // 4. Interactive Indian Statutory & Financial Savings Calculator
  const revenueSlider = document.getElementById('calcRevenue');
  const revenueVal = document.getElementById('calcRevenueVal');
  const volumeSlider = document.getElementById('calcVolume');
  const volumeVal = document.getElementById('calcVolumeVal');

  const metricSavings = document.getElementById('metricSavings');
  const metricHours = document.getElementById('metricHours');
  const metricDso = document.getElementById('metricDso');
  const metricAccuracy = document.getElementById('metricAccuracy');

  function updateCalculator() {
    if (!revenueSlider || !volumeSlider) return;

    const annualTurnoverCr = parseInt(revenueSlider.value, 10); // in ₹ Crores
    const monthlyTransactions = parseInt(volumeSlider.value, 10);

    if (revenueVal) {
      revenueVal.textContent = `₹${annualTurnoverCr} Cr / yr Turnover`;
    }
    if (volumeVal) {
      volumeVal.textContent = `${monthlyTransactions.toLocaleString()} invoices/mo`;
    }

    // Mathematical formula modeled after Indian corporate benchmarks
    // Cost savings vs in-house accounting team + CA retainer: ₹8 Lakhs - ₹35 Lakhs+
    const inHouseCostLakhs = 7.5 + (annualTurnoverCr * 0.45) + (monthlyTransactions * 0.003);
    const nexTattvaCostLakhs = 3.6 + (annualTurnoverCr * 0.18) + (monthlyTransactions * 0.001);
    const estimatedSavingsLakhs = Math.max(4.5, (inHouseCostLakhs - nexTattvaCostLakhs)).toFixed(1);

    // Hours saved: Monthly close + GST reco + TDS filing + Payroll ECR
    const hoursSavedMonthly = Math.round(35 + (monthlyTransactions * 0.05) + (annualTurnoverCr * 0.8));

    // DSO reduction
    const dsoDays = Math.max(12, Math.round(24 - (annualTurnoverCr * 0.2)));

    if (metricSavings) metricSavings.textContent = `₹${estimatedSavingsLakhs}L+`;
    if (metricHours) metricHours.textContent = `${hoursSavedMonthly} hrs`;
    if (metricDso) metricDso.textContent = `-${dsoDays} days`;
    if (metricAccuracy) metricAccuracy.textContent = '100%';
  }

  revenueSlider?.addEventListener('input', updateCalculator);
  volumeSlider?.addEventListener('input', updateCalculator);
  updateCalculator();

  // 5. Contact Consultation Form Handling
  const contactForm = document.getElementById('consultationForm');
  const formSuccess = document.getElementById('formSuccess');

  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('formName')?.value || '';
    const email = document.getElementById('formEmail')?.value || '';
    const service = document.getElementById('formService')?.value || 'Accounting, Bookkeeping & MCA Compliance';
    const message = document.getElementById('formMessage')?.value || '';

    // Create mailto fallback link
    const subject = encodeURIComponent(`Consultation Request: ${service} - ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nSelected Practice: ${service}\nRequirements:\n${message}`);

    if (formSuccess) {
      formSuccess.style.display = 'block';
      contactForm.style.display = 'none';
    }

    // Launch draft email window or WhatsApp connect
    setTimeout(() => {
      window.location.href = `mailto:info@nextattva.com?subject=${subject}&body=${body}`;
    }, 1200);
  });

  // 6. Accordion for FAQ
  document.querySelectorAll('.faq-item-header').forEach(header => {
    header.addEventListener('click', () => {
      const parent = header.parentElement;
      const isOpen = parent.classList.contains('active');

      document.querySelectorAll('.faq-item').forEach(item => item.classList.remove('active'));
      if (!isOpen) {
        parent.classList.add('active');
      }
    });
  });

  // 7. Escape key closes modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeServiceModal();
      closeDrawer();
    }
  });
});
