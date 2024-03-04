from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from config import SECRET

import bcrypt

from fastapi_users.router.common import ErrorCode
from auth.manager import get_user_manager
from fastapi_users.authentication import CookieTransport
from fastapi_users import jwt

from sqlalchemy import select 
from sqlalchemy.ext.asyncio import AsyncSession
from common.models import User
from database import get_async_session


router = APIRouter(
    prefix="/auth",
    tags=["auth"],
)

def get_transport():
    return CookieTransport(cookie_name="vlad", cookie_max_age=3600)

@router.post("/login", response_model=None)
async def login(credentials: Annotated[OAuth2PasswordRequestForm, Depends()],
                session: AsyncSession = Depends(get_async_session),
                user_manager = Depends(get_user_manager),
                transport: CookieTransport = Depends(get_transport),
):
    email = credentials.username
    password = credentials.password 

    stmt = select(User).where(User.email == email)
    async with session.begin():
        res = await session.execute(stmt)
        user = res.scalar()
    if user:
        if bcrypt.checkpw(password.encode('utf-8'), user.hashed_password.encode('utf-8')):
            token_data = {
                "sub": str(user.id),
                "email": user.email,
                "aud": "fasapiusers:auth"
            }
            token = jwt.generate_jwt(data=token_data, lifetime_seconds=3600, algorithm='HS256', secret=SECRET)
            await user_manager.on_after_login(user)
            return await transport.get_login_response(token=token)
        else:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail=ErrorCode.LOGIN_BAD_CREDENTIALS,
            )
    else: 
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=ErrorCode.LOGIN_BAD_CREDENTIALS,
        )        
