import { messages } from "../lang/en/en.js";

const rowData = [
  { name: "Sara Brown", dob: "1901-01-01" },
  { name: "John Smith", dob: "1941-01-01" },
  { name: "Jack Ma", dob: "1961-01-30" },
  { name: "Elon Musk", dob: "1999-01-01" },
];

const endpoint = "";

class ButtonArea {
  constructor() {
    this.button = document.getElementById("postButton");
    this.button.textContent = messages.firstButtonText;

    this.button.addEventListener("click", () => this.handleButtonClick());
    this.response = document.getElementById("buttonResult");
  }

  async handleButtonClick() {
    console.log("add data");
    //     try {
    //       const response = await fetch(endpoint, {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(rowData),
    //       });

    //       if (!response.ok) {
    //         this.response.innerHTML = response;
    //       }

    //       const result = await response.json();

    //       response.innerHTML = result; // Change
    //     } catch (error) {
    //       response.innerHTML = result; // Change
    //     }
  }
}

class TextArea {
  constructor() {
    this.form = document.getElementById("sqlForm");
    this.textarea = document.getElementById("sqlArea");
    this.textarea.placeholder = messages.textAreaPlaceholder;
    this.submitResult = document.getElementById("submitResult");
    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      this.handleSubmit(event);
    });
    this.button = document.getElementById("submitButton");
    this.button.textContent = messages.secondButtonText;
  }

  handleSubmit() {
    const query = this.textarea.value.trim();

    if (!query) {
      this.submitResult.textContent = messages.emptyQuery;
      return;
    }

    const firstWord = query.split(" ")[0].toUpperCase();

    if (firstWord === "SELECT") {
      this.handleGet(query);
    } else if (firstWord === "INSERT") {
      this.handlePost(query);
    } else {
      this.submitResult.textContent = messages.unknownSQLCommand;
    }
  }

  async handleGet() {
    this.submitResult.textContent = "GET SUCCESS"; // Change
    // try {
    //   const response = await fetch(endpoint, {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(rowData),
    //   });

    //   if (!response.ok) {
    //     this.submitResult.innerHTML = response;
    //   }

    //   const result = await response.json();

    //   this.submitResult.innerHTML = result; // Change
    // } catch (error) {
    //   this.submitResult.innerHTML = result; // Change
    // }
  }

  async handlePost() {
    this.submitResult.textContent = "POST SUCCESS"; // Change
    // try {
    //   const response = await fetch(endpoint, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(rowData),
    //   });

    //   if (!response.ok) {
    //     this.submitResult.innerHTML = response;
    //   }

    //   const result = await response.json();

    //   this.submitResult.innerHTML = result; // Change
    // } catch (error) {
    //   this.submitResult.innerHTML = result; // Change
    // }
  }
}

class Server {
  constructor() {
    this.button = new ButtonArea();
    this.textArea = new TextArea();
  }
}

new Server();
