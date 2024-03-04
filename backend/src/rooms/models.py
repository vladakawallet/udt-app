#from auth.models import User 
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import ForeignKey, String
from database import Base 
# from auth.models import User
from common import association_table

class Room(Base):
    __tablename__ = "rooms"


    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(32), unique=True, nullable=False)
    admin: Mapped[str | None]
    members: Mapped[int] 
    creator_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"))
    creator = relationship("User", secondary=association_table, back_populates="rooms")
    # creator: Mapped["User"] = relationship(back_populates="rooms")


