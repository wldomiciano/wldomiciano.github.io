---
title: SDL 2 - Como lidar com eventos únicos do teclado
comments: true
---

Em [SDL](https://www.libsdl.org/), quando queremos tratar eventos, usamos uma função parecida com a do trecho abaixo dentro do nosso [*game loop*](https://en.wikipedia.org/wiki/Game_programming#Game_structure).

{{< highlight c >}}
void handleInput() {
    SDL_Event event;
    while (SDL_PollEvent(&event)) {
        switch (event.type) {
            case SDL_QUIT:
                quit = SDL_TRUE;
                break;
            case SDL_KEYDOWN:
                // do something
                break;
            case SDL_KEYUP:
                // do something
                break;
        }
    }
}
{{< / highlight >}}

Mas há momentos em que queremos tratar certos eventos (no caso, eventos de teclado) fora dessa função, e para esses momentos o SDL nos fornece a [`SDL_GetKeyboardState()`](https://wiki.libsdl.org/SDL_GetKeyboardState), que podemos "embrulhar" numa outra função pra ficar mais amigável.

{{< highlight c >}}
// A tecla está pressionada?
SDL_bool isKeyPressed(int key) {
    return SDL_GetKeyboardState(NULL) [key];
}
{{< / highlight >}}

Um exemplo simples seria fazer o personagem pular ao pressionarmos a tecla de espaço.

{{< highlight c >}}
if ( isKeyPressed(SDL_SCANCODE_SPACE) )
    player.y -= JUMP_FORCE;
{{< / highlight >}}

O problema com o trecho acima é que, enquanto a tecla de espaço estiver pressionada, nosso personagem continuará a subir indefinidamente.

O comportamento que desejamos aqui é que, ao pressionarmos "espaço", o personagem realize o pulo e o encerre normalmente e só seja capaz de pular novamente caso paremos de apertar e a apertemos novamente.

A solução que encontrei foi a seguinte:

{{< highlight c >}}
// Variável global
Uint8 keyStates[SDL_NUM_SCANCODES];

// Reinicia estados
void resetKeyStates() {
    for (size_t i = 0; i < SDL_NUM_SCANCODES; i++)
        keyStates[i] = 0;
}

// A tecla foi pressinada?
Uint8 wasKeyPressed(int key) {    
    return keyStates[key] == 1;
}

// A tecla foi liberada?
Uint8 wasKeyReleased(int key) {
    return keyStates[key] == 2;
}
{{< / highlight >}}

O próximo passo é modificar um pouco o nosso loop de eventos:

{{< highlight c >}}
void handleInput() {
    resetKeyStates();
    SDL_Event event;
    while (SDL_PollEvent(&event)) {
        switch (event.type) {
            case SDL_QUIT:
                quit = SDL_TRUE;
                break;
            case SDL_KEYDOWN:
                keyStates[event.key.keysym.scancode] = !event.key.repeat;
                break;
            case SDL_KEYUP:
                keyStates[event.key.keysym.scancode] = 2;
                break;
        }
    }
}
{{< / highlight >}}

E pronto. Faça o teste com isso:

{{< highlight c >}}
int main(int argc, char *argv[]) {
    SDL_Init(SDL_INIT_VIDEO);
    SDL_Window* window = SDL_CreateWindow("Window Title", SDL_WINDOWPOS_CENTERED, SDL_WINDOWPOS_CENTERED, 640, 480, 0);

    while ( !quit ) {
        handleInput();

        if ( isKeyPressed(SDL_SCANCODE_A) )
            SDL_Log("A is pressed!");

        if ( wasKeyPressed(SDL_SCANCODE_SPACE) )
            SDL_Log("Space was pressed!");

        if ( wasKeyReleased(SDL_SCANCODE_SPACE) )
            SDL_Log("Space was released!");
    }

    SDL_DestroyWindow(window);
    SDL_Quit();
    return 0;
}
{{< / highlight >}}

O código de teste acima está completo aqui: [test.c](https://gist.github.com/wldomiciano/26ca464b697e61d6bc85f2b07026631e)

E aqui tem um exemplo mais visual: [game.c](https://gist.github.com/wldomiciano/533f83bd399409ef723beff401fa22f2)
