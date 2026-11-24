/**
 * La Parrilla · Studio — Puente Bidireccional para Google Sheets
 * Pegar en: Calendario_LaParrilla -> Extensiones -> Apps Script
 * Implementar -> Nueva implementación -> App web -> Ejecutar como: Yo -> Quién tiene acceso: Cualquier persona
 */

const STUDIO_PIN = "LP2026"; // Puedes cambiar este PIN y usar el mismo en tu app celular

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function readSheetObjects(ss, sheetName) {
  const sheet = ss.getSheetByName(sheetName);
  if (!sheet) return [];
  const values = sheet.getDataRange().getValues();
  if (values.length < 2) return [];
  const headers = values[0].map(String);
  return values.slice(1)
    .filter(row => row.some(cell => String(cell).trim() !== ""))
    .map((row, idx) => {
      const obj = { _row: idx + 2 };
      headers.forEach((h, i) => {
        const val = row[i];
        obj[h] = (val instanceof Date)
          ? Utilities.formatDate(val, Session.getScriptTimeZone(), "yyyy-MM-dd")
          : String(val ?? "");
      });
      return obj;
    });
}

function doGet(e) {
  const token = (e && e.parameter && e.parameter.token) || "";
  if (token !== STUDIO_PIN) {
    return jsonResponse({ ok: false, error: "PIN inválido" });
  }
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  return jsonResponse({
    ok: true,
    updatedAt: new Date().toISOString(),
    publicaciones: readSheetObjects(ss, "Publicaciones"),
    galeria: readSheetObjects(ss, "Galeria_Medios"),
    metricas: readSheetObjects(ss, "Metricas_y_Horarios")
  });
}

function doPost(e) {
  try {
    const body = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    if (body.token !== STUDIO_PIN) {
      return jsonResponse({ ok: false, error: "PIN inválido" });
    }
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const pub = ss.getSheetByName("Publicaciones");
    if (!pub) return jsonResponse({ ok: false, error: "Hoja Publicaciones no encontrada" });

    const data = pub.getDataRange().getValues();
    const headers = data[0].map(String);
    const colIdx = (name) => headers.indexOf(name) + 1;

    if (body.action === "updatePost") {
      const targetId = String(body.id);
      let rowNum = -1;
      for (let r = 1; r < data.length; r++) {
        if (String(data[r][0]) === targetId) {
          rowNum = r + 1;
          break;
        }
      }
      if (rowNum === -1) return jsonResponse({ ok: false, error: "ID no encontrado: " + targetId });

      if (body.copy !== undefined && colIdx("Copy_Final") > 0) {
        pub.getRange(rowNum, colIdx("Copy_Final")).setValue(body.copy);
      }
      if (body.estado !== undefined && colIdx("Estado") > 0) {
        pub.getRange(rowNum, colIdx("Estado")).setValue(body.estado);
      }
      if (body.foto !== undefined && colIdx("URL_Media") > 0) {
        pub.getRange(rowNum, colIdx("URL_Media")).setValue(body.foto);
      }
      if (body.formato !== undefined && colIdx("Formato") > 0) {
        pub.getRange(rowNum, colIdx("Formato")).setValue(body.formato);
      }
      if (body.hora !== undefined && colIdx("Hora") > 0) {
        pub.getRange(rowNum, colIdx("Hora")).setValue(body.hora);
      }
      return jsonResponse({ ok: true, action: "updatePost", id: targetId, row: rowNum });
    }

    if (body.action === "create" || body.action === "addPost") {
      let maxId = 0;
      for (let r = 1; r < data.length; r++) {
        const n = Number(data[r][0]);
        if (!isNaN(n) && n > maxId) maxId = n;
      }
      const nextId = body.id ? Number(body.id) : maxId + 1;
      const newRow = [
        nextId,
        body.fecha || "",
        body.hora || "18:00",
        body.red || "AMBAS",
        body.formato || "POST",
        body.idea || body.titulo || "Sugerencia aceptada desde La Parrilla Studio",
        body.copy || "",
        body.foto || "",
        body.estado || "BORRADOR",
        "",
        ""
      ];
      pub.appendRow(newRow);
      return jsonResponse({ ok: true, action: "addPost", id: nextId });
    }

    return jsonResponse({ ok: false, error: "Acción no soportada" });
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err) });
  }
}
