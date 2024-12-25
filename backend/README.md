# Instructions

1. Create a [MongoDB](https://www.mongodb.com/) database

2. Register an API key from [TMDB](https://www.themoviedb.org/)

3. Setup the environment variables
   - Create a `.env` file to store your credentials (refer to `.env.example`)

4. Build Docker image

    ```bash
    docker build -t netflix-clone .
    ```

5. Run Docker container

    ```bash
    docker run -p 5000:5000 --name netflix-clone netflix-clone
    ```

6. Open the app at `http://localhost:5000`
