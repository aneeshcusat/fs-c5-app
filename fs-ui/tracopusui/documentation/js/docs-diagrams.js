/**
 * Animated diagram cards for Tracopus docs (leave / attendance flowcharts).
 * - Auto-plays numbered steps when a card scrolls into view
 * - Highlights matching Mermaid SVG nodes
 * - Prev / Play-Pause / Next controls
 */
(function () {
  const STEP_MS = 2800;
  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function nodesIn(card) {
    return Array.from(card.querySelectorAll(".mermaid svg .node"));
  }

  function stepsIn(card) {
    return Array.from(card.querySelectorAll(".diagram-step"));
  }

  function fitChartSvg(card) {
    const chart = card.querySelector(".diagram-card__chart");
    if (!chart) return;
    chart.querySelectorAll(".mermaid svg").forEach((svg) => {
      // Keep viewBox; CSS caps max size. Avoid getBBox (can throw) and width:auto collapse.
      if (!svg.getAttribute("preserveAspectRatio")) {
        svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
      }
      svg.style.width = "100%";
      svg.style.maxWidth = "36rem";
      svg.style.height = "auto";
      svg.style.maxHeight = "22rem";
      svg.style.display = "block";
      svg.style.margin = "0 auto";
    });
  }

  function setStep(card, index) {
    const steps = stepsIn(card);
    if (!steps.length) return;
    const i = ((index % steps.length) + steps.length) % steps.length;
    card.dataset.activeStep = String(i);

    steps.forEach((step, idx) => {
      step.classList.toggle("is-active", idx === i);
      step.setAttribute("aria-current", idx === i ? "step" : "false");
    });

    const activeStep = steps[i];
    if (activeStep && typeof activeStep.scrollIntoView === "function") {
      // Avoid nested scroll containers — keep the active step in the page viewport only.
      try {
        activeStep.scrollIntoView({ block: "nearest", inline: "nearest", behavior: reduceMotion ? "auto" : "smooth" });
      } catch (e) {
        /* ignore */
      }
    }

    const nodes = nodesIn(card);
    nodes.forEach((node, idx) => {
      node.classList.toggle("is-diagram-hot", idx === i);
    });

    const progress = card.querySelector("[data-diagram-progress]");
    if (progress) {
      progress.textContent = "Step " + (i + 1) + " of " + steps.length + " — " +
        (steps[i].querySelector("strong")?.textContent || "").trim();
    }
  }

  function stop(card) {
    if (card._diagramTimer) {
      clearInterval(card._diagramTimer);
      card._diagramTimer = null;
    }
    card.dataset.playing = "false";
    const btn = card.querySelector("[data-diagram-play]");
    if (btn) {
      btn.setAttribute("aria-pressed", "false");
      btn.innerHTML = '<i class="fe fe-play" aria-hidden="true"></i><span>Play</span>';
    }
  }

  function play(card) {
    if (reduceMotion) return;
    stop(card);
    card.dataset.playing = "true";
    const btn = card.querySelector("[data-diagram-play]");
    if (btn) {
      btn.setAttribute("aria-pressed", "true");
      btn.innerHTML = '<i class="fe fe-pause" aria-hidden="true"></i><span>Pause</span>';
    }
    card._diagramTimer = setInterval(() => {
      const cur = Number(card.dataset.activeStep || 0);
      setStep(card, cur + 1);
    }, STEP_MS);
  }

  function wireCard(card) {
    if (card.dataset.diagramWired === "1") {
      fitChartSvg(card);
      return;
    }
    card.dataset.diagramWired = "1";
    fitChartSvg(card);

    const steps = stepsIn(card);
    if (!steps.length) return;

    steps.forEach((step, idx) => {
      step.addEventListener("click", () => {
        stop(card);
        setStep(card, idx);
      });
      step.tabIndex = 0;
      step.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          stop(card);
          setStep(card, idx);
        }
      });
    });

    const prev = card.querySelector("[data-diagram-prev]");
    const next = card.querySelector("[data-diagram-next]");
    const playBtn = card.querySelector("[data-diagram-play]");

    if (prev) {
      prev.addEventListener("click", () => {
        stop(card);
        setStep(card, Number(card.dataset.activeStep || 0) - 1);
      });
    }
    if (next) {
      next.addEventListener("click", () => {
        stop(card);
        setStep(card, Number(card.dataset.activeStep || 0) + 1);
      });
    }
    if (playBtn) {
      playBtn.addEventListener("click", () => {
        if (card.dataset.playing === "true") stop(card);
        else play(card);
      });
    }

    setStep(card, 0);
    card.classList.add("is-diagram-ready");

    if (reduceMotion || card.dataset.diagramAutoplay === "false") return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            card.classList.add("is-diagram-inview");
            if (card.dataset.playing !== "true") play(card);
          } else {
            stop(card);
            card.classList.remove("is-diagram-inview");
          }
        });
      },
      { threshold: 0.35 }
    );
    io.observe(card);
  }

  function boot() {
    document.querySelectorAll(".diagram-card").forEach((card) => {
      fitChartSvg(card);
      wireCard(card);
    });
  }

  // Mermaid may finish after DOMContentLoaded — retry briefly.
  function bootWhenReady() {
    boot();
    let tries = 0;
    const t = setInterval(() => {
      tries += 1;
      document.querySelectorAll(".diagram-card").forEach((card) => {
        fitChartSvg(card);
        wireCard(card);
      });
      const pending = Array.from(document.querySelectorAll(".diagram-card")).some(
        (c) => stepsIn(c).length && !nodesIn(c).length
      );
      if (!pending || tries > 40) clearInterval(t);
      else boot();
    }, 250);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => setTimeout(bootWhenReady, 400));
  } else {
    setTimeout(bootWhenReady, 400);
  }

  window.TracopusDocsDiagrams = { boot: bootWhenReady, setStep, play, stop };
})();
