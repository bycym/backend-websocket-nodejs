FROM python:3.9-alpine

ARG MOCK_PORT
WORKDIR /app

COPY mocked-streamer/requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY mocked-streamer/. .

EXPOSE ${MOCK_PORT}

CMD ["python", "server.py"]
