@echo off
call "C:\PROGRA~2\MICROS~2\2022\BuildTools\Common7\Tools\VsDevCmd.bat" -arch=x64
cd /d "%~dp0"
cargo build --release
