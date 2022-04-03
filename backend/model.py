from pydantic import BaseModel


class Todo(BaseModel):
    title: str
    author: str
