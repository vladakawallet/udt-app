from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from rooms.schemas import RoomCreate, RoomRead
from pydantic import BaseModel
from sqlalchemy import select, insert
from database import get_async_session
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import aliased
from common.models import Room
from typing import Annotated

router = APIRouter(
    prefix="/rooms",
    tags=["rooms"],
)

@router.post("/create")
async def add_room(form_data: Annotated[RoomCreate, BaseModel], session: AsyncSession = Depends(get_async_session),):
    validate_stmt = select(Room).where(Room.title == form_data.title)
    async with session.begin():
        res = await session.execute(validate_stmt)
        room = res.scalar()

        if not room:
            add_stmt = insert(Room).values(
                title=form_data.title,
                admin=form_data.admin,
                creator_id=form_data.creator_id,
            )
            res = await session.execute(add_stmt)
            return {"message": res}
        else: 
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST
            )
        

@router.get("/search")
async def get_all_rooms(session: AsyncSession = Depends(get_async_session),):
    stmt = select(Room)
    try: 
        async with session.begin():
            res = await session.execute(stmt)
            rooms = res.scalars().all()
            return rooms
    except Exception as e:
        pass        

limit = 3
# form_data: Annotated[RoomRead, BaseModel]
@router.get("/{page}")
async def get_rooms_list(page: int, session: AsyncSession = Depends(get_async_session),):
    offset = (page - 1) * limit
    inner_stmt = select(Room).order_by(Room.id).limit(limit).offset(offset).subquery()
    rooms2 = aliased(Room, inner_stmt)
    stmt = select(rooms2).order_by(rooms2.id) 
    async with session.begin():
        res = await session.execute(stmt)
        rooms = res.scalars().all()
        return rooms

@router.get("/enter/{id}")
async def get_room_by_id(id: int, session: AsyncSession = Depends(get_async_session)):
    stmt = select(Room).where(Room.id == id)
    async with session.begin():
        res = await session.execute(stmt)
        room = res.scalars().all()
        return room