var rectangleEmitter = {
    canvas: null,
    context: null,
    blastZone: {
        x: 0,
        y: 0,
        width: 800,
        height: 600
    },
    particle: null,
    particles: [],
    maxParticles: 700,
    fpsId: null,
    tickId: null,
    setCanvas: function(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
    },
    setBlastZone: function(x, y, width, height) {
        this.blastZone = {
            'x': x,
            'y': y,
            'width': width,
            'height': height
        };
    },
    start: function(fps) {
        var rate = fps || 30;
        this.fpsId = setInterval(this.frameUpdate, 1000 / rate, this);
        this.tickId = setInterval(this.tick, 1000, this);
    },
    pause: function() {
        clearInterval(this.intervalId);
    },
    stop: function() {
        clearInterval(this.intervalId);
        this.clear();
    },
    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    addParticle: function(particle) {
        if (this.particles.length < this.maxParticles) {
            var p = Object.create(particle);
            p.randomize(this.blastZone);
            this.particles.push(p);
        }
    },
    draw: function() {
        this.clear();
        var i = this.particles.length;
        while (i--) {
            this.particles[i].draw(this.context);
        }
    },
    update: function() {
        var p;
        var i = this.particles.length;
        while (i--) {
            p = this.particles[i];
            p.update();
            if (p.y > this.canvas.height) {
                this.particles.splice(i, 1);
            }
        }
    },
    applyActions: function() {
        var i = this.particles.length;
        while (i--) {
            this.particles[i].action();
        }
    },
    runAhead: function(seconds) {
        for (i = 0; i < seconds; i += 1) {
            this.frameUpdate(this);
        }
    },
    frameUpdate: function(self) {
        self.addParticle(self.particle);
        self.update();
        self.draw();
    },
    tick: function(self) {
        self.applyActions();
    }
};