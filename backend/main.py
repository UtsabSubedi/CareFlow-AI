from fastapi import FastAPI

app = FastAPI(title="CareFlow AI")


@app.get("/")
def root():
    return {
        "message": "CareFlow AI backend is running!"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }