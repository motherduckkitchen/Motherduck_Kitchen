const SESSION_KEY = 'mdk.session';
const SESSION_MINS = 60;

export function requireLogin(){
  const raw = localStorage.getItem(SESSION_KEY);
  const now = Date.now();
  try{
    const obj = JSON.parse(raw||'{}');
    if(!obj.token || !obj.exp || now>obj.exp) throw new Error('expired');
  }catch{
    window.location.href = '/login.html';
  }
}

export function login(username){
  const token = crypto.getRandomValues(new Uint32Array(1))[0].toString(36);
  const exp = Date.now() + SESSION_MINS*60*1000;
  localStorage.setItem(SESSION_KEY, JSON.stringify({user:username, token, exp}));
}

export function logout(){
  localStorage.removeItem(SESSION_KEY);
  window.location.href='/login.html';
}

export function renew(){
  const raw = localStorage.getItem(SESSION_KEY);
  if(!raw) return; const obj = JSON.parse(raw);
  obj.exp = Date.now()+SESSION_MINS*60*1000; localStorage.setItem(SESSION_KEY, JSON.stringify(obj));
}

['click','keydown','pointerdown'].forEach(evt=>document.addEventListener(evt,()=>renew(),{passive:true}));