---
title: Instalando e usando o Scoop, um instalador de linha de comando para Windows
description: Conheça o Scoop e aprenda como instalar esta maravilhosa ferramenta no Windows
tags: [Scoop, Windows]
---

O Scoop é um instalador de linha de comando para Windows.

Em outras palavras, com um simples `scoop install` é possível instalar programas a partir do _Prompt de Comando_ ou do _PowerShell_ de forma semelhante ao que acontece nas distribuições Linux.

Nem todos os programas estão disponíveis para serem instalados através do Scoop, mas há uma lista extensa deles que vai desde ferramentas de linha de comando como o compilador GCC até programas gráficos como Gimp e Blender.

Os passos para instalação são simples e qualquer dúvida basta visitar o site oficial em https://scoop.sh.

## Como instalar

No PowerShell, execute o comando abaixo para alterar as configurações que permitem a instalação do Scoop.

```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Uma pergunta vai aparecer. Responda digitando _y_ e pressione Enter.

Em seguida, execute o comando abaixo para realizar a instalação.

```powershell
iex (new-object net.webclient).downloadstring('https://get.scoop.sh')
```

Ao terminar, recomendo instalar os programas `openssh` e `git`, pois o Scoop os utiliza para atualizar a si mesmo.

## Instalando, listando e buscando programas

E falando em instalação de programas, como já disse no início, usamos o comando `scoop install`. Use este comando seguido pelo nome do programa desejado.

```powershell
scoop install gcc
```

Também é possível instalar vários programas de uma vez.

```powershell
scoop install wget curl vim
```

Com o comando `scoop list` podemos ver a lista com todos os programas que foram instalados usando a ferramenta.

E se quisermos saber se um determinado programa pode ser instalado com Scoop, basta usar o comando `scoop search`.

```powershell
scoop search sed
```

## Atualizando

O comando `scoop update` nos permite atualizar o Scoop em si.

Com `scoop update <nome-do-programa>` podemos atualizar um programa especifico.

E com `scoop update *` podemos atualizar todos os programas instalados de uma só vez.

Para saber se há programas desatualizados, utilizamos o comando `scoop status`.

## Buckets &#8212; O que são e como adicioná-los

O segredo do Scoop está nos _buckets_.

Os buckets são repositórios Git onde se encontram os programas, ou melhor, onde se encontram as instruções de como instalar os programas e suas dependências.

Quando você instala o Scoop, apenas o bucket principal está disponível e é necessário adicionar outros buckets caso queira ter acesso ao conteúdo deles.

Para adicionar um novo bucket usamos o seguinte comando:

```powershell
scoop bucket add <nome-do-bucket>
```

Programas como Inkscape, VLC ou Firefox se encontram no bucket "extras", adicione-o com `scoop bucket add extras`.

Use `scoop bucket list` para ver a lista de buckets adicionados e `scoop bucket known` para ver quais buckets conhecidos estão disponíveis.

## Considerações finais

Quando preciso trabalhar com certos programas (como GCC ou Git) no Windows, uso o Scoop como intermediário, pois o considero ainda mais simples do que a forma descrita na minha postagem sobre [como instalar o MinGW no Windows](https://wldomiciano.com/instalando-gcc-no-windows-com-mingw/).

Caso queira conhecer os outros comandos disponíveis, basta usar `scoop help` e para obter ajuda sobre comandos específicos, use `scoop help <nome-do-comando>`.

Espero que este indicação seja útil. Até a próxima.
