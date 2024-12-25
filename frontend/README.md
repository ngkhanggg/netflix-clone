# Instructions

1. Build Docker image

    ```bash
    docker build -t netflix-clone-frontend .
    ```

2. Run Docker container

    ```bash
    docker run -p 5173:5173 --name netflix-clone-frontend netflix-clone-frontend
    ```

3. Open the app at `http://localhost:5173`
