---
title: O que são os Compound Literals em C
description: Descubra o que é e como utilizar este recurso da linguagem C
tags: [C]
---

Você já ouviu falar sobre _Compound Literals_ em C?

O nome pode lhe ser estranho, mas há grandes chances de que você já tenha usado este recurso.

Ele faz parte da linguagem desde o C99 e se ainda não o conhece, eu vou te explicar.

Imagina que você tem uma `struct` chamada `Point` e uma função capaz de somar dois Points.

```c
typedef struct {
    int x;
    int y;
} Point;

Point sumPoints(Point a, Point b) {
    Point c;
    c.x = a.x + b.x;
    c.y = a.y + b.y;
    return c;
}
```

Ao invocar a função acima, você é obrigado a fornecer 2 Points válidos. Então, teríamos que fazer algo assim:

```c
Point a = { 1, 2 };
Point b = { 3, 4 };
Point c = sumPoints(a, b);
```

Só que em alguns momentos pode não ser desejável ter que criar os 2 Points só pra poder passá-los para a função e é aí que entra os Compound Literals.

```c
Point d = sumPoints((Point) { 1, 2 }, (Point) { 3, 4 });
```

Por definição eles são **objetos sem nome** representados pelo **nome de um tipo entre parenteses** seguido por uma **lista de inicializadores entre chaves**.

Se uma função aceita ponteiros, também podemos usar os Compound Literals.

```c
Point sumPointPointers(Point* a, Point* b) {
    Point c;
    c.x = a->x + b->x;
    c.y = a->y + b->y;
    return c;
}

Point e = sumPointPointers(&(Point) { 1, 2 }, &(Point) { 3, 4 });
```

Também é possível criar compound literals de arrays.

```c
someFunction( (int[]) { 1, 2, 3, 4, 5 } );
```

Estes objetos são criados automaticamente.

Se eles forem usados **fora** do corpo de uma função, eles possuem _static storage duration_ e isso quer dizer que eles duram por toda a execução do programa.

Mas se forem usados **dentro** do corpo de uma função, eles possuem _automatic storage duration_ e isso que dizer que seu tempo de vida dura até que a função retorne.

Você pode ter informações detalhadas consultando a própria especificação da linguagem. No capitulo **6.5.2.5 Compound Literals**.

O último rascunho está publicamente disponível e pode ser acessado pelo link abaixo.

http://www.open-std.org/jtc1/sc22/wg14/www/docs/n1570.pdf

## Considerações finais

Particularmente achei bem legal esse recurso, pois há um tempo eu queria criar um framework para criação de jogos 2D baseado em [SDL 2](https://www.libsdl.org/) onde haveria uma função chamada `createGame()` que aceitava uma uma série de configurações como argumento.

Através dessas configurações, era possível escolher, dentre outras coisas, a altura e a largura da janela.

Eu queria algo simples ao estilo do [Phaser.io](http://phaser.io/) e consegui algo semelhante assim:

As configurações eram representadas pela struct `Config`.

```c
typedef struct {
    int width;
    int height;
    char* title;
} Config;
```

E para criar inicializar o framework, era só fazer assim:

```c
#include "framework.h";
int main() {
    Game game = createGame((Config) {
        .title = "My Awesome Game",
        .width = 640,
        .height = 480
    });

    return runGame(&game);
}
```

Achei a ideia bem legal embora o framework não tenha ido pra frente.

Criei uma demonstração mínima que pode ser executada aqui:

https://repl.it/@wldomiciano/compoundListeralDemonstration

Mas e você, já conhecia este recurso? Sabia que seu nome era esse?

Espero que este artigo tenha sido útil. Até a próxima!
