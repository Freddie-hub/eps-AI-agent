export async function parseFile(file: File): Promise<any> {
  const ext = file.name.split(".").pop()?.toLowerCase();

  // JSON
  if (ext === "json") {
    return { type: "json", content: JSON.parse(await file.text()) };
  }

  // Plain text
  if (ext === "txt" || ext === "md" || ext === "log") {
    return { type: "text", content: await file.text() };
  }

  // CSV
  if (ext === "csv") {
    const text = await file.text();
    const rows = text
      .split("\n")
      .map((r) => r.trim())
      .filter(Boolean)
      .map((r) => r.split(","));
    return { type: "csv", headers: rows[0], rows: rows.slice(1) };
  }

  // TODO: add pdf/docx parsers (requires extra libraries like pdf-parse, mammoth, etc.)
  // For now, return a placeholder
  return { type: "unsupported", message: `File type .${ext} not supported yet.` };
}
