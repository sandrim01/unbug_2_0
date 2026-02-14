from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from api.database import get_db
from api import models, schemas
from api.routes.auth import get_current_user

router = APIRouter(
    prefix="/api/tickets",
    tags=["tickets"]
)

@router.post("/", response_model=schemas.Ticket)
def create_ticket(ticket: schemas.TicketCreate, db: Session = Depends(get_db)):
    db_ticket = models.Ticket(
        subject=ticket.subject,
        description=ticket.description,
        priority=ticket.priority,
        client_id=ticket.client_id,
        guest_name=ticket.guest_name,
        guest_email=ticket.guest_email,
        guest_phone=ticket.guest_phone
    )
    db.add(db_ticket)
    db.commit()
    db.refresh(db_ticket)
    return db_ticket

@router.get("/", response_model=List[schemas.Ticket])
def read_tickets(skip: int = 0, limit: int = 100, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    tickets = db.query(models.Ticket).offset(skip).limit(limit).all()
    return tickets

@router.get("/{ticket_id}", response_model=schemas.Ticket)
def read_ticket(ticket_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    db_ticket = db.query(models.Ticket).filter(models.Ticket.id == ticket_id).first()
    if db_ticket is None:
        raise HTTPException(status_code=404, detail="Ticket not found")
    return db_ticket

@router.patch("/{ticket_id}", response_model=schemas.Ticket)
def update_ticket(ticket_id: int, status: str, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    db_ticket = db.query(models.Ticket).filter(models.Ticket.id == ticket_id).first()
    if db_ticket is None:
        raise HTTPException(status_code=404, detail="Ticket not found")
    db_ticket.status = status
    db.commit()
    db.refresh(db_ticket)
    return db_ticket
