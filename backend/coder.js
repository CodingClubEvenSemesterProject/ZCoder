import { parentPort } from 'worker_threads';
import { execFile } from 'child_process';
import fs from 'fs';

parentPort.on('message', ({ code, language, input }) => {
    let filePath;
    let args;

    const executeCommand = (command, args, input, callback) => {
        const child = execFile(command, args, (error, stdout, stderr) => {
            if (error) {
                callback({ error: stderr.toString() });
            } else {
                callback({ output: stdout.toString() });
            }
        });

        if (input) {
            child.stdin.write(input);
            child.stdin.end();
        }
    };

    const compileAndRun = (compileCommand, compileArgs, runCommand, runArgs, input) => {
        executeCommand(compileCommand, compileArgs, null, (compileResult) => {
            if (compileResult.error) {
                parentPort.postMessage({ error: compileResult.error });
            } else {
                executeCommand(runCommand, runArgs, input, (runResult) => {
                    if (runResult.error) {
                        parentPort.postMessage({ error: runResult.error });
                    } else {
                        parentPort.postMessage({ output: runResult.output });
                    }
                });
            }
        });
    };

    switch (language) {
        case 'python':
            filePath = 'python';
            args = ['-c', code];
            executeCommand(filePath, args, input, (result) => {
                parentPort.postMessage(result);
            });
            break;

        case 'java':
            const javaFileName = 'Temp.java';
            const javaClassName = 'Temp';
            fs.writeFileSync(javaFileName, code);
            compileAndRun(
                'javac',
                [javaFileName],
                'java',
                [javaClassName],
                input
            );
            break;

        case 'cpp':
            const cppFileName = 'Temp.cpp';
            const cppExecutableName = './TempExecutable';
            fs.writeFileSync(cppFileName, code);
            compileAndRun(
                'g++',
                [cppFileName, '-o', cppExecutableName],
                cppExecutableName,
                [],
                input
            );
            break;

        default:
            parentPort.postMessage({ error: 'Unsupported language' });
            break;
    }
});