var createGlobe = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // node_modules/cobe/dist/index.esm.js
  var index_esm_exports = {};
  __export(index_esm_exports, {
    default: () => D
  });

  // node_modules/phenomenon/dist/phenomenon.mjs
  var t = ["x", "y", "z"];
  var e = function(t2) {
    Object.assign(this, { uniforms: {}, geometry: { vertices: [{ x: 0, y: 0, z: 0 }] }, mode: 0, modifiers: {}, attributes: [], multiplier: 1, buffers: [] }), Object.assign(this, t2), this.prepareProgram(), this.prepareUniforms(), this.prepareAttributes();
  };
  e.prototype.compileShader = function(t2, e2) {
    var i3 = this.gl.createShader(t2);
    return this.gl.shaderSource(i3, e2), this.gl.compileShader(i3), i3;
  }, e.prototype.prepareProgram = function() {
    var t2 = this.gl, e2 = this.vertex, i3 = this.fragment, r = t2.createProgram();
    t2.attachShader(r, this.compileShader(35633, e2)), t2.attachShader(r, this.compileShader(35632, i3)), t2.linkProgram(r), t2.useProgram(r), this.program = r;
  }, e.prototype.prepareUniforms = function() {
    for (var t2 = Object.keys(this.uniforms), e2 = 0; e2 < t2.length; e2 += 1) {
      var i3 = this.gl.getUniformLocation(this.program, t2[e2]);
      this.uniforms[t2[e2]].location = i3;
    }
  }, e.prototype.prepareAttributes = function() {
    void 0 !== this.geometry.vertices && this.attributes.push({ name: "aPosition", size: 3 }), void 0 !== this.geometry.normal && this.attributes.push({ name: "aNormal", size: 3 }), this.attributeKeys = [];
    for (var t2 = 0; t2 < this.attributes.length; t2 += 1) this.attributeKeys.push(this.attributes[t2].name), this.prepareAttribute(this.attributes[t2]);
  }, e.prototype.prepareAttribute = function(e2) {
    for (var i3 = this.geometry, r = this.multiplier, s2 = i3.vertices, n = i3.normal, a = new Float32Array(r * s2.length * e2.size), o = 0; o < r; o += 1) for (var h = e2.data && e2.data(o, r), u2 = o * s2.length * e2.size, f2 = 0; f2 < s2.length; f2 += 1) for (var c2 = 0; c2 < e2.size; c2 += 1) {
      var l2 = this.modifiers[e2.name];
      a[u2] = void 0 !== l2 ? l2(h, f2, c2, this) : "aPosition" === e2.name ? s2[f2][t[c2]] : "aNormal" === e2.name ? n[f2][t[c2]] : h[c2], u2 += 1;
    }
    this.attributes[this.attributeKeys.indexOf(e2.name)].data = a, this.prepareBuffer(this.attributes[this.attributeKeys.indexOf(e2.name)]);
  }, e.prototype.prepareBuffer = function(t2) {
    var e2 = t2.data, i3 = t2.name, r = t2.size, s2 = this.gl.createBuffer();
    this.gl.bindBuffer(34962, s2), this.gl.bufferData(34962, e2, 35044);
    var n = this.gl.getAttribLocation(this.program, i3);
    this.gl.enableVertexAttribArray(n), this.gl.vertexAttribPointer(n, r, 5126, false, 0, 0), this.buffers[this.attributeKeys.indexOf(t2.name)] = { buffer: s2, location: n, size: r };
  }, e.prototype.render = function(t2) {
    var e2 = this, i3 = this.uniforms, r = this.multiplier, s2 = this.gl;
    s2.useProgram(this.program);
    for (var n = 0; n < this.buffers.length; n += 1) {
      var a = this.buffers[n], o = a.location, h = a.buffer, u2 = a.size;
      s2.enableVertexAttribArray(o), s2.bindBuffer(34962, h), s2.vertexAttribPointer(o, u2, 5126, false, 0, 0);
    }
    Object.keys(t2).forEach(function(e3) {
      i3[e3].value = t2[e3].value;
    }), Object.keys(i3).forEach(function(t3) {
      var r2 = i3[t3];
      e2.uniformMap[r2.type](r2.location, r2.value);
    }), s2.drawArrays(this.mode, 0, r * this.geometry.vertices.length), this.onRender && this.onRender(this);
  }, e.prototype.destroy = function() {
    for (var t2 = 0; t2 < this.buffers.length; t2 += 1) this.gl.deleteBuffer(this.buffers[t2].buffer);
    this.gl.deleteProgram(this.program), this.gl = null;
  };
  var i = function(t2) {
    var e2 = this, i3 = t2 || {}, r = i3.canvas;
    void 0 === r && (r = document.querySelector("canvas"));
    var s2 = i3.context;
    void 0 === s2 && (s2 = {});
    var n = i3.contextType;
    void 0 === n && (n = "experimental-webgl");
    var a = i3.settings;
    void 0 === a && (a = {});
    var o = r.getContext(n, Object.assign({ alpha: false, antialias: false }, s2));
    Object.assign(this, { gl: o, canvas: r, uniforms: {}, instances: /* @__PURE__ */ new Map(), shouldRender: true }), Object.assign(this, { devicePixelRatio: 1, clearColor: [1, 1, 1, 1], position: { x: 0, y: 0, z: 2 }, clip: [1e-3, 100] }), Object.assign(this, a), this.uniformMap = { float: function(t3, e3) {
      return o.uniform1f(t3, e3);
    }, vec2: function(t3, e3) {
      return o.uniform2fv(t3, e3);
    }, vec3: function(t3, e3) {
      return o.uniform3fv(t3, e3);
    }, vec4: function(t3, e3) {
      return o.uniform4fv(t3, e3);
    }, mat2: function(t3, e3) {
      return o.uniformMatrix2fv(t3, false, e3);
    }, mat3: function(t3, e3) {
      return o.uniformMatrix3fv(t3, false, e3);
    }, mat4: function(t3, e3) {
      return o.uniformMatrix4fv(t3, false, e3);
    } }, o.enable(o.DEPTH_TEST), o.depthFunc(o.LEQUAL), false === o.getContextAttributes().alpha && (o.clearColor.apply(o, this.clearColor), o.clearDepth(1)), this.onSetup && this.onSetup(o), window.addEventListener("resize", function() {
      return e2.resize();
    }), this.resize(), this.render();
  };
  i.prototype.resize = function() {
    var t2 = this.gl, e2 = this.canvas, i3 = this.devicePixelRatio, r = this.position;
    e2.width = e2.clientWidth * i3, e2.height = e2.clientHeight * i3;
    var s2 = t2.drawingBufferWidth, n = t2.drawingBufferHeight, a = s2 / n;
    t2.viewport(0, 0, s2, n);
    var o = Math.tan(Math.PI / 180 * 22.5), h = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, r.x, r.y, (a < 1 ? 1 : a) * -r.z, 1];
    this.uniforms.uProjectionMatrix = { type: "mat4", value: [0.5 / o, 0, 0, 0, 0, a / o * 0.5, 0, 0, 0, 0, -(this.clip[1] + this.clip[0]) / (this.clip[1] - this.clip[0]), -1, 0, 0, -2 * this.clip[1] * (this.clip[0] / (this.clip[1] - this.clip[0])), 0] }, this.uniforms.uViewMatrix = { type: "mat4", value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] }, this.uniforms.uModelMatrix = { type: "mat4", value: h };
  }, i.prototype.toggle = function(t2) {
    t2 !== this.shouldRender && (this.shouldRender = void 0 !== t2 ? t2 : !this.shouldRender, this.shouldRender && this.render());
  }, i.prototype.render = function() {
    var t2 = this;
    this.gl.clear(16640), this.instances.forEach(function(e2) {
      e2.render(t2.uniforms);
    }), this.onRender && this.onRender(this), this.shouldRender && requestAnimationFrame(function() {
      return t2.render();
    });
  }, i.prototype.add = function(t2, i3) {
    void 0 === i3 && (i3 = { uniforms: {} }), void 0 === i3.uniforms && (i3.uniforms = {}), Object.assign(i3.uniforms, JSON.parse(JSON.stringify(this.uniforms))), Object.assign(i3, { gl: this.gl, uniformMap: this.uniformMap });
    var r = new e(i3);
    return this.instances.set(t2, r), r;
  }, i.prototype.remove = function(t2) {
    var e2 = this.instances.get(t2);
    void 0 !== e2 && (e2.destroy(), this.instances.delete(t2));
  }, i.prototype.destroy = function() {
    var t2 = this;
    this.instances.forEach(function(e2, i3) {
      e2.destroy(), t2.instances.delete(i3);
    }), this.toggle(false);
  };
  var phenomenon_default = i;

  // node_modules/cobe/dist/index.esm.js
  var M = "phi";
  var R = "theta";
  var c = "mapSamples";
  var O = "mapBrightness";
  var N = "baseColor";
  var s = "markerColor";
  var G = "glowColor";
  var S = "markers";
  var P = "diffuse";
  var X = "devicePixelRatio";
  var f = "dark";
  var u = "offset";
  var m = "scale";
  var x = "opacity";
  var l = "mapBaseBrightness";
  var I = { [M]: "A", [R]: "B", [c]: "l", [O]: "E", [N]: "R", [s]: "S", [G]: "y", [P]: "F", [f]: "G", [u]: "x", [m]: "C", [x]: "H", [l]: "I" };
  var { PI: i2, sin: d, cos: U } = Math;
  var C = (r) => [].concat(...r.map((o) => {
    let [t2, n] = o.location;
    t2 = t2 * i2 / 180, n = n * i2 / 180 - i2;
    let a = U(t2);
    return [-a * U(n), d(t2), a * d(n), o.size];
  }), [0, 0, 0, 0]);
  var D = (r, o) => {
    let t2 = (e2, _, E) => ({ type: e2, value: typeof o[_] == "undefined" ? E : o[_] }), n = r.getContext("webgl") ? "webgl" : "experimental-webgl", a = new phenomenon_default({ canvas: r, contextType: n, context: { alpha: true, stencil: false, antialias: true, depth: false, preserveDrawingBuffer: false }, settings: { [X]: o[X] || 1, onSetup: (e2) => {
      let _ = e2.RGB, E = e2.UNSIGNED_BYTE, L = e2.TEXTURE_2D, T = e2.createTexture();
      e2.bindTexture(L, T), e2.texImage2D(L, 0, _, 1, 1, 0, _, E, new Uint8Array([0, 0, 0, 0]));
      let A = new Image();
      A.onload = () => {
        e2.bindTexture(L, T), e2.texImage2D(L, 0, _, _, E, A), e2.generateMipmap(L);
        let h = e2.getParameter(e2.CURRENT_PROGRAM), v = e2.getUniformLocation(h, "J");
        e2.texParameteri(L, e2.TEXTURE_MIN_FILTER, e2.NEAREST), e2.texParameteri(L, e2.TEXTURE_MAG_FILTER, e2.NEAREST), e2.uniform1i(v, 0);
      }, A.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAACAAQAAAADMzoqnAAAAAXNSR0IArs4c6QAABA5JREFUeNrV179uHEUAx/Hf3JpbF+E2VASBsmVKTBcpKJs3SMEDcDwBiVJAAewYEBUivIHT0uUBIt0YCovKD0CRjUC4QfHYh8hYXu+P25vZ2Zm9c66gMd/GJ/tz82d3bk8GN4SrByYF2366FNTACIAkivVAAazQdnf3MvAlbNUQfOPAdQDvSAimMWhwy4I2g4SU+Kp04ISLpPBAKLxPyic3O/CCi+Y7rUJbiodcpDOFY7CgxCEXmdYD2EYK2s5lApOx5pEDDYCUwM1XdJUwBV11QQMg59kePSCaPAASQMEL2hwo6TJFgxpg+TgC2ymXPbuvc40awr3D1QCFfbH9kcoqAOkZozpQo0aqAGQRKCog/+tjkgbNFEtg2FffBvBGlSxHoAaAa1u6X4PBAwDiR8FFsrQgeUhfJTSALaB9jy5NCybJPn1SVFiWk7ywN+KzhH1aKAuydhGkbEF4lWohLXDXavlyFgHY7LBnLRdlAP6BS5Cc8RfVDXbkwN/oIvmY+6obbNeBP0JwTuMGu9gTzy1Q4RS/cWpfzszeYwd+CAFrtBW/Hur0gLbJGlD+/OjVwe/drfBxkbbg63dndEDfiEBlAd7ac0BPe1D6Jd8dfbLH+RI0OzseFB5s01/M+gMdAeluLOCAuaUA9Lezo/vSgXoCX9rtEiXnp7Q1W/CNyWcd8DXoS6jH/YZ5vAJEWY2dXFQe2TUgaFaNejCzJ98g6HnlVrsE58sDcYqg+9XY75fPqdoh/kRQWiXKg8MWlJQxUFMPjqnyujhFBE7UxIMjyszk0QwQlFsezImsyvUYYYVED2pk6m0Tg8T04Fwjk2kdAwSACqlM6gRRt3vQYAFGX0Ah7Ebx1H+MDRI5ui0QldH4j7FGcm90XdxD2Jg1AOEAVAKhEFXSn4cKUELurIAKwJ3MArypPscQaLhJFICJ0ohjDySAdH8AhDtCiTuMycH8CXzhH9jUACAO5uMhoAwA5i+T6WAKmmAqnLy80wxHqIPFYpqCwxGaYLt4Dyievg5kEoVEUAhs6pqKgFtDQYOuaXypaWKQfIuwwoGSZgfLsu/XAtI8cGN+h7Cc1A5oLOMhwlIPXuhu48AIvsSBkvtV9wsJRKCyYLfq5lTrQMFd1a262oqBck9K1V0YjQg0iEYYgpS1A9GlXQV5cykwm4A7BzVsxQqo7E+zCegO7Ma7yKgsuOcfKbMBwLC8wvVNYDsANYalEpOAa6zpWjTeMKGwEwC1CiQewJc5EKfgy7GmRAZA4vUVGwE2dPM/g0xuAInE/yG5aZ8ISxWGfYigUVbdyBElTHh2uCwGdfCkOLGgQVBh3Ewp+/QK4CDlR5Ws/Zf7yhCf8pH7vinWAvoVCQ6zz0NX5V/6GkAVV+2/5qsJ/gU8bsxpM8IeAQAAAABJRU5ErkJggg==";
    } } });
    return a.add("", { vertex: "attribute vec3 aPosition;uniform mat4 uProjectionMatrix;uniform mat4 uModelMatrix;uniform mat4 uViewMatrix;void main(){gl_Position=uProjectionMatrix*uModelMatrix*uViewMatrix*vec4(aPosition,1.);}", fragment: "precision highp float;uniform vec2 s,x;uniform vec3 R,S,y;uniform vec4 z[64];uniform float A,B,l,C,D,E,F,G,H,I;uniform sampler2D J;const vec3 K=vec3(0.,0.,1.);float L=1./l;mat3 M(float a,float b){float c=cos(a),d=cos(b),e=sin(a),f=sin(b);return mat3(d,f*e,-f*c,0.,c,e,f,d*-e,d*c);}vec3 v(vec3 c,out float w){c=c.xzy;float p=max(2.,floor(log2(2.236068*l*3.141593*(1.-c.z*c.z))*.72021));vec2 g=floor(pow(1.618034,p)/2.236068*vec2(1.,1.618034)+.5),d=fract((g+1.)*.618034)*6.283185-3.883222,e=-2.*g,f=vec2(atan(c.y,c.x),c.z-1.),q=floor(vec2(e.y*f.x-d.y*(f.y*l+1.),-e.x*f.x+d.x*(f.y*l+1.))/(d.x*e.y-e.x*d.y));float n=3.141593;vec3 r;for(float h=0.;h<4.;h+=1.){vec2 t=vec2(mod(h,2.),floor(h*.5));float j=dot(g,q+t);if(j>l)continue;float a=j,b=0.;if(a>=524288.)a-=524288.,b+=.803894;if(a>=262144.)a-=262144.,b+=.901947;if(a>=131072.)a-=131072.,b+=.950973;if(a>=65536.)a-=65536.,b+=.475487;if(a>=32768.)a-=32768.,b+=.737743;if(a>=16384.)a-=16384.,b+=.868872;if(a>=8192.)a-=8192.,b+=.934436;if(a>=4096.)a-=4096.,b+=.467218;if(a>=2048.)a-=2048.,b+=.733609;if(a>=1024.)a-=1024.,b+=.866804;if(a>=512.)a-=512.,b+=.433402;if(a>=256.)a-=256.,b+=.216701;if(a>=128.)a-=128.,b+=.108351;if(a>=64.)a-=64.,b+=.554175;if(a>=32.)a-=32.,b+=.777088;if(a>=16.)a-=16.,b+=.888544;if(a>=8.)a-=8.,b+=.944272;if(a>=4.)a-=4.,b+=.472136;if(a>=2.)a-=2.,b+=.236068;if(a>=1.)a-=1.,b+=.618034;float k=fract(b)*6.283185,i=1.-2.*j*L,m=sqrt(1.-i*i);vec3 o=vec3(cos(k)*m,sin(k)*m,i);float u=length(c-o);if(u<n)n=u,r=o;}w=n;return r.xzy;}void main(){vec2 a=(gl_FragCoord.xy/s*2.-1.)/C-x*vec2(1.,-1.)/s;a.x*=s.x/s.y;float c=dot(a,a);vec4 w=vec4(0.);if(c<=.64)for(int d=0;d<2;d++){vec4 e=vec4(0.);float b;vec3 t=vec3(0.,0.,1.),f=normalize(vec3(a,sqrt(.64-c)));f.z*=d>0?-1.:1.,t.z*=d>0?-1.:1.;vec3 g=f*M(B,A),h=v(g,b);float m=asin(h.y),i=acos(-h.x/cos(m));i=h.z<0.?-i:i;float N=max(texture2D(J,vec2(i*.5/3.141593,-(m/3.141593+.5))).x,I),O=smoothstep(8e-3,0.,b),j=dot(f,t),u=pow(j,F)*E,n=N*O*u,T=mix((1.-n)*pow(j,.4),n,G)+.1;e+=vec4(R*T,1.);int U=int(D);float o=0.;for(int k=0;k<64;k++){if(k>=U)break;vec4 p=z[k];vec3 q=p.xyz,P=q-g;float r=p.w;if(dot(P,P)>r*r*4.)continue;vec3 V=v(q,b);b=length(V-g),b<r?o+=smoothstep(r*.5,0.,b):0.;}o=min(1.,o*u),e.xyz=mix(e.xyz,S,o),e.xyz+=pow(1.-j,4.)*y,w+=e*(1.+(d>0?-H:H))/2.;}float Q=pow(dot(normalize(vec3(-a,sqrt(1.-c))),K),4.)*smoothstep(.1,1.,.2/(c-.64));gl_FragColor=w+vec4(Q*y,Q);}", uniforms: { s: { type: "vec2", value: [o.width, o.height] }, A: t2("float", M), B: t2("float", R), l: t2("float", c), E: t2("float", O), I: t2("float", l), R: t2("vec3", N), S: t2("vec3", s), F: t2("float", P), y: t2("vec3", G), G: t2("float", f), z: { type: "vec4", value: C(o[S]) }, D: { type: "float", value: o[S].length }, x: t2("vec2", u, [0, 0]), C: t2("float", m, 1), H: t2("float", x, 1) }, mode: 4, geometry: { vertices: [{ x: -100, y: 100, z: 0 }, { x: -100, y: -100, z: 0 }, { x: 100, y: 100, z: 0 }, { x: 100, y: -100, z: 0 }, { x: -100, y: -100, z: 0 }, { x: 100, y: 100, z: 0 }] }, onRender: ({ uniforms: e2 }) => {
      let _ = {};
      if (o.onRender) {
        o.onRender(_);
        for (let E in I) _[E] !== void 0 && (e2[I[E]].value = _[E]);
        _[S] !== void 0 && (e2["z"].value = C(_[S]), e2["D"].value = _[S].length), _.width && _.height && (e2["s"].value = [_.width, _.height]);
      }
    } }), a;
  };
  return __toCommonJS(index_esm_exports);
})();
createGlobe = createGlobe.default || createGlobe;
