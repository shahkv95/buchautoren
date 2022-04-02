from model import Todo

# mongodb driver recommended by mongodb atlas
# import pymongo
# from pymongo.server_api import ServerApi

# MongoDB driver
import motor.motor_asyncio

# client = pymongo.MongoClient(
#     "mongodb+srv://kush-user:KusHUseR65@cluster0.g4amf.mongodb.net/TodoList?retryWrites=true&w=majority", server_api=ServerApi('1'))
# db = client.test

client = motor.motor_asyncio.AsyncIOMotorClient(
    'mongodb+srv://kush-user:KusHUseR65@cluster0.g4amf.mongodb.net/TodoList?retryWrites=true&w=majority')

database = client.TodoList
collection = database.todo


async def fetch_one_todo(title):
    document = await collection.find_one({"title": title})
    return document


async def fetch_all_todos():
    todos = []
    cursor = collection.find({})
    async for document in cursor:
        todos.append(Todo(**document))
    return todos


async def create_todo(todo):
    document = todo
    await collection.insert_one(document)
    return document


async def update_todo(title, desc):
    await collection.update_one({"title": title}, {"$set": {"description": desc}})
    document = await collection.find_one({"title": title})
    return document


async def remove_todo(title):
    await collection.delete_one({"title": title})
    return True
