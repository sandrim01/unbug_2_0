from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from api.database import get_db
from api import models, schemas
from api.routes.auth import get_current_user

router = APIRouter(
    prefix="/api/service-orders",
    tags=["service-orders"]
)

@router.post("/", response_model=schemas.ServiceOrder)
def create_service_order(so: schemas.ServiceOrderCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    db_so = models.ServiceOrder(**so.model_dump())
    db.add(db_so)
    db.commit()
    db.refresh(db_so)
    return db_so

@router.get("/", response_model=List[schemas.ServiceOrder])
def read_service_orders(skip: int = 0, limit: int = 100, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    sos = db.query(models.ServiceOrder).offset(skip).limit(limit).all()
    return sos

@router.get("/{so_id}", response_model=schemas.ServiceOrder)
def read_service_order(so_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    db_so = db.query(models.ServiceOrder).filter(models.ServiceOrder.id == so_id).first()
    if db_so is None:
        raise HTTPException(status_code=404, detail="Service Order not found")
    return db_so
