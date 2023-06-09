// import 'reflect-metadata'
interface FormFieldConfig {
  name: string;
  label: string,
  type: string;
  isRequired: boolean;
  isHidden: boolean;
  list?: [] // select
  [key: string]: any;
}

// 唯一的键值，用于存储一个类的元数据。
const FORM_FIELDS_METADATA_KEY = Symbol("formFields");
function FormField(config: FormFieldConfig) {
  /**
    * console.log(config);
    * { name: 'username', type: 'text' }
    * { name: 'password', type: 'password' }
    * ...
   */
  return function (target: Object, propertyKey: string | symbol) {
    // 获取目标类的元数据数组
    // target.prototype[FORM_FIELDS_METADATA_KEY];
    const fieldList = Reflect.getMetadata(FORM_FIELDS_METADATA_KEY, target) || [];
    // 重新附加到目标类上。
    fieldList.push({ ...config, name: propertyKey });
       // target.prototype[FORM_FIELDS_METADATA_KEY] = fieldList;
    Reflect.defineMetadata(FORM_FIELDS_METADATA_KEY, fieldList, target);
  };
}

class FormModel {
  @FormField({ name: "username", label: '用户名', type: "text", isRequired: true, isHidden: false })
  private username: string = "";

  @FormField({ name: "password", label: '密码', type: "password", isRequired: true,  isHidden: false })
  private password: string = "";

  @FormField({ name: "checkCode",label: '验证码', type: "inputText", isRequired: true,  isHidden: false })
  private checkCode: string = "";

  public constructor() {
    this.resetField()
  }
   /**
   * @FormField 每一项组成的列表
   * @returns {FormFieldConfig[]}
   */
   public getFormConfig(): FormFieldConfig[] {
    const fieldList = Reflect.getMetadata(
      FORM_FIELDS_METADATA_KEY,
      this
    ) as FormFieldConfig[];
    return fieldList;
  }

  /**
   * 使用反射将表单数据重置
   */
  public resetField() {
    const fieldList = Reflect.getMetadata(
      FORM_FIELDS_METADATA_KEY,
      this
    ) as FormFieldConfig[];
    for (const field of fieldList) {
      this[field.name] = "";
    }
  }
  /**
   * 使用反射将表单数据保存到对象中
   * @param formData 
   */
  public saveFormData(formData: Record<string, any>) {
    const fieldList = Reflect.getMetadata(
      FORM_FIELDS_METADATA_KEY,
      this
    ) as FormFieldConfig[];
    for (const field of fieldList) {
      this[field.name] = formData[field.name] || "";
    }
  }

  /**
   * 使用反射将表单数据从对象中提取出来
   * @returns {formData}
   */
  public getFormData(): Record<string, any> {
    const formData: Record<string, any> = {};
    const fieldList = Reflect.getMetadata(
      FORM_FIELDS_METADATA_KEY,
      this
    ) as FormFieldConfig[];
    for (const field of fieldList) {
      formData[field.name] = this[field.name];
    }
    return formData;
  }

  /**
   * 检查对应的字段是否为空
   * 更多校验可使用 'class-validator' 注解库，或者自定义装饰器，反射区处理。
   * 验证参考于掘金： https://juejin.cn/post/7076701579222450190
   * @returns {boolean}
   */
  public checkFormData(): boolean {
    const fieldList = Reflect.getMetadata(
      FORM_FIELDS_METADATA_KEY,
      this
    ) as FormFieldConfig[];
    for (const field of fieldList) {
      const value = this[field.name];
      if (!value && field.isRequired && !field.isHidden) {
        console.log(field.name + value + "不能为空");
        return false;
      }
    }
    return true;
  }

  // 其他实现...
}

// 使用示例
const form = new FormModel();
console.log("form.getFormData()", form.getFormData()); 

form.saveFormData({ username: "john", password: "", checkCode: "7777" });
console.log("saveFormData", form.getFormData());

console.log("getFormConfig", form.getFormConfig()); // 拿到配置项去vfor数据

console.log("checkFormData", form.checkFormData());

export default FormModel;
