<template>
  <button :class="['do-button', buttonClass]" @click="$emit('click')" :disabled="disabled">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "do-button",
  props: {
    size: {
      type: String,
      required: false,
      default: "",
      validator: value => ["", "medium", "mini", "small"].includes(value),
    },
    type: {
      type: String,
      required: false,
      default: "default",
      validator: value => ["default", "primary", "success", "info", "warning", "danger"].includes(value),
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  mounted() {
    console.log(this.size);
  },
  computed: {
    buttonClass() {
      return {
        [`do-button--${this.size}`]: this.size,
        [`do-button--${this.type}`]: true,
      };
    },
  },
};
</script>

<style lang="scss">
.do-button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  border: 1px solid #dcdfe6;
  color: #606266;
  background-color: #ffffff;
  text-align: center;
  outline: none;
  margin: 0;
  font-weight: 500;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 12px 20px;
  transition: 0.2s;
  //   按钮禁用手势
  &.is-disabled {
    cursor: not-allowed;
  }
  //   按钮大小
  &.do-button--medium {
    padding: 10x 20px;
    font-size: 14px;
    border-radius: 4px;
  }
  &.do-button--mini {
    padding: 9x 15px;
    font-size: 12px;
    border-radius: 3px;
  }
  &.do-button--small {
    padding: 7px 15px;
    font-size: 12px;
    border-radius: 3px;
  }
  //   按钮类型
  &.do-button--default {
    &:hover {
      background-color: #ecf5ff;
      border-color: c6e2ff;
      color: #409eff;
    }
    &.is-disabled {
      color: #c0c4cc;
      background-image: none;
      background-color: #ffffff;
      border-color: #ebeef5;
    }
  }
  &.do-button--primary {
    color: #ffffff;
    background-color: #409eff;
    border-color: #409eff;
    &:hover {
      opacity: 0.8;
    }
    &.is-disabled {
      color: #fff;
      background-image: none;
      background-color: #a0cfff;
      border-color: #a0cfff;
    }
  }
  &.do-button--success {
    color: #ffffff;
    background-color: #67c23a;
    border-color: #67c23a;
    &:hover {
      opacity: 0.8;
    }
    &.is-disabled {
      color: #fff;
      background-image: none;
      background-color: #b3e19d;
      border-color: #b3e19d;
    }
  }
  &.do-button--info {
    color: #ffffff;
    background-color: #909399;
    border-color: #909399;
    &:hover {
      opacity: 0.8;
    }
  }
  &.do-button--warning {
    color: #ffffff;
    background-color: #e6a23c;
    border-color: #e6a23c;
    &:hover {
      opacity: 0.8;
    }
    &.is-disabled {
      color: #fff;
      background-image: none;
      background-color: #f3d19e;
      border-color: #f3d19e;
    }
  }
  &.do-button--danger {
    color: #ffffff;
    background-color: #f56c6c;
    border-color: #f56c6c;
    &:hover {
      opacity: 0.8;
    }
    &.is-disabled {
      color: #fff;
      background-image: none;
      background-color: #fab6b6;
      border-color: #fab6b6;
    }
  }
}
</style>
