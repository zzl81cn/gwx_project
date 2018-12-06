<template>
  <div>
    <div class="example"
      @click="onRedClick">
      <label v-for="(item,index) in radioList"
        :key="item.value"
        :for="item.linkLabel"
        :accesskey="index">
        <span class="content__input">
          <span class="radio__replace"
            :class="{'radio__replace--checked':selectedRadio===item.value,'radio__replace--disable':item.isDisabled}">
          </span>
          <input v-model="selectedRadio"
            type="radio"
            class="radio__button"
            name="radio"
            :id="item.linkLabel"
            :tabindex="index"
            :value="item.value"
            :disabled="item.isDisabled"
            @focus="item.isFocus = true"
            @blur="item.isFocus = false" />
        </span>
        <span class="content__text">{{item.label}}</span>
      </label>
    </div>
    <div :class="{test:isShow}"
      @click="onRedClick">
      <div class="text__item"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'radio',

  data() {
    return {
      radioList: [
        {
          linkLabel: 'label1',
          value: '1',
          isDisabled: false,
          isFocus: false,
          label: '标签1'
        },
        {
          linkLabel: 'label2',
          value: '2',
          isDisabled: false,
          isFocus: false,
          label: '标签2'
        },
        {
          linkLabel: 'label3',
          value: '3',
          isDisabled: false,
          isFocus: false,
          label: '标签3'
        }
      ],
      selectedRadio: '1',
      isShow: false
    }
  },

  methods: {
    onRedClick() {
      this.radioList.forEach(item => {
        console.log(item)
      })
      this.isShow = !this.isShow
    }
  },
  created() {}
}
</script>

<style lang='scss' scoped>
.example {
  display: flex;
  margin-top: 40px;
  width: 300px;
  justify-content: space-around;
  .content {
    &__text {
      color: #999;
    }
    &__input {
      position: relative;
      .radio {
        &__replace {
          border: 1px solid #dcdfe6;
          border-radius: 100%;
          width: 14px;
          height: 14px;
          background-color: #fff;
          position: relative;
          cursor: pointer;
          display: inline-block;
          box-sizing: border-box;
          z-index: 999;
          transition: 0.15s ease-in;
          &--checked {
            border-color: #409eff;
            background-color: #409eff;
          }
          &--disable {
            cursor: not-allowed;
          }
          &:after {
            width: 4px;
            height: 4px;
            border-radius: 100%;
            background-color: #fff;
            content: '';
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          }
        }
        &__button {
          opacity: 0;
          outline: none;
          position: absolute;
          z-index: 1;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          margin: 0;
        }
      }
    }
  }
}

// 通过层级来控制伪类的样式，给定类名，通过变量来控制类名的有无，有的时候提高层级改变伪类的权重
.text__item {
  &:after {
    content: '';
    width: 30px;
    height: 30px;
    background-color: #f00;
    position: absolute;
    bottom: 20px;
  }
}
.test {
  .text__item {
    &:after {
      background-color: #ff0;
    }
  }
}
</style>
