// ChatGPT was used to double check the code and find places to refactor
import { messages } from "../lang/en/en.js";

const SERVER_URL = "https://comp4537lab5-6d0f.onrender.com";
// const SERVER_URL = "http://localhost:8000";

class SqlQuery {
  async handleGet(endpoint, responseElement) {
    try {
      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Response from GET:", response);
      if (!response.ok) {
        const errorResult = await response.json();
        responseElement.innerHTML = messages.requestFailed
          .replace("%1", response.status)
          .replace("%2", errorResult.message);
        return;
      }

      const result = await response.json();
      console.log("Response body from GET:", result);
      responseElement.innerHTML = `
        <p><strong>Message:</strong> ${result.message}</p>
        <pre><strong>Data:</strong> ${JSON.stringify(
          result.data,
          null,
          2
        )}</pre>
      `;
    } catch (error) {
      console.log("GET request error:", error);
      responseElement.innerHTML = messages.serverError.replace("%1", error);
    }
  }

  async handlePost(endpoint, data, query, responseElement) {
    let bodyContent;
    if (data !== undefined) {
      bodyContent = data;
    } else if (query !== undefined) {
      bodyContent = { query: query };
    } else {
      bodyContent = {};
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyContent),
      });
      console.log("Response from POST:", response);
      if (!response.ok) {
        // chatgpt was used here to implement the suggestion try and catch
        let errorResult = {};
        try {
          errorResult = await response.json();
        } catch (e) {}
        responseElement.innerHTML = messages.requestFailed
          .replace("%1", response.status)
          .replace("%2", errorResult.message || messages.unknownError);
        return;
      }
      const result = await response.json();
      console.log("Response body from POST:", result);
      responseElement.innerHTML = result.message;
    } catch (error) {
      console.log("POST request error:", error);
      responseElement.innerHTML = messages.serverError.replace("%1", error);
    }
  }
}

class DefinedQuery {
  constructor() {
    this.definedQueryDescription = document.getElementById(
      "definedQueryDescription"
    );
    this.definedQueryDescription.textContent = messages.definedQueryDescription;
    this.button = document.getElementById("definedQueryButton");
    this.button.textContent = messages.definedQueryButtonText;

    this.button.addEventListener("click", () => this.handleButtonClick());

    this.responseElement = document.getElementById("definedQueryResult");
    this.endpoint = `${SERVER_URL}/insert-data`;
    this.sqlQuery = new SqlQuery();
  }

  async handleButtonClick() {
    const fixedData = [
      {
        name: "Sara Brown",
        dateOfBirth: "1901-01-01",
      },
      {
        name: "John Smith",
        dateOfBirth: "1941-01-01",
      },
      { name: "Jack Ma", dateOfBirth: "1961-01-30" },
      { name: "Elon Musk", dateOfBirth: "1999-01-01" },
    ];

    this.sqlQuery.handlePost(
      this.endpoint,
      fixedData,
      undefined,
      this.responseElement
    );
  }
}

class CustomQuery {
  constructor() {
    this.textareaPurpose = document.getElementById("textareaPurpose");
    this.textareaPurpose.textContent = messages.textareaPurpose;

    this.textarea = document.getElementById("sqlArea");
    this.textarea.placeholder = messages.textAreaPlaceholder;

    this.button = document.getElementById("customQueryButton");
    this.button.textContent = messages.customQueryButtonText;

    this.button.addEventListener("click", () => this.executeCustomQuery());

    this.responseElement = document.getElementById("customQueryResult");

    this.endpoint = `${SERVER_URL}/execute-query`;
    this.sqlQuery = new SqlQuery();
  }

  executeCustomQuery() {
    const query = this.textarea.value.trim();

    if (!query) {
      this.responseElement.textContent = messages.emptyQuery;
      return;
    }
    this.handleGetOrPost(query);
  }

  handleGetOrPost(query) {
    const firstWord = query.split(" ")[0].toUpperCase();

    if (firstWord === "SELECT") {
      const url = `${this.endpoint}?query=${encodeURIComponent(query)}`;
      this.sqlQuery.handleGet(url, this.responseElement);
    } else if (firstWord === "INSERT") {
      this.sqlQuery.handlePost(
        this.endpoint,
        undefined,
        query,
        this.responseElement
      );
    } else {
      this.responseElement.textContent = messages.unsupportedSQLQuery;
    }
  }
}

class Server {
  constructor() {
    this.definedQuery = new DefinedQuery();
    this.customQuery = new CustomQuery();
  }
}

new Server();
