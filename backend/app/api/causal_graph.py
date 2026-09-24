from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Dict, Any

from app.database import get_db
from app.models import KnowledgeGraphNode, KnowledgeGraphEdge
from app.schemas import KnowledgeNodeSchema, KnowledgeEdgeSchema

router = APIRouter(prefix="/api/causal-graph", tags=["Causal Knowledge Graph"])

@router.get("/nodes", response_model=List[KnowledgeNodeSchema])
def get_graph_nodes(db: Session = Depends(get_db)):
    return db.query(KnowledgeGraphNode).all()

@router.get("/edges", response_model=List[KnowledgeEdgeSchema])
def get_graph_edges(db: Session = Depends(get_db)):
    return db.query(KnowledgeGraphEdge).all()

@router.post("/nodes", response_model=KnowledgeNodeSchema)
def create_graph_node(node_data: Dict[str, Any], db: Session = Depends(get_db)):
    node = KnowledgeGraphNode(
        node_key=node_data.get("node_key", f"NODE-{db.query(KnowledgeGraphNode).count() + 1}"),
        label=node_data.get("label", "New Concept Node"),
        category=node_data.get("category", "Core Concept"),
        mastery_threshold=float(node_data.get("mastery_threshold", 0.75)),
        difficulty=float(node_data.get("difficulty", 0.5)),
        description=node_data.get("description", "Dynamically created knowledge node.")
    )
    db.add(node)
    db.commit()
    db.refresh(node)
    return node

@router.post("/edges", response_model=KnowledgeEdgeSchema)
def create_graph_edge(edge_data: Dict[str, Any], db: Session = Depends(get_db)):
    edge = KnowledgeGraphEdge(
        source_node=edge_data.get("source_node"),
        target_node=edge_data.get("target_node"),
        causal_weight=float(edge_data.get("causal_weight", 0.85)),
        relationship_type=edge_data.get("relationship_type", "Prerequisite")
    )
    db.add(edge)
    db.commit()
    db.refresh(edge)
    return edge
