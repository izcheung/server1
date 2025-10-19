export const messages = {
  // Defined Query messages
  definedQueryDescription:
    "This button sends fixed patient records via POST request to /insert-data",
  definedQueryButtonText: "Insert defined query",

  // Custom Query messages
  textareaPurpose:
    "Enter a SQL query. A SELECT query sends via GET. An INSERT query sends via POST.",
  customQueryButtonText: "Submit",

  textAreaPlaceholder:
    "Ex: SELECT * FROM patients WHERE dateOfBirth > 30; Ex: INSERT INTO patients (name, dateOfBirth) VALUES ('Another Patient', '2026-01-01');",

  // Server response messages
  emptyQuery: "Please enter a SQL query",
  unsupportedSQLQuery: "Only SELECT and INSERT queries allowed",
  requestFailed: `Request failed with status %1: %2`,
  serverError: `Network or Server Error:: %1`,
  unknownError: "Unknown server error",
};
