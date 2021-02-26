---
title: Sobre a mudança do blog de Jekyll para Hugo
description: Mudei o gerador estático do blog de Jekyll para Hugo e aqui explico o porquê
tags: [Meta]
---

Quero deixar registrado aqui que hoje tirei o dia para migrar este blog de [Jekyll](https://jekyllrb.com) para [Hugo](https://gohugo.io), um outro gerador de sites estáticos.

## O que são geradores de sites estáticos

Diferentes do [WordPress](https://wordpress.org) e afins, onde cada página é gerada dinamicamente conforme o usuário faz uma requisição, com geradores estáticos suas páginas são todas geradas antes de serem enviadas para o servidor. Quando o usuário faz uma requisição, o servidor apenas manda esta página pronta como resposta.

Dentre as vantagens destes geradores, destacam-se maior **performance** e **segurança** para o seu site.

## Um pouco de história

Durante anos quis criar um blog e cheguei a mexer com o [Blogger](https://blogger.com) e com o WordPress, mas foi com o Jekyll que o desejo se tornou realidade no ano passado.

Instalei, criei o site, escrevi a primeira postagem e o coloquei no ar. Foi uma realização!

Embora o Jekyll seja uma solução bastante robusta e flexível, devido a certos problemas com a minha instalação no Windows, decidi procurar alternativas.

Encontrei o Hugo, tirei um tempo para aprender o básico dele e agora este blog, 11 meses após seu inicio, foi migrado.

O Hugo é excelente, gosto da forma como as coisas foram definidas nele, mas duas coisas me chamaram mais a atenção: simplicidade na instalação e vários recursos sem a necessidade de plugins.

## O porquê desta mudança agora

Uma das grandes vantagens do Jekyll é sua integração com o [GitHub Pages](https://pages.github.com).

Basta criar um repositório no [GitHub](https://github.com/) para o código do seu site e o GitHub Pages o construirá automaticamente e o hospedará.

Sem esta integração, eu teria que construir meu site localmente e fazer o upload das páginas geradas manualmente para um servidor, seria necessário lidar com 2 coisas: o código em si e o site gerado.

Só que recentemente conheci o [Netlify](https://www.netlify.com/). Ele faz com sites usando Hugo (ou outros geradores) o que o GitHub Pages faz com o Jekyll, constrói as páginas automaticamente sempre que ele detecta uma mudança no repositório.

Com Netlify você não fica restrito ao GitHub, pois ele integra também com o [GitLab](https://gitlab.com/) e [Bitbucket](https://bitbucket.org).

Este tipo de serviço permite um fluxo de trabalho bem legal. Você clona o repositório do site, escreve sua postagem ou realiza qualquer modificação e, quando estiver satisfeito, dá um `git push` que em segundos, qualquer alteração estará online.

## Experimente também

Para saber mais, visite o [site oficial](https://gohugo.io/). A documentação é muito boa e os passos para instalação são bastante simples.

Até a próxima!
