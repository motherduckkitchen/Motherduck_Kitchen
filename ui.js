export const AU = new Intl.DateTimeFormat('en-AU',{day:'2-digit',month:'2-digit',year:'numeric'});
export function todayISO(){ const d=new Date(); d.setHours(0,0,0,0); return d.toISOString(); }
export function id(){ return crypto.getRandomValues(new Uint32Array(1))[0].toString(16) }

export function mirrorAU(inputEl, outEl){
  const sync=()=>{ const d=new Date(inputEl.value||Date.now()); outEl.textContent = AU.format(d) };
  inputEl.addEventListener('change',sync); sync();
}