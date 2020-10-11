import asyncio
import websockets
import requests
# import feedparser
import re
import time
import json
import xmltodict


def matchReg(str):
    reg = re.compile(r'/<\/?.+?\/?>/g')
    data = reg.search(str)
    return data


def load_json(xml_str):
    json_str = xmltodict.parse(xml_str)
    json_str = json.dumps(json_str, ensure_ascii=False)
    return json_str


def printTime():
    localtime = time.asctime(time.localtime(time.time()))
    print("本地时间为 : "+localtime)


async def hello(websocket, path):
    recv_str = await websocket.recv()
    # 路由
    if(recv_str == "json"):
        # 去掉path开头字符
        path = path.strip('/')
        r = requests.get(path)
        # print(data)
        # print('*'*30)
        data_dict = json.loads(load_json(r.content))
        # matchReg(data)
        data = json.dumps(data_dict, ensure_ascii=False)
        # print(type(data))
        res = (data_dict['rss']['channel']['item'][1]['description'].split())

        # print(res)
        # rss_json = feedparser.parse(r.content)

        await websocket.send(data)
    else:
        # 去掉path开头字符
        path = path.strip('/')
        print(f"< {path}")
        printTime()
        # 开始获取网页
        # async with httpx.AsyncClient() as client:
        #     r = await client.get(path)
        #     # 将获取到的网页返回
        #     await websocket.send(r.content)
        r = requests.get(path)
        await websocket.send(r.content)


start_server = websockets.serve(hello, '0.0.0.0', 8765)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
