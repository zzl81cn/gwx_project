<template>
  <div class="organization-application">
    <group ref="group">
      <x-input ref="input"
        v-for="(item,index) in applicationList"
        :key="index"
        v-model="item.value"
        :required="item.require"
        :is-type="item.type "
        :name="item.validator"
        @on-change="checkInvalid">
        <div slot="label">
          {{item.title}}
        </div>
      </x-input>
    </group>
    <div class="organization-application__submit">
      <x-button class="submit__button"
        type="primary"
        @click.native="reSaveApplicationLicenseClick">
        提交
      </x-button>
    </div>
    <toast v-model="isShowToast"
      :type="type"
      :text="toastText"
      position="middle"></toast>
  </div>
</template>

<script>
import wxtUpload from '../../../components/wxtUpload'
import { isValidID } from '../../../utils/identification'
import { callCloseWindowApi } from '../../../resource/wechatJsApi.js'
import { XInput, Group, Toast } from 'vux'
import { mapState } from 'vuex'
import { validatorValue } from './strategy.js'
const SOCIETY_ORGANIZATION = {
  NAME: 0,
  CODE: 1,
  LEGAL_NAME: 2,
  LEGAL_ID: 3,
  CONTACT_NAME: 4,
  CONTACT: 5,
  ADDRESS: 6
}
export default {
  components: {
    XInput,
    Group,
    wxtUpload,
    Toast
  },
  computed: {
    ...mapState({
      campusid: state => state.user.sessionUserInfo.campusid,
      userid: state => state.user.sessionUserInfo.userid
    }),
    pathListLength() {
      return this.pathList.length
    },
    editText() {
      return this.isEdit ? '完成' : '编辑'
    }
  },
  data() {
    return {
      applicationList: [
        { validator: 'agency', value: '', title: '*机构名称:', require: true },
        {
          validator: 'code',
          value: '',
          title: '*社会信用代码:',
          require: true
        },
        {
          validator: 'legalName',
          value: '',
          title: '*法人姓名:',
          require: true,
          type: 'china-name'
        },
        {
          validator: 'id',
          value: '',
          title: '*身份证号码:',
          require: true,
          type: this.getValidId
        },
        {
          validator: 'contactName',
          value: '',
          title: '*联系人姓名:',
          require: true
        },
        {
          validator: 'phone',
          value: '',
          title: '*手机号:',
          require: true,
          type: 'china-mobile'
        },
        { validator: 'adrress', value: '', title: '*单位地址:', require: true }
      ],
      pathList: [],
      isShowToast: false,
      count: 4,
      isEdit: false,
      uploadPath: '',
      defaultPath:
        'http://static.weixiaotong.com.cn/icon/icon-business-license.png',
      type: '',
      toastText: '',
      invalid: true
    }
  },
  methods: {
    getValidId(code) {
      return {
        valid: isValidID(code),
        msg: '身份证错误'
      }
    },
    onDeleteAproveClick(index) {
      this.pathList.splice(index, 1)
    },
    onDeleteClick() {
      this.isEdit = !this.isEdit
    },
    onUploadLicenseClick(imageList) {
      this.uploadPath = imageList[0]
      this.checkInvalid()
    },
    onUploadAproveClick(imageList) {
      const length = imageList.length
      if (length < this.count) {
        this.pathList = imageList
      } else {
        this.pathList = imageList.splice(0, this.count)
      }
    },
    reSaveApplicationLicenseClick() {
      this.checkInvalid()
      if (this.toastText) {
        this.type = 'warn'
        this.isShowToast = true
      } else {
        this.$callApi({
          api: 'parentlicense_societyGroup_save',
          param: {
            campusid: this.campusid,
            userid: this.userid,
            codeImg: this.uploadPath,
            corporateImg: this.pathList.join(),
            corporateidCode: this.applicationList[SOCIETY_ORGANIZATION.LEGAL_ID]
              .value,
            corporateName: this.applicationList[SOCIETY_ORGANIZATION.LEGAL_NAME]
              .value,
            groupCode: this.applicationList[SOCIETY_ORGANIZATION.CODE].value,
            contact: this.applicationList[SOCIETY_ORGANIZATION.CONTACT_NAME]
              .value,
            groupName: this.applicationList[SOCIETY_ORGANIZATION.NAME].value,
            unitAddress: this.applicationList[SOCIETY_ORGANIZATION.ADDRESS]
              .value,
            telephoneNum: this.applicationList[SOCIETY_ORGANIZATION.CONTACT]
              .value
          }
        }).then(() => {
          this.$refs.input.forEach(input => {
            input.reset()
          })
          // 使用reset方法后 firstError没有被正常清除
          this.$nextTick(() => {
            this.$refs.input.forEach(input => {
              input.reset()
            })
          })
          this.$vux.toast.show({
            type: 'success',
            text: '上传成功',
            time: 2000,
            onHide: () => {
              callCloseWindowApi()
            }
          })
          this.invalid = true
          this.uploadPath = ''
          this.pathList = []
        })
      }
    },
    checkInvalid() {
      const childrenList = this.$refs.group.$children

      // 校验是否有值
      for (let item of childrenList) {
        this.toastText = validatorValue(
          item.title.slice(1, -1) + '不能为空',
          item.name,
          item.currentValue
        )
        if (this.toastText) {
          break
        }
      }
    }
  },
  created() {
    this.$setTitle('社会组织申请')
  }
}
</script>

<style lang="scss" scoped>
.organization-application {
  min-height: 100%;
  background-color: #fff;
  &__title {
    padding: 10px 20px 0;
    font-size: 20px;
    color: #333;
  }
  &__business-license {
    position: relative;
    margin: 10px 20px;
    height: 128px;
    font-size: 20px;
    color: #333;
    background-color: #eaeaea;
    .business-license {
      &__text {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 18px;
        color: #cacaca;
        font-size: 16px;
      }
      &__image {
        position: absolute;
        top: 29px;
        left: 50%;
        transform: translateX(-50%);
        width: 78px;
        height: 50px;
      }
      &__upload {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }
  }
  &__submit {
    position: fixed;
    bottom: 200px;
    left: 0;
    padding: 10px 0;
    width: 100%;
    height: 45px;
    background: #eee;
    .submit__button {
      padding: 5px;
      text-align: center;
      line-height: 35px;
      width: 88%;
      color: #fff;
      background-color: #43cb8f;
    }
  }
  &__other {
    height: 149px;
    padding: 0 15px;
    background-color: #fff;
    .other {
      &__title {
        display: flex;
        justify-content: space-between;
        margin: 10px 0;
        font-size: 17px;
        .title__button {
          width: 52px;
          height: 26px;
          text-align: center;
          line-height: 26px;
          background-color: rgba(148, 193, 247, 0.85);
          border-radius: 3px;
          font-size: 15px;
          color: #666;
        }
      }
      &__upload {
        margin-bottom: 67px;
        width: 100%;
        height: 100px;
      }
    }
  }
}
</style>
