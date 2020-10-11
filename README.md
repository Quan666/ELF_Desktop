# ELF_Desktop

一款基于 Wallpaper Engine 壁纸软件的 RSS 订阅器！

它以网页的形式运行，作为一张壁纸实时更新展示 RSS 订阅！

还不快试试!



## 使用方法

> 1. 修改配置
>
> > public 目录下 config.json 修改配置
> >
> > ```json
> > {
> >  "RSS": [
> >    "https://rss.shab.fun/twitter/user/key_official/exclude_rts",
> >    ],
> >   
> >   "port": 8765
> >   }
> >   ```
> 
> 2. 打包项目 ( src 目录下  )
>
> > npm install
>>
> > npm run build
> 
> 3. 运行后台程序 (没有做内嵌，有时间补上)
>
> > 进入 cmd
>>
> > 直接 Server.py
> 
> 4. 添加壁纸
>
> > 打开 Wallpaper Engine 壁纸编辑器
>>
> > 左下角 打开壁纸 -> 打开离线壁纸
> >
> > 选择 dist 目录下的 index.html 文件 -> 确定
> 
> 5. 应用壁纸



## 注意

1. 如果使用了其他桌面整理软件、壁纸软件，可能导致部分功能不正常

2. 若出现~~不可预测~~问题，点击右上角刷新

   

   

## 预览

![elf_desktop展示图](https://cdn.jsdelivr.net/gh/SmaIIstars/CDN@master/pic/elf_desktop/elf_desktop.png)

