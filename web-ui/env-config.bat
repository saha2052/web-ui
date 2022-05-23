@echo off
del .\env-config.js
fsutil file createnew .\env-config.js 0

echo window._env_ = { >> .\env-config.js

SET @ENVFILE=".env.development"

echo "ENVFILE = %@ENVFILE%"

for /F "tokens=1,2 delims==" %%a in (%cd%\.env.development) do (
  echo   %%a: "%%b", >> .\env-config.js
)

echo } >> .\env-config.js
