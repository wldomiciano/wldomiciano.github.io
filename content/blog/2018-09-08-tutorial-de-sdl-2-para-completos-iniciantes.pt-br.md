---
title: SDL 2 - Apenas um tutorial básico para completos iniciantes
description: Veja como começar a usar a biblioteca SDL 2
tags: ["SDL 2"]
---

Olá.

Neste artigo quero lhe ajudar a dar seus primeiros passos com [SDL 2](https://www.libsdl.org/), uma biblioteca multimídia escrita em C, bastante usada no desenvolvimento de jogos.

Começaremos instalando os componentes necessários para o desenvolvimento no Ubuntu e em seguida apresentarei o código que servirá de base para as explicações.

## Instalando as ferramentas no Ubuntu

Abra o terminal e use o comando abaixo para instalar o compilador e a biblioteca.

```bash
sudo apt install gcc libsdl2-dev
```

Para compilar nosso exemplo, basta usar o comando abaixo.

```bash
gcc tutorial.c -o tutorial `sdl2-config --cflags --libs`
```

E para rodar o programa, basta executar o seguinte comando:

```bash
./tutorial
```

Como usaremos o terminal para compilar nosso programa, você é livre para usar o editor de texto que quiser.

## O código base

Considere o código abaixo e não se preocupe se sentir-se perdido, pois explicarei parte por parte.

```c
#include <SDL.h>

int main() {
   SDL_Window* window = NULL;

    /*
     * Inicialização e criação da janela
     */
    if ( SDL_Init(SDL_INIT_VIDEO) == 0 )
        window = SDL_CreateWindow("Tutorial SDL 2", 50, 50, 640, 480, 0);
    else
        SDL_Log("Erro na inicialização: %s", SDL_GetError());

    /*
     * Main loop
     */
    if ( window != NULL )
        while( !SDL_QuitRequested() ) { /* ... */ }
    else
        SDL_Log("Erro na criação da janela: %s", SDL_GetError());

    /*
     * Finialização
     */
    SDL_DestroyWindow(window);
    SDL_Quit();
    return 0;
}
```

## O cabeçalho e a função main

```c
#include <SDL.h>

int main() {
   SDL_Window* window = NULL;
```

Na primeira linha adicionamos o cabeçalho que nos dá acesso as diversas funções da biblioteca.

Em seguida temos a função `main()` que dará inicio ao nosso programa.

A variável `window` representa a janela que nos fornecerá o contexto para desenharmos formas e imagens, e receberá eventos vindos de fontes diversas como teclado e mouse.

## A inicialização e criação da janela

```c
    /*
     * Inicialização
     */
    if ( SDL_Init(SDL_INIT_VIDEO) == 0 )
        window = SDL_CreateWindow("Tutorial SDL 2", 50, 50, 640, 480, 0);
    else
        SDL_Log("Erro na inicialização: %s", SDL_GetError());
```

A SDL é dividida em subsistemas e a função [`SDL_Init()`](https://wiki.libsdl.org/SDL_Init) serve para inicializa-los. Ela retorna 0 em caso de sucesso ou um valor negativo em caso de falha.

A macro `SDL_INIT_VIDEO` é uma flag que representa o subsistema de vídeo, necessário para a criação de janelas.

Há outros seis subsistemas que podem ser inicializados com esta função. Saiba mais na [documentação oficial](https://wiki.libsdl.org/SDL_Init#Remarks).

É possível inicializar todos os subsistemas de uma só vez, assim:

```c
SDL_Init(SDL_INIT_EVERYTHING)
```

E mais de um ao mesmo tempo usando o operador lógico **OU**.

```c
SDL_Init(SDL_INIT_VIDEO | SDL_INIT_AUDIO | SDL_INIT_TIMER)
```

Não há problema em chamar esta função mais de uma vez no mesmo programa.

Esta prática pode ser útil caso deseje habilitar ou desabilitar recursos de acordo com as configurações feitas pelo usuário.

Um exemplo é o subsistema de áudio, que pode ser desabilitado caso o usuário queira jogar sem nenhum som.

Para desabilitar subsistemas específicos, usamos a função [`SDL_QuitSubSystem()`](https://wiki.libsdl.org/SDL_QuitSubSystem).

```c
SDL_QuitSubSystem(SDL_INIT_AUDIO);
```

Mesmo que você use esta função para encerrar todos os subsistemas, ainda é necessário chamar a [`SDL_Quit()`](https://wiki.libsdl.org/SDL_Quit) ao final do programa.

Há também a função [`SDL_InitSubSystem()`](https://wiki.libsdl.org/SDL_InitSubSystem), ela é idêntica à `SDL_Init()` (na verdade `SDL_Init()` invoca `SDL_InitSubSystem()` internamente).

### Logging e erros

A função [`SDL_Log()`](https://wiki.libsdl.org/SDL_Log) imprime no console uma mensagem, ela funciona de forma semelhante à função `printf()` da biblioteca padrão.

É importante organizarmos o código desta maneira, com mensagens, para sabermos exatamente qual erro ocorreu, caso ele ocorra.

E se ocorrer, a função [`SDL_GetError()`](https://wiki.libsdl.org/SDL_GetError) retornará uma string contendo uma descrição mais especifica.

### A criação da janela

Se tudo sair como planejado, a função [`SDL_CreateWindow()`](https://wiki.libsdl.org/SDL_CreateWindow) retornará um ponteiro para a janela criada ou `NULL` em caso de falha. Ela aceita 6 argumentos.

O **primeiro** é o texto que aparecerá na barra de titulo.

O **segundo** e o **terceiro** são, respectivamente, as posições x e y com base no canto superior esquerdo da tela.

Para criar uma janela posicionada bem no centro podemos usar a macro `SDL_WINDOWPOS_CENTERED` da seguinte forma:

```c
window = SDL_CreateWindow("Tutorial SDL 2",
                          SDL_WINDOWPOS_CENTERED,
                          SDL_WINDOWPOS_CENTERED, 640, 480, 0);
```

O **quarto** e o **quinto** representam, respectivamente, a largura e a altura.

E o **sexto** argumento pode ser uma ou mais flags que representam detalhes adicionais.

Por exemplo, com a flag `SDL_WINDOW_FULLSCREEN` a janela será criada já em tela cheia e com a flag `SDL_WINDOW_OPENGL` ela estará pronta para ser usada em conjunto com a [OpenGL](https://pt.wikipedia.org/wiki/OpenGL).

Para saber mais sobre as outras flags disponíveis, visite a [documentação oficial](https://wiki.libsdl.org/SDL_CreateWindow#Remarks).

## O Main Loop

```c
    /*
     * Main loop
     */
    if ( window != NULL )
        while( !SDL_QuitRequested() ) { /* ... */ }
    else
        SDL_Log("Erro na criação da janela: %s", SDL_GetError());
```

Se a janela foi criada com sucesso, o [Main Loop](https://pt.wikipedia.org/wiki/Programa%C3%A7%C3%A3o_de_jogos_eletr%C3%B4nicos#Loop_principal) é iniciado.

O Main Loop é onde a mágica acontece, mas, por enquanto, ele não faz grande coisa, apenas continua executando enquanto o usuário não requisitar o encerramento do programa.

A macro [`SDL_QuitRequested()`](https://wiki.libsdl.org/SDL_QuitRequested) verifica se o usuário fez essa requisição.

Há várias formas do encerramento ser requisitado e uma delas é clicar no botão "fechar" (no "X") da janela.

## A finalização

```c
    /*
     * Finialização
     */
    SDL_DestroyWindow(window);
    SDL_Quit();
    return 0;
}
```

Por fim, devemos chamar a função [`SDL_DestroyWindow()`](https://wiki.libsdl.org/SDL_DestroyWindow) para destruir a janela e `SDL_Quit()` para finalizar corretamente a biblioteca antes de terminar o programa.

## Considerações finais

Apesar de simples, sei que pra muita gente pode ser difícil dar os primeiros passos, por isso espero que este tutorial lhe seja útil de alguma forma.

Não deixe de olhar com mais atenção a [documentação oficial](https://wiki.libsdl.org/).

Até a próxima!
