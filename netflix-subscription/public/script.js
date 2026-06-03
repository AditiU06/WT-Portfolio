// Netflix Subscription Management System — script.js

async function api(method, url, body = null) {
  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : null
  });
  return res.json();
}

function showAlert(id, msg, type = 'error') {
  const el = document.getElementById(id);
  if (el) {
    el.textContent = msg;
    el.className = `alert ${type}`;
    el.classList.remove('hidden');
    setTimeout(() => el.classList.add('hidden'), 4000);
  }
}

function toast(msg, type = 'success') {
  const el = document.getElementById('globalAlert');
  el.textContent = msg;
  el.className = `global-alert alert ${type}`;
  el.classList.remove('hidden');
  clearTimeout(el._timer);
  el._timer = setTimeout(() => el.classList.add('hidden'), 3500);
}

function currency(v) { return '₹' + Number(v).toLocaleString('en-IN'); }
function fmtDate(d) { if (!d) return '—'; return new Date(d).toLocaleDateString('en-IN'); }
function statusBadge(s) {
  const cls = { Active: 'badge-active', Expired: 'badge-expired', Cancelled: 'badge-cancelled' };
  return `<span class="badge ${cls[s] || ''}">${s}</span>`;
}
function openModal(id) { document.getElementById(id).classList.remove('hidden'); }
function closeModal(id) { document.getElementById(id).classList.add('hidden'); }

// AUTH
async function checkSession() {
  const data = await api('GET', '/api/session');
  if (data.loggedIn) {
    document.getElementById('loginOverlay').classList.add('hidden');
    document.getElementById('app').classList.remove('hidden');
    document.getElementById('navUserName').textContent = data.user.full_name;
    showTab('home');
  }
}

async function doLogin() {
  const username = document.getElementById('loginUsername').value.trim();
  const password = document.getElementById('loginPassword').value;
  if (!username || !password) return showAlert('loginAlert', 'Please enter username and password');
  const data = await api('POST', '/api/login', { username, password });
  if (data.success) {
    document.getElementById('loginOverlay').classList.add('hidden');
    document.getElementById('app').classList.remove('hidden');
    document.getElementById('navUserName').textContent = data.user.full_name;
    showTab('home');
  } else {
    showAlert('loginAlert', data.message);
  }
}

async function doLogout() {
  await api('POST', '/api/logout');
  document.getElementById('app').classList.add('hidden');
  document.getElementById('loginOverlay').classList.remove('hidden');
  document.getElementById('loginUsername').value = '';
  document.getElementById('loginPassword').value = '';
}

