# Framework
## Chatbot APIs
---
   * Express & Node.js
     - Accept user input: Through the POST **/chat** endpoint.
     - Processing input: Checks for duplicate input and sends it to the model language service.
     - Keeping a conversation history: Saves inputs, responses, and timestamps to the 
       Firestore database.
     - Providing responses: Returns the response from the language model to the user.
     - Providing conversation history: Through the GET **/history** endpoint.
   * Flask
     - Loading the model: Loads a pre-trained language model (in safetensors format).
     - Receive text input: Through the **/generate** endpoint.
     - Generating text: Uses the model to generate text based on the input.
     - Returns response: Returns the generated text as a response.
       
## Artikel APIs
---
   * Express & Node.js
     - Creates a new article: Through the POST **/articles**.
     - Retrieves a list of all articles: Through the GET **/articles**.
     - Retrieves a specific article by its ID: Through the GET **/articles/:id**.
     - Updates an existing article: Through the PUT **/articles/:id**.
     - Deletes an article: Through the DELETE **/articles/:id**.

# Cloud Architecture
---
![capstone](https://github.com/user-attachments/assets/a67c3f89-e981-42d6-ac3a-4ea6b6243e1e)

# Deployment
---


