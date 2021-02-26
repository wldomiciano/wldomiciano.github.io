---
title: Como instalar Emscripten no Windows
description: Emscripten permite usar código em C ou C++ no navegador, aprenda aqui como instalar no Windows
tags: [Emscripten, Windows]
---

Neste tutorial vou mostrar como instalar e configurar o Emscripten, uma ferramenta que compila seu código nativo C ou C++ para JavaScript e permite rodar seu programa em navegadores Web ou no servidor com Node.js.

## Download e Preparação

Visite a [página de download][1] e baixe o SDK para Windows.

Extraia o arquivo baixado para um local a sua escolha.

## Processo de Instalação

Abra o Prompt de Comando, navegue até o local escolhido e execute os comandos abaixo.

```bash
emsdk update

emsdk install latest

emsdk activate latest
```

## Possíveis Erros

Durante a minha instalação, apareceu uma mensagem avisando de um erro no download do pacote abaixo:

https://github.com/kripken/emscripten/archive/1.37.35.zip

Para corrigir:

- Baixe o pacote manualmente pelo link acima.
- Renomeie o arquivo baixado de **emscripten-1.37.35.zip** para **1.37.35.zip**.
- Mova o arquivo para a pasta **zips** que está dentro da pasta do SDK.
- Continue a instalação executando novamente os comandos acima.

## Testando a Instalação

Para testar a instalação execute o comando `notepad hello-world.c`.

No Bloco de Notas, digite o seguinte código:

```c
#include <stdio.h>
int main() {
  printf("hello, world!\n");
  return 0;
}
```

Salve, feche o programa e execute o comando abaixo para compilar:

```bash
emcc hello-world.c
```

Execute seu programa recém compilado com:

```bash
node a.out.js
```

A mensagem "hello, world!" deve aparecer no console.

Para criar uma página HTML com seu programa, utilize o seguinte comando:

```bash
emcc hello-world.c -o hello-world.html
```

Basta abrir o arquivo HTML gerado no navegador para ver o resultado.

## Toques Finais

Para usar as ferramentas do SDK, você terá 3 opções:

1. Abrir o Prompt de Comando, e executar o arquivo `emsdk_env.bat` que está na pasta do SDK. Isto fará com que todas as variáveis necessárias sejam definidas dentro do prompt atual, mas apenas temporariamente.

2. Executar o arquivo `emcmdprompt.bat` que está na pasta do SDK. Isto abrirá um Prompt de Comando já configurado.

3. Definir as variáveis de ambiente permanentemente usando o comando abaixo (não recomendo):

```bash
emsdk activate --global latest
```

Para saber mais, siga o tutorial oficial que, apesar de breve, nos dá uma visão geral das possibilidades:

https://kripken.github.io/emscripten-site/docs/getting_started/Tutorial.html

[1]: https://kripken.github.io/emscripten-site/docs/getting_started/downloads.html
