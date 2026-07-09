/* HERO THREE.JS — wireframe geometry behind avatar */
(function(){
  const c=document.getElementById('hero-3d');
  if(!c)return;
  const W=()=>c.width=window.innerWidth;
  const H=()=>c.height=window.innerHeight;
  W();H();
  const s=new THREE.Scene(),cam=new THREE.PerspectiveCamera(55,c.width/c.height,.1,100);
  cam.position.z=7;
  const r=new THREE.WebGLRenderer({canvas:c,alpha:true,antialias:true});
  r.setSize(c.width,c.height);r.setPixelRatio(Math.min(window.devicePixelRatio,2));

  const shapes=[];
  [[new THREE.IcosahedronGeometry(2.8,1),0xD40000,.1,0,0,-2],
   [new THREE.TorusGeometry(1.8,.3,10,32),0xD40000,.07,3,2,-3],
   [new THREE.OctahedronGeometry(1.4,0),0xEDE8E5,.06,-3.5,-1,-2],
   [new THREE.IcosahedronGeometry(.5,0),0xD40000,.12,2.5,-2.5,0],
   [new THREE.OctahedronGeometry(.4,0),0xEDE8E5,.08,-2,2.5,0],
  ].forEach(([g,col,op,x,y,z])=>{
    const m=new THREE.Mesh(g,new THREE.MeshBasicMaterial({color:col,wireframe:true,transparent:true,opacity:op}));
    m.position.set(x,y,z);shapes.push(m);s.add(m);
  });

  const pGeo=new THREE.BufferGeometry();
  const pp=new Float32Array(150*3);for(let i=0;i<150*3;i++)pp[i]=(Math.random()-.5)*14;
  pGeo.setAttribute('position',new THREE.BufferAttribute(pp,3));
  s.add(new THREE.Points(pGeo,new THREE.PointsMaterial({color:0xD40000,size:.022,transparent:true,opacity:.35,blending:THREE.AdditiveBlending})));

  let mx=0,my=0;
  window.addEventListener('mousemove',e=>{mx=(e.clientX/window.innerWidth-.5)*.4;my=(e.clientY/window.innerHeight-.5)*.3;});

  const speeds=[[.003,.005],[.004,.003,.005],[.007,.005],[.01,.008],[.009,.011]];
  function an(){
    requestAnimationFrame(an);
    shapes.forEach((m,i)=>{m.rotation.x+=speeds[i][0];m.rotation.y+=speeds[i][1];if(speeds[i][2])m.rotation.z+=speeds[i][2];});
    cam.position.x+=(mx-cam.position.x)*.035;
    cam.position.y+=(-my-cam.position.y)*.035;
    cam.lookAt(s.position);
    r.render(s,cam);
  }
  an();
  window.addEventListener('resize',()=>{W();H();cam.aspect=c.width/c.height;cam.updateProjectionMatrix();r.setSize(c.width,c.height);});
})();
