/**
 * 验证身份证号是否正确
 * @param {string} value 身份证号
 * @returns true通过。false不通过
 */

const _useValidateID = idCard => {
  //15位和18位身份证号码的正则表达式

  var regIdCard = /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/;
  //如果通过该验证，说明身份证格式正确，但准确性还需计算
  if (regIdCard.test(idCard)) {
    if (idCard.length == 18) {
      var idCardWi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2); //将前17位加权因子保存在数组里
      var idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2); //这是除以11后，可能产生的11位余数、验证码，也保存成数组
      var idCardWiSum = 0; //用来保存前17位各自乖以加权因子后的总和
      for (var i = 0; i < 17; i++) {
        idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i];
      }
      var idCardMod = idCardWiSum % 11; //计算出校验码所在数组的位置
      var idCardLast = idCard.substring(17); //得到最后一位身份证号码
      //如果等于2，则说明校验码是10，身份证号码最后一位应该是X
      if (idCardMod == 2) {
        if (idCardLast == "X" || idCardLast == "x") {
          return true;
        } else {
          return false;
        }
      } else {
        //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
        if (idCardLast == idCardY[idCardMod]) {
          return true;
        } else {
          return false;
        }
      }
    }
  } else {
    return false;
  }
};

/**
 * 验证手机号是否正确
 * @param {*} value
 * @returns true通过。false不通过
 */
const _useValidateTelephone = value => {
  return /^(?:(?:\+|00)86)?1[3-9]\d{9}$/.test(value);
};

const validateSomething = {
  id: _useValidateID,
  tel: _useValidateTelephone,
};

/**
 * 使用校验
 *
 * @param {string} type 校验类型，可选值：id-身份证号码、te-手机号码
 * @param {string} value 验证的值
 * @returns true通过。false不通过
 */
export const useValidate = (type, value) => {
  if (!["id", "tel"].includes(type.toLowerCase())) {
    throw new Error("可选值为：id、tel");
  }
  return validateSomething[type](value);
  // if (type.toLowerCase() === "tel") {
  //   return _useValidateTelephone(value);
  // } else if (type.toLowerCase() === "id") {
  //   return _useValidateID(value);
  // }
};

/**
 * 直接校验表单输入的身份证号码是否正确
 *
 * @param {*}
 * @param {string} value 需要校验的值
 * @param {Function} callback 抛出的错误信息
 */
export const useValidateIdNum = (rule, value, callback) => {
  rule.type !== "string" ? callback(new Error("输入值应为字符串类型")) : _useValidateID(value) ? callback() : callback(new Error("请输入正确的18位身份证号码"));
};

/**
 * 直接校验表单输入的手机号码是否正确
 *
 * @param {*} _
 * @param {string} value 需要校验的值
 * @param {Function} callback 抛出的错误信息
 */
export const useValidateTelephone = (rule, value, callback) => {
  rule.type !== "string" ? callback(new Error("输入值应为字符串类型")) : _useValidateTelephone(value) ? callback() : callback(new Error("请输入正确的11位手机号"));
};
