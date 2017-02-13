# PocoVM

PocoVM is a tiny virtual machine for running hexadecimal-like bytecode in the browser.
It was inspired by Chip8, a programming language/virtual machine known for its small size.

The PocoVM can be ported to many platforms, due to its small size and lack of dependencies.

The virtual machine currently measures in at 2kb, not compressed.

### Features

- Math (+, -, *, /)
- Pixel Manipulation
- Functions
- Keyboard Input (Up, Down, Left, Right, Space)

### Example

Poco uses a language which resembles hexadecimal. It is then interpreted by the Poco Virtual Machine, and rendered to the HTML5 canvas.
In the example below, a pixel is being drawn to the screen.

```
0x000

3x02a
3x03b

1x001

```

### How To Use

- Download the project
- Unzip it 
- Start a server within the unzipped folder (If Python is installed, run: `python -m SimpleHTTPServer` within the folder)

From this point, go to the hosted page. There will be 3 buttons: Choose File, Compile, and Turn On. Click 'Choose File' and choose the file you wish to run/compile. To run, click 'Turn On'. To compile PASM -> PocoByte, click 'Compile'. The compiled bytecode will be printed to the Javascript console.

### Future

- [ ] Desktop Support; currently the PocoVM is browser-only
