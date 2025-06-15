from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.routes import ocr_router, home_router


app = FastAPI()
app.include_router(home_router)
app.include_router(ocr_router)

origins = [
    "http://localhost:5173",
    "localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
