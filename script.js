class GoldScriptEngine {
    constructor() {
        this.grid = document.getElementById('mines-grid');
        this.btn = document.getElementById('btn-hack');
        this.btnText = document.getElementById('btn-text');
        this.progressBar = document.getElementById('scan-progress');
        this.patternIdDisplay = document.getElementById('pattern-id');
        
        // المعادلة ديالك لي طلبتي (لم يتم تغييرها)
        this.SECRETS = [
            [1, 3, 6, 9, 12, 15], 
            [0, 4, 8, 10, 12, 16],
            [0, 5, 8, 10, 14, 15],
            [2, 5, 7, 10, 14, 17],
            [2, 4, 6, 10, 12, 15]
        ];

        this.cards = [];
        this.currentStep = 0;
        this.isProcessing = false;
        this.matrixIntervals = []; // لتخزين تأثير الهاكر

        this.initGrid();
        this.initEvents();
    }

    initGrid() {
        for (let i = 0; i < 18; i++) {
            const card = document.createElement('div');
            card.className = 'mine-card';
            
            // تم استخدام إيموجي الفلوس 💰 بدل الصور القديمة وجهاز الاتصال
            card.innerHTML = `
                <div class="card-face face-front">
                    <span class="front-icon" id="front-icon-${i}">💰</span>
                </div>
                <div class="card-face face-back" id="backface-${i}">
                    <span class="result-icon" id="result-icon-${i}"></span>
                </div>
            `;
            this.grid.appendChild(card);
            
            this.cards.push({
                element: card,
                frontIcon: card.querySelector('.front-icon'),
                backFace: card.querySelector('.face-back'),
                resultIcon: card.querySelector('.result-icon')
            });
        }
    }

    initEvents() {
        this.btn.addEventListener('click', () => this.executeHack());
    }

    /** 🚀 إبداع: تأثير تغيير الأرقام العشوائي (Matrix Hack) للمربعات قبل الفتح */
    startMatrixEffect() {
        const characters = ['0', '1', '%', '$', '#', '!', '?', '💰'];
        this.cards.forEach((card, i) => {
            card.frontIcon.style.opacity = '0.8';
            card.frontIcon.style.color = '#00ff00';
            card.frontIcon.style.filter = 'none';
            card.frontIcon.style.fontSize = '1.5rem';
            
            this.matrixIntervals[i] = setInterval(() => {
                const randomChar = characters[Math.floor(Math.random() * characters.length)];
                card.frontIcon.textContent = randomChar;
            }, 50); // يتغير كل 50 جزء من الثانية
        });
    }

    stopMatrixEffect() {
        this.cards.forEach((card, i) => {
            clearInterval(this.matrixIntervals[i]);
            card.frontIcon.textContent = '💰';
            card.frontIcon.style.opacity = '0.15';
            card.frontIcon.style.color = 'inherit';
            card.frontIcon.style.filter = 'grayscale(100%)';
            card.frontIcon.style.fontSize = '2rem';
        });
    }

    async simulateScan() {
        return new Promise(resolve => {
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 15 + 5;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                    resolve();
                }
                this.progressBar.style.width = `${progress}%`;
            }, 100);
        });
    }

    sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

    async executeHack() {
        if (this.isProcessing) return;
        this.isProcessing = true;

        this.btn.classList.add('disabled');
        this.btnText.textContent = "  ...";
        this.progressBar.style.width = "0%";

        // إغلاق جميع البطاقات المفتوحة
        this.cards.forEach(card => card.element.classList.remove('is-flipped'));
        await this.sleep(600);

        // بدء تأثير الماتريكس
        this.startMatrixEffect();

        const patternIndex = this.currentStep % this.SECRETS.length;
        const targetPattern = this.SECRETS[patternIndex];

        // تعيين النتيجة (💰 للذهب و 💣 للقنبلة)
        this.cards.forEach((card, index) => {
            if (targetPattern.includes(index)) {
                card.resultIcon.textContent = '💰';
                card.backFace.className = 'card-face face-back gold-state';
            } else {
                card.resultIcon.textContent = '💣';
                card.backFace.className = 'card-face face-back mine-state';
            }
        });

        // انتظار انتهاء شريط التحميل
        await this.simulateScan();
        
        // إيقاف تأثير الماتريكس
        this.stopMatrixEffect();
        this.btnText.textContent = " ...";

        // فتح المربعات التي تحتوي على الذهب بتأخير زمني احترافي
        for (let index of targetPattern) {
            this.cards[index].element.classList.add('is-flipped');
            await this.sleep(150);
        }

        await this.sleep(500);
        this.currentStep++;
        this.isProcessing = false;
        
        this.btn.classList.remove('disabled');
        this.btnText.textContent = "  NEXT";
        this.progressBar.style.width = "0%";
    }
}

document.addEventListener('DOMContentLoaded', () => { new GoldScriptEngine(); });