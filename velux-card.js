class VeluxCard extends HTMLElement {
  set hass(hass) {
    if (!this.content) {
      this.innerHTML = `
          <style>
            .container {
              display: flex;
              align-items: center;
              justify-content: space-between;
            }
            .button-container {
              display: flex;
              flex-direction: column;
              align-items: center;
            }
            .button {
              background-color: var(--primary-color);
              border: none;
              color: white;
              padding: 10px;
              text-align: center;
              text-decoration: none;
              display: inline-block;
              font-size: 16px;
              margin: 4px 0;
              cursor: pointer;
              border-radius: 8px;
            }
            .svg-container {
              flex-grow: 1;
              text-align: center;
            }
            .svg-image {
              width: 100px;
              height: 100px;
            }
            .svg-image circle {
              fill: var(--svg-fill-color, black);
            }
          </style>
          <div class="container">
            <div class="button-container">
              <button class="button" id="openButton1"><ha-icon icon="mdi:menu-up-outline"></ha-icon></button>
              <button class="button" id="closeButton1"><ha-icon icon="mdi:menu-down-outline"></ha-icon></button>
            </div>
            <div id="statusImage">
            </div>
            <div class="button-container">
              <button class="button" id="openButton2"><ha-icon icon="mdi:menu-up"></ha-icon></button>
              <button class="button" id="closeButton2"><ha-icon icon="mdi:menu-down"></ha-icon></button>
            </div>
          </div>
        `;
      this.content = this.querySelector(".container");

      this.querySelector("#openButton1").addEventListener("click", () => {
        hass.callService("cover", "open_cover", {
          entity_id: this.config.window,
        });
      });

      this.querySelector("#closeButton1").addEventListener("click", () => {
        hass.callService("cover", "close_cover", {
          entity_id: this.config.window,
        });
      });

      this.querySelector("#openButton2").addEventListener("click", () => {
        hass.callService("cover", "open_cover", {
          entity_id: this.config.cover,
        });
      });

      this.querySelector("#closeButton2").addEventListener("click", () => {
        hass.callService("cover", "close_cover", {
          entity_id: this.config.cover,
        });
      });
    }

    const window = hass.states[this.config.window];
    const cover = hass.states[this.config.cover];

    const state1 = window.state;
    const state2 = cover.state;
    const svgPath = `/local/velux-card/window-${state1}-shutter-${state2}.svg`;
    this.loadAndModifySVG(svgPath);
  }

  async loadAndModifySVG(svgPath) {
    const response = await fetch(svgPath);
    const svgText = await response.text();

    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgText, "image/svg+xml");
    const svgElement = svgDoc.querySelector("svg");

    const svgColor =
      getComputedStyle(this).getPropertyValue("--primary-text-color") ||
      "black";

    svgElement.querySelectorAll("*").forEach((el) => {
      el.style.stroke = svgColor;
    });

    // Inject modified SVG into the DOM
    const statusImage = this.querySelector("#statusImage");
    statusImage.innerHTML = "";
    statusImage.appendChild(svgElement);
  }

  setConfig(config) {
    if (!config.window || !config.cover) {
      throw new Error("You need to define both entities");
    }
    this.config = config;
  }

  getCardSize() {
    return 1;
  }

  //static getConfigElement() {
  //  return document.createElement("velux-card-editor");
  //}

  static getStubConfig() {
    return { window: "cover.window", cover: "cover.cover" };
  }
}

customElements.define("velux-card", VeluxCard);

// Define the editor for the custom card
class VeluxCardEditor extends HTMLElement {
  setConfig(config) {
    this._config = config;
    this.innerHTML = `
        <div class="form">
          <div class="form-group">
            <label for="window">Window:</label>
            <input type="text" id="window" name="window" value="${
              config.window || ""
            }">
          </div>
          <div class="form-group">
            <label for="cover">Shutter:</label>
            <input type="text" id="cover" name="cover" value="${
              config.cover || ""
            }">
          </div>
        </div>
      `;

    this.querySelector("#window").addEventListener("change", (e) => {
      this._config.window = e.target.value;
      this._updateConfig();
    });

    this.querySelector("#cover").addEventListener("change", (e) => {
      this._config.cover = e.target.value;
      this._updateConfig();
    });
  }

  _updateConfig() {
    const event = new Event("config-changed", {
      bubbles: true,
      composed: true,
    });
    event.detail = { config: this._config };
    this.dispatchEvent(event);
  }
}

customElements.define("velux-card-editor", VeluxCardEditor);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "velux-card",
  name: "VELUX Card",
  description: "Control and view the state of your VELUX roof windows.",
  preview: false,
  documentationURL: "https://github.com/bhuebschen/velux-card",
});

console.info(
  "%c   VELUX-CARD   \n%c   Version: 1.0.3   ",
  "color: white; background: #db3434; font-weight: bold; padding: 5px 0;",
  "color: white; background: #333; font-weight: bold; padding: 5px 0;"
);
