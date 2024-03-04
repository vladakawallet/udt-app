from pydantic import BaseModel
from typing import Optional

class RoomCreate(BaseModel):
    title: str
    admin: str 
    creator_id: int

class RoomRead(BaseModel):
    id: int
    title: str
    creator_id: str