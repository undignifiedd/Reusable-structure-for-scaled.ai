/* =========================================================================
   app.js — documentation site behavior.
   Renders color swatches from a token map, copy-to-clipboard, scroll-spy.
   ========================================================================= */

// Color tokens grouped exactly as the source file groups them.
const SWATCHES = {
  brand: [
    { n: "--primary", hex: "#F97015", hsl: "24 95% 53%" },
    { n: "--primary-foreground", hex: "#FFFFFF", hsl: "0 0% 100%" },
    { n: "--accent", hex: "#FFF3EB", hsl: "24 100% 96%" },
    { n: "--accent-foreground", hex: "#E05D06", hsl: "24 95% 45%" },
    { n: "--ring", hex: "#F97015", hsl: "24 95% 53%" },
  ],
  surfaces: [
    { n: "--background", hex: "#FFFFFF", hsl: "0 0% 100%" },
    { n: "--foreground", hex: "#141414", hsl: "0 0% 8%" },
    { n: "--secondary", hex: "#F3F4F6", hsl: "220 14% 96%" },
    { n: "--muted-foreground", hex: "#595959", hsl: "0 0% 35%" },
    { n: "--border", hex: "#E5E7EB", hsl: "220 13% 91%" },
    { n: "--destructive", hex: "#DC2828", hsl: "0 72% 51%" },
  ],
  status: [
    { n: "--online", hex: "#21C45D", hsl: "142 71% 45%" },
    { n: "--away", hex: "#E7B008", hsl: "45 93% 47%" },
    { n: "--pending", hex: "#0874F7", hsl: "213 94% 50%" },
    { n: "--offline", hex: "#ACB0B9", hsl: "220 9% 70%" },
  ],
  chat: [
    { n: "--chat-bubble-user", hex: "#F97015", hsl: "24 95% 53%" },
    { n: "--chat-bubble-user-foreground", hex: "#FFFFFF", hsl: "0 0% 100%" },
    { n: "--chat-bubble-visitor", hex: "#F3F4F6", hsl: "220 14% 96%" },
    { n: "--chat-bubble-visitor-foreground", hex: "#141414", hsl: "0 0% 8%" },
  ],
  sidebar: [
    { n: "--sidebar-background", hex: "#FAFAFA", hsl: "0 0% 98%" },
    { n: "--sidebar-foreground", hex: "#262626", hsl: "0 0% 15%" },
    { n: "--sidebar-primary", hex: "#F97015", hsl: "24 95% 53%" },
    { n: "--sidebar-accent", hex: "#FFF3EB", hsl: "24 100% 96%" },
    { n: "--sidebar-accent-foreground", hex: "#C75305", hsl: "24 95% 40%" },
    { n: "--sidebar-border", hex: "#E5E7EB", hsl: "220 13% 91%" },
  ],
};

function swatchMarkup({ n, hex, hsl }) {
  return `
    <button class="swatch" data-copy="${n}" title="Copy ${n}">
      <span class="swatch__chip" style="background:hsl(var(${n}))"></span>
      <span class="swatch__info">
        <span class="swatch__name">${n}</span>
        <span class="swatch__row">
          <span class="swatch__hex">${hex}</span>
          <span class="swatch__hsl">${hsl}</span>
        </span>
      </span>
    </button>`;
}

// Render each group into its container.
document.querySelectorAll("[data-swatch-group]").forEach((el) => {
  const group = SWATCHES[el.dataset.swatchGroup] || [];
  el.innerHTML = group.map(swatchMarkup).join("");
});

// ---- Copy-to-clipboard (swatches + code block) -------------------------
const toast = document.getElementById("toast");
let toastTimer;

function showToast(html) {
  toast.innerHTML = html;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 1800);
}

async function copy(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // file:// fallback
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try { ok = document.execCommand("copy"); } catch { ok = false; }
    ta.remove();
    return ok;
  }
}

document.addEventListener("click", async (e) => {
  const swatch = e.target.closest("[data-copy]");
  if (swatch) {
    const val = swatch.getAttribute("data-copy");
    if (await copy(val)) showToast(`Copied <code>${val}</code>`);
    return;
  }
  const codeBtn = e.target.closest("[data-copy-code]");
  if (codeBtn) {
    const pre = codeBtn.parentElement.querySelector("pre");
    if (pre && (await copy(pre.innerText))) showToast("Copied snippet");
  }
});

// ---- Scroll-spy for the contents rail ----------------------------------
const links = [...document.querySelectorAll(".contents__list a")];
const byId = new Map(links.map((a) => [a.getAttribute("href").slice(1), a]));

const spy = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        links.forEach((a) => a.classList.remove("is-active"));
        byId.get(entry.target.id)?.classList.add("is-active");
      }
    });
  },
  { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
);

document.querySelectorAll("main .section").forEach((s) => spy.observe(s));
