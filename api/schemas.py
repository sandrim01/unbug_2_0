from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime, date

class UserBase(BaseModel):
    username: str
    email: EmailStr

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    role: str
    is_active: bool
    
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

class ClientBase(BaseModel):
    name: str
    document: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    address: Optional[str] = None

class ClientCreate(ClientBase):
    pass

class Client(ClientBase):
    id: int
    active: bool
    created_at: datetime

    class Config:
        from_attributes = True

class TicketBase(BaseModel):
    subject: str
    description: Optional[str] = None
    priority: str = "medium"

class TicketCreate(TicketBase):
    client_id: Optional[int] = None
    # For public submission
    guest_name: Optional[str] = None
    guest_email: Optional[str] = None
    guest_phone: Optional[str] = None

class Ticket(TicketBase):
    id: int
    status: str
    created_at: datetime
    client_id: Optional[int] = None
    user_id: Optional[int] = None

    class Config:
        from_attributes = True

class ServiceOrderBase(BaseModel):
    title: str
    description: Optional[str] = None
    status: str = "pending"
    priority: str = "medium"
    client_id: int
    tech_id: Optional[int] = None

class ServiceOrderCreate(ServiceOrderBase):
    pass

class ServiceOrder(ServiceOrderBase):
    id: int
    created_at: datetime
    finished_at: Optional[datetime] = None

    class Config:
        from_attributes = True
