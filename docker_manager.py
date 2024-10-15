import subprocess
import time

class DockerManager:
    def __init__(self, image_name, container_name, host_port, db_host_path, db_container_path):
        self.image_name = image_name
        self.container_name = container_name
        self.host_port = host_port
        self.db_host_path = db_host_path
        self.db_container_path = db_container_path

    def _run_command(self, command, description=""):
        """Run a Docker command and stream output to the console for real-time feedback."""
        print(f"\n--- {description} ---")
        with subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True, shell=True) as process:
            for line in process.stdout:
                print(line, end="")  # Print each line as it is received
        process.wait()
        if process.returncode != 0:
            print(f"Error: {description} failed.")
        else:
            print(f"--- {description} completed successfully ---")

    def build_image(self):
        print(f"\nBuilding Docker image: {self.image_name}...")
        self._run_command(
            f"docker build -t {self.image_name} .", 
            description="Building Docker Image"
        )

    def run_container(self):
        print(f"\nRunning Docker container: {self.container_name}...")
        self._run_command(
            f"docker run -d -p {self.host_port}:5000 --name {self.container_name} -v {self.db_host_path}:{self.db_container_path} {self.image_name}",
            description="Running Docker Container"
        )

    def stop_container(self):
        print(f"\nStopping Docker container: {self.container_name}...")
        self._run_command(
            f"docker stop {self.container_name}",
            description="Stopping Docker Container"
        )

    def remove_container(self):
        print(f"\nRemoving Docker container: {self.container_name}...")
        self._run_command(
            f"docker rm {self.container_name}",
            description="Removing Docker Container"
        )

    def remove_image(self):
        print(f"\nRemoving Docker image: {self.image_name}...")
        self._run_command(
            f"docker rmi {self.image_name}",
            description="Removing Docker Image"
        )

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