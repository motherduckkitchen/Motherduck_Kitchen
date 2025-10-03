const NS = 'mdk.v1';

function k(scope,page){ return `${NS}.${scope}.${page}` }
export function loadLive(page){ return JSON.parse(localStorage.getItem(k('live',page))||'{}') }
export function saveLive(page,data){ localStorage.setItem(k('live',page), JSON.stringify(data)) }

export function addToArchive(page, entry){
  const d = new Date(entry.dateISO);
  const y = String(d.getFullYear());
  const m = String(d.getMonth()+1).padStart(2,'0');
  const key = `${NS}.archive`;
  const root = JSON.parse(localStorage.getItem(key)||'{}');
  root[y] = root[y]||{}; root[y][m] = root[y][m]||{}; root[y][m][page] = root[y][m][page]||[];
  root[y][m][page].push(entry);
  localStorage.setItem(key, JSON.stringify(root));
}

export function listMonths(year){
  const root = JSON.parse(localStorage.getItem(`${NS}.archive`)||'{}');
  return Object.keys(root[year]||{}).sort();
}

export function loadMonth(year,month,page){
  const root = JSON.parse(localStorage.getItem(`${NS}.archive`)||'{}');
  return (((root[year]||{})[month]||{})[page])||[];
}

export function clearLive(page){ localStorage.removeItem(k('live',page)) }