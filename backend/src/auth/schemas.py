from typing import Optional
from fastapi_users import schemas
# from fastapi.param_functions import Form
# from fastapi.security import OAuth2PasswordRequestForm
# from typing_extensions import Annotated

from pydantic import ConfigDict
from pydantic import BaseModel

class UserCreate(schemas.BaseUserCreate):
    username: str
    email: str
    password: str
    role: str
    is_active: Optional[bool] = True
    is_superuser: Optional[bool] = False
    is_verified: Optional[bool] = False
    

class UserRead(schemas.BaseUser[int]):
    id: int
    email: str
    username: str
    role: str
    is_active: bool = True
    is_superuser: bool = False
    is_verified: bool = False

    model_config = ConfigDict(from_attributes=True)

class LoginCredentials(BaseModel):
    email: str
