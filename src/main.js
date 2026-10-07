import './style.css';
import gsap from 'gsap';
import { Observer } from 'gsap/Observer';
import { HeroDistortion } from './modules/heroDistort.js';
import { PeepsTrail } from './modules/peepsTrail.js';
import { CompaniesSlider } from './modules/companiesSlider.js';
import { setupIntroSplit } from './modules/introSplit.js';
import { setupPixelTransition } from './modules/pixelTransition.js';
import { showToast } from './modules/toast.js';

gsap.registerPlugin(Observer);

// Register GSAP counter effect
gsap.registerEffect({
  name: "counter",
  extendTimeline: true,
  defaults: { end: 0, duration: 0.5, ease: "power1", increment: 1 },
  effect: (targets, config) => {
    const tl = gsap.timeline();
    const cleanNum = parseFloat(targets[0].innerText.replace(/,/g, "")) || 0;
    targets[0].innerText = cleanNum;
    return tl.to(targets, {
      duration: config.duration,
      innerText: config.end,
      snap: { innerText: config.increment },
      modifiers: {
        innerText: (val) => {
          return Math.floor(gsap.utils.snap(config.increment, val))
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
      },
      ease: config.ease
    });
  }
});

const peeps = [
  { name: "somtochukwu-ifezue", url: "/team/Somto.webp" },
  { name: "joshua-chibueze", url: "/images/noimage.webp" },
  { name: "yvonne-momah", url: "/team/Yvonne.webp" },
  { name: "uzor-ezeh", url: "/images/noimage.webp" },
  { name: "tuoyo-iwetan", url: "/team/Tuoyo.webp" },
  { name: "ekong-victoria", url: "/team/Victoria.webp" },
  { name: "adio-azeez", url: "/images/noimage.webp" },
  { name: "peter-ajanwachuku", url: "/team/Peter.webp" },
  { name: "oluwafemi-davidson", url: "/team/Femi.webp" },
  { name: "livingstone-bakams-bodmas", url: "/images/noimage.webp" },
  { name: "chidumebi-ohiri", url: "/team/Dumebi.webp" },
  { name: "dada-teniola-emmanuel", url: "/team/Teniola.webp" },
  { name: "chiemezuo-akujobi", url: "/team/Chimezuo.webp" },
  { name: "mfon-ekwere", url: "/images/noimage.webp" },
  { name: "saviour-eking", url: "/images/noimage.webp" },
  { name: "utibeabasi-akaniyene", url: "/images/noimage.webp" },
  { name: "goodness-urama", url: "/team/Goodness.webp" },
  { name: "ayomide-owolana", url: "/images/noimage.webp" },
  { name: "onuigbo-david", url: "/images/noimage.webp" },
  { name: "tobi-adesanya", url: "/images/noimage.webp" },
  { name: "israel-tochukwu-ekebafe", url: "/images/noimage.webp" },
  { name: "philip-olamilekan", url: "/team/Philip.webp" },
  { name: "milton-doibo", url: "/team/Milton.webp" },
  { name: "toluwalope-adeniji", url: "/team/Tolu.webp" },
  { name: "funmilola-adeniyi", url: "/team/Funmi.webp" },
  { name: "chiamaka-okwara", url: "/team/Chiamaka.webp" },
  { name: "daniel-ezeh", url: "/images/noimage.webp" },
  { name: "ebube-onyema", url: "/team/Ebube.webp" },
  { name: "ibileke-blessing", url: "/images/noimage.webp" },
  { name: "emmanuella-ogechi-james", url: "/team/James.webp" },
  { name: "oloruntosin-ibrahim", url: "/images/noimage.webp" }
];

document.addEventListener('DOMContentLoaded', async () => {
  const isMobile = window.innerWidth < 768;

  // 1. Setup split typography
  setupIntroSplit();

  // 2. Setup Pixel page transition
  setupPixelTransition();

  // 3. Remove preloading class
  document.querySelector('.page')?.classList.remove('preloading');
  document.querySelector('.viewport')?.classList.remove('preloading');

  // 4. Hero WebGL interactive distortion
  const heroMedia = document.querySelector('.index-hero-media');
  let heroDistort;
  if (heroMedia) {
    heroDistort = new HeroDistortion(heroMedia);
  }

  // 5. Companies 3D carousel
  const compSection = document.querySelector('.index-companies');
  if (compSection) {
    new CompaniesSlider(compSection);
  }

  // 6. Peeps Three.js hover image trail
  if (!isMobile) {
    const peepsTrail = new PeepsTrail(peeps);
    const peepsCanvas = document.querySelector('#peeps canvas');
    const uPos = { x: 0, y: 0 };
    window.addEventListener('pointermove', (e) => {
      uPos.x = e.clientX;
      uPos.y = e.clientY;
      if (peepsCanvas) {
        gsap.to(peepsCanvas, { x: uPos.x, y: uPos.y, duration: 0.35, ease: 'power2.out' });
      }
      peepsTrail?.updateCursor(e);
    });
  }

  // 7. Services aside pixel cells hover interaction
  document.querySelectorAll('.index-services aside div').forEach((div) => {
    div.addEventListener('mouseenter', () => {
      div.style.opacity = '1';
      div.style.transition = 'opacity 0s ease';
    });
    div.addEventListener('mouseleave', () => {
      div.style.opacity = '0';
      div.style.transition = 'opacity 1s ease-out';
    });
  });

  // 8. Mobile hamburger menu
  const hamburger = document.querySelector('.index-header-hamburger');
  const mobileMenu = document.getElementById('index-mobile-menu');
  const mobileClose = document.querySelector('.index-header-mobile-close');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.style.display = 'block';
      hamburger.setAttribute('aria-expanded', 'true');
    });
    mobileClose?.addEventListener('click', () => {
      mobileMenu.style.display = 'none';
      hamburger.setAttribute('aria-expanded', 'false');
    });
    document.querySelectorAll('.index-header-mobile-nav a').forEach((a) => {
      a.addEventListener('click', () => {
        mobileMenu.style.display = 'none';
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 9. FAQ accordion
  document.querySelectorAll('.index-footer ul li').forEach((li) => {
    li.addEventListener('click', () => {
      const isActive = li.classList.contains('active');
      document.querySelectorAll('.index-footer ul li').forEach((el) => el.classList.remove('active'));
      if (!isActive) {
        li.classList.add('active');
      }
    });
  });

  // 10. Copy email button
  const copyBtn = document.querySelector('.index-footer button');
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText('contact@livelabs.africa');
        showToast('Email copied to clipboard!');
      } catch (err) {
        showToast('contact@livelabs.africa');
      }
    });
  }

  // 11. Hero entrance intro timeline
  function createHeroIntroTimeline() {
    const delays = [0.9, 0.7, 0.5, 0.3, 0.1, 0.1, 0.2, 0.4, 0.6, 0.8];
    const tl = gsap.timeline({
      delay: 0.25,
      defaults: { ease: 'power2.out', duration: 0.75 },
    });

    if (isMobile) {
      tl.set('.index-hero, .index-header', { autoAlpha: 1 })
        .fromTo('.index-hero h1 i',
          { yPercent: -100, clipPath: 'inset(100% 0% 0% 0%)' },
          {
            yPercent: 0,
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 0.75,
            delay: (i) => delays[i] / 2,
            ease: 'expo'
          }
        )
        .to('.index-hero-media div', {
          autoAlpha: 0,
          duration: 0.08,
          ease: 'power2.inOut',
          stagger: { amount: 0.8, from: 'random', ease: 'power2.in' }
        }, '<')
        .to('.index-hero-media', {
          y: '20rem',
          clipPath: 'inset(0% 0% 0rem 0%)',
          duration: 1,
          ease: 'power2.inOut'
        }, 1)
        .set('.index-intro', { autoAlpha: 1 });
      return tl;
    }

    tl.set('.index-hero, .index-header', { autoAlpha: 1 })
      .fromTo('.index-hero h1 i',
        { yPercent: -100, clipPath: 'inset(100% 0% 0% 0%)' },
        {
          yPercent: 0,
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 0.75,
          delay: (i) => delays[i] / 2,
          ease: 'expo'
        }
      )
      .to('.index-hero h1 span:nth-of-type(2)', {
        y: '8rem',
        duration: 1,
        ease: 'power2.inOut'
      }, 1)
      .to('.index-hero h1 span:nth-of-type(1)', {
        clipPath: 'inset(0rem 0rem 6.4rem 0rem)',
        duration: 1,
        ease: 'power2.inOut'
      }, 1)
      .to('.index-hero-media div', {
        autoAlpha: 0,
        duration: 0.08,
        ease: 'power2.inOut',
        stagger: { amount: 0.8, from: 'random', ease: 'power2.in' }
      }, '<')
      .to('.index-hero-media', {
        y: '20rem',
        clipPath: 'inset(0% 0% 0rem 0%)',
        duration: 1,
        ease: 'power2.inOut'
      }, 1)
      .fromTo('.index-header',
        { y: '-100vh', yPercent: 0 },
        {
          y: '-100vh',
          yPercent: 92,
          duration: 0.75,
          ease: 'power2.inOut'
        }, 1.25);

    return tl;
  }

  // 12. Master Timeline and Step-Based Scroll Orchestration
  if (isMobile) {
    // Mobile mode: animate stats once visible
    gsap.timeline()
      .counter(".index-team [data-one] h4 span", { end: 78, duration: 1, ease: "steps(10)" })
      .counter(".index-team [data-two] h4", { end: 20, duration: 1, ease: "steps(10)" })
      .counter(".index-team [data-three] h4", { end: 31340, duration: 1, ease: "steps(10)" })
      .counter(".index-team [data-four] h4", { end: 7, duration: 1, ease: "steps(10)" });
    return;
  }

  // Desktop Master Timeline
  const m = "sine.inOut";
  const v = 1;
  gsap.set(".index section", { autoAlpha: 1 });

  const masterTL = gsap.timeline({
    paused: true,
    defaults: { ease: m },
    onUpdate: () => {
      if (masterTL.progress() === 1) masterTL.progress(0);
    }
  });

  // Step 1: Hero to Intro (0 to 1)
  masterTL
    .fromTo(".index-hero",
      { y: "0vh", scale: 1 },
      { y: "-100vh", scale: 1, ease: m, background: "#101010", duration: v },
      0
    )
    .fromTo(".index-header",
      { yPercent: 92 },
      { yPercent: 100, backgroundColor: "#101010", ease: m, duration: v },
      0
    )
    .fromTo(".index-intro",
      { y: "0vh", autoAlpha: 0 },
      { y: "-100vh", ease: m, autoAlpha: 1, duration: v },
      0
    )
    .fromTo(".index-intro-line",
      { yPercent: 100, clipPath: "inset(0% 0% 100% 0%)", autoAlpha: 0.5 },
      { yPercent: 0, clipPath: "inset(0% 0% 0% 0%)", autoAlpha: 1, ease: "power2.out", duration: 0.5, stagger: { amount: 1 } },
      0
    )
    .from(".index-intro-video",
      { y: "25vh", ease: "power1.out", duration: 0.85, scale: 0 },
      0.5
    )
    .addPause()

    // Step 2: Intro video expands (1.5 to 2.6)
    .to(".index-intro-text, .index-intro h2",
      { y: "-50rem", autoAlpha: 0, ease: m, duration: v },
      1.5
    )
    .to(".index-intro-video",
      { scale: 1, x: "-60rem", y: "-36rem", ease: m, duration: v },
      1.5
    )
    .from(".index-intro-video div:nth-of-type(2)", { scale: 0, ease: "ease.out", duration: 0.2 }, 1.6)
    .from(".index-intro-video div:nth-of-type(1)", { scale: 0, ease: "ease.out", duration: 0.2 }, 1.8)
    .from(".index-intro-video div:nth-of-type(3)", { scale: 0, ease: "none", duration: 0.2 }, 2.0)
    .from(".index-intro-video div:nth-of-type(4)", { scaleY: 0, ease: "none", duration: 0.2 }, 2.2)
    .from(".index-intro-video div:nth-of-type(5)", { scaleY: 0, ease: "ease.out", duration: 0.2 }, 2.4)
    .from(".index-intro-video div:nth-of-type(6)", { scale: 0, ease: "ease.out", duration: 0.2 }, 1.6)
    .from(".index-intro-video div:nth-of-type(7)", { scale: 0, ease: "ease.out", duration: 0.2 }, 1.8)
    .from(".index-intro-video div:nth-of-type(8)", { scale: 0, ease: "ease.out", duration: 0.2 }, 2.0)
    .from(".index-intro-video div:nth-of-type(9)", { scale: 0, ease: "ease.out", duration: 0.2 }, 2.2)
    .from(".index-intro-video div:nth-of-type(14)", { scaleY: 0, ease: "none", duration: 0.2 }, 1.6)
    .from(".index-intro-video div:nth-of-type(13)", { scaleY: 0, ease: "ease.out", duration: 0.2 }, 1.8)
    .from(".index-intro-video div:nth-of-type(12)", { scale: 0, ease: "ease.out", duration: 0.2 }, 2.0)
    .from(".index-intro-video div:nth-of-type(10)", { scale: 0, ease: "none", duration: 0.2 }, 2.2)
    .from(".index-intro-video div:nth-of-type(11)", { scaleX: 0, ease: "ease.out", duration: 0.2 }, 2.4)
    .from(".index-intro-video div:nth-of-type(17)", { scaleX: 0, ease: "none", duration: 0.2 }, 1.6)
    .from(".index-intro-video div:nth-of-type(16)", { scaleX: 0, ease: "none", duration: 0.2 }, 1.8)
    .from(".index-intro-video div:nth-of-type(15)", { scaleX: 0, ease: "ease.out", duration: 0.2 }, 2.0)
    .from(".index-intro-video div:nth-of-type(18)", { scale: 0, ease: "ease.out", duration: 0.2 }, 2.2)
    .addPause()

    // Step 3: Companies (2.6)
    .set(".index", { backgroundColor: "#101010", ease: m, autoAlpha: 1, duration: v }, 2.6)
    .to(".index-intro", { y: "-200vh", ease: m, autoAlpha: 0.5, duration: v }, 2.6)
    .fromTo(".index-companies",
      { y: "-100vh", autoAlpha: 0 },
      { y: "-200vh", ease: m, autoAlpha: 1, duration: v },
      2.6
    )
    .addPause()

    // Step 4: Services (3.6)
    .to(".index-companies", { y: "-300vh", ease: m, autoAlpha: 0.5, duration: v }, 3.6)
    .fromTo(".index-services",
      { y: "-200vh", autoAlpha: 0 },
      { y: "-300vh", ease: m, autoAlpha: 1, duration: v },
      3.6
    )
    .from(".index-services li",
      { yPercent: 15, ease: m, autoAlpha: 0, duration: 0.3, stagger: { amount: 0.3 } },
      4.0
    )
    .from(".index-services aside div",
      { backgroundColor: "#0A0C0A00", duration: 0, stagger: { amount: 0.6, from: "random" } },
      4.0
    )
    .addPause()

    // Step 5: Team (4.6)
    .to(".index-services", { y: "-400vh", ease: m, autoAlpha: 0.5, duration: v }, 4.6)
    .fromTo(".index-team",
      { y: "-300vh", autoAlpha: 0 },
      { y: "-400vh", ease: m, autoAlpha: 1, duration: v },
      4.6
    )
    .to(".index-services li",
      { yPercent: -15, ease: m, autoAlpha: 0, duration: 0.3, stagger: { amount: 0.3 } },
      4.7
    )
    .to(".index-services aside div",
      { backgroundColor: "#0A0C0A00", duration: 0, stagger: { amount: 0.6, from: "random" } },
      4.7
    )
    .fromTo(".index-header",
      { yPercent: 100, autoAlpha: 1 },
      { yPercent: 0, ease: m, autoAlpha: 0, duration: 0.3, immediateRender: false, stagger: { amount: 0.3 } },
      4.6
    )
    .counter(".index-team [data-one] h4 span", { end: 78, duration: v, ease: "steps(10)" }, 4.3)
    .counter(".index-team [data-two] h4", { end: 20, duration: v, ease: "steps(10)" }, 4.4)
    .counter(".index-team [data-three] h4", { end: 31340, duration: v, ease: "steps(10)" }, 4.5)
    .counter(".index-team [data-four] h4", { end: 7, duration: v, ease: "steps(10)" }, 4.6)
    .addPause()

    // Step 6: Testimonials (5.6)
    .to(".index-team", { y: "-492vh", ease: m, autoAlpha: 0, duration: v }, 5.6)
    .fromTo(".index-testimonials",
      { y: "-400vh", autoAlpha: 0 },
      { y: "-492vh", ease: m, autoAlpha: 1, duration: v },
      5.6
    )
    .fromTo(".index-footer",
      { y: "-400vh", autoAlpha: 0 },
      { y: "-485vh", ease: m, autoAlpha: 0.1, duration: v },
      5.6
    )
    .from(".index-testimonials li",
      { yPercent: 15, ease: m, autoAlpha: 0, duration: 0.3, stagger: { amount: 0.3 } },
      6.0
    )
    .addPause()

    // Step 7: Footer & Hero return (6.6)
    .to(".index-testimonials", { y: "-570vh", ease: m, autoAlpha: 0.5, duration: v }, 6.6)
    .to(".index-testimonials li",
      { yPercent: -15, ease: m, autoAlpha: 0, duration: 0.5, stagger: { amount: 0.3 } },
      6.8
    )
    .fromTo(".index-footer",
      { y: "-485vh", autoAlpha: 0.1 },
      { y: "-570vh", ease: m, autoAlpha: 1, duration: v },
      6.6
    )
    .fromTo(".index-hero",
      { y: "187vh", autoAlpha: 0, scale: 1.18 },
      { y: "65vh", scale: 1.18, immediateRender: false, ease: m, autoAlpha: 1, duration: v },
      6.6
    )
    .fromTo(".index-hero-media",
      { y: "20rem" },
      { y: "60rem", ease: m, duration: v, immediateRender: false },
      6.6
    )
    .fromTo(".index-header",
      { autoAlpha: 0, y: "0vh", yPercent: 100 },
      { autoAlpha: 1, y: "0vh", yPercent: 100, ease: m, duration: v, immediateRender: false },
      6.6
    )
    .fromTo(".index-hero h1 span:nth-of-type(1)",
      { clipPath: "inset(0rem 0rem 6.4rem 0rem)" },
      { clipPath: "inset(0rem 0rem 0rem 0rem)", immediateRender: false, duration: v, ease: m },
      6.6
    )
    .addPause()

    // Step 8: Finale settled state (7.6)
    .to(".index-testimonials", { y: "-670vh", ease: m, autoAlpha: 0, duration: 1 }, 7.6)
    .to(".index-footer", { y: "-635vh", ease: m, autoAlpha: 1, duration: 1 }, 7.6)
    .to(".index-hero", { y: "0vh", ease: m, autoAlpha: 1, scale: 1, duration: 1 }, 7.6)
    .to(".index", { backgroundColor: "#0A150E", ease: m, autoAlpha: 1, duration: 1 }, 7.6)
    .from(".index-hero", { backgroundColor: "#0A150E00", ease: m, autoAlpha: 1, duration: 1 }, 7.6)
    .fromTo(".index-hero-media",
      { y: "60rem" },
      { y: "20rem", ease: "power2.out", duration: 1, immediateRender: false },
      7.6
    )
    .fromTo(".index-header",
      { y: "-100vh", yPercent: 0, autoAlpha: 1 },
      { y: "-100vh", yPercent: 92, autoAlpha: 1, backgroundColor: "#0A150E", immediateRender: false, ease: m, duration: v },
      7.6
    )
    .fromTo(".index-hero h1 span:nth-of-type(1)",
      { clipPath: "inset(0rem 0rem 0rem 0rem)" },
      { clipPath: "inset(0rem 0rem 6.4rem 0rem)", immediateRender: false, duration: v, ease: m },
      7.6
    )
    .to(".index-footer h5",
      { y: "5.6rem", x: "0rem", scale: 1, clipPath: "inset(-8rem 0rem -8rem 0rem)", ease: m, duration: 1 },
      7.6
    )
    .to(".index-footer button", { y: "65vh", ease: m, duration: 1 }, 7.6)
    .addPause()
    .to(".index-hero", { autoAlpha: 1, duration: 0.1 })
    .addPause();

  // Scroll stepping controls
  let isNavigating = false;
  const prevSlide = () => {
    if (isNavigating) return;
    isNavigating = true;
    masterTL.timeScale(-1);
    masterTL.resume();
    setTimeout(() => { isNavigating = false; }, 800);
  };

  const nextSlide = () => {
    if (isNavigating) return;
    isNavigating = true;
    masterTL.timeScale(1);
    masterTL.resume();
    setTimeout(() => { isNavigating = false; }, 800);
  };

  Observer.create({
    target: ".index",
    type: "wheel,touch,pointer",
    tolerance: 10,
    preventDefault: true,
    onWheel: (u) => {
      if (Math.abs(u.deltaY) < 2 || u.isDragging) return;
      if (u.deltaY < 0) {
        prevSlide();
      } else {
        nextSlide();
      }
    },
    onUp: () => nextSlide(),
    onDown: () => prevSlide(),
  });

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
      e.preventDefault();
      nextSlide();
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      e.preventDefault();
      prevSlide();
    }
  });

  // Nav clicks scroll to appropriate slide
  const navTargets = {
    'Home': 0,
    'About': 1,
    'Portfolio': 3,
    'Career': 5,
    'Contact': 7
  };
  document.querySelectorAll('.index-header-nav a').forEach((a) => {
    const text = a.textContent.trim();
    if (navTargets[text] !== undefined) {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        const targetPause = navTargets[text];
        const pauses = [0, 1.0, 2.6, 3.6, 4.6, 5.6, 6.6, 7.6];
        if (pauses[targetPause] !== undefined) {
          masterTL.pause(pauses[targetPause]);
        }
      });
    }
  });

  // Trigger hero intro
  createHeroIntroTimeline().play();
});
