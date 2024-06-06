# 使用 git rebase 合并分支
```shell
git fetch origin
git rebase origin/master
```

# git config 配置

## 配置读取顺序
本地配置 -> 条件包含配置 -> 全局配置 -> 系统配置

## 本地仓库配置 (~/corp-projects/repo1/.git/config):
```shell
[user]
    name = Repo1 User

```

## 条件包含配置 (~/corp-projects/.gitconfig):
```shell
[user]
    name = Corp Projects User

```

## 全局配置 (~/.gitconfig): (```注意：user 和 includeIf 被配置顺序影响```)
```shell
[user]
    name = Global User

[includeIf "gitdir:~/corp-projects/"]
    path = ~/corp-projects/.gitconfig

```

## 系统配置 (/etc/gitconfig):
```shell
[user]
    name = System User
```

# 配置生效顺序
* 在 ~/corp-projects/repo1 仓库中执行 git config user.name 将返回 Repo1 User，因为本地配置的优先级最高。
* 如果 ~/corp-projects/repo1/.git/config 中没有 user.name 配置项，则返回 Corp Projects User，因为条件包含配置的优先级高于全局配置和系统配置。
* 如果 ~/corp-projects/.gitconfig 中也没有 user.name 配置项，则返回 Global User。
* 如果 ~/.gitconfig 中也没有 user.name 配置项，则返回 System User。