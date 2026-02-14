from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .. import models, schemas, database

router = APIRouter(prefix="/inventory", tags=["inventory"])

@router.get("/", response_model=List[schemas.StockItem])
def get_inventory(db: Session = Depends(database.get_db)):
    return db.query(models.StockItem).all()

@router.post("/", response_model=schemas.StockItem)
def create_stock_item(item: schemas.StockItemCreate, db: Session = Depends(database.get_db)):
    db_item = models.StockItem(**item.model_dump())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@router.put("/{item_id}", response_model=schemas.StockItem)
def update_stock_item(item_id: int, item: schemas.StockItemCreate, db: Session = Depends(database.get_db)):
    db_item = db.query(models.StockItem).filter(models.StockItem.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")
    
    for key, value in item.model_dump().items():
        setattr(db_item, key, value)
    
    db.commit()
    db.refresh(db_item)
    return db_item

@router.delete("/{item_id}")
def delete_stock_item(item_id: int, db: Session = Depends(database.get_db)):
    db_item = db.query(models.StockItem).filter(models.StockItem.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")
    db.delete(db_item)
    db.commit()
    return {"message": "Item deleted"}
