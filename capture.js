export async function captureToDataUrl(videoEl){
  const stream = await navigator.mediaDevices.getUserMedia({video:true});
  videoEl.srcObject = stream; await videoEl.play();
  const c=document.createElement('canvas'); c.width=videoEl.videoWidth; c.height=videoEl.videoHeight;
  const g=c.getContext('2d'); g.drawImage(videoEl,0,0);
  const url=c.toDataURL('image/jpeg',.9);
  for(const t of stream.getTracks()) t.stop();
  return url;
}