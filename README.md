This is a demo to show how to run Rust on the browser without javascript. The game project I use as example is not mine. It comes from here: https://rhmoller.dev/posts/2020/my-experience-with-rust-and-websys/


## Build and run

```sh
./build.sh
python3 demo_server/server.py
```
Open http://localhost:8080/

## Requirements

* Rust
* wasm-pack
* binaryen (if you want to run wasm-opt manually)
* Python3

It has been tested on Linux x86 and x64.

## Binary optimizations

Edit build.sh and remove the wasm-opt call if you don't want to optimize the binary. Alternative, you can enable the optimizations in Cargo.toml, setting `wasm-opt = true`. Be careful though, since this only works if you are running on an x64 platforms.
I should warn you that there are precompiled binaries for binaryen x86 in their github, and wasm-pack will try to use them but the packages actually contain x64 files that won't work. Here is the bug report https://github.com/rustwasm/wasm-pack/issues/974

Check this blogpost for more details. https://emilio-moretti.medium.com/using-rust-and-webassembly-without-javascript-9058b8fb6a28
