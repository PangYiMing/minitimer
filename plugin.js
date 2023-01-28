class HelloWorldPlugin {
    apply(compiler) {
        compiler.hooks.done.tap(
            'Hello World Plugin',
            (
                stats /* 绑定 done 钩子后，stats 会作为参数传入。 */
            ) => {
                console.log('Hello World!');
            }
        );
    }
}

module.exports = HelloWorldPlugin;