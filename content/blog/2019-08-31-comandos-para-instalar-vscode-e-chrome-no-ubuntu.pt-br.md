---
title: Como instalar o VS Code e Google Chrome oficiais no Ubuntu pela linha de comando
description: Aprenda como instalar VS Code e Google Chrome a partir dos repositórios oficiais pela linha de comando no Ubuntu
tags: [Ubuntu]
---

Tenho costume de visitar os sites de cada um destes programas para baixar os arquivos `.deb` sempre que preciso instalá-los novamente no Ubuntu, mas fazer o processo pela linha de comando é muito mais cômodo.

Comparadas com as instruções oficiais do VS Code, as minhas instruções diferem nos seguintes pontos:

1. Eu uso o `apt` ao invés do `apt-get`.
2. Aqui uso `wget` ao invés do `curl` porque o `wget` já vem instalado no Ubuntu.
3. Eu não instalo o pacote `apt-transport-https` porque ele não é necessário desde a versão 1.5 do `apt`.
4. Eu aproveito o passo 2 para remover o arquivo _packages.microsoft.gpg_ já que ele não é mais necessário.

## Passos para instalar o Visual Studio Code

1 - Baixa a chave da Microsoft

```sh
wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > packages.microsoft.gpg
```

2 - Move a chave para o diretório apropriado e remove arquivo temporário

```sh
sudo install -o root -g root -m 644 packages.microsoft.gpg /usr/share/keyrings/ && rm packages.microsoft.gpg
```

3 - Adiciona o novo repositório à nossa lista

```sh
sudo sh -c 'echo "deb [arch=amd64 signed-by=/usr/share/keyrings/packages.microsoft.gpg] https://packages.microsoft.com/repos/vscode stable main" > /etc/apt/sources.list.d/vscode.list'
```

4 - Atualiza a lista de pacotes disponíveis e instala o editor

```sh
sudo apt update && sudo apt install code
```

## Passos para instalar o Google Chrome

1 - Baixa e adiciona a chave do Google

```sh
wget -qO- https://dl.google.com/linux/linux_signing_key.pub | sudo apt-key add -
```

2 - Adiciona o repositório do Google à nossa lista de repositórios

```sh
sudo sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list'
```

3 - Atualiza lista de pacotes disponíveis e instala o navegador

```sh
sudo apt update && sudo apt install google-chrome-stable
```

## Toques finais

Eu criei um script no Gist que você pode conferir no link abaixo:

https://gist.github.com/wldomiciano/6e299c48b43ed91500f529100434b23e

Com ele é possível instalar os 2 programas com o seguinte comando:

```sh
wget -qO- https://gist.githubusercontent.com/wldomiciano/6e299c48b43ed91500f529100434b23e/raw/8fe798bef97e7f1ec0bf31a76818423af2d78161/install-vscode-and-chrome.sh | sh
```

## Referências:

- Página de download do Visual Studio Code:<br>
  https://code.visualstudio.com/Download

- Página de download do Google Chrome:<br>
  https://www.google.com/chrome/

- Como instalar o VS Code manualmente:<br>
  https://code.visualstudio.com/docs/setup/linux

- Como adicionar a chave do Chrome manualmente:<br>
  https://www.google.com/linuxrepositories/

- Artigo do Sempre Update sobre como instalar o Chrome via PPA (Eu vi aqui o código do passo 2 e fiz uma pequena modificação)
  https://sempreupdate.com.br/como-instalar-o-google-chrome-no-ubuntu-via-ppa/
