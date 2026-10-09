import gsap from 'gsap';

export const INVOICE_TEMPLATES = [
  {
    id: 'classic',
    name: 'Classic',
    isPro: false,
    badge: '',
    description: 'Clean, structured, and timeless. Built for traditional commerce, retail, and corporate billing.',
    command: 'use Classic',
    render: () => `
      <div class="inv-doc inv-classic">
        <div class="inv-classic-header">
          <div class="inv-classic-brand">
            <span class="inv-classic-dot"></span>
            <div>
              <h4>Kemi Adeyemi Studio</h4>
              <p>Lekki Phase 1, Lagos</p>
            </div>
          </div>
          <div class="inv-classic-meta-top">
            <span class="inv-classic-tag">INVOICE</span>
            <p><strong>#AB3224-01</strong></p>
            <p>21 Sept 2026</p>
          </div>
        </div>

        <div class="inv-classic-parties">
          <div>
            <span class="inv-label">BILLED TO</span>
            <p><strong>Zenith Homes</strong></p>
            <p>12 Admiralty Way, Lekki</p>
          </div>
          <div class="inv-text-right">
            <span class="inv-label">PAYMENT DUE</span>
            <p><strong>25 Sept 2026</strong></p>
            <p>Net 4 days</p>
          </div>
        </div>

        <table class="inv-classic-table">
          <thead>
            <tr>
              <th>ITEM</th>
              <th>QTY</th>
              <th class="inv-text-right">PRICE</th>
              <th class="inv-text-right">TOTAL</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Exterior 3D render</strong>
                <p>Four angles, 4K resolution</p>
              </td>
              <td>1</td>
              <td class="inv-text-right">₦250,000</td>
              <td class="inv-text-right">₦250,000</td>
            </tr>
            <tr>
              <td>
                <strong>Interior stills</strong>
                <p>Living, kitchen, two bedrooms</p>
              </td>
              <td>4</td>
              <td class="inv-text-right">₦20,000</td>
              <td class="inv-text-right">₦80,000</td>
            </tr>
            <tr>
              <td>
                <strong>Revision round</strong>
                <p>One round, before final sign-off</p>
              </td>
              <td>1</td>
              <td class="inv-text-right">₦20,000</td>
              <td class="inv-text-right">₦20,000</td>
            </tr>
          </tbody>
        </table>

        <div class="inv-classic-footer">
          <div class="inv-classic-note">
            <p>Pay online: <strong>bylled.com/q/77t2q0f</strong></p>
            <span class="inv-watermark">Made with Bylled</span>
          </div>
          <div class="inv-classic-totals">
            <div class="inv-total-row"><span>Subtotal</span><span>₦350,000</span></div>
            <div class="inv-total-row"><span>VAT (0%)</span><span>₦0</span></div>
            <div class="inv-total-row inv-total-highlight">
              <span>Amount Due</span>
              <strong>₦350,000</strong>
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 'wordmark',
    name: 'Wordmark',
    isPro: false,
    badge: '',
    description: 'Bold typographic branding with high visual clarity. For agencies, studios, and modern merchants.',
    command: 'use Wordmark',
    render: () => `
      <div class="inv-doc inv-wordmark">
        <div class="inv-wm-hero">
          <h2 class="inv-wm-title">INVOICE</h2>
          <div class="inv-wm-studio">
            <span class="inv-wm-pill">KA</span>
            <div>
              <h4>Kemi Adeyemi Studio</h4>
              <p>Lagos, Nigeria</p>
            </div>
          </div>
        </div>

        <div class="inv-wm-grid">
          <div>
            <span class="inv-label">CLIENT</span>
            <p class="inv-wm-val">Zenith Homes</p>
            <p class="inv-muted">12 Admiralty Way, Lekki</p>
          </div>
          <div>
            <span class="inv-label">INVOICE NO</span>
            <p class="inv-wm-val">AB3224-01</p>
          </div>
          <div>
            <span class="inv-label">DATE</span>
            <p class="inv-wm-val">21.09.2026</p>
          </div>
          <div>
            <span class="inv-label">DUE</span>
            <p class="inv-wm-val">25.09.2026</p>
          </div>
        </div>

        <div class="inv-wm-items">
          <div class="inv-wm-item">
            <div>
              <span class="inv-wm-num">01</span>
              <div>
                <strong>Exterior 3D render</strong>
                <p>Four angles, 4K</p>
              </div>
            </div>
            <span class="inv-wm-price">₦250,000</span>
          </div>
          <div class="inv-wm-item">
            <div>
              <span class="inv-wm-num">02</span>
              <div>
                <strong>Interior stills</strong>
                <p>4 units at ₦20,000</p>
              </div>
            </div>
            <span class="inv-wm-price">₦80,000</span>
          </div>
          <div class="inv-wm-item">
            <div>
              <span class="inv-wm-num">03</span>
              <div>
                <strong>Revision round</strong>
                <p>Pre-signoff final adjustments</p>
              </div>
            </div>
            <span class="inv-wm-price">₦20,000</span>
          </div>
        </div>

        <div class="inv-wm-bottom">
          <div class="inv-wm-stamp">
            <span class="inv-watermark">Made with Bylled</span>
            <p>bylled.com/q/77t2q0f</p>
          </div>
          <div class="inv-wm-total">
            <span class="inv-label">TOTAL PAYABLE</span>
            <h3>₦350,000</h3>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 'monolith',
    name: 'Monolith',
    isPro: true,
    badge: 'Pro',
    description: 'High-contrast architecture with an iconic vertical spine. For architectural practices and luxury brands.',
    command: 'use Monolith',
    render: () => `
      <div class="inv-doc inv-monolith">
        <div class="inv-mono-spine">
          <span>INVOICE</span>
          <div class="inv-mono-spine-bottom">#AB3224</div>
        </div>
        <div class="inv-mono-body">
          <div class="inv-mono-header">
            <div>
              <h3>KEMI ADEYEMI STUDIO</h3>
              <p>Architecture & 3D Visualization</p>
            </div>
            <div class="inv-text-right">
              <span class="inv-mono-status">PENDING</span>
              <p>21 SEPT 2026</p>
            </div>
          </div>

          <div class="inv-mono-client-box">
            <div>
              <span class="inv-label">BILLED TO</span>
              <p><strong>Zenith Homes</strong></p>
              <p>Lekki, Lagos</p>
            </div>
            <div class="inv-text-right">
              <span class="inv-label">PROJECT</span>
              <p><strong>Lekki Duplex 3D</strong></p>
              <p>Due 25 Sept 2026</p>
            </div>
          </div>

          <div class="inv-mono-list">
            <div class="inv-mono-row inv-mono-head">
              <span>DESCRIPTION</span>
              <span class="inv-text-right">AMOUNT</span>
            </div>
            <div class="inv-mono-row">
              <div>
                <strong>Exterior 3D render</strong>
                <small>4 angles, 4K production</small>
              </div>
              <span class="inv-text-right">₦250,000</span>
            </div>
            <div class="inv-mono-row">
              <div>
                <strong>Interior stills</strong>
                <small>4 bedrooms & living room</small>
              </div>
              <span class="inv-text-right">₦80,000</span>
            </div>
            <div class="inv-mono-row">
              <div>
                <strong>Revision round</strong>
                <small>Single round before delivery</small>
              </div>
              <span class="inv-text-right">₦20,000</span>
            </div>
          </div>

          <div class="inv-mono-banner">
            <div>
              <span class="inv-label">AMOUNT DUE</span>
              <h2>₦350,000</h2>
            </div>
            <div class="inv-text-right">
              <p>Pay online at bylled.com</p>
              <small>Instant Bank Transfer / Card</small>
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 'editorial',
    name: 'Editorial',
    isPro: true,
    badge: 'Pro',
    description: 'Magazine-inspired layouts with generous tracking and fine hairline rules. For creative directors and stylists.',
    command: 'use Editorial',
    render: () => `
      <div class="inv-doc inv-editorial">
        <div class="inv-edit-masthead">
          <div class="inv-edit-brand">
            <span class="inv-edit-mark">●</span>
            <span>KEMI ADEYEMI STUDIO</span>
          </div>
          <span class="inv-edit-date">ISSUE NO. AB3224 · 21.09.2026</span>
        </div>

        <h2 class="inv-edit-headline">Duplex render,<br>Lekki.</h2>

        <div class="inv-edit-divider"></div>

        <div class="inv-edit-meta">
          <div>
            <span class="inv-label">COMMISSIONED BY</span>
            <p>Zenith Homes</p>
            <small>12 Admiralty Way, Lekki</small>
          </div>
          <div>
            <span class="inv-label">TIMELINE</span>
            <p>21 Sept — 25 Sept 2026</p>
            <small>Due upon receipt</small>
          </div>
          <div class="inv-text-right">
            <span class="inv-label">NET BALANCE</span>
            <h3 class="inv-edit-big-num">₦350,000</h3>
          </div>
        </div>

        <div class="inv-edit-table">
          <div class="inv-edit-line">
            <span>01 Exterior 3D render (4 angles, 4K)</span>
            <span>₦250,000</span>
          </div>
          <div class="inv-edit-line">
            <span>02 Interior stills (4 perspectives)</span>
            <span>₦80,000</span>
          </div>
          <div class="inv-edit-line">
            <span>03 Revision round (pre-signoff)</span>
            <span>₦20,000</span>
          </div>
        </div>

        <div class="inv-edit-footer">
          <div class="inv-edit-sig">
            <svg width="100" height="32" viewBox="0 0 120 40" fill="none" stroke="#111" stroke-width="1.6" stroke-linecap="round">
              <path d="M10 28 C 25 10, 30 5, 38 22 C 45 35, 52 8, 62 18 C 72 28, 85 12, 105 24 M40 22 L 95 18" />
            </svg>
            <p>Kemi Adeyemi, Lead</p>
          </div>
          <div class="inv-text-right">
            <p>Secure Bylled Link</p>
            <small>bylled.com/q/77t2q0f</small>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 'atelier',
    name: 'Atelier',
    isPro: true,
    badge: 'Pro',
    description: 'Centred, serif, with a monogram and dotted leaders. For studios that charge for taste.',
    command: 'use Atelier',
    render: () => `
      <div class="inv-doc inv-atelier">
        <div class="inv-atelier-top">
          <div class="inv-atelier-monogram">KA</div>
          <h3 class="inv-atelier-studio">KEMI ADEYEMI STUDIO</h3>
          <p class="inv-atelier-sub">Lekki Phase 1, Lagos</p>
        </div>

        <div class="inv-atelier-rules"></div>

        <div class="inv-atelier-center">
          <h2 class="inv-atelier-title">Invoice</h2>
          <p class="inv-atelier-meta">NO. AB3224-01 · 21 SEPT 2026</p>
        </div>

        <div class="inv-atelier-parties">
          <div class="inv-atelier-col">
            <span class="inv-atelier-label">PREPARED FOR</span>
            <p class="inv-atelier-val">Zenith Homes</p>
            <p class="inv-atelier-muted">12 Admiralty Way, Lekki</p>
          </div>
          <div class="inv-atelier-col inv-text-right">
            <span class="inv-atelier-label">PAYABLE BY</span>
            <p class="inv-atelier-val">25 Sept 2026</p>
            <p class="inv-atelier-muted">Four days from issue</p>
          </div>
        </div>

        <div class="inv-atelier-items">
          <div class="inv-atelier-row">
            <div class="inv-atelier-desc">
              <strong>Exterior 3D render</strong>
              <small>Four angles, 4K</small>
            </div>
            <div class="inv-atelier-dots"></div>
            <div class="inv-atelier-amt">₦250,000</div>
          </div>
          <div class="inv-atelier-row">
            <div class="inv-atelier-desc">
              <strong>Interior stills</strong>
              <small>Living, kitchen, two bedrooms · 4 at ₦20,000</small>
            </div>
            <div class="inv-atelier-dots"></div>
            <div class="inv-atelier-amt">₦80,000</div>
          </div>
          <div class="inv-atelier-row">
            <div class="inv-atelier-desc">
              <strong>Revision round</strong>
              <small>One round, before sign-off</small>
            </div>
            <div class="inv-atelier-dots"></div>
            <div class="inv-atelier-amt">₦20,000</div>
          </div>
        </div>

        <div class="inv-atelier-total-block">
          <span class="inv-atelier-total-label">AMOUNT DUE</span>
          <div class="inv-atelier-total-amt">₦350,000</div>
          <p class="inv-atelier-vat">Inclusive of VAT at 0% · Subtotal ₦350,000</p>
        </div>

        <div class="inv-atelier-bottom">
          <div class="inv-atelier-signature">
            <svg width="105" height="34" viewBox="0 0 120 40" fill="none" stroke="#222" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
              <path d="M10 28 C 25 10, 30 5, 38 22 C 45 35, 52 8, 62 18 C 72 28, 85 12, 105 24 M40 22 L 95 18" />
            </svg>
            <p><strong>Kemi Adeyemi</strong></p>
            <small>Principal</small>
          </div>
          <p class="inv-atelier-payment-link">Pay online at <strong>bylled.com/q/77t2q0f</strong> · card, transfer or USSD</p>
        </div>
      </div>
    `
  },
  {
    id: 'statement',
    name: 'Statement',
    isPro: true,
    badge: 'Pro',
    description: 'Unapologetically bold with a dark summary banner. For high-ticket consultants, founders, and keynotes.',
    command: 'use Statement',
    render: () => `
      <div class="inv-doc inv-statement">
        <div class="inv-stmt-banner">
          <div class="inv-stmt-banner-top">
            <div class="inv-stmt-brand">
              <span class="inv-stmt-icon">●</span>
              <span>Kemi Adeyemi Studio</span>
            </div>
            <span class="inv-stmt-chip">DUE IN 4 DAYS</span>
          </div>
          <div class="inv-stmt-hero-amt">
            <span>TOTAL AMOUNT DUE</span>
            <h2>₦350,000</h2>
          </div>
        </div>

        <div class="inv-stmt-body">
          <div class="inv-stmt-parties">
            <div>
              <span class="inv-label">CLIENT</span>
              <p><strong>Zenith Homes</strong></p>
              <small>Lekki, Lagos</small>
            </div>
            <div class="inv-text-right">
              <span class="inv-label">INVOICE</span>
              <p><strong>#AB3224-01</strong></p>
              <small>21 Sept 2026</small>
            </div>
          </div>

          <div class="inv-stmt-lines">
            <div class="inv-stmt-line">
              <span>Exterior 3D render (4 angles, 4K)</span>
              <strong>₦250,000</strong>
            </div>
            <div class="inv-stmt-line">
              <span>Interior stills (4 views)</span>
              <strong>₦80,000</strong>
            </div>
            <div class="inv-stmt-line">
              <span>Revision round</span>
              <strong>₦20,000</strong>
            </div>
          </div>

          <div class="inv-stmt-foot">
            <p>Pay online securely with Bylled</p>
            <small>bylled.com/q/77t2q0f</small>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 'ledger',
    name: 'Ledger',
    isPro: true,
    badge: 'Pro',
    description: 'Double-entry elegance with grid precision. For accountants, supply chains, and technical trades.',
    command: 'use Ledger',
    render: () => `
      <div class="inv-doc inv-ledger">
        <div class="inv-ledger-header">
          <div>
            <h3 class="inv-ledger-logo">LEDGER // 01</h3>
            <p class="inv-ledger-company">Kemi Adeyemi Studio · Lagos</p>
          </div>
          <div class="inv-text-right">
            <span class="inv-ledger-code">REF: AB3224-01</span>
            <p>DATE: 2026-09-21</p>
          </div>
        </div>

        <div class="inv-ledger-meta-bar">
          <div><span>DEBTOR:</span> Zenith Homes</div>
          <div><span>TERMS:</span> Net 4</div>
          <div><span>DUE:</span> 2026-09-25</div>
        </div>

        <div class="inv-ledger-grid">
          <div class="inv-lg-row inv-lg-head">
            <span>LINE DESCRIPTION</span>
            <span class="inv-text-center">QTY</span>
            <span class="inv-text-right">RATE</span>
            <span class="inv-text-right">AMOUNT</span>
          </div>
          <div class="inv-lg-row">
            <span>Exterior 3D render (4K)</span>
            <span class="inv-text-center">1</span>
            <span class="inv-text-right">250,000</span>
            <span class="inv-text-right">250,000</span>
          </div>
          <div class="inv-lg-row">
            <span>Interior stills</span>
            <span class="inv-text-center">4</span>
            <span class="inv-text-right">20,000</span>
            <span class="inv-text-right">80,000</span>
          </div>
          <div class="inv-lg-row">
            <span>Revision round</span>
            <span class="inv-text-center">1</span>
            <span class="inv-text-right">20,000</span>
            <span class="inv-text-right">20,000</span>
          </div>
        </div>

        <div class="inv-ledger-total-box">
          <div class="inv-ledger-total-row">
            <span>SUBTOTAL NGN</span>
            <span>350,000</span>
          </div>
          <div class="inv-ledger-total-row inv-ledger-final">
            <span>BALANCE DUE NGN</span>
            <strong>₦350,000</strong>
          </div>
        </div>

        <div class="inv-ledger-footer">
          <span>CLEARED VIA BYLLED COMMERCE SYSTEM</span>
          <span>bylled.com/q/77t2q0f</span>
        </div>
      </div>
    `
  },
  {
    id: 'folio',
    name: 'Folio',
    isPro: true,
    badge: 'Pro',
    description: 'Split-rail metadata navigation with solid accent blocks. For industrial designers and makers.',
    command: 'use Folio',
    render: () => `
      <div class="inv-doc inv-folio">
        <div class="inv-folio-rail">
          <div class="inv-folio-avatar">KA</div>
          <div class="inv-folio-details">
            <span class="inv-label">STUDIO</span>
            <p>Kemi Adeyemi</p>
            <span class="inv-label">ISSUED</span>
            <p>21 Sep 2026</p>
            <span class="inv-label">DUE</span>
            <p>25 Sep 2026</p>
            <span class="inv-label">REF</span>
            <p>#AB3224</p>
          </div>
        </div>

        <div class="inv-folio-main">
          <div class="inv-folio-head">
            <h2>Invoice</h2>
            <p>Billed to Zenith Homes</p>
          </div>

          <div class="inv-folio-lines">
            <div class="inv-folio-line">
              <div>
                <strong>Exterior 3D render</strong>
                <small>4 angles, 4K rendering</small>
              </div>
              <span>₦250,000</span>
            </div>
            <div class="inv-folio-line">
              <div>
                <strong>Interior stills</strong>
                <small>Living & bedrooms (x4)</small>
              </div>
              <span>₦80,000</span>
            </div>
            <div class="inv-folio-line">
              <div>
                <strong>Revision round</strong>
                <small>One round sign-off</small>
              </div>
              <span>₦20,000</span>
            </div>
          </div>

          <div class="inv-folio-total">
            <span class="inv-label">TOTAL AMOUNT DUE</span>
            <div class="inv-folio-tag">
              <span>₦350,000</span>
            </div>
          </div>

          <div class="inv-folio-foot">
            <small>bylled.com/q/77t2q0f</small>
          </div>
        </div>
      </div>
    `
  }
];

export class InvoiceTemplatesShowcase {
  constructor(container) {
    this.container = container;
    this.currentIndex = 4; // Default to 'Atelier' (5th item, index 4)
    this.previewEl = container.querySelector('.index-invoices-preview-card');
    this.activeNameEl = container.querySelector('.index-invoices-active-name');
    this.activeBadgeEl = container.querySelector('.index-invoices-active-badge');
    this.counterEl = container.querySelector('.index-invoices-counter');
    this.descEl = container.querySelector('.index-invoices-desc');
    this.promptEl = container.querySelector('.index-invoices-prompt');
    this.prevBtn = container.querySelector('.index-invoices-nav-prev');
    this.nextBtn = container.querySelector('.index-invoices-nav-next');
    this.thumbnails = container.querySelectorAll('.index-invoices-thumb');

    this.init();
  }

  init() {
    this.updateUI(false);

    // Event listeners for thumbnails
    this.thumbnails.forEach((thumb, index) => {
      thumb.addEventListener('click', () => {
        if (this.currentIndex === index) return;
        this.currentIndex = index;
        this.updateUI(true);
      });
    });

    // Prev / Next button listeners
    this.prevBtn?.addEventListener('click', () => {
      this.currentIndex = (this.currentIndex - 1 + INVOICE_TEMPLATES.length) % INVOICE_TEMPLATES.length;
      this.updateUI(true);
    });

    this.nextBtn?.addEventListener('click', () => {
      this.currentIndex = (this.currentIndex + 1) % INVOICE_TEMPLATES.length;
      this.updateUI(true);
    });
  }

  updateUI(animate = true) {
    const active = INVOICE_TEMPLATES[this.currentIndex];
    if (!active) return;

    // Update thumbnail active states
    this.thumbnails.forEach((thumb, idx) => {
      thumb.classList.toggle('active', idx === this.currentIndex);
      thumb.setAttribute('aria-selected', idx === this.currentIndex ? 'true' : 'false');
    });

    // Update bottom metadata
    if (this.activeNameEl) this.activeNameEl.textContent = active.name;
    if (this.activeBadgeEl) {
      if (active.isPro) {
        this.activeBadgeEl.style.display = 'inline-flex';
        this.activeBadgeEl.textContent = 'Pro';
      } else {
        this.activeBadgeEl.style.display = 'none';
      }
    }

    if (this.counterEl) {
      this.counterEl.textContent = `${this.currentIndex + 1} / ${INVOICE_TEMPLATES.length}`;
    }

    if (this.descEl) {
      this.descEl.textContent = active.description;
    }

    if (this.promptEl) {
      this.promptEl.innerHTML = `Say <strong>“${active.command}”</strong> in the chat and every quote, invoice and receipt you send from then on uses it. Free documents carry a small <strong>Made with Bylled</strong> line; on Pro they carry your branding alone.`;
    }

    // Render Preview
    if (this.previewEl) {
      if (animate) {
        gsap.to(this.previewEl, {
          opacity: 0,
          y: 8,
          duration: 0.16,
          ease: 'power1.in',
          onComplete: () => {
            this.previewEl.innerHTML = active.render();
            gsap.fromTo(this.previewEl,
              { opacity: 0, y: -8 },
              { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' }
            );
          }
        });
      } else {
        this.previewEl.innerHTML = active.render();
      }
    }
  }
}
