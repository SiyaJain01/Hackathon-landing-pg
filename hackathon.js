/* ==========================================================================
CELESTIAL DEPTHS — Minecraft Treehouse Village & Interactive House Engine
========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  initVillageMap();
  initHouseCutaway();
  initRoomModal();
  initHotbar();
  initCountdown();
  initFireflies();
  initAmbience();
  initMarquee();

});
// ---------- 1. Hackathon Treehouses Data ----------
const treehouses = {
  'th-main': {
    id: 'th-main',
    title: 'CELESTIAL DEPTHS',
    sub: 'MAIN CANOPY EXPEDITION',
    prize: '$25,000',
    meta: 'AUG 21–23, 2026 · On-site · Nexus Tech Campus',
    status: 'active',
    prizes: [
      { tag: 'GRAND CHAMPION', val: '$12,000', desc: 'Grand Golden Trophy, 1st place interview, $5,000 Cloud GPU grant, direct VC intro.', featured: true },
      { tag: 'SECOND PLACE', val: '$7,000', desc: 'Runner-up Diamond Trophy, $2,500 Cloud credits, 1:1 executive mentorship.', featured: false }, { tag: 'THIRD PLACE', val: '$4,000', desc: 'Podium Emerald Trophy, $1,000 Cloud credits, exclusive crew merchandise.', featured: false },
      { tag: 'REALM HONORS (x6)', val: '$2,000', desc: 'Top crew in AI, Web3, Cyber, IoT, Climate, Open. Allied bounties included.', featured: false }
    ]
  },
  'th-ai': {
    id: 'th-ai',
    title: 'NEBULA SPRINT',
    sub: 'AI & AGENTS EDITION',
    prize: '$10,000',
    meta: 'SEP 12–13, 2026 · Online · Global Realm',
    status: 'active',
    prizes: [
      { tag: '1ST PLACE AI AGENTS', val: '$6,000', desc: 'Top autonomous agent or vision pipeline.', featured: true },
      { tag: '2ND PLACE MODEL HACK', val: '$3,000', desc: 'Fine-tuned open-source model optimization.', featured: false },
      { tag: 'COMMUNITY CHOICE', val: '$1,000', desc: 'Most creative AI interface demo.', featured: false }
    ]
  },
  'th-junior': {
    id: 'th-junior',
    title: 'STARDUST JUNIOR',
    sub: 'U-18 CANOPY SPRINT',
    prize: '$3,000',

    meta: 'OCT 04, 2026 · Online · Under-18 Only',
    status: 'active',
    prizes: [
      { tag: 'JUNIOR CHAMPIONS', val: '$2,000', desc: 'Top high school / young builder crew.', featured: true },
      { tag: 'RISING STAR', val: '$1,000', desc: 'Outstanding technical ambition award.', featured: false }
    ]
  },

  'th-winter': {
    id: 'th-winter',
    title: "WINTER ECLIPSE '25",
    sub: 'ARCHIVED EXPEDITION',
    prize: '$20,000',
    meta: 'DEC 2025 · Concluded · Hall of Legends',
    status: 'archived',
    prizes: [
      { tag: 'PAST GRAND PRIZE', val: '$12,000', desc: 'Won by team Null Pointers (SegFault detector).', featured: true }
    ]
  }
};
let currentHouse = treehouses['th-main'];
let currentRoomKey = 'kitchen';
// Room metadata and content generator
const roomData = {
  kitchen: {
    icon: '🍳',
    tag: 'ROOM 1 · PANTRY & CHESTS',
    title: 'THE KITCHEN & PRIZE POOL',
    generateHtml: (house) => `
      <div style="margin-bottom: 1.2rem;">
        <p style="color: #c7b5a1; font-size: 0.95rem;">Loot chests inside the kitchen pantry overflowing with bounties for <strong>${house.title}</strong>:</p>
      </div>
            <div class="modal-grid-cards">
        ${house.prizes.map(p => `
          <div class="modal-item-box ${p.featured ? 'featured' : ''}">
            <div class="modal-item-tag">${p.tag}</div>
            <div class="modal-item-value">${p.val}</div>
            <p class="modal-item-desc">${p.desc}</p>
          </div>
        `).join('')}
      </div>
        `
  },
  bedroom: {
    icon: '🛏️',
    tag: 'ROOM 2 · COUNCIL REST & CHAMBERS',
    title: 'THE MASTER BEDROOM & COUNCIL',
    generateHtml: () => `
      <div style="margin-bottom: 1.2rem;">
        <p style="color: #c7b5a1; font-size: 0.95rem;">Portraits of the judges and master crafters mounted above the beds in the master suite:</p>
      </div>
      <div class="modal-grid-cards">
        <div class="judge-modal-card">
          <div class="judge-m-avatar"><img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=75" alt="Dr. Elena Marlowe"></div>
          <h4 class="judge-m-name">DR. ELENA MARLOWE</h4>
          <p class="judge-m-role">Principal AI Researcher, Nexus Labs</p>
        </div>
        <div class="judge-modal-card">
          <div class="judge-m-avatar"><img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=75" alt="Kai Andersen"></div>
          <h4 class="judge-m-name">KAI ANDERSEN</h4>
          <p class="judge-m-role">Chief Systems Architect, HexaCloud</p>
        </div>
        <div class="judge-modal-card">
          <div class="judge-m-avatar"><img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=75" alt="Priya Nandakumar"></div>
                  <h4 class="judge-m-name">PRIYA NANDAKUMAR</h4>
          <p class="judge-m-role">VP of Engineering, BitForge</p>
        </div>
        <div class="judge-modal-card">
          <div class="judge-m-avatar"><img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=75" alt="Darius Cole"></div>
          <h4 class="judge-m-name">DARIUS COLE</h4>
          <p class="judge-m-role">Managing Partner, Deep Ventures</p>
        </div>
      </div>
    `
  },
  maproom: {
    icon: '🗺️',
    tag: 'ROOM 3 · LIVING ROOM STUDY',
    title: 'THE CARTOGRAPHY STUDY & VENUE',
    generateHtml: () => `
      <div style="background: #190f09; border: 2px solid #63472e; padding: 1.4rem; border-radius: 6px; margin-bottom: 1.2rem;">
        <div style="display: flex; gap: 0.8rem; align-items: center; margin-bottom: 0.8rem;">
          <span style="font-family: var(--font-pixel); font-size: 0.72rem; color: #55ff55;">COORDINATES:</span>
          <span style="font-family: var(--font-pixel); font-size: 0.72rem; color: #ffd700;">X: 2026 // Y: 64 // Z: -9000</span>
        </div>
        <h4 style="font-family: var(--font-head); color: #fff; font-size: 1.3rem; margin-bottom: 0.4rem;">📍 NEXUS TECH CAMPUS</h4>
        <p style="color: #c7b5a1; font-size: 0.92rem; line-height: 1.5;">A physical sanctuary surrounded by the canopy woods equipped with ultra-fast fiber uplinks, private sleeping pods, showers, and 24/7 maker labs.</p>
      </div>
      <div class="modal-grid-cards">
        <div class="modal-item-box">
          <div class="modal-item-tag">🛏️ BOARDING</div>
          <h5 style="color:#fff; font-size: 1rem; margin-bottom: 0.3rem;">FREE SLEEPING PODS</h5>
          <p class="modal-item-desc">On-site dorms with fresh linens, quiet zones, and charging lockers.</p>
        </div>
        <div class="modal-item-box">
          <div class="modal-item-tag">🍖 PROVISIONS</div>
          <h5 style="color:#fff; font-size: 1rem; margin-bottom: 0.3rem;">ENDLESS MEALS & FUEL</h5>
          <p class="modal-item-desc">Chef-prepared lunches, midnight snack drops, and espresso bars.</p>
        </div>
        <div class="modal-item-box">
          <div class="modal-item-tag">⚡ COMPUTE</div>
          <h5 style="color:#fff; font-size: 1rem; margin-bottom: 0.3rem;">GPU API CREDITS</h5>
          <p class="modal-item-desc">$5,000+ in OpenAI, Anthropic, and AWS/GCP credits per crew.</p>
        </div>
      </div>
    `
  },
  workshop: {
    icon: '⚔️',
    tag: 'ROOM 4 · WORKBENCHES & ANVILS',
    title: 'THE CRAFTING WORKSHOP & REALMS',
    generateHtml: () => `
      <div style="margin-bottom: 1.2rem;">
        <p style="color: #c7b5a1; font-size: 0.95rem;">Six specialized crafting stations positioned around the anvil. Choose your realm:</p>
      </div>
      <div class="modal-grid-cards">
        <div class="modal-item-box">
          <div class="modal-item-tag">AI · CRAFTING TABLE 1</div>
          <h5 style="color:#fff; font-size: 1.05rem; margin-bottom: 0.3rem;">ARTIFICIAL INTELLIGENCE</h5>
          <p class="modal-item-desc">Autonomous agents, LLM tool-calling, multimodal vision, and neural crafting systems.</p>
        </div>
        <div class="modal-item-box">
          <div class="modal-item-tag">W3 · CRAFTING TABLE 2</div>
          <h5 style="color:#fff; font-size: 1.05rem; margin-bottom: 0.3rem;">DECENTRALIZED WEB</h5>
          <p class="modal-item-desc">Zero-knowledge proof tooling, DeFi primitives, and verifiable on-chain protocols.</p>
        </div>
        <div class="modal-item-box">
          <div class="modal-item-tag">SE · CRAFTING TABLE 3</div>
          <h5 style="color:#fff; font-size: 1.05rem; margin-bottom: 0.3rem;">CYBERSECURITY</h5>
          <p class="modal-item-desc">Exploit analyzers, memory safety tools, CTF modules, and impenetrable vaults.</p>
        </div>
        <div class="modal-item-box">
          <div class="modal-item-tag">IO · CRAFTING TABLE 4</div>
          <h5 style="color:#fff; font-size: 1.05rem; margin-bottom: 0.3rem;">HARDWARE + IOT</h5>
          <p class="modal-item-desc">Microcontrollers, mesh radios, robotics, and physical computing bridges.</p>
        </div>
        <div class="modal-item-box">
          <div class="modal-item-tag">OP · CRAFTING TABLE 5</div>
          <h5 style="color:#fff; font-size: 1.05rem; margin-bottom: 0.3rem;">OPEN INNOVATION</h5>
          <p class="modal-item-desc">Unconstrained ambition. If it compiles and builds the future, it counts.</p>
        </div>
        <div class="modal-item-box">
          <div class="modal-item-tag">CT · CRAFTING TABLE 6</div>
          <h5 style="color:#fff; font-size: 1.05rem; margin-bottom: 0.3rem;">CLIMATE TECH</h5>
          <p class="modal-item-desc">Clean energy dispatchers, carbon verification, and planetary regeneration apps.</p>
        </div>
      </div>
    `
  },
  clocktower: {
    icon: '⏳',
    tag: 'ROOM 5 · REDSTONE TIMELINE',
    title: 'THE CLOCKTOWER & EVENT FLOW',
    generateHtml: () => `
      <div style="margin-bottom: 1.2rem;">
        <p style="color: #c7b5a1; font-size: 0.95rem;">The 8-stage expedition schedule charting the 48-hour journey from gates open to victory:</p>
      </div>
      <div class="tl-modal-list">
        <div class="tl-modal-row"><span class="tl-m-time">DAY 0 · 18:00</span><div><h5 class="tl-m-name">VILLAGE GATES OPEN</h5><p class="tl-m-desc">Check-in at Nexus Tech Campus, claim your treehouse pod and badge.</p></div></div>
        <div class="tl-modal-row"><span class="tl-m-time">DAY 0 · 20:00</span><div><h5 class="tl-m-name">OPENING RITUAL</h5><p class="tl-m-desc">Sponsor bounties revealed, API keys distributed, maps unrolled.</p></div></div>
        <div class="tl-modal-row"><span class="tl-m-time">DAY 0 · 21:00</span><div><h5 class="tl-m-name">CRAFTING COMMENCES</h5><p class="tl-m-desc">The countdown ticks. 48 hours of non-stop coding and hacking.</p></div></div>
        <div class="tl-modal-row"><span class="tl-m-time">DAY 1 · 09:00</span><div><h5 class="tl-m-name">COUNCIL MENTORSHIP</h5><p class="tl-m-desc">Judges and domain leaders roam the treehouse pods for feedback.</p></div></div>
        <div class="tl-modal-row"><span class="tl-m-time">DAY 1 · 23:59</span><div><h5 class="tl-m-name">MIDNIGHT BEACON</h5><p class="tl-m-desc">Midnight pizza and energy fuel drops. Optional progress demos.</p></div></div>
        <div class="tl-modal-row"><span class="tl-m-time">DAY 2 · 12:00</span><div><h5 class="tl-m-name">CODE FREEZE & ANCHOR</h5><p class="tl-m-desc">Submissions lock on GitHub & portal. Judging begins.</p></div></div>
        <div class="tl-modal-row"><span class="tl-m-time">DAY 2 · 15:00</span><div><h5 class="tl-m-name">TOP 10 ARENA DEMOS</h5><p class="tl-m-desc">Finalist crews demo live on the canopy amphitheater stage.</p></div></div>
        <div class="tl-modal-row"><span class="tl-m-time">DAY 2 · 18:00</span><div><h5 class="tl-m-name">VICTORY CORONATION</h5><p class="tl-m-desc">Trophies awarded and champions inducted into the Hall of Legends.</p></div></div>
      </div>
    `
  },
  library: {
    icon: '📖',
    tag: 'ROOM 6 · BOOKSHELVES & SCROLLS',
    title: 'THE ENCHANTING LIBRARY & FAQ',
    generateHtml: () => `
      <div style="display: flex; flex-direction: column; gap: 0.8rem;">
        <div style="background: #1c120a; border: 2px solid #63472e; padding: 1.2rem; border-radius: 6px;">
          <h5 style="font-family: var(--font-pixel); color: #ffd700; font-size: 0.8rem; margin-bottom: 0.3rem;">WHO CAN JOIN THE EXPEDITION?</h5>
          <p style="color: #c7b5a1; font-size: 0.88rem;">Any developer, designer, builder, or domain specialist globally. Crews can be 1 to 4 crafters.</p>
        </div>
        <div style="background: #1c120a; border: 2px solid #63472e; padding: 1.2rem; border-radius: 6px;">
          <h5 style="font-family: var(--font-pixel); color: #ffd700; font-size: 0.8rem; margin-bottom: 0.3rem;">IS THERE A BOARDING FEE?</h5>
          <p style="color: #c7b5a1; font-size: 0.88rem;">Zero cost. Registration, sleeping pods, all meals, energy fuel, and compute credits are 100% free.</p>
        </div>
        <div style="background: #1c120a; border: 2px solid #63472e; padding: 1.2rem; border-radius: 6px;">
          <h5 style="font-family: var(--font-pixel); color: #ffd700; font-size: 0.8rem; margin-bottom: 0.3rem;">CAN WE WRITE CODE BEFORE DEPARTURE?</h5>
          <p style="color: #c7b5a1; font-size: 0.88rem;">No code may be written before Day 0 · 21:00. You may brainstorm, recruit your crew, and configure dev tools.</p>
        </div>
        <div style="background: #1c120a; border: 2px solid #63472e; padding: 1.2rem; border-radius: 6px;">
          <h5 style="font-family: var(--font-pixel); color: #ffd700; font-size: 0.8rem; margin-bottom: 0.3rem;">WHO OWNS THE CRAFTED CODE?</h5>
          <p style="color: #c7b5a1; font-size: 0.88rem;">You retain 100% full intellectual property and ownership of everything your crew builds.</p>
        </div>
      </div>
    `
  },
  supply: {
    icon: '📦',
    tag: 'ROOM 7 · SUPPLY CRATE',
    title: 'THE SUPPLY CRATE & REGISTRATION',
    generateHtml: () => `
      <form class="reg-modal-form" id="modal-reg-form">
        <p style="color: #c7b5a1; font-size: 0.92rem;">Register your crew to claim your custom Minecraft Boarding Pass:</p>
        <div class="reg-form-row">
          <div class="reg-field">
            <label for="m-team">CREW / TEAM NAME</label>
            <input type="text" id="m-team" class="pixel-input" placeholder="e.g. Diamond Pickaxes" required>
          </div>
          <div class="reg-field">
            <label for="m-email">CAPTAIN EMAIL</label>
            <input type="email" id="m-email" class="pixel-input" placeholder="captain@canopy.org" required>
          </div>
        </div>
        <div class="reg-field">
          <label for="m-track">PRIMARY CRAFTING REALM</label>
          <select id="m-track" class="pixel-input">
            <option value="ai">Artificial Intelligence (AI)</option>
            <option value="web3">Decentralized Web (W3)</option>
            <option value="cyber">Cybersecurity (SE)</option>
            <option value="iot">Hardware + IoT (IO)</option>
                     <option value="open">Open Innovation (OP)</option>
            <option value="climate">Climate Tech (CT)</option>
          </select>
        </div>
        <button type="submit" class="btn-pixel btn-gold" style="padding: 0.85rem; font-size: 0.85rem;">⚡ CRAFT BOARDING PASS ⚡</button>
        <div id="m-reg-output" style="text-align: center; font-family: var(--font-pixel); font-size: 0.76rem;"></div>
      </form>
    `
  }
};
const roomKeysOrder = ['kitchen', 'bedroom', 'maproom', 'workshop', 'clocktower', 'library', 'supply'];
// ---------- 2. Village Overworld & House Selection ----------
function initVillageMap() {
  // Click markers on the panoramic map
  document.querySelectorAll('.map-house-marker').forEach(marker => {
    marker.addEventListener('click', () => {
      const houseId = marker.getAttribute('data-house-id');
      openTreehouse(houseId);
    });
  });
  // Render quick summary cards below map
  const grid = document.getElementById('treehouses-quick-grid');
  if (grid) {
    grid.innerHTML = Object.values(treehouses).map(th => `
      <div class="th-quick-card" data-house="${th.id}">
        <div class="th-q-header">
          <span style="font-size: 1.4rem;">🏠</span>
          <span class="th-q-prize">${th.prize}</span>
        </div>
        <h4 class="th-q-title">${th.title}</h4>
        <p class="th-q-meta">${th.meta}</p>
        <button class="btn-pixel btn-sm ${th.id === 'th-main' ? 'btn-gold' : ''}">ENTER HOUSE ▶</button>
      </div>
    `).join('');
    grid.querySelectorAll('.th-quick-card').forEach(card => {
      card.addEventListener('click', () => {
        const houseId = card.getAttribute('data-house');
        openTreehouse(houseId);
      });
    });
  }
  const btnLeave = document.getElementById('btn-leave-house');
  if (btnLeave) {
    btnLeave.addEventListener('click', () => {
      showOverworld();
    });
  }
}
function openTreehouse(houseId) {
  playDoorSound();
  currentHouse = treehouses[houseId] || treehouses['th-main'];

  const titleEl = document.getElementById('active-house-name');
  if (titleEl) {
    titleEl.textContent = `${currentHouse.title} — ${currentHouse.sub}`;
  }
  // Switch to interior view
  document.getElementById('view-overworld').classList.remove('active');
  const interior = document.getElementById('view-house-interior');
  interior.classList.add('active');
  window.scrollTo({ top: interior.offsetTop - 70, behavior: 'smooth' });
  // Update Hotbar
  updateHotbarActive('room', 'kitchen');
}
function showOverworld() {
  playDoorSound();
  document.getElementById('view-house-interior').classList.remove('active');
  const overworld = document.getElementById('view-overworld');
  overworld.classList.add('active');
  window.scrollTo({ top: overworld.offsetTop - 70, behavior: 'smooth' });
  closeRoomModal();
  updateHotbarActive('overworld');
}
// ---------- 3. House Cutaway & Room Hotspots ----------
function initHouseCutaway() {
  // Click hotspots on cutaway image
  document.querySelectorAll('.room-hotspot').forEach(spot => {
    spot.addEventListener('click', () => {
      const roomKey = spot.getAttribute('data-room-target');
      openRoomModal(roomKey);
    });
  });
  // Click room strip buttons
  document.querySelectorAll('.room-strip-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const roomKey = btn.getAttribute('data-room');
      openRoomModal(roomKey);
    });
  });
}
// ---------- 4. Minecraft Room Modal GUI (Chest Window) ----------
function initRoomModal() {
  const overlay = document.getElementById('room-modal-overlay');
  const closeBtn = document.getElementById('modal-close-btn');
  const prevBtn = document.getElementById('modal-prev-room');
  const nextBtn = document.getElementById('modal-next-room');
  if (closeBtn) closeBtn.addEventListener('click', closeRoomModal);
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeRoomModal();
    });
  }
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const idx = roomKeysOrder.indexOf(currentRoomKey);
      const prevIdx = (idx - 1 + roomKeysOrder.length) % roomKeysOrder.length;
      openRoomModal(roomKeysOrder[prevIdx]);
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const idx = roomKeysOrder.indexOf(currentRoomKey);
      const nextIdx = (idx + 1) % roomKeysOrder.length;
      openRoomModal(roomKeysOrder[nextIdx]);
    });
  }
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeRoomModal();
  });
}
function openRoomModal(roomKey) {
  playChestSound();
  currentRoomKey = roomKey;
  const data = roomData[roomKey] || roomData.kitchen;
  document.getElementById('modal-room-icon').textContent = data.icon;
  document.getElementById('modal-room-tag').textContent = data.tag;
  document.getElementById('modal-room-title').textContent = data.title;

  const bodyEl = document.getElementById('modal-room-body');
  bodyEl.innerHTML = data.generateHtml(currentHouse);
  // If opening supply crate, attach form listener
  if (roomKey === 'supply') {
    const form = document.getElementById('modal-reg-form');
    const out = document.getElementById('m-reg-output');
    if (form && out) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const t = document.getElementById('m-team').value;
        const m = document.getElementById('m-email').value;
        out.innerHTML = `
          <div style="background: rgba(42, 136, 42, 0.25); border: 2px solid #55ff55; padding: 1rem; border-radius: 6px; margin-top: 1rem;">
            <p style="color: #55ff55;">✔ BOARDING PASS CRAFTED FOR [${t.toUpperCase()}]!</p>
            <p style="color: #c7b5a1; font-size: 0.78rem; margin-top: 0.2rem;">Coordinate signal sent to ${m}. Check your inbox.</p>
          </div>
        `;
        form.reset();
      });
    }
  }
  document.getElementById('room-modal-overlay').classList.add('active');
  // Highlight room strip button
  document.querySelectorAll('.room-strip-btn').forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-room') === roomKey);
  });
  updateHotbarActive('room', roomKey);
}
function closeRoomModal() {
  const overlay = document.getElementById('room-modal-overlay');
  if (overlay) overlay.classList.remove('active');
}
// ---------- 5. Hotbar & Keyboard Shortcuts ----------
function initHotbar() {
  document.querySelectorAll('.hotbar-slot').forEach(slot => {
    slot.addEventListener('click', () => {

      const action = slot.getAttribute('data-action');
      if (slot.id === 'hotbar-sound-slot') {
        toggleAmbience();
        return;
      }
      if (action === 'overworld') {
        showOverworld();
      } else if (action === 'room') {
        const room = slot.getAttribute('data-room');
        // If on overworld, open house first
        if (!document.getElementById('view-house-interior').classList.contains('active')) {
          openTreehouse('th-main');
        }
        openRoomModal(room);
      }
    });
  });
  window.addEventListener('keydown', (e) => {
    if (['INPUT', 'SELECT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
    const num = parseInt(e.key, 10);
    if (num >= 1 && num <= 9) {
      const slot = document.querySelector(`.hotbar-slot[data-key="${num}"]`);
      if (slot) slot.click();
    }
  });
}
function updateHotbarActive(action, roomKey = '') {
  document.querySelectorAll('.hotbar-slot').forEach(slot => {
    if (action === 'overworld' && slot.getAttribute('data-action') === 'overworld') {
      slot.classList.add('active');
    } else if (action === 'room' && slot.getAttribute('data-room') === roomKey) {
      slot.classList.add('active');
    } else if (slot.id !== 'hotbar-sound-slot') {
      slot.classList.remove('active');
    }
  });
}
// ---------- 6. Audio Engine & Sound Synthesis ----------
let audioCtx = null;
let isPlayingAmbience = false;
let ambientInterval = null;
function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}
function playChestSound() {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(420, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(740, ctx.currentTime + 0.12);
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.16);
  } catch (e) { }
}
function playDoorSound() {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(160, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(260, ctx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.2);
  } catch (e) { }
}
function initAmbience() {
  const toggleBtn = document.getElementById('ambience-toggle');
  if (toggleBtn) toggleBtn.addEventListener('click', toggleAmbience);
}
function toggleAmbience() {
  const toggleBtn = document.getElementById('ambience-toggle');
  const slotBtn = document.getElementById('hotbar-sound-slot');
  const ctx = getAudioContext();
  isPlayingAmbience = !isPlayingAmbience;
  if (toggleBtn) toggleBtn.classList.toggle('active', isPlayingAmbience);
  if (slotBtn) slotBtn.classList.toggle('active', isPlayingAmbience);
  if (isPlayingAmbience) {
    playC418Chord();
    ambientInterval = setInterval(playC418Chord, 4500);
  } else {
    clearInterval(ambientInterval);
  }
}
function playC418Chord() {
  if (!audioCtx || !isPlayingAmbience) return;
  const notes = [261.63, 329.63, 392.00, 523.25, 659.25];
  const root = notes[Math.floor(Math.random() * notes.length)];
  const third = root * 1.25;
  const fifth = root * 1.5;
  [root, third, fifth].forEach((freq, idx) => {
    setTimeout(() => {
      if (!isPlayingAmbience) return;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.04, audioCtx.currentTime + 0.8);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 3.8);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 4.0);
    }, idx * 220);
  });
}
// ---------- 7. Countdown Timer ----------
function initCountdown() {
  const daysEl = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  setInterval(update, 1000);
}
// ---------- 5. Ambient Floating Fireflies Canvas ----------
// ---------- 8. Floating Fireflies Canvas ----------
function initFireflies() {
  const canvas = document.getElementById('firefly-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d', { alpha: true });
  let w = (canvas.width = window.innerWidth);
  let h = (canvas.height = window.innerHeight);
  window.addEventListener('resize', () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }, { passive: true });
  const fireflies = [];
  const count = Math.min(45, Math.floor(w / 35));
  for (let i = 0; i < count; i++) {
    fireflies.push({
      x: Math.random() * w,
      y: Math.random() * h,
      radius: Math.random() * 2 + 1,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.3 - 0.1,
      alpha: Math.random() * 0.7 + 0.3,
      pulse: Math.random() * Math.PI * 2,
      color: Math.random() > 0.3 ? '255, 220, 100' : '120, 255, 120'
    });
  }
  function animate() {
    ctx.clearRect(0, 0, w, h);
    for (let i = 0; i < fireflies.length; i++) {
      const f = fireflies[i];
      f.x += f.vx;
      f.y += f.vy;
      f.pulse += 0.03;
      if (f.x < 0) f.x = w;
      if (f.x > w) f.x = 0;
      if (f.y < 0) f.y = h;
      if (f.y > h) f.y = 0;
      const currentAlpha = f.alpha * (0.5 + 0.5 * Math.sin(f.pulse));
      ctx.fillStyle = `rgba(${f.color}, ${currentAlpha.toFixed(2)})`;
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
}
// ---------- 9. Marquee Strip & Top Nav ----------
function initMarquee() {
  const track = document.getElementById('marquee-track');
  if (!track) return;
  const items = [
    '🌲 500 HACKERS IN THE CANOPY',
    '💰 $25,000 PRIZE POOL',
    '⚔️ 6 CRAFTING REALMS',
    '🛏️ FREE BOARDING & FOOD',
    '⏳ 48 HOURS TO CRAFT',
    '📍 NEXUS TECH CAMPUS',
    "⚡ CODE://CLASH '26"
  ];
  const content = items.map(t => `<span class="marquee-item">${t}</span><span class="marquee-sep">◆</span>`).join('');
  track.innerHTML = content + content + content;
}
function initNav() {
  const homeBtn = document.getElementById('nav-home-btn');
  if (homeBtn) {
    homeBtn.addEventListener('click', showOverworld);
  }
  const quickReg = document.getElementById('btn-quick-reg');
  if (quickReg) {
    quickReg.addEventListener('click', () => {
      if (!document.getElementById('view-house-interior').classList.contains('active')) {
        openTreehouse('th-main');
      }
      openRoomModal('supply');
    });
  }
}


