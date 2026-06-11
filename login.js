class Authenticator {
    constructor() {
        this.btn = document.getElementById('auth-submit');
        this.input = document.getElementById('secret-key');
        this.terminal = document.getElementById('term-output');
        // زدنا MENTOS لقائمة الباسوردات
        this.validKeys = ["1111222233",
                          "1697121773",
                          "1697753313",
                          "1697758815",
                          "1697825183",
                          "1697825997",
                          "1697125687",
                          "1697887669",
                          "1697802055",
                          "1697313921",
                          "1697694289",
                          "1695591969",
                          "1697115969",
                          "1697140465",
                          "1697145479",
                          "1696969029",
                          "1697111213",
                          "1697033617",
                          "1697168667",
                          "1697136999",
                          "1695569241",
                          "1697020095",
                          "1697005613",
                          "1697063751",
                          "1697093949",
                          "1696994711",
                          "1696971123",
                          "1697008185",
                          "1696787745",
                          "1696823153",
                          "1696779633",
                          "1696664049",
                          "1696619243",
                          "1695584749",
                          "1696659535",
                          "1696662361",
                          "1696790115",
                          "1695704899",
                          "1696549353",
                          "1695605287",
                          "1695270461",
                          "1695689135",
                          "1695697279",
                          "1695725987",
                          "1695573221",
                          "1695579803",
                          "1695591969",
                          "1695601847",
                          "1695626357",
                          "1695647113",
                          "1695642455",
                          "1695656121",
                          "1695677427",
                          "1695652821",
                         
                         
                         ];
        this.initEvents();
    }
    initEvents() {
        this.btn.addEventListener('click', () => this.processLogin());
        this.input.addEventListener('keypress', (e) => { if(e.key === 'Enter') this.processLogin(); });
    }
    async typeText(text, color = "#0f0") {
        this.terminal.innerHTML += `<div style="color:${color}; margin-top:5px;">${text}</div>`;
        this.terminal.scrollTop = this.terminal.scrollHeight;
    }
    clearTerminal() { this.terminal.innerHTML = ''; }
    async processLogin() {
        const val = this.input.value.trim();
        this.clearTerminal();
        this.btn.disabled = true; this.btn.style.opacity = '0.7';

        if (!val) {
            this.typeText("> ERROR: MISSING_ID_KEY", "#ff3333");
            this.btn.disabled = false; this.btn.style.opacity = '1'; return;
        }

        this.typeText("> CONNECTING TO MENTOS SERVERS...", "#FFD700");
        await this.delay(800);
        this.typeText("> VERIFYING LICENSE...", "#FFD700");
        await this.delay(1000);

        if (this.validKeys.includes(val.toLowerCase())) {
            this.typeText("> ACCESS GRANTED. WELCOME VIP.", "#00ff00");
            this.btn.innerHTML = '<i class="fa-solid fa-check"></i> <span>تم الاتصال</span>';
            this.btn.style.background = '#00ff00';
            await this.delay(1500);
            window.location.href = "script.html";
        } else {
            this.typeText("> FATAL ERROR: UNKNOWN_SIGNATURE", "#ff3333");
            this.btn.disabled = false; this.btn.style.opacity = '1';
        }
    }
    delay(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }
}
document.addEventListener('DOMContentLoaded', () => { new Authenticator(); });
