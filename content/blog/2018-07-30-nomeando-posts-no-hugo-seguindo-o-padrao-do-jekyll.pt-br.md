---
title: Nomeando posts no Hugo seguindo o padrão do Jekyll
description: Como criar postagens no Hugo seguindo o padrão usado no Jekyll
tags: [Hugo]
---

No Jekyll, por padrão, os posts devem ser nomeados seguindo a convenção ANO-MES-DIA-TITULO-DO-POST.md.

    2018-07-29-minha-postagem.md
    2018-07-29-outra-postagem.md

Assim, ele extrai a data de publicação a partir do nome do arquivo.

Esta convenção é muito boa, pois nos dá uma visão cronológica bem clara logo de cara.

No Hugo, por padrão, não há essa extração e o nome do arquivo inteiro é usado para compor a URL e, considerando que suas postagens ficam dentro da pasta `content/blog`, você teria algo como:

    https://wldomiciano.com/blog/2018-07-30-minha-postagem/

Felizmente é possível facilmente alterar este comportamento acrescentando apenas 2 linhas ao `config.toml` da seguinte forma:

{{< highlight toml "hl_lines=5 6" >}}
baseURL = "https://wldomiciano.com/"
languageCode = "pt-br"
title = "Wellington Domiciano"

[frontmatter]
date = [":filename", ":default"]
{{< / highlight >}}

Com essa configuração a URL ficaria assim:

    https://wldomiciano.com/blog/minha-postagem/

No caso deste blog, preferi não colocar a data na URL.

    https://wldomiciano.com/minha-postagem/

Para conseguir isso, basta acrescentar o trecho abaixo à configuração.

```toml
# ...
[permalinks]
blog = "/:slug/"
```

E se sua intenção é deixar a URL no padrão Jekyll, altere o trecho acima para:

```toml
[permalinks]
blog = "/:year/:month/:day/:slug/"
```

O resultado será:

    https://wldomiciano.com/blog/2018/07/30/minha-postagem/

Embora sejam diferentes, tanto Jekyll como Hugo são ferramentas extremamente flexíveis, permitindo um alto nível de personalização

Até mais.
