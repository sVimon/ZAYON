class ParticleEngine {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.numberOfParticles = window.innerWidth < 768 ? 40 : 80;
        
        this.init();
        this.animate();
        window.addEventListener('resize', () => { this.resize(); this.createParticles(); });
    }
    init() { this.resize(); this.createParticles(); }
    resize() { this.canvas.width = window.innerWidth; this.canvas.height = window.innerHeight; }
    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.numberOfParticles; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 15 + 10,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 1.5 - 0.5,
                opacity: Math.random() * 0.3 + 0.05,
                isMoney: Math.random() > 0.7 // 30% نسبة ظهور علامة الدولار $
            });
        }
    }
    animate() {
        requestAnimationFrame(() => this.animate());
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let i = 0; i < this.particles.length; i++) {
            let p = this.particles[i];
            p.x += p.speedX; p.y += p.speedY;
            if (p.x < 0 || p.x > this.canvas.width) p.speedX *= -1;
            if (p.y < -50) p.y = this.canvas.height + 50; // يصعد للأعلى ويعود

            this.ctx.fillStyle = `rgba(255, 215, 0, ${p.opacity})`;
            if (p.isMoney) {
                this.ctx.font = `${p.size}px monospace`;
                this.ctx.fillText('$', p.x, p.y);
            } else {
                this.ctx.beginPath();
                this.ctx.arc(p.x, p.y, p.size/3, 0, Math.PI * 2);
                this.ctx.fill();
            }
        }
    }
}
document.addEventListener('DOMContentLoaded', () => { new ParticleEngine('particles-engine'); });