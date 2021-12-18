module.exports = {
    mount: {
        public: "/",
        src: "/lib"
    },
    buildOptions: {
        out: "esm"
    },
    optimize: {
        bundle: false,
        minify: true,
        sourcemap: false
    }
};
