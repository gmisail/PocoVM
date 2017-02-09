# PocoVM

PocoVM is a tiny virtual machine for running hexadecimal-like bytecode in the browser.
It was inspired by Chip8, a programming language/virtual machine known for its small size.

The PocoVM can be ported to many platforms, due to its small size and lack of dependencies.

The virtual machine currently measures in at 2kb, not compressed.

### Features

- Math (+, -, *, /)
- Pixel Manipulation
- Functions

### Example

Poco uses a language which resembles hexadecimal. It is then interpreted by the Poco Virtual Machine, and rendered to the HTML5 canvas.
In the example below, a pixel is being drawn to the screen.

```
0x000

3x02a
3x03b

1x001

```

