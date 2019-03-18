export default function getAcceptedFileTypes(data){
   
   return [
    "application/msword", //.doc
    "application/pdf",
    "application/vnd.ms-excel", //xsl
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xslx
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
    "image/jpeg",
    "image/png",
    "text/plain", //.txt
  ]
}

