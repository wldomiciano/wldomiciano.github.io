---
title: Como criar um projeto JavaFX com Gradle ou Maven a partir da linha de comando
description: Aprenda a criar projetos JavaFX usando Gradle ou Maven
tags:
  - Java
draft: true
---

## Requisitos

<style>.parameter { color: red; } .argument { color: orange }</style>

Para seguir este tutorial você precisa ter instalados um JDK e o Gradle ou o
Maven de acordo com a sua preferência.

Eu uso o **JDK 11**, o **Gradle 6.1** e o **Maven 3.6.3**.

## Passo 1: Criando um projeto

### Com Maven

Use o comando abaixo para criar o diretório **MeuIncrivelApp** dentro do
diretório atual.

<div class="highlight"><pre><code
>mvn archetype:generate -B <span class="parameter">-DgroupId</span>=<span class="argument">com.wldomiciano.meuincrivelapp</span> \
                          <span class="parameter">-Dversion</span>=<span class="argument">1.0-SNAPSHOT</span> \
                          <span class="parameter">-DartifactId</span>=<span class="argument">MeuIncrivelApp</span> \
                          <span class="parameter">-DarchetypeGroupId</span>=<span class="argument">org.apache.maven.archetypes</span> \
                          <span class="parameter">-DarchetypeArtifactId</span>=<span class="argument">maven-archetype-quickstart</span
></code></pre></div>

Adicione o trecho abaixo à seção `<dependencies>` do arquivo `pom.xml`.

```xml
<dependency>
  <groupId>org.openjfx</groupId>
  <artifactId>javafx-controls</artifactId>
  <version>13</version>
</dependency>
```

E o trecho abaixo à seção `<plugins>`.

```xml
<plugin>
  <groupId>org.openjfx</groupId>
  <artifactId>javafx-maven-plugin</artifactId>
  <version>0.0.3</version>
  <configuration>
    <mainClass>com.wldomiciano.meuincrivelapp.App</mainClass>
  </configuration>
</plugin>
```

Veja o `pom.xml` modificado [aqui](https://github.com/wldomiciano/javafx-com-gradle-e-maven/blob/master/MeuIncrivelAppMaven/pom.xml).

### Com Gradle

Crie um novo diretório para conter seu projeto e entre nele com o comando abaixo.

```sh
mkdir MeuIncrivelApp && cd MeuIncrivelApp
```

Em seguida execute o próximo comando para gerar o projeto:

<div class="highlight"><pre><code>gradle init <span class="parameter">--dsl</span> <span class="argument">groovy</span> \
            <span  class="parameter">--type</span> <span class="argument">java-application</span> \
            <span  class="parameter">--package</span> <span class="argument">com.wldomiciano.meuincrivelapp</span> \
            <span  class="parameter">--project-name</span> <span class="argument">MeuIncrivelApp</span> \
            <span  class="parameter">--test-framework</span> <span class="argument">junit-jupiter</span
></code></pre></div>

Então, substitua o bloco `plugins` do arquivo `build.gradle` pelo trecho abaixo.

```groovy
plugins {
  id 'application'
  id 'org.openjfx.javafxplugin' version '0.0.8'
}

javafx {
  version = '13'
  modules = [ 'javafx.controls' ]
}
```

Veja o `build.gradle` modificado [aqui](https://github.com/wldomiciano/javafx-com-gradle-e-maven/blob/master/MeuIncrivelAppGradle/build.gradle).

## Passo 2: Adicionando código de teste

Tanto no projeto criado com Maven quanto no criado com Gradle, um arquivo será
criado com o nome:

    src/main/java/com/domiciano/meuincrivelapp/App.java

Substitua o conteúdo deste arquivo com o código abaixo:

```java
package com.wldomiciano.meuincrivelapp;

import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.control.Label;
import javafx.scene.layout.StackPane;
import javafx.stage.Stage;

public class App extends Application {
  @Override
  public void start(Stage stage) {
    String javaVersion = System.getProperty("java.version");
    String javafxVersion = System.getProperty("javafx.version");
    Label l = new Label("Hello, JavaFX " + javafxVersion + ", running on Java " + javaVersion + ".");
    Scene scene = new Scene(new StackPane(l), 640, 480);
    stage.setScene(scene);
    stage.show();
  }

  public static void main(String[] args) {
    launch();
  }
}
```

## Passo 3: Executando a aplicação

Para executar seu programa, no Maven, execute o seguinte comando:

    mvn clean javafx:run

E no Gradle:

    ./gradlew run

Se tudo correr como planejado, uma janela deve se abrir com uma mensagem.