// TAB NAVIGATION
function showTab(name) {
  document.querySelectorAll('.tab-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(`tab-${name}`).classList.add('active');
  const btn = document.querySelector(`[data-tab="${name}"]`);
  if (btn) btn.classList.add('active');
  
  if (name === 'home') { loadStats(); loadHomePlans(); }
  if (name === 'plans') loadPlans();
  if (name === 'subscribe') loadPlanSelect('subPlanId');
  if (name === 'mySubscriptions') loadMySubscriptions();
  if (name === 'allSubscriptions') loadAllSubscriptions();
}

// HOME
async function loadStats() {
  const data = await api('GET', '/api/stats');
  if (data.success) {
    document.getElementById('statActive').textContent = data.activeSubscriptions;
    document.getElementById('statRevenue').textContent = currency(data.totalRevenue);
    document.getElementById('statUsers').textContent = data.totalUsers;
    document.getElementById('statPlans').textContent = data.totalPlans;
  }
}

async function loadHomePlans() {
  const data = await api('GET', '/api/plans');
  if (!data.success) return;
  const grid = document.getElementById('homePricingGrid');
  if (!data.plans.length) { grid.innerHTML = '<p class="empty-state">No plans available</p>'; return; }
  const maxPrice = Math.max(...data.plans.map(p => +p.monthly_price));
  grid.innerHTML = data.plans.map(p => {
    const featured = +p.monthly_price === maxPrice;
    return `<div class="pricing-card ${featured ? 'featured' : ''}">
      ${featured ? '<div class="plan-badge">Best Value</div>' : '<div style="height:22px"></div>'}
      <div class="plan-name">${p.plan_name}</div>
      <div class="plan-price">${currency(p.monthly_price)}<sub>/mo</sub></div>
      <div class="plan-quality">${p.video_quality} Quality • ${p.screens} Screen${p.screens > 1 ? 's' : ''}</div>
      <button class="btn btn-primary" style="margin-top:10px;" onclick="quickSub(${p.id})">Subscribe</button>
    </div>`;
  }).join('');
}

function quickSub(pid) {
  showTab('subscribe');
  setTimeout(() => {
    const sel = document.getElementById('subPlanId');
    if (sel) sel.value = pid;
  }, 200);
}

// PLANS CRUD
let planSearchTimer = null;

async function loadPlans(search = '') {
  const url = '/api/plans' + (search ? `?search=${encodeURIComponent(search)}` : '');
  const data = await api('GET', url);
  const tbody = document.getElementById('plansTableBody');
  if (!data.success || !data.plans.length) {
    tbody.innerHTML = '<tr><td colspan="7"><div class="empty-state">No plans found</div></td></tr>';
    return;
  }
  tbody.innerHTML = data.plans.map((p, i) => `
    <tr>
      <td>${i + 1}</td>
      <td><strong>${p.plan_name}</strong></td>
      <td>${currency(p.monthly_price)}</td>
      <td>${p.video_quality}</td>
      <td>${p.screens}</td>
      <td style="white-space:normal">${p.description || '—'}</td>
      <td><div class="action-btns"><button class="btn-edit-sm" onclick="openEditPlan(${p.id})">Edit</button><button class="btn-danger-sm" onclick="deletePlan(${p.id},'${p.plan_name}')">Delete</button></div></td>
    </tr>
  `).join('');
}

function searchPlans() {
  clearTimeout(planSearchTimer);
  planSearchTimer = setTimeout(() => loadPlans(document.getElementById('planSearch').value.trim()), 300);
}

function openAddPlanModal() {
  document.getElementById('planModalTitle').innerText = 'Add New Plan';
  document.getElementById('mPlanId').value = '';
  document.getElementById('mPlanName').value = '';
  document.getElementById('mPlanPrice').value = '';
  document.getElementById('mPlanQuality').value = 'HD';
  document.getElementById('mPlanScreens').value = '';
  document.getElementById('mPlanDesc').value = '';
  openModal('planModal');
}

async function openEditPlan(id) {
  const data = await api('GET', `/api/plans/${id}`);
  if (!data.success) return toast('Could not load plan', 'error');
  const p = data.plan;
  document.getElementById('planModalTitle').innerText = 'Edit Plan';
  document.getElementById('mPlanId').value = p.id;
  document.getElementById('mPlanName').value = p.plan_name;
  document.getElementById('mPlanPrice').value = p.monthly_price;
  document.getElementById('mPlanQuality').value = p.video_quality;
  document.getElementById('mPlanScreens').value = p.screens;
  document.getElementById('mPlanDesc').value = p.description || '';
  openModal('planModal');
}

async function savePlan() {
  const id = document.getElementById('mPlanId').value;
  const payload = {
    plan_name: document.getElementById('mPlanName').value.trim(),
    monthly_price: document.getElementById('mPlanPrice').value,
    video_quality: document.getElementById('mPlanQuality').value,
    screens: document.getElementById('mPlanScreens').value,
    description: document.getElementById('mPlanDesc').value.trim()
  };
  if (!payload.plan_name || !payload.monthly_price || !payload.screens) {
    return showAlert('planModalAlert', 'Plan name, price and screens are required');
  }
  const data = await api(id ? 'PUT' : 'POST', id ? `/api/plans/${id}` : '/api/plans', payload);
  if (data.success) {
    closeModal('planModal');
    toast(data.message);
    loadPlans();
    loadHomePlans();
  } else {
    showAlert('planModalAlert', data.message);
  }
}

async function deletePlan(id, name) {
  if (!confirm(`Delete plan "${name}"? This cannot be undone.`)) return;
  const data = await api('DELETE', `/api/plans/${id}`);
  if (data.success) {
    toast(data.message);
    loadPlans();
    loadHomePlans();
  } else {
    toast(data.message, 'error');
  }
}

// SUBSCRIBE
async function loadPlanSelect(selId) {
  const data = await api('GET', '/api/plans');
  const sel = document.getElementById(selId);
  if (!sel || !data.success) return;
  sel.innerHTML = '<option value="">-- Choose a Plan --</option>' + data.plans.map(p => `<option value="${p.id}">${p.plan_name} — ${currency(p.monthly_price)}/mo (${p.video_quality})</option>`).join('');
}

async function doSubscribe() {
  const plan_id = document.getElementById('subPlanId').value;
  const start_date = document.getElementById('subStartDate').value;
  const end_date = document.getElementById('subEndDate').value;
  if (!plan_id) return showAlert('subscribeAlert', 'Please select a plan');
  if (!start_date || !end_date) return showAlert('subscribeAlert', 'Please select start and end dates');
  if (end_date <= start_date) return showAlert('subscribeAlert', 'End date must be after start date');
  const data = await api('POST', '/api/subscriptions', { plan_id, start_date, end_date });
  if (data.success) {
    showAlert('subscribeAlert', data.message, 'success');
    document.getElementById('subPlanId').value = '';
    document.getElementById('subStartDate').value = '';
    document.getElementById('subEndDate').value = '';
    toast(data.message);
    const today = new Date().toISOString().split('T')[0];
    const next = new Date();
    next.setMonth(next.getMonth() + 1);
    document.getElementById('subStartDate').value = today;
    document.getElementById('subEndDate').value = next.toISOString().split('T')[0];
  } else {
    showAlert('subscribeAlert', data.message);
  }
}

// MY SUBSCRIPTIONS
async function loadMySubscriptions() {
  const data = await api('GET', '/api/subscriptions');
  const tbody = document.getElementById('mySubsTableBody');
  if (!data.success || !data.subscriptions.length) {
    tbody.innerHTML = '<tr><td colspan="9"><div class="empty-state">No subscriptions yet. Go to Subscribe to get started</div></td></tr>';
    return;
  }
  tbody.innerHTML = data.subscriptions.map((s, i) => `
    <tr>
      <td>${i + 1}</td>
      <td><strong>${s.plan_name}</strong></td>
      <td>${currency(s.monthly_price)}</td>
      <td>${s.video_quality}</td>
      <td>${s.screens}</td>
      <td>${fmtDate(s.start_date)}</td>
      <td>${fmtDate(s.end_date)}</td>
      <td>${statusBadge(s.status)}</td>
      <td><div class="action-btns"><button class="btn-edit-sm" onclick="openSubEdit(${s.id}, ${s.plan_id || 1}, '${s.status}', '${s.start_date?.split('T')[0]}', '${s.end_date?.split('T')[0]}')">Edit</button>${s.status !== 'Cancelled' ? `<button class="btn-danger-sm" onclick="cancelSub(${s.id})">Cancel</button>` : ''}</div></td>
    </tr>
  `).join('');
}

async function openSubEdit(id, planId, status, startDate, endDate) {
  await loadPlanSelect('editSubPlanId');
  document.getElementById('editSubId').value = id;
  document.getElementById('editSubPlanId').value = planId;
  document.getElementById('editSubStatus').value = status;
  document.getElementById('editSubStart').value = startDate;
  document.getElementById('editSubEnd').value = endDate;
  openModal('subEditModal');
}

async function saveSubEdit() {
  const id = document.getElementById('editSubId').value;
  const plan_id = document.getElementById('editSubPlanId').value;
  const status = document.getElementById('editSubStatus').value;
  const start_date = document.getElementById('editSubStart').value;
  const end_date = document.getElementById('editSubEnd').value;
  if (!plan_id || !status || !start_date || !end_date) {
    return showAlert('subEditAlert', 'All fields are required');
  }
  const data = await api('PUT', `/api/subscriptions/${id}`, { plan_id, status, start_date, end_date });
  if (data.success) {
    closeModal('subEditModal');
    toast(data.message);
    loadMySubscriptions();
  } else {
    showAlert('subEditAlert', data.message);
  }
}

async function cancelSub(id) {
  if (!confirm('Cancel this subscription?')) return;
  const data = await api('DELETE', `/api/subscriptions/${id}`);
  if (data.success) {
    toast(data.message);
    loadMySubscriptions();
  } else {
    toast(data.message, 'error');
  }
}

// ALL SUBSCRIPTIONS
async function loadAllSubscriptions() {
  const data = await api('GET', '/api/subscriptions/all');
  const tbody = document.getElementById('allSubsTableBody');
  if (!data.success || !data.subscriptions.length) {
    tbody.innerHTML = '<tr><td colspan="9"><div class="empty-state">No subscriptions in the system yet</div></td></tr>';
    return;
  }
  tbody.innerHTML = data.subscriptions.map((s, i) => `
    <tr>
      <td>${i + 1}</td>
      <td><strong>${s.full_name}</strong></td>
      <td style="color:var(--text-muted)">${s.email}</td>
      <td>${s.plan_name}</td>
      <td>${currency(s.monthly_price)}</td>
      <td>${s.video_quality}</td>
      <td>${fmtDate(s.start_date)}</td>
      <td>${fmtDate(s.end_date)}</td>
      <td>${statusBadge(s.status)}</td>
    </tr>
  `).join('');
}

// DEFAULTS
(function setDefaultDates() {
  const today = new Date().toISOString().split('T')[0];
  const next = new Date();
  next.setMonth(next.getMonth() + 1);
  const nextMonth = next.toISOString().split('T')[0];
  const start = document.getElementById('subStartDate');
  const end = document.getElementById('subEndDate');
  if (start) start.value = today;
  if (end) end.value = nextMonth;
})();

document.addEventListener('DOMContentLoaded', () => {
  ['loginUsername', 'loginPassword'].forEach(id => {
    document.getElementById(id)?.addEventListener('keydown', e => { if (e.key === 'Enter') doLogin(); });
  });
  checkSession();
});