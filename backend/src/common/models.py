from database import Base 
from typing import List
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, ForeignKey
from typing import Literal
from fastapi_users_db_sqlalchemy import SQLAlchemyBaseUserTable
from sqlalchemy.orm import DeclarativeBase, relationship
from sqlalchemy import Column
from sqlalchemy import Table

class Base(DeclarativeBase):
    pass

association_table = Table(
    "association_table",
    Base.metadata,
    Column("user_id", ForeignKey("users.id"), primary_key=True),
    Column("room_id", ForeignKey("rooms.id"), primary_key=True),
)

Roles = Literal["user", "developer", "mentor", "admin"]

class User(SQLAlchemyBaseUserTable[int], Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str] = mapped_column(String(length=32), unique=True, nullable=False)
    email: Mapped[str] = mapped_column(String(length=256), unique=True, nullable=False)
    hashed_password: Mapped[str] = mapped_column(String(length=1024), nullable=False)
    role: Mapped[Roles]
    is_active: Mapped[bool] = mapped_column(default=True, nullable=False)
    is_superuser: Mapped[bool] = mapped_column(default=False, nullable=False)
    is_verified: Mapped[bool] = mapped_column(default=False, nullable=False)
    created_rooms: Mapped[List["Room"] | None] = relationship(back_populates="creator", primaryjoin="User.id == Room.creator_id")
    current_room_id: Mapped[int | None] = mapped_column(ForeignKey("rooms.id"))
    current_room: Mapped["Room"] = relationship(back_populates="members", foreign_keys=[current_room_id])

    # rooms = relationship("Room", secondary=association_table, back_populates="creator", primaryjoin="User.id == Room.creator_id")

class Room(Base):
    __tablename__ = "rooms"


    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(32), unique=True, nullable=False)
    admin: Mapped[str | None]
    creator_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"))
    # creator = relationship("User", secondary=association_table, back_populates="rooms")
    creator: Mapped["User"] = relationship(back_populates="created_rooms", foreign_keys=[creator_id])
    members: Mapped[List["User"] | None] = relationship(back_populates="current_room", foreign_keys=[User.current_room_id])