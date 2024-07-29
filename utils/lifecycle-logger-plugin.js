class LifecycleLoggerPlugin {
  apply(compiler) {
    compiler.hooks.environment.tap("LifecycleLoggerPlugin", () => {
      console.log("\n1. environment\n");
    });

    compiler.hooks.afterEnvironment.tap("LifecycleLoggerPlugin", () => {
      console.log("\n2. afterEnvironment\n");
    });

    compiler.hooks.entryOption.tap("LifecycleLoggerPlugin", (context, entry) => {
      console.log("\n3. entryOption\n");
    });

    compiler.hooks.afterPlugins.tap("LifecycleLoggerPlugin", (context, entry) => {
      console.log("\n4. afterPlugins\n");
    });
    compiler.hooks.afterResolvers.tap("LifecycleLoggerPlugin", (context, entry) => {
      console.log("\n5. afterResolvers\n");
    });

    compiler.hooks.initialize.tap("LifecycleLoggerPlugin", () => {
      console.log("\n6. initialize\n");
    });

    compiler.hooks.beforeRun.tap("LifecycleLoggerPlugin", compiler => {
      console.log("\n7. beforeRun\n");
    });

    compiler.hooks.run.tap("LifecycleLoggerPlugin", compiler => {
      console.log("\n8. run\n");
    });

    compiler.hooks.beforeCompile.tapAsync("LifecycleLoggerPlugin", (params, callback) => {
      console.log("\n9. beforeCompile\n");
      callback();
    });

    compiler.hooks.compile.tap("LifecycleLoggerPlugin", params => {
      console.log("\n10. compile\n");
    });

    compiler.hooks.thisCompilation.tap("LifecycleLoggerPlugin", compilation => {
      console.log("\n11. thisCompilation\n");
    });

    compiler.hooks.compilation.tap("LifecycleLoggerPlugin", compilation => {
      console.log("\n12. compilation\n");
    });

    compiler.hooks.make.tapAsync("LifecycleLoggerPlugin", (compilation, callback) => {
      console.log("\n13. make\n");
      callback();
    });

    compiler.hooks.afterCompile.tapAsync("LifecycleLoggerPlugin", (compilation, callback) => {
      console.log("\n14. afterCompile\n");
      callback();
    });
    compiler.hooks.shouldEmit.tap("LifecycleLoggerPlugin", compilation => {
      console.log("\n15. shouldEmit\n");
      return true;
    });

    compiler.hooks.emit.tapAsync("LifecycleLoggerPlugin", (compilation, callback) => {
      console.log("\n16. emit\n");
      callback();
    });

    compiler.hooks.done.tap("LifecycleLoggerPlugin", stats => {
      console.log("\n17. done\n");
    });
  }
}

module.exports = LifecycleLoggerPlugin;
