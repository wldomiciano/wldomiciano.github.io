---
title: Uma implementação em C, JS e Java do Jogo da Cobrinha com foco na lógica
description: Aqui apresento a minha implementação do jogo da cobrinha e explico o código em C por partes
tags: [C]
---

O objetivo deste artigo é apresentar uma lógica independente de biblioteca, framework ou linguagem e que, por isso, pode ser facilmente portada.

Abaixo estão os links para as versões em C (com SDL 2), JavaScript e Java do código completo.

- [C version][1]
- [JavaScript version][2] ([jogue aqui][3])
- [Java version][4]

Ao todo são 10 funções das quais apenas 3 são dependentes da plataforma. Aqui eu apresento a versão em C.

- [`random()`](#random) (não portável)
- [`draw(int, int, int, int)`](#draw) (não portável)
- [`main(int, char**)`](#main) (não portável)
- [`setDirection(int)`](#setDirection)
- [`isOnLimits()`](#isOnLimits)
- [`hasCollisionWithTail(int)`](#hasCollisionWithTail)
- [`placeApple()`](#placeApple)
- [`drawBoard()`](#drawBoard)
- [`move()`](#move)
- [`update(int)`](#update)

## Funções não portáveis

A função `random()` gera números aleatórios e será usada para determinar a posição da maçã.

<div id="random"></div>

```c
int random() {
    return rand() % BOARD_COLS;
}
```

A função `draw()` que recebe 4 argumentos do tipo `int`.

<div id="draw"></div>

```c
void draw(int position, int r, int g, int b) {
    SDL_Rect rect = {position % BOARD_COLS, position / BOARD_COLS, SIZE, SIZE};
    rect.x *= SIZE;
    rect.y *= SIZE;

    SDL_SetRenderDrawColor(ctx, r, g, b, SDL_ALPHA_OPAQUE);
    SDL_RenderFillRect(ctx, &rect);
}
```

O primeiro argumento representa uma posição no tabuleiro que é convertida para coordenadas em 2D seguindo a seguinte fórmula:

```c
int x = position % BOARD_COLS
int y = position / BOARD_COLS
```

Após a conversão, a função multiplica essas coordenadas por `SIZE`, que é o tamanho em pixel de cada retângulo, desenhando tudo no seu devido lugar.

Ela recebe também mais 3 inteiros representando uma cor em RGB.

Destas, a função `main()` é a que tem maior responsabilidade pois, além de conter o [_main loop_](http://gameprogrammingpatterns.com/game-loop.html), verifica as teclas digitadas pelo usuário e também calcula o **delta** para a função `update()` que veremos mais tarde.

<div id="main"></div>

```c
int main(int argc, char** argv) {
    if (SDL_Init(SDL_INIT_VIDEO) < 0) return EXIT_FAILURE;
    if (SDL_CreateWindowAndRenderer(SIZE * BOARD_COLS, SIZE * BOARD_ROWS, 0, &canvas, &ctx) < 0) return EXIT_FAILURE;

    while (!SDL_QuitRequested()) {
        if      (SDL_GetKeyboardState(NULL)[SDL_SCANCODE_UP])    setDirection(-BOARD_COLS);
        else if (SDL_GetKeyboardState(NULL)[SDL_SCANCODE_DOWN])  setDirection( BOARD_COLS);
        else if (SDL_GetKeyboardState(NULL)[SDL_SCANCODE_LEFT])  setDirection(-1);
        else if (SDL_GetKeyboardState(NULL)[SDL_SCANCODE_RIGHT]) setDirection( 1);

        SDL_SetRenderDrawColor(ctx, 0, 0, 0, SDL_ALPHA_OPAQUE);
        SDL_RenderClear(ctx);

        Uint32 current = SDL_GetTicks();
        Uint32 delta   = current - previousTicks;
        previousTicks  = current;

        update(delta);

        SDL_RenderPresent(ctx);
    }

    SDL_DestroyRenderer(ctx);
    SDL_DestroyWindow(canvas);
    SDL_Quit();
    return EXIT_SUCCESS;
}
```

## Funções portáveis

Aproveitando a deixa e já entrando na parte especifica da lógica do jogo, podemos ver que a função `setDirection()` é bastante simples.

<div id="setDirection"></div>

```c
void setDirection(int dir) {
    if (dir != -direction || length == 0)
        direction = dir;
}
```

Quando a cobrinha tem comprimento (medido pela variável `length`) 0, ela pode se mover pra qualquer direção à qualquer momento, porém, quando seu comprimento é maior que 0, alguns cuidados devem ser tomados.

Se a cobrinha estiver indo pra direita e o jogador apertar a seta pra esquerda, o movimento seria inválido, pois nessa situação, ela passaria por cima do próprio corpo.

Ali, `direction` é uma variável do tipo `int`. Ela guarda a direção da cobrinha da seguinte forma:

- Se estiver indo pra direita, `direction` vale 1.
- Se estiver indo pra esquerda, `direction` vale -1.
- Se estiver indo pra cima, `direction` vale `-BOARD_COLS`.
- Se estiver indo pra baixo, `direction` vale `BOARD_COLS`.

Esse valor é somado à posição da cobrinha, que é representada pela variável `head`.

A direção só é alterada se a nova direção não for a oposta da atual ou se o comprimento for 0.

Outra função importante é a que verifica se colisões ocorreram com a cauda.

<div id="hasCollisionWithTail"></div>

```c
bool hasCollisionWithTail(int position) {
    for (int i = 0; i < length; i++)
        if (tail[i] == pos) return true;
    return false;
}
```

A cauda é representada por um array de `int`. O tamanho desse array deve ser igual ao tamanho total do tabuleiro (colunas \* linhas).

```c
int tail[BOARD_SIZE];
```

Apesar do array ter esse tamanho todo, a quantidade de elementos utilizados será igual ao valor da variável `length`. Logo, não utilizaremos sua capacidade total, mas é bom estarmos preparados.

Utilizaremos a função acima em duas situações:

- Ao definir uma nova posição para a maçã. Uma posição aleatória será escolhida, mas se essa posição coincidir com a posição da cauda (ou com a da cabeça), ela será recalculada.

<div id="placeApple"></div>

```c
void placeApple() {
    do apple = random();
    while (head == apple || hasCollisionWithTail(apple));
}
```

- Para ver se houve colisão entre a cabeça e a cauda. Se o jogador colidir com o próprio corpo, o jogo acaba.

Com a função `drawBoard()`, desenharemos o tabuleiro e todos os seus elementos. Ela é bastante simples, já que a função `draw` faz a parte dos cálculos necessários.

<div id="drawBoard"></div>

```c
void drawBoard() {
    for (int i = 0; i < length; ++i)
        draw(tail[i], 0, 255, 0);

    draw(head, 0, 0, 255);
    draw(apple, 255, 0, 0);
}
```

A função `move()` é bastante importante e a segunda função mais complexa desta lógica. Ela cuida do movimento da cobrinha verificando e corrigindo nos momentos em que ela ultrapassa os limites do tabuleiro.

<div id="move"></div>

```c
void move() {
    tail[i] = head;
    head += direction;

    if (++i >= length) i = 0;

    if (isOnLimits())
        head -= BOARD_COLS * direction;
    else if (head < 0)
        head += BOARD_SIZE;
    else if (head >= BOARD_SIZE)
        head -= BOARD_SIZE;
}
```

Enquanto `head < 0` e `head >= BOARD_SIZE` são suficientes para corrigir a posição da cobrinha caso ela exceda os limites superior e inferior do tabuleiro, para fazer a correção nas laterais, utilizamos `isOnLimits()`.

<div id="isOnLimits"></div>

```c
bool isOnLimits() {
    return (direction ==  1 && head % BOARD_COLS == 0) ||
           (direction == -1 && (head + 1) % BOARD_COLS == 0);
}
```

O segredo para o movimento correto da cauda é posicionar uma de suas partes no mesmo lugar em que a cabeça está no momento e só depois disso mover a cabeça para a próxima posição.

Qual parte da cauda deve ser posicionada desta forma é definida pela variável `i` que é incrementada a cada loop, mas volta pra 0 quando fica igual ou maior que o comprimento atual da cauda.

Por fim, temos a função `update()` que é a mais complexa.

<div id="update"></div>

```c
void update(int delta) {
    accumulator += delta;

    if (accumulator >= TIMEOUT && !isDead) {
        accumulator = 0;
        move();

        if (head == apple) {
            placeApple();
            tail[length++] = head;
        } else if (hasCollisionWithTail(head)) isDead = true;
    }

    drawBoard();
}
```

Ela acumula (`accumulator`) o delta até atingir um certo valor e só então permite que a cobrinha se movimente. É com esse controle que podemos fazer a cobrinha se movimentar mais ou menos rápido, basta alterar o valor de `TIMEOUT`. Para fazê-la se movimentar apenas uma vez por segundo, `TIMEOUT` deveria ser 1000.

Quando o timeout é alcançado, o acumulador é zerado, `move()` é chamada e 2 testes são realizados.

1. Se a cabeça e a maçã colidirem, a maçã é reposicionada, o comprimento aumenta e a nova parte da cauda entra em cena na mesma posição em que a cabeça está.

2. Verificamos se a cabeça colidiu com alguma parte da cauda, se sim, é fim de jogo.

Depois, independente do timeout, a função que desenha o tabuleiro é chamada.

## Conclusão

Embora o resultado final não seja visualmente atraente, a lógica básica está toda aí.

Se comparar os códigos em C e em JavaScript, verá que pouquíssima coisa muda além das funções não portáveis, as diferenças maiores ficam por conta de certas palavras chaves e por C ser estaticamente tipada.

A versão em Java é a mais diferente, pois ao invés de usar um loop com `while`, usei um timer para controlar a atualização do jogo e tive que lidar com as particularidades do _Swing_.

É claro que tanto JavaScript quanto Java fornecem certas facilidades ao se trabalhar com arrays, tornando a variável `length` desnecessária. Mas tentei manter a estrutura do código o mais semelhante a C que pude como uma prova de conceito.

Teste os códigos e modifique-os para entender melhor seu funcionamento. Tente implementar o resto do jogo. Acrescente um contador para mostrar os pontos, uma mensagem de inicio e uma de _game over_ e uma opção para reiniciar o jogo.

Boa sorte.

[1]: https://gist.github.com/wldomiciano/b28fc30450c5aac0e8df21a4910388ed
[2]: https://gist.github.com/wldomiciano/b7e8550b8fea5a722676cc0e8fe090ad
[3]: https://codepen.io/wldomiciano/full/wjKYzx/
[4]: https://gist.github.com/wldomiciano/92fd8ac6939b7dc6711be2ac8bd1b8ca
