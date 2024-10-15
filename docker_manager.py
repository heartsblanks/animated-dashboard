import subprocess
import os

class DockerManager:
    def __init__(self, image_name, container_name, host_port, db_host_path, db_container_path):
        self.image_name = image_name
        self.container_name = container_name
        self.host_port = host_port
        self.db_host_path = db_host_path
        self.db_container_path = db_container_path

    def build_image(self):
        print(f"Building Docker image: {self.image_name}")
        result = subprocess.run(["docker", "build", "-t", self.image_name, "."], capture_output=True, text=True)
        if result.returncode == 0:
            print("Docker image built successfully.")
        else:
            print(f"Error building Docker image: {result.stderr}")

    def run_container(self):
        print(f"Running Docker container: {self.container_name}")
        result = subprocess.run([
            "docker", "run", "-d", 
            "-p", f"{self.host_port}:5000",
            "--name", self.container_name,
            "-v", f"{self.db_host_path}:{self.db_container_path}",
            self.image_name
        ], capture_output=True, text=True)
        if result.returncode == 0:
            print("Docker container started successfully.")
        else:
            print(f"Error starting Docker container: {result.stderr}")

    def stop_container(self):
        print(f"Stopping Docker container: {self.container_name}")
        result = subprocess.run(["docker", "stop", self.container_name], capture_output=True, text=True)
        if result.returncode == 0:
            print("Docker container stopped successfully.")
        else:
            print(f"Error stopping Docker container: {result.stderr}")

    def remove_container(self):
        print(f"Removing Docker container: {self.container_name}")
        result = subprocess.run(["docker", "rm", self.container_name], capture_output=True, text=True)
        if result.returncode == 0:
            print("Docker container removed successfully.")
        else:
            print(f"Error removing Docker container: {result.stderr}")

    def remove_image(self):
        print(f"Removing Docker image: {self.image_name}")
        result = subprocess.run(["docker", "rmi", self.image_name], capture_output=True, text=True)
        if result.returncode == 0:
            print("Docker image removed successfully.")
        else:
            print(f"Error removing Docker image: {result.stderr}")

if __name__ == "__main__":
    # Define your paths and configurations
    IMAGE_NAME = "animated-dashboard"
    CONTAINER_NAME = "animated-dashboard-container"
    HOST_PORT = "5000"
    DB_HOST_PATH = "C:/path/to/your/database.db"  # Adjust this to your database file path
    DB_CONTAINER_PATH = "/app/database.db"

    manager = DockerManager(IMAGE_NAME, CONTAINER_NAME, HOST_PORT, DB_HOST_PATH, DB_CONTAINER_PATH)

    # Execute Docker commands
    manager.build_image()
    manager.run_container()

    # To stop and remove the container and image, uncomment these as needed:
    # manager.stop_container()
    # manager.remove_container()
    # manager.remove_image()