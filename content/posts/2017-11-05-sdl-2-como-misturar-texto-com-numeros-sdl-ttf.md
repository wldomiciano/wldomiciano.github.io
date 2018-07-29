---
title: SDL 2 - Como misturar texto com números usando SDL_ttf
comments: true
---

Usar a biblioteca [SDL_ttf](https://www.libsdl.org/projects/SDL_ttf/) (com [SDL 2](https://www.libsdl.org/)) não tem segredo.

- Você inicializa com `TTF_Init()`
- Carrega uma fonte com `TTF_OpenFont()`
- Cria um texto com `TTF_RenderText_Solid()`
- E desenha na tela com `SDL_BlitSurface()`

Olha um exemplo aqui: [pastebin.com/HU7CfNmR](https://pastebin.com/HU7CfNmR)

Mas e se o texto que queremos colocar na tela for a pontuação do personagem ou um contador de tempo?

Este tipo de dado muda constantemente e o pior: mistura números e texto!

Como você faria pra escrever, por exemplo, "Your Score: 123"?

Se estivéssemos lidando com `printf()` e console seria fácil:

{{< highlight c >}}
printf("Your Score: %d", score);
{{< / highlight >}}

Então a solução para esse problema é o [`snprintf()`](http://www.cplusplus.com/reference/cstdio/snprintf/).

A diferença do `snprintf` é que ao invés de imprimir texto na saida padrão, ele armazena o texto gerado em um array.

{{< highlight c >}}
snprintf(BUFFER, BUFFER_SIZE, "Your Score: %d", 123);
{{< / highlight >}}

Depois é só fazer o que quiser com o BUFFER. Experimente com:

{{< highlight c >}}
#include <stdio.h>
#define BUFFER_SIZE 512

int main() {
    char buffer[BUFFER_SIZE] = {0};
    snprintf(buffer, BUFFER_SIZE, "Your Score: %d", 123); // armazena em buffer
    printf(buffer); // imprime o resultado na saida padrão
    return 0;
}
{{< / highlight >}}

Voltando pro nosso problema em SDL, poderiámos alterar o código mostrado no inicio pro `while` ficar assim:

{{< highlight c >}}
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
{{< / highlight >}}

Isso resolve o problema e nos permite criar texto como se estivéssemos usando usando `printf`, mas nós podemos ir um pouco mais além. Que tal criar uma função que nos permita deixar nosso loop assim:

{{< highlight c >}}
while (!SDL_QuitRequested()) {
    SDL_FillRect(surface, NULL, 0);

    drawText("Your Score: %d", counter++);

    SDL_UpdateWindowSurface(window);
}
{{< / highlight >}}

Para isso vamos precisar de mais uma função da biblioteca padrão, a [`vsnprintf()`](http://www.cplusplus.com/reference/cstdio/vsnprintf/). Ela aceita como último argumento uma `va_list`, aquela estrutura que usamos quando queremos criar uma função que aceita uma quantidade variável de argumentos.

Com ela podemos criar a seguinte função:

{{< highlight c >}}
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
{{< / highlight >}}

E o resultado final pode ser visto aqui: [pastebin.com/9mKKtkcv](https://pastebin.com/9mKKtkcv)
