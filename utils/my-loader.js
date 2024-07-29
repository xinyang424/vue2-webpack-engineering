module.exports = function (source) {
  // 替换所有的 console.log 为 console.warn
  const result = source.replace(/console\.log/g, "console.warn");
  // console.log("\n=====>  我的 loader 生效了！！！！\n");
  return result;
};
