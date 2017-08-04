# qroute
> Lightweight CLI utility to host fast TCP forwarding servers

---

[GitHub](https://github.com/FuturisticCake/qroute) | [NPM](https://www.npmjs.com/package/qroute)

## What is qroute?

qroute is a command line utility which hosts simple and fast TCP forwarding servers.

## Install qroute

```shell
npm install qroute -g
```

## Usage

qroute is super simple to use!

```shell
qroute <listen> <forward-to>
```

## Demos

### Use qroute to forward a webserver

```shell
qroute localhost:80 www.example.com:80
```

### Use qroute to forward a game server

```shell
qroute localhost:25565 mc.hypixel.net:25565
```