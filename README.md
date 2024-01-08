
# In Character Frontend

<br/>

## Environment

在 `https://nodejs.org/en` 安装 NodeJs。

推荐使用 `20.x.x` LTS版本。


```text
# clone 仓库
git clone https://github.com/Rhine-AI-Lab/in-character-web

# 进入目录
cd in-character-web

# 安装依赖
npm i
```

<br/>

## Quick Start


```text
npm run dev
```

浏览器访问 `http://localhost:3350/show` 即可

<br/>

## SSR Deploy

```text
npm run build
npm run start
```

浏览器访问 `http://localhost:3350/show` 即可

<br/>

### Service Mode Deploy

```text
# 复制 ./deploy/in-character-web.service 到 /etc/systemd/system/in-character-web.service
cp ./deploy/in-character-web.service /etc/systemd/system/in-character-web.service

# 设为开机启动
systemctl enable in-character-web.service

# 启动服务
systemctl start in-character-web.service
```

更多见 `./deploy` 目录下的文件。

