export const GOOGLE_SCRIPT_TEMPLATE = `
// 1. Paste this code into a new Google Apps Script project (script.google.com)
// 2. Click "Deploy" -> "New deployment"
// 3. Select type: "Web app"
// 4. Description: "WhatsApp Dashboard Export"
// 5. Execute as: "Me"
// 6. Who has access: "Anyone" (Important for CORS)
// 7. Click "Deploy" and copy the "Web app URL"

function doPost(e) {
  try {
    // Parse the incoming JSON data
    var data = JSON.parse(e.postData.contents);
    
    // Create a new Spreadsheet
    var ss = SpreadsheetApp.create(data.filename || "WhatsApp Export");
    var sheet = ss.getActiveSheet();
    
    // Add the data
    if (data.rows && data.rows.length > 0) {
      sheet.getRange(1, 1, data.rows.length, data.rows[0].length).setValues(data.rows);
    }
    
    // Return the URL of the new sheet
    var response = {
      status: 'success',
      url: ss.getUrl()
    };
    
    return ContentService.createTextOutput(JSON.stringify(response))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    var errorResponse = {
      status: 'error',
      message: error.toString()
    };
    return ContentService.createTextOutput(JSON.stringify(errorResponse))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput("WhatsApp Dashboard Export Service is running.");
}
`;

export async function exportToGoogleSheetViaScript(scriptUrl: string, data: any[][], fileName: string) {
  // Use text/plain to avoid preflight OPTIONS request which GAS doesn't handle well
  // The GAS script parses e.postData.contents regardless of Content-Type
  const response = await fetch(scriptUrl, {
    method: 'POST',
    body: JSON.stringify({
      filename: fileName,
      rows: data
    }),
    headers: {
      'Content-Type': 'text/plain;charset=utf-8',
    },
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const result = await response.json();
  
  if (result.status === 'error') {
    throw new Error(result.message);
  }

  return result.url;
}
