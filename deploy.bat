@echo off
echo Building the project...
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo Build failed. Fix errors before pushing.
    exit /b %ERRORLEVEL%
)

echo Build successful. Pushing to GitHub...
git add .
set /p commit_msg="Enter commit message: "
git commit -m "%commit_msg%"
git push

echo Done!
pause
