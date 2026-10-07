import * as THREE from 'three';
import gsap from 'gsap';

export class PeepsTrail {
  constructor(peeps) {
    this.peeps = peeps;
    this.container = document.getElementById('peeps');
    if (!this.container) return;

    this.scene = new THREE.Scene();
    this.vertex = `
      uniform vec2 uOffset;
      varying vec2 vUv;

      vec3 deformationCurve(vec3 position, vec2 uv, vec2 offset) {
        float M_PI = 3.1415926535897932384626433832795;
        position.x = position.x + (sin(uv.y * M_PI) * offset.x);
        position.y = position.y + (sin(uv.x * M_PI) * offset.y);
        return position;
      }

      void main() {
        vUv = uv + (uOffset * 2.0);
        vec3 newPosition = deformationCurve(position, uv, uOffset);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
      }
    `;

    this.fragment = `
      uniform float time;
      uniform float progress;
      uniform sampler2D texture1;
      uniform sampler2D texture2;
      uniform sampler2D displacement;
      uniform vec4 resolution;
      uniform float imageAspect;

      varying vec2 vUv;
      vec2 mirrored(vec2 v) {
        vec2 m = mod(v, 2.0);
        return mix(m, 2.0 - m, step(1.0, m));
      }

      vec2 scaleUV(vec2 uv, float aspect) {
        return vec2(uv.x, (uv.y - 0.5) / aspect + 0.5);
      }

      void main() {
        vec2 newUV = (vUv - vec2(0.5)) * resolution.zw + vec2(0.5);
        vec4 noise = texture2D(displacement, mirrored(newUV + time * 0.04));
        float prog = progress * 0.8 - 0.05 + noise.g * 0.06;
        float intpl = pow(abs(smoothstep(0.0, 1.0, (prog * 2.0 - vUv.x + 0.5))), 10.0);

        vec2 newwUV = scaleUV(newUV, imageAspect);

        vec4 t1 = texture2D(texture1, (newwUV - 0.5) * (1.0 - intpl) + 0.5);
        vec4 t2 = texture2D(texture2, (newwUV - 0.5) * intpl + 0.5);
        gl_FragColor = mix(t1, t2, intpl);
      }
    `;

    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.width = 720;
    this.height = 720;
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);
    this.renderer.setClearColor(0x000000, 0);
    this.container.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(70, 1, 0.001, 1000);
    this.camera.position.set(0, 0, 2);

    this.time = 0;
    this.textures = [];
    this.textureMap = new Map();
    this.paused = false;
    this.offset = { x: 0, y: 0 };
    this.isRunning = false;
    this.current = 0;
    this.duration = 0.5;

    this.initiate(() => {
      this.setupResize();
      this.addObjects();
      this.resize();
      this.bindEvents();
      this.play();
    });
  }

  initiate(callback) {
    const loader = new THREE.TextureLoader();
    const promises = [];
    this.peeps.forEach((item, index) => {
      if (!item?.url) return;
      const p = new Promise((resolve) => {
        loader.load(item.url, (tex) => {
          this.textures[index] = tex;
          this.textureMap.set(item.name, tex);
          resolve();
        }, undefined, () => resolve());
      });
      promises.push(p);
    });

    Promise.all(promises).then(() => {
      callback();
    });
  }

  setupResize() {
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.renderer.setSize(this.width, this.height);
    this.camera.aspect = 1;
    this.imageAspect = 1;

    if (this.material) {
      this.material.uniforms.resolution.value.x = this.width;
      this.material.uniforms.resolution.value.y = this.height;
      this.material.uniforms.resolution.value.z = 1;
      this.material.uniforms.resolution.value.w = 1;
    }

    const n = this.camera.position.z;
    const r = 1;
    this.camera.fov = 2 * (180 / Math.PI) * Math.atan(r / (2 * n));
    if (this.plane) {
      this.plane.scale.x = this.camera.aspect;
      this.plane.scale.y = 1;
    }
    this.camera.updateProjectionMatrix();
  }

  addObjects() {
    const loader = new THREE.TextureLoader();
    const disp = loader.load('/images/displacement.jpg');

    this.uniforms = {
      time: { value: 0 },
      progress: { value: 0 },
      imageAspect: { value: 1.0 },
      texture1: { value: this.textures[0] || null },
      texture2: { value: this.textures[1] || null },
      displacement: { value: disp },
      resolution: { value: new THREE.Vector4(720, 720, 1, 1) },
      uOffset: { value: new THREE.Vector2(0, 0) },
      uAlpha: { value: 0 },
    };

    this.material = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      uniforms: this.uniforms,
      vertexShader: this.vertex,
      fragmentShader: this.fragment,
      transparent: true,
    });

    this.geometry = new THREE.PlaneGeometry(1, 1, 32, 32);
    this.plane = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.plane);
  }

  bindEvents() {
    document.querySelectorAll('.index-team-peeps p').forEach((p) => {
      const name = p.getAttribute('data-name');
      p.addEventListener('mouseenter', () => this.show(name));
      p.addEventListener('pointerenter', () => this.show(name));
    });
  }

  show(name) {
    if (!name) return;
    let tex = this.textureMap.get(name);
    if (!tex) {
      const match = this.peeps.find((item) => item.name === name);
      if (match?.url) {
        tex = new THREE.TextureLoader().load(match.url);
        this.textureMap.set(name, tex);
      }
    }
    if (!tex) return;

    gsap.killTweensOf(this.material.uniforms.progress);
    this.material.uniforms.texture1.value = tex;
    this.material.uniforms.texture2.value = tex;
    this.material.uniforms.progress.value = 0;
    this.isRunning = false;
  }

  updateCursor(e) {
    this.offset = {
      x: 0.004 * (e.movementX || 0),
      y: -0.004 * (e.movementY || 0),
    };
  }

  play() {
    this.paused = false;
    this.render = this.render.bind(this);
    this.render();
  }

  render() {
    if (this.paused) return;
    this.time += 0.05;
    if (this.material) {
      this.material.uniforms.time.value = this.time;
      this.camera.position.z = 2.5;

      const currentOffset = this.uniforms.uOffset.value;
      currentOffset.x = THREE.MathUtils.lerp(currentOffset.x, this.offset.x, 0.1);
      currentOffset.y = THREE.MathUtils.lerp(currentOffset.y, this.offset.y, 0.1);
      this.offset = { x: 0, y: 0 };
    }

    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.render);
  }
}
