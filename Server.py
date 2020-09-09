import asyncio
import websockets
import requests

async def hello(websocket, path):
    name = await websocket.recv()
    # 去掉path开头字符
    path = path.strip('/')
    print(f"< {path}")
    # 开始获取网页
    # async with httpx.AsyncClient() as client:
    #     r = await client.get(path)
    #     # 将获取到的网页返回
    #     await websocket.send(r.content)
    r=requests.get(path)
    await websocket.send(r.content)
    

start_server = websockets.serve(hello, 'localhost', 8765)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()

