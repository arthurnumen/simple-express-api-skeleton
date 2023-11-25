## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/arthurnumen/simple-express-api-skeleton.git
   ```

2. **Navigate to Project Directory:**

   ```bash
   cd simple-express-api-skeleton
   ```

3. **Install Dependencies:**

   ```bash
   npm install
   ```

   This will install all the required dependencies specified in the `package.json` file.

4. **Create Environment Variables:**

   Create a `.env` file in the project root and add the necessary environment variables. For example, your `.env` file might look like this:

   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/your-database
   ```

   Adjust these values based on your project's requirements.

## Running the Project

1. **Start the Server:**

   ```bash
   npm run dev
   ```

   This command will start the server. The terminal should display a message indicating that the server is running on the specified port.

2. **Access the API:**

   Open your web browser or use a tool like [Postman](https://www.postman.com/) to interact with the API. By default, the server runs on `http://localhost:3000`.

## Running Tests

1. **Run Unit Tests:**

   ```bash
   npm test
   ```

   This command will execute your unit tests using Mocha and Chai.

   **Note:** Ensure that your server is not running when you run the tests, or choose a different port for testing to avoid conflicts.
