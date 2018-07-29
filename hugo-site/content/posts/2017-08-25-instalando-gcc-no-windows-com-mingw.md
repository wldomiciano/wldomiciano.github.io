---
title: Instalando o GCC no Windows com MinGW
comments: true
---

O [GCC](https://gcc.gnu.org/) é um compilador de C, C++ e de [algumas outras linguagens](https://gcc.gnu.org/onlinedocs/gcc-7.2.0/gcc/G_002b_002b-and-GCC.html).

Ele é parte do projeto [GNU](https://www.gnu.org/gnu/gnu-history.html) e pode ser instalado no Windows através do [MinGW](https://mingw-w64.org/doku.php).

Há várias formas de se instalar o MinGW e a que apresento aqui é a que considero mais simples.

## Download e instalação

Acesse o link da página de download abaixo e clique em "Sourceforge".

[https://mingw-w64.org/doku.php/download/mingw-builds](https://mingw-w64.org/doku.php/download/mingw-builds)

![Print da tela de download](/assets/pagina-de-download.jpg)

Execute o arquivo baixado.

O instalador permitirá que você altere alguns dados do compilador e o local de instalação. Não altere estes dados a menos que saiba o que está fazendo.

Ele fará o download das dependências e o processo todo se resume a ir clicando em *Next* e então em *Finish* para concluir.

![Telas do instalador](/assets/resumo-da-instalacao.jpg)

## Testando a instalação

Abra o *Menu Iniciar*, digite "mingw" e clique em *Run terminal*.

![Print do menu iniciar](/assets/menu-iniciar.jpg)

Uma janela do Prompt de Comando reconfigurada pelo MinGW se abrirá.

Digite o comando abaixo e aperte *Enter* para mudar de diretório.

```
cd %homepath%\desktop
```

Digite o comando abaixo e aperte Enter para criar um arquivo chamado *teste.c* na Área de Trabalho.

```
echo main() { puts("hello"); } > teste.c
```

Use o seguinte comando para compilar.

```
gcc -w teste.c
```

Isso vai gerar um arquivo chamado *a.exe*, este é o programa já compilado. Execute-o com o seguinte comando:

 ```
 a.exe
 ```

A mensagem "hello" deve ser exibida. Se isso acontecer, parabéns, o GCC foi instalado com sucesso!

## [Opcional] Configurando o Path

Ainda não é possível executar o GCC a partir de qualquer janela do Prompt de Comando, estamos dependentes da janela própria do MinGW.

Para corrigir isso é necessário adicionar o caminho do compilador à variável de ambiente *Path*. Para isso use o seguinte comando:

```
setx path "%path%"
```

Para testar, segure a tecla *Shift*, clique com o **botão direito** do mouse em qualquer lugar na Área de Trabalho e clique em *Abrir janela de comando aqui*.

![Print do menu de contexto aberto](/assets/abrir-janela-de-comando-aqui.jpg)

No Prompt de Comando recém aberto, tente compilar e executar novamente o programa com o comando abaixo.

```
gcc -w teste.c && a.exe
```

Se a mensagem "hello" aparecer sem erros, significa que você está pronto para começar a programar sem limites!

![Resumo dos comandos](/assets/resumo-dos-comandos.jpg)
