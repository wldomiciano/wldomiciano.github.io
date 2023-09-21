---
title: Sobre identificadores de chaves estrangeiras no MySQL
description:
  Como definir identificadores ao criar chaves estrangeiras e os diferentes
  comportamentos entre versões mais antigas.
tags: [MySQL]
---

A sintaxe para definir chaves estrangeiras no MySQL é a seguinte:

```
[CONSTRAINT [symbol]] FOREIGN KEY
  [index_name] (col_name, ...)
  REFERENCES tbl_name (col_name,...)
  [ON DELETE reference_option]
  [ON UPDATE reference_option]

reference_option:
  RESTRICT | CASCADE | SET NULL | NO ACTION | SET DEFAULT
```

Ignorando a parte _reference_option_, todos os comandos abaixo são válidos:

```sql
-- Exemplo 1
FOREIGN KEY (`col_name`)
  REFERENCES `tbl_name`(`col_name`);

-- Exemplo 2
CONSTRAINT FOREIGN KEY (`col_name`)
  REFERENCES `tbl_name`(`col_name`);

-- Exemplo 3
CONSTRAINT FOREIGN KEY `index_name` (`col_name`)
  REFERENCES `tbl_name`(`col_name`);

-- Exemplo 4
CONSTRAINT `symbol` FOREIGN KEY (`col_name`)
  REFERENCES `tbl_name`(`col_name`);

-- Exemplo 5
CONSTRAINT `symbol` FOREIGN KEY `index_name` (`col_name`)
  REFERENCES `tbl_name`(`col_name`);
```

Desde a versão 8.0.16 (a versão atual é a 8.1.0), nos exemplos 1, 2 e 3, o MySQL
vai gerar um identificador automaticamente. Isso quer dizer que mesmo que
"index_name" seja definido, ele será ignorado.

Nos exemplos 4 e 5, o identificador usado será "symbol".

Até a versão 8.0.15 (versão de 2019), na ausência de um "symbol" seguindo a
palavra chave `CONSTRAINT`, o "index_name" seria usado, se estivesse presente.

Referências:

- https://dev.mysql.com/doc/refman/8.0/en/create-table-foreign-keys.html
