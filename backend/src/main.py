from fastapi import Depends, FastAPI
from auth.base_config import fastapi_users, auth_backend
from auth.schemas import UserCreate, UserRead
from auth.router import router as auth_router
from sqlalchemy.ext.asyncio import AsyncSession
from common.models import User
from database import get_async_session
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from fastapi import Response 
from rooms.router import router as rooms_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="united development teams"
)

origins = [
    'http://localhost:3000'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# app.include_router(
#     fastapi_users.get_auth_router(auth_backend),
#     prefix="/auth",
#     tags=["Auth"],
# )

app.include_router(
    fastapi_users.get_register_router(UserRead, UserCreate),
    prefix="/auth",
    tags=["Auth"],
)

app.include_router(auth_router)
app.include_router(rooms_router)

@app.get("/user/{username}")
async def get_user_info(username: str, session: AsyncSession = Depends(get_async_session),):
    stmt = select(User).where(User.username == username)
    async with session.begin():
        res = await session.execute(stmt)
        user = res.scalar()
    
    if user: 
        stmt = select(User).options(selectinload(User.created_rooms)).where(User.id == user.id)
        resik = await session.execute(stmt)
        user = resik.scalar()
        return {"data": user.created_rooms}

#Продолжи логику с подгрузкой комнат (сначала добавь их).
#Начни внедрять Pydantic