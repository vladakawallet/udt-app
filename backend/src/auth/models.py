# from database import Base 
# from typing import List
# from sqlalchemy.orm import Mapped, mapped_column
# from sqlalchemy import String, ForeignKey
# from typing import Literal
# from fastapi_users_db_sqlalchemy import SQLAlchemyBaseUserTable
# from sqlalchemy.orm import DeclarativeBase, relationship
# from common import association_table

# Roles = Literal["user", "developer", "mentor", "admin"]

# class User(SQLAlchemyBaseUserTable[int], Base):
#     __tablename__ = "users"

#     id: Mapped[int] = mapped_column(primary_key=True)
#     username: Mapped[str] = mapped_column(String(length=32), unique=True, nullable=False)
#     email: Mapped[str] = mapped_column(String(length=256), unique=True, nullable=False)
#     hashed_password: Mapped[str] = mapped_column(String(length=1024), nullable=False)
#     role: Mapped[Roles]
#     is_active: Mapped[bool] = mapped_column(default=True, nullable=False)
#     is_superuser: Mapped[bool] = mapped_column(default=False, nullable=False)
#     is_verified: Mapped[bool] = mapped_column(default=False, nullable=False)
#     #rooms: Mapped[List["Room"]] = relationship(back_populates="creator", primaryjoin="User.id == Room.creator_id")
#     rooms = relationship("Room", secondary=association_table, back_populates="creator", primaryjoin="User.id == Room.creator_id")

# # class Room(Base):
# #     __tablename__ = "rooms"


# #     id: Mapped[int] = mapped_column(primary_key=True)
# #     title: Mapped[str] = mapped_column(String(32), unique=True, nullable=False)
# #     admin: Mapped[str | None]
# #     members: Mapped[int] 
# #     creator_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"))
# #     creator: Mapped["User"] = relationship(back_populates="rooms")
