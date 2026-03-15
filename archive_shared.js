(function () {
  if (!window.MDK_FIREBASE_CONFIG) {
    console.error("Firebase config missing");
    return;
  }

  if (!firebase.apps.length) {
    firebase.initializeApp(window.MDK_FIREBASE_CONFIG);
  }

  const db = firebase.firestore();
  const storage = firebase.storage ? firebase.storage() : null;

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function formatDDMMYYYY(date) {
    return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}`;
  }

  function parseDDMMYYYY(text) {
    if (!text || typeof text !== "string") return null;
    const parts = text.split("/").map(s => s.trim());
    if (parts.length !== 3) return null;

    const d = parseInt(parts[0], 10);
    const m = parseInt(parts[1], 10);
    const y = parseInt(parts[2], 10);

    if (!d || !m || !y) return null;

    const dt = new Date(y, m - 1, d);
    if (
      dt.getFullYear() !== y ||
      dt.getMonth() !== m - 1 ||
      dt.getDate() !== d
    ) {
      return null;
    }

    return dt;
  }

  function monthName(monthNum) {
    const names = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return names[monthNum - 1] || "";
  }

  async function uploadFile(file, folder) {
    if (!file || !storage) return null;

    const safeName = `${Date.now()}_${file.name.replace(/\s+/g, "_")}`;
    const fullPath = `${folder}/${safeName}`;
    const ref = storage.ref().child(fullPath);

    await ref.put(file, {
      contentType: file.type || "application/octet-stream"
    });

    const downloadURL = await ref.getDownloadURL();

    return {
      name: file.name,
      path: fullPath,
      downloadURL: downloadURL,
      contentType: file.type || ""
    };
  }

  async function saveRecord(opts) {
    const type = opts.type || "Unknown Record";
    const site = opts.site || "Unknown";
    const fields = opts.fields || {};
    const notes = opts.notes || "";
    const file = opts.file || null;

    let recordDateObj = parseDDMMYYYY(opts.recordDate || "");
    if (!recordDateObj) recordDateObj = new Date();

    const monthNum = recordDateObj.getMonth() + 1;
    const year = recordDateObj.getFullYear();

    let fileInfo = null;
    if (file) {
      fileInfo = await uploadFile(file, `records/${year}/${pad(monthNum)}_${monthName(monthNum)}`);
    }

    const payload = {
      type: type,
      site: site,
      recordDate: formatDDMMYYYY(recordDateObj),
      monthNum: monthNum,
      monthName: monthName(monthNum),
      year: year,
      notes: notes,
      fields: fields,
      fileInfo: fileInfo,
      savedAt: firebase.firestore.FieldValue.serverTimestamp()
    };

    const docRef = await db.collection("auditRecords").add(payload);
    return docRef.id;
  }

  async function listRecords(filters) {
    const year = parseInt(filters.year, 10);
    const monthNum = parseInt(filters.monthNum, 10);

    let query = db.collection("auditRecords")
      .where("year", "==", year)
      .where("monthNum", "==", monthNum)
      .orderBy("savedAt", "desc");

    if (filters.site) {
      query = query.where("site", "==", filters.site);
    }

    if (filters.type) {
      query = query.where("type", "==", filters.type);
    }

    const snap = await query.get();

    return snap.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }

  async function listMonthCounts(year) {
    const snap = await db.collection("auditRecords")
      .where("year", "==", parseInt(year, 10))
      .get();

    const counts = {};
    for (let i = 1; i <= 12; i++) counts[i] = 0;

    snap.forEach(doc => {
      const data = doc.data();
      if (data.monthNum) counts[data.monthNum] = (counts[data.monthNum] || 0) + 1;
    });

    return counts;
  }

  async function getAllRecords() {
    const snap = await db.collection("auditRecords")
      .orderBy("savedAt", "desc")
      .get();

    return snap.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }

  window.MDKArchive = {
    saveRecord,
    listRecords,
    listMonthCounts,
    getAllRecords,
    formatDDMMYYYY,
    parseDDMMYYYY,
    monthName
  };
})();
