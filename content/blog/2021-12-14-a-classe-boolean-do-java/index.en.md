---
title: The Java's Boolean class
description: Learn how to work with the Boolean class in Java
slug: the-boolean-class-in-java
tags: [Java]
---

As of Java 9 the [`Boolean`][boolean] class constructors have become deprecated
and when we want to use `Boolean` instances we use [`Boolean.TRUE`][true] or
[`Boolean.FALSE`][false] constants.

We can get one of these constants from a primitive using the
[`Boolean.valueOf()`][valueof] method.

```java
System.out.println(Boolean.valueOf(true) == Boolean.TRUE); // true
System.out.println(Boolean.valueOf(false) == Boolean.FALSE); // true
```

This method also accepts a `String` that, if it equals the word **true**,
ignoring if the letters are uppercase or lowercase, the result will be equal to
`Boolean.TRUE`, otherwise it will be `Boolean.FALSE`.

```java
System.out.println(Boolean.valueOf("true") == Boolean.TRUE); // true
System.out.println(Boolean.valueOf("TRUE") == Boolean.TRUE); // true
System.out.println(Boolean.valueOf("TrUe") == Boolean.TRUE); // true
System.out.println(Boolean.valueOf("false") == Boolean.FALSE); // true
System.out.println(Boolean.valueOf("") == Boolean.FALSE); // true
System.out.println(Boolean.valueOf(null) == Boolean.FALSE); // true
```

The [`Boolean.parseBoolean()`][parseboolean] method also accepts a `String` and
works the same way, but returns a primitive instead of an object.

## Using in expressions

We can use a `Boolean` directly in places where booleans expressions are
expected, such as in `if` or `while` conditions.

```java
Boolean value = Boolean.TRUE;

if (value) {
  // ...
}

while (value) {
  // ...
}
```

But be aware that as a `Boolean` can be `null`, a `NullPointerException` can be
thrown.

```java
Boolean value = null;

if (value) { // will throw NullPointerException
  // ...
}
```

## Other cool static methods

The [`Boolean.logicalAnd()`][logicaland] method is equivalent to using the `&&`
operator and returns `true` only if **both** values are `true`.

```java
System.out.println(Boolean.logicalAnd(true, true));   // true
System.out.println(Boolean.logicalAnd(true, false));  // false
System.out.println(Boolean.logicalAnd(false, true));  // false
System.out.println(Boolean.logicalAnd(false, false)); // false
```

The [`Boolean.logicalOr()`][logicalor] method is equivalent to using the `||`
operator and returns `true` if **at least one** of the values is `true`.

```java
System.out.println(Boolean.logicalOr(true, true));   // true
System.out.println(Boolean.logicalOr(true, false));  // true
System.out.println(Boolean.logicalOr(false, true));  // true
System.out.println(Boolean.logicalOr(false, false)); // false
```

The [`Boolean.logicalXor()`][logicalxor] methods is equivalent to using the `^`
operator and returns `true` only if **one** of the values is `true`.

```java
System.out.println(Boolean.logicalXor(true, true));   // false
System.out.println(Boolean.logicalXor(true, false));  // true
System.out.println(Boolean.logicalXor(false, true));  // true
System.out.println(Boolean.logicalXor(false, false)); // false
```

The [`Boolean.getBoolean()`][getboolean] method is used to return a
_System Property_ as a `boolean` primitive following to same rules as the
`Boolean.parseBoolean()` method.

It is possible to pass to the program arbitrary System Properties using the
`-D` option at runtime.

```java
// Compile and run with the command below.
// java -Daaa=true -Dbbb=false Program
public class Program {
  public static void main(String... args) {
    System.out.println(Boolean.getBoolean("aaa")); // true
    System.out.println(Boolean.getBoolean("bbb")); // false
  }
}
```

[boolean]: https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/Boolean.html
[true]: https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/Boolean.html#TRUE
[false]: https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/Boolean.html#FALSE
[valueof]: https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/Boolean.html#valueOf(boolean)
[parseboolean]: https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/Boolean.html#parseBoolean(java.lang.String)
[logicaland]: https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/Boolean.html#logicalAnd(boolean,boolean)
[logicalor]: https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/Boolean.html#logicalOr(boolean,boolean)
[logicalxor]: https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/Boolean.html#logicalXor(boolean,boolean)
[getboolean]: https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/Boolean.html#getBoolean(java.lang.String)
