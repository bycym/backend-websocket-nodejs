import asyncio, ssl
import websockets
import json
import os
from configparser import ConfigParser

SERVER_PORT = int(os.environ.get('BACKEND_PORT')) 
ADDRESS = os.environ.get('BACKEND_ADDRESS')
DIR_PATH = os.environ.get('DIR_PATH')
if DIR_PATH is None:
    DIR_PATH = 'lines'
STREAM_FREQ = 1 # Stream with a 1 Hz rate
TIMEOUT_SECONDS = 30


async def read_files_and_stream(folder_path, websocket):
  try:
    # Ensure the specified path is a directory
    if not os.path.isdir(folder_path):
      print(f"Invalid directory path: {folder_path}")
      return

    # Iterate over all files in the directory
    for filename in os.listdir(folder_path):
      file_path = os.path.join(folder_path, filename)
      
      # Skip subdirectories
      if os.path.isdir(file_path):
        continue

      # Read and stream the content of each file
      with open(file_path, 'r') as file:
        for line in file:
          data = {'content': line.strip()}  # Assuming each line of the file is a separate JSON object
          json_data = json.dumps(data)
          await websocket.send(json_data)
          await asyncio.sleep(1)  # Stream with a 1 Hz rate

  except Exception as e:
    print(f"An error occurred: {e}")

# async def read_file_and_stream(dir_path, websocket):
#     try:
#         with open(dir_path, 'r') as file:
#             for line in file:
#                 data = {'content': line.strip()}  # Assuming each line of the file is a separate JSON object
#                 json_data = json.dumps(data)
#                 await websocket.send(json_data)
#                 await asyncio.sleep(STREAM_FREQ) 
#     except FileNotFoundError:
#         print(f"File not found: {dir_path}")
#     except Exception as e:
#         print(f"An error occurred: {e}")

async def connect_to_server(uri, timeout=10):
  try:
    async with websockets.connect(uri) as websocket:
      print(f"Connected to {uri}")
      return websocket
  except Exception as e:
    print(f"Failed to connect to {uri}: {e}")
    return None

async def main():
  remote_server_uri = f"ws://{ADDRESS}:{SERVER_PORT}/ws"
  print(f"Attempting to connect to {remote_server_uri}...")

  websocket = await asyncio.wait_for(connect_to_server(remote_server_uri), timeout=TIMEOUT_SECONDS)
  # print(f"WebSocket state: {websocket.state}")
  if websocket:
    while True:
      # print(f"WebSocket state: {websocket.state}")
      # try:
      # except websockets.exceptions.ConnectionClosed as e:
      #   print(f"WebSocket connection closed unexpectedly: {e}")
        
      await read_files_and_stream(DIR_PATH, websocket)
      # Receive a message from the server
      # print(await asyncio.wait_for(websocket.recv(), timeout=10))
      response = await websocket.recv()
      print(f"Received from server: {response}")

      # if message.lower() == "exit":
      #   break

if __name__ == "__main__":
  asyncio.run(main())
