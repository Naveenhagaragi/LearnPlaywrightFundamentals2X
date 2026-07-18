declare global {
    namespace NodeJS {
        interface ProcessEnv {
            CI?: string;
        }
    }
    var process: NodeJS.Process;
}

export { };
