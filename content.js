chrome.runtime.onMessage.addListener((message, _, __) => {
  const svgFilters = {
    "normal": "",
    "protanopia": `
      <filter id="protanopia">
        <feColorMatrix type="matrix" values="
          0.567 0.433 0 0 0
          0.558 0.442 0 0 0
          0     0.242 0.758 0 0
          0     0     0     1 0"/>
      </filter>`,
    "deuteranopia": `
      <filter id="deuteranopia">
        <feColorMatrix type="matrix" values="
          0.625 0.375 0 0 0
          0.7   0.3   0 0 0
          0     0.3   0.7 0 0
          0     0     0   1 0"/>
      </filter>`,
    "tritanopia": `
      <filter id="tritanopia">
        <feColorMatrix type="matrix" values="
          0.95  0.05  0 0 0
          0     0.433 0.567 0 0
          0     0.475 0.525 0 0
          0     0     0     1 0"/>
      </filter>`,
    "achromatopsia": `
      <filter id="achromatopsia">
        <feColorMatrix type="matrix" values="
          0.299 0.587 0.114 0 0
          0.299 0.587 0.114 0 0
          0.299 0.587 0.114 0 0
          0     0     0     1 0"/>
      </filter>`
  };

  const mode = message.mode;
  const existingSvg = document.getElementById("colorblind-svg");
  const existingStyle = document.getElementById("colorblind-style");

  // Remove existing filters
  if (existingSvg) {
    existingSvg.remove();
  }
  if (existingStyle) {
    existingStyle.remove();
  }

  if (mode === "normal") {
    return
  }

  // Add new filter if mode is not normal
  const svg = document.createElement("div");
  svg.id = "colorblind-svg";
  svg.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg">${svgFilters[mode]}</svg>`;
  document.body.appendChild(svg);

  const style = document.createElement("style");
  style.id = "colorblind-style";
  style.textContent = `html { filter: url(#${mode}); }`;
  document.head.appendChild(style);
});
