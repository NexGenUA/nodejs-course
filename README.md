# Task 1. Caesar cipher CLI tool

## Prerequisites

- Node.js - [Download & Install Node.js v12](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```bash
git clone https://github.com/NexGenUA/nodejs-course
```

## Change directory

```bash
cd nodejs-course/caesar_cli
```

## Change branch

```bash
git checkout task-1
```

## Installing NPM modules

```bash
npm install
```

# CLI tool has 4 options:

1.  **-s, --shift**: a shift
2.  **-i, --input**: an input file
3.  **-o, --output**: an output file
4.  **-a, --action**: an action encode/decode

**Usage example:**

```bash
$ node caesar -a encode -s 7 -i "./input.txt" -o "./output.txt"
```

```bash
$ node caesar --action encode --shift 7 --input plain.txt --output encoded.txt
```

```bash
$ node caesar --action decode --shift 7 --input decoded.txt --output plain.txt
```

> input.txt
> `This is secret. Message about "_" symbol!`

> output.txt
> `Aopz pz zljyla. Tlzzhnl hivba "_" zftivs!`
