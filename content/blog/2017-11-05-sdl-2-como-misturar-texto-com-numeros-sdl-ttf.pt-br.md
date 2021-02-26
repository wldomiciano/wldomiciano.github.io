---
title: SDL 2 - Como misturar texto com números usando SDL_ttf
description: Veja como usar funções padrões do C junto com a SDL_ttf para criar uma função gráfica semelhante a printf
lastmod: 2018-09-12T00:00:00-03:00
tags: ["SDL 2"]
---

Usar a biblioteca [SDL_ttf][sdl_ttf] (com [SDL 2][sdl2]) não tem segredo.

1. Você inicializa com `TTF_Init()`
2. Carrega uma fonte com `TTF_OpenFont()`
3. Cria um texto com `TTF_RenderText_Solid()`
4. E desenha na tela com `SDL_BlitSurface()`

Olha um exemplo [aqui neste gist][exemplo-01].

> Obs.: Para usar os exemplo deste artigo é necessário que o arquivo _VT323.ttf_ esteja na mesma pasta que os códigos.
>
> Você pode baixar esta fonte neste link:
> https://fonts.google.com/specimen/VT323
>
> Renomeie o arquivo baixado caso seja necessário.

Este tipo de dado muda constantemente e o pior: mistura números e texto!

Como você faria pra escrever, por exemplo, "Your Score: 123"?

Se estivéssemos lidando com `printf()` e console seria fácil:

```c
printf("Your Score: %d", score);
```

Então a solução para esse problema é o [`snprintf()`](http://www.cplusplus.com/reference/cstdio/snprintf/).

A diferença do `snprintf` é que ao invés de imprimir texto na saída padrão, ele armazena o texto gerado em um array.

```c
snprintf(BUFFER, BUFFER_SIZE, "Your Score: %d", 123);
```

Depois é só fazer o que quiser com o BUFFER. Experimente com:

```c
#include <stdio.h>
#define BUFFER_SIZE 512

int main() {
    char buffer[BUFFER_SIZE] = {0};
    snprintf(buffer, BUFFER_SIZE, "Your Score: %d", 123); // armazena em buffer
    printf(buffer); // imprime o resultado na saida padrão
    return 0;
}
```

Voltando pro nosso problema em SDL, poderíamos alterar o código mostrado no inicio pro `while` ficar assim:

```c
int counter = 0;
while (!SDL_QuitRequested()) {
    char buffer[512] = {0};
    SDL_snprintf(buffer, 512, "Your Score: %d", counter++);

    SDL_Surface* text = TTF_RenderText_Solid(font, buffer,
                (SDL_Color) { 255, 255, 255, 255 });

    SDL_FillRect(surface, NULL, 0);
    SDL_BlitSurface(text, NULL, surface, NULL);
    SDL_FreeSurface(text);

    SDL_UpdateWindowSurface(window);
}
```

Isso resolve o problema e nos permite criar texto como se estivéssemos usando usando `printf`, mas nós podemos ir um pouco mais além. Que tal criar uma função que nos permita deixar nosso loop assim:

```c
while (!SDL_QuitRequested()) {
    SDL_FillRect(surface, NULL, 0);

    drawText("Your Score: %d", counter++);

    SDL_UpdateWindowSurface(window);
}
```

Para isso vamos precisar de mais uma função da biblioteca padrão, a [`vsnprintf()`](http://www.cplusplus.com/reference/cstdio/vsnprintf/). Ela aceita como último argumento uma `va_list`, aquela estrutura que usamos quando queremos criar uma função que aceita uma quantidade variável de argumentos.

Com ela podemos criar a seguinte função:

```c
#define MAX_LENGTH 1024
void drawText(const char* fmt, ...) {
    char buffer[MAX_LENGTH] = {0};

    va_list ap;

    va_start (ap, fmt);

    SDL_vsnprintf(buffer, MAX_LENGTH, fmt, ap);

    va_end (ap);

    SDL_Surface* text = TTF_RenderText_Solid(font, buffer,
                    (SDL_Color) { 255, 255, 255, 255 });

    SDL_BlitSurface(text, NULL, surface, NULL);
    SDL_FreeSurface(text);
}
```

Tem outro gist com o [resultado final aqui][exemplo-02]

**UPDATE (12/09/18):**<br>Usei o exemplo anterior para fazer uma versão usando renderer. O gist com [o código é este][exemplo-03]

[exemplo-01]: https://gist.github.com/wldomiciano/c7fecb4e7af1cd57342390b22800c771
[exemplo-02]: https://gist.github.com/wldomiciano/d16bea2d66365cf0113c7abaa0b84de7
[exemplo-03]: https://gist.github.com/wldomiciano/316b9b6fd2ecc5b1af76005e76691c42
[sdl_ttf]: https://www.libsdl.org/projects/SDL_ttf
[sdl2]: https://www.libsdl.org
