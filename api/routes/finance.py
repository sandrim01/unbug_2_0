from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .. import models, schemas, database

router = APIRouter(prefix="/finance", tags=["finance"])

@router.get("/", response_model=List[schemas.FinancialEntry])
def get_finance_entries(db: Session = Depends(database.get_db)):
    return db.query(models.FinancialEntry).all()

@router.post("/", response_model=schemas.FinancialEntry)
def create_finance_entry(entry: schemas.FinancialEntryCreate, db: Session = Depends(database.get_db)):
    db_entry = models.FinancialEntry(**entry.model_dump())
    db.add(db_entry)
    db.commit()
    db.refresh(db_entry)
    return db_entry

@router.delete("/{entry_id}")
def delete_finance_entry(entry_id: int, db: Session = Depends(database.get_db)):
    db_entry = db.query(models.FinancialEntry).filter(models.FinancialEntry.id == entry_id).first()
    if not db_entry:
        raise HTTPException(status_code=404, detail="Entry not found")
    db.delete(db_entry)
    db.commit()
    return {"message": "Entry deleted"}
