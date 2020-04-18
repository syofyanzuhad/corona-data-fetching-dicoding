class Navbar extends HTMLElement {

   constructor() {
      super();
      this.shadowDOM = this.attachShadow({ mode: "open" });
   }

   connectedCallback() {
      this.render();
   }

   render() {
      this.shadowDOM.innerHTML = `
      <style>
         * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
         }
         :host {
            width: 100%;
            display: block;
            color: white;
            background-color: rgb(104, 150, 235);
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3);
         }
         h2 {
            padding: 12px;
         }
      </style>
      
      <h2>Corona Data Fetching</h2>`;
   }
}

customElements.define("nav-bar", Navbar);