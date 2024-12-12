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
1. Docker Image Creation:
   * Build three Docker images:
     - chatbot-api: Contains the machine learning model for the chatbot.
     - node-service2: Contains the API for the chatbot.
     - gcr.io/api-articles: Contains the API for article management.
2. Push to Artifact Registry:
These three Docker images are then pushed to Artifact Registry, a secure and managed Google Cloud artifact storage service.
3. Deployment to Cloud Run:
Each Docker image is deployed to Cloud Run as a service. The following url is then obtained:
- **Chatbot API:** [node-service2 API](https://node-service2-image-333011856334.asia-southeast2.run.app)
- **Article API:** [Article API](https://article-api-258958241249.us-central1.run.app)

# API Endpoint
---
## Endpoint Chatbot
**POST /chat**
  * Description:** Send a message to the chatbot.
  * Request Body:
    * `message`: The message you want to send.
  * Response:
    * The reply message from the chatbot.

* **GET /history**
  * Response:
    * id: A unique identifier for the conversation entry.
    * input: The user's input message.
    * response: The chatbot's response to the user's input.
    * timestamp: The timestamp of the conversation.

## Article endpoint
**POST /api/articles**
  * Description:** Creates a new article.
  * Request Body:
    * `id`: A unique identifier for the article entry.
    * `title`: The title of the article.
    * `content`: The content of the article.
  * Response: ID, title, and content of the newly created article.

* **GET /api/articles**
  * Response: Array of objects, each object contains the ID, title, and content of the article.

* **GET /api/articles/:id**
  * Response: An object containing the ID, title, and content of the article.

* **PUT /api/articles/:id**
  * Request Body:
    * `title` (optional): New title.
    * `content` (optional): New content.
  * Response: The updated article object.

* **DELETE /api/articles/:id**
  * Response: Confirmation message of successful deletion.
